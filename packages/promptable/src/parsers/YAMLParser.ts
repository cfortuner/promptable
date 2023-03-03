import yaml from "js-yaml";
import { Parser } from "./Parser";

export class YAMLParser implements Parser<any> {
  /**
   * Parses the input YAML text into an object.
   *
   * @param text the input YAML text to parse
   * @returns an object representing the parsed YAML content
   * @throws an error if the input text is not valid YAML
   */
  parse(text: string): any {
    try {
      return yaml.load(text);
    } catch (error) {
      throw new Error(`Failed to parse YAML text: ${(error as any).message}`);
    }
  }
}
