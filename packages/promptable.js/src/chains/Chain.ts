export abstract class Chain<T> {
    abstract call(...args: any[]): any;
  }