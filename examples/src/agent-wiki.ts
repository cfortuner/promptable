import { wikipediaAgent, agentRun } from "@promptable/promptable";

const run = async (args: string[]) => {
    const s = await agentRun("When was Caroline Polachek's debut studio album released?", [wikipediaAgent]);
    console.log(s);
};

export default run;
