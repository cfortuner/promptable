export type DocumentReference = {
  id: string;
};

export type DataType =
  | string
  | number
  | boolean
  | null
  | { [key: string]: string | number | boolean | null | DataType }
  | DataType[];

export class Document {
  id?: string;
  data: DataType;
  text?: string;
  meta?: Record<string, any>;

  constructor(
    data: DataType,
    id?: string,
    opts?: {
      text?: string;
      meta?: Record<string, any>;
    }
  ) {
    this.id = id;
    this.data = data;

    if (opts?.meta) {
      this.meta = opts.meta;
    }

    if (opts?.text) {
      this.text = opts.text;
    }
  }
}
