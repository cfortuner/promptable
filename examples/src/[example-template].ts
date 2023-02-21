const run = async (args: string[]) => {
  const prompt = `
        Here are the headers of the csv file:

        HEADERS:
        Title,Author,Year,Pages,Genre,Rating

        Here are the tools you can use to visualize the data:

        Tool is defined as 
        - function name, arg1, arg2, arg3, ...

        TOOLS:
        - bar chart, x, y, color
        - scatter plot, x, y, color
        - line chart, x, y, color
        - histogram, x, y, color

        Here is the user's instruction:
        {{instructions}}

        Visualize Instructions:`;
};

export default run;
