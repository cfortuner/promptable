import fs from "fs";
import path from "path";
import axios from "axios";
import { PromptConfiguration } from "./Prompt";

export interface PromptDeployment {
  id: string;
  name: string;
  isActive: boolean;
  text: string;
  config: PromptConfiguration;
  inputs: { name: string; value: string }[] | null;
  createdAt: Date;
  updatedAt: Date;
  promptId: string;
}

export const getActiveDeployment = async ({
  promptId,
}: {
  promptId: string;
}) => {
  const { data } = await axios.get(
    `https://promptable.ai/api/prompt/${encodeURIComponent(
      promptId
    )}/deployment/active`
  );

  return data as PromptDeployment;
};

export interface LoadPromptArgs {
  prompts: { id: string }[];
}

/**
 * EXPERIMENTAL: This is a work in progress.
 *
 * @param args
 */
export const loadPromptablePrompts = async (args: LoadPromptArgs) => {
  const { prompts } = args;
  const promptIds = prompts.map((p) => p.id);
  const promptDeployments = promptIds.map((id) =>
    getActiveDeployment({ promptId: id })
  );
  const deployedPrompts = await Promise.all(promptDeployments);

  const promptableFolder = ".promptable";
  if (!fs.existsSync(promptableFolder)) {
    fs.mkdirSync(promptableFolder);
  }

  deployedPrompts.forEach((p) => {
    const promptName = p.name.replace(/\s+/g, "-").toLowerCase();
    const promptFile = `${promptName}.js`;
    const promptDeclarationFile = `${promptName}.d.ts`;

    const promptTemplateDeclaration = `import { PromptVariables, PromptTemplate } from "@promptable/promptable";

declare const template: PromptTemplate<\`${p.text}\`, PromptVariables<\`${p.text}\`>>;

export default template;
`;

    fs.writeFileSync(
      path.join(promptableFolder, promptDeclarationFile),
      promptTemplateDeclaration
    );

    const promptTemplateCode = `import { PromptTemplate } from "@promptable/promptable";

const template = new PromptTemplate(
  \`${p.text}\`,
  ${JSON.stringify(p.config)}
);

export default template;
`;

    fs.writeFileSync(
      path.join(promptableFolder, promptFile),
      promptTemplateCode
    );
  });

  // Now export all the prompts

  function hyphenToCamelCase(str: string) {
    return str.replace(/-([a-z])/g, function (match, char) {
      return char.toUpperCase();
    });
  }
  const indexJS = deployedPrompts
    .map((p) => `export { ${hyphenToCamelCase(p.name)} } from './${p.name}';\n`)
    .join("");

  fs.writeFileSync(path.join(".promptable", "index.js"), indexJS);

  const indexDTS = deployedPrompts
    .map(
      (p) =>
        `export { default as ${hyphenToCamelCase(p.name)}}  from './${
          p.name
        }';\n`
    )
    .join("");

  fs.writeFileSync(path.join(".promptable", "index.d.ts"), indexDTS);
};
