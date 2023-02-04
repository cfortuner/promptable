import { OpenAI, PromptStep, Prompt, SequentialChain, utils } from "promptable";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient, User } from '@prisma/client'

import { printSchema, getSchema } from "@mrleebo/prisma-ast"
import * as fs from "fs";

utils.logger.setLevel("info")

interface LooseObject {
  [key: string]: any
}

const prisma = new PrismaClient()
const apiKey = process.env.OPENAI_API_KEY || "missing";
const provider = new OpenAI(apiKey);

async function main() {
  const filePath = "./prisma/schema.prisma";

  let schemaString = ""

  fs.readFile(filePath, "utf-8", async (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    schemaString = data;

    const schema = getSchema(schemaString);

    // for (let i = 0; i < 3; i++) {

    for (const node of schema.list) {
      if (node.type == "model") {
        // console.log(node);
        const modelName = node.name;
        const properties = node.properties;
        const exampleData : LooseObject = {}
        for (const property of properties) {
          if (property.type == "field" && property.name != "id") {
                const prompt = new Prompt(`
            Seed: ${Math.random() * 1000000}
            Create a list of five examples the following data and type.
            The following are three examples of length five:

            Input: { data: name, type: String }
            Output: ["John Doe", "Bob Smith", "Samantha Johnson", "Grace Hopper", "Mark Ryan"]

            Input: { data: birthday, type: DateTime }
            Output: ["2000-12-25T00:00:00Z", "1980-10-23T00:00:00Z", "1987-08-02T00:00:00Z", "1986-12-02T00:00:00Z", "2003-09-14T00:00:00Z"]

            Here is the input data I want to generate examples for:
            Input: { data: {{fieldName}}, type: {{fieldType}} }
            Output:
            `, ["fieldName", "fieldType"]);
            

            const examplesStep = new PromptStep({
              name: "Generate Examples",
              prompt: prompt,
              provider,
              inputNames: ["fieldType", "fieldName"],
              outputNames: ["output"],
            });
            
            const { output } = await examplesStep.run({
              steps: [examplesStep],
              inputs: {
                fieldType: property["fieldType"],
                fieldName: property["name"],
              },
            });

            const list = JSON.parse(output);
            // console.log(list);
            exampleData[property["name"]] = list;
          }
        }

          for (let i = 0; i < 5; i++) {
            const data : LooseObject = {}
            for (const field of Object.keys(exampleData)) {
              data[field] = exampleData[field][i]
            }
            console.log(`Adding seed data to Model - ${modelName}:`)
            console.log(data);
            // @ts-ignore
            await prisma[modelName].create({
              data: data,
            })
          }

          console.log(`\n✅ Added seed data for Model: ${modelName}`)
        
        
        
        
        // @ts-ignore
        // await prisma[modelName].create({
        //   data: data,
        // })
      }
    }
  // }

  });
  
  
  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



// const run = async () => {
//   const prompt = new Prompt("Print Hello world and a similar fruit to {{fruit}}", ["fruit"]);
  
//   const provider = new OpenAI(apiKey);
//   console.log(process.env.OPENAI_API_KEY)

//   const step = new PromptStep({
//     name: "hello world",
//     prompt,
//     provider,
//     inputNames: ["fruit"],
//     outputNames: ["output"],
//   });

//   const { output } = await step.run({
//     steps: [step],
//     inputs: {
//       fruit: "apple"
//     },
//   });


//   console.log(output);
// };

// run();
