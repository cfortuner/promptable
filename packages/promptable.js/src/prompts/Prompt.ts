
export class Prompt {
    text: string;
    variables: { [name: string]: string };
    outputName: string;
    constructor(
      text: string,
      variables: { [name: string]: string },
      outputName: string
    ) {
      this.text = text;
      this.variables = variables;
      this.outputName = outputName;
    }
  
    format() {
      return this.injectVariables();
    }
  
    private injectVariables() {
      return Object.entries(this.variables)?.reduce((acc, [name, value]) => {
        return acc.replaceAll(`{{${name}}}`, value);
      }, this.text);
    }
  }
  
  