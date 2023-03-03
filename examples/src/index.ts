import basic from "./basic";
import advanced from "./advanced";

const examples = {
  basic,
  advanced,
};

const isExample = (arg: string): arg is keyof typeof examples =>
  arg in examples;

async function run(args: string[]) {
  const example = args[0];
  const params = args.slice(1);

  if (!isExample(example)) {
    console.error(`Unrecognized example: ${example}`);
    return;
  }

  await examples[example](params);
}

run(process.argv.slice(2));

export {};
