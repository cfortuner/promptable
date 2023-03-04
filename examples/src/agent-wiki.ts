import { wikipediaAgent, agentRun, reactRun } from "@promptable/promptable";

const run = async (args: string[]) => {
    // const s = await agentRun("When was Caroline Polachek's debut studio album released?", [wikipediaAgent]);
    // console.log(s);
    reactRun("What is the tallest building in San Francisco?")
};

export default run;
