export interface Parser<T extends any> {
  parse(text: string): T;
}
