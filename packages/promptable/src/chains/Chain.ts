export abstract class Chain {
  abstract run(...args: any[]): Promise<any>;
  protected abstract _run(...args: any[]): Promise<any>;
}
