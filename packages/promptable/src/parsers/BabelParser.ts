import * as babelParser from "@babel/parser";
import traverse from "@babel/traverse";
import { Parser } from "./Parser";

interface Node {
  type: string;
  [key: string]: any;
}

export class CodeParser implements Parser<Node[]> {
  /**
   * Parses the input code string into an array of AST nodes representing the parsed code.
   *
   * @example
   * const parser = new CodeParser();
   * const code = `
   * function greet(name) {
   *   console.log("Hello, " + name + "!");
   * }
   *
   * greet("World");
   * `;
   * const nodes = parser.parse(code);
   * console.log(nodes);
   * [
   *   {
   *     "type": "FunctionDeclaration",
   *     "id": {
   *       "type": "Identifier",
   *       "name": "greet",
   *       ...
   *     },
   *     ...
   *   },
   *   {
   *     "type": "ExpressionStatement",
   *     "expression": {
   *       "type": "CallExpression",
   *       "callee": {
   *         "type": "Identifier",
   *         "name": "greet",
   *         ...
   *       },
   *       ...
   *     },
   *     ...
   *   }
   * ]
   *
   * @param text the input code string to parse
   * @returns an array of AST nodes representing the parsed code
   * @throws an error if the input text is not valid code
   */
  parse(text: string): Node[] {
    try {
      const ast = babelParser.parse(text, { sourceType: "module" });
      const nodes: Node[] = [];
      traverse(ast, {
        enter: (path: any) => {
          nodes.push(path.node);
        },
      });
      return nodes;
    } catch (e) {
      console.error(e as any);
      throw new Error("Invalid code format");
    }
  }
}
