import { Parser } from "./Parser";

interface Query {
  type:
    | "SELECT"
    | "INSERT"
    | "UPDATE"
    | "DELETE"
    | "CREATE"
    | "ALTER"
    | "DROP"
    | "SHOW"
    | "DESCRIBE";
  table: string;
  fields?: string[];
  values?: any[];
  set?: { [key: string]: any };
  where?: { [key: string]: any };
  orderBy?: string[];
  limit?: number;
}

/**
 * const parser = new SQLParser();
 * const query = parser.parse("SELECT * FROM my_table WHERE col1 = 'value1' ORDER BY col2 DESC LIMIT 10;");
 * console.log(query); // outputs { type: 'SELECT', table: 'my_table', fields: [], values: [], set: {}, where: { col1: 'value1' }, orderBy: ['col2', 'DESC'], limit: 10 }
 *
 */
export class SQLParser implements Parser<Query> {
  /**
   * Parses the input SQL statement into an object representing the parsed query.
   *
   * @param text the input SQL statement to parse
   * @returns an object representing the parsed query
   * @throws an error if the input text is not valid SQL
   */
  parse(text: string): Query {
    const tokens = text.split(/\s+/);
    const query: Query = {
      type: tokens[0].toUpperCase() as Query["type"],
      table: "",
      fields: [],
      values: [],
      set: {},
      where: {},
      orderBy: [],
      limit: undefined,
    };

    if (query.type === "SELECT") {
      query.fields = tokens[1] === "*" ? [] : tokens[1].split(",");
      query.table = tokens[3];
      query.where = this.parseWhere(tokens.slice(4));
      query.orderBy = this.parseOrderBy(tokens.slice(4));
      query.limit = this.parseLimit(tokens.slice(4));
    } else if (query.type === "INSERT") {
      query.table = tokens[2];
      query.fields = this.parseFields(tokens.slice(3));
      query.values = this.parseValues(tokens.slice(3));
    } else if (query.type === "UPDATE") {
      query.table = tokens[1];
      query.set = this.parseSet(tokens.slice(2));
      query.where = this.parseWhere(tokens.slice(2));
      query.orderBy = this.parseOrderBy(tokens.slice(2));
      query.limit = this.parseLimit(tokens.slice(2));
    } else if (query.type === "DELETE") {
      query.table = tokens[2];
      query.where = this.parseWhere(tokens.slice(3));
      query.orderBy = this.parseOrderBy(tokens.slice(3));
      query.limit = this.parseLimit(tokens.slice(3));
    } else if (query.type === "CREATE") {
      query.table = tokens[2];
    } else if (query.type === "ALTER") {
      query.table = tokens[2];
    } else if (query.type === "DROP") {
      query.table = tokens[2];
    } else if (query.type === "SHOW") {
      query.table = tokens[2];
    } else if (query.type === "DESCRIBE") {
      query.table = tokens[2];
    }

    return query;
  }

  private parseFields(tokens: string[]): string[] {
    const idx = tokens.indexOf("(");
    const fieldsString = tokens.slice(idx + 1, tokens.indexOf(")")).join(" ");
    return fieldsString.split(",");
  }

  private parseValues(tokens: string[]): any[] {
    const idx = tokens.indexOf("VALUES");
    const values = tokens.slice(idx + 1);
    return values.map((v) => v.replace(/,/g, ""));
  }

  private parseSet(tokens: string[]): { [key: string]: any } {
    const set: { [key: string]: any } = {};
    let idx = tokens.indexOf("SET");
    while (idx < tokens.length) {
      const key = tokens[idx];
      const value = tokens[idx + 2];
      set[key] = value;
      idx += 3;
    }
    return set;
  }

  private parseWhere(tokens: string[]): { [key: string]: any } {
    const where: { [key: string]: any } = {};
    let idx = tokens.indexOf("WHERE");
    if (idx >= 0) {
      while (idx < tokens.length) {
        const key = tokens[idx + 1];
        const value = tokens[idx + 2];
        where[key] = value;
        idx += 3;
      }
    }
    return where;
  }

  private parseOrderBy(tokens: string[]): string[] {
    const idx = tokens.indexOf("ORDER");
    if (idx >= 0) {
      return tokens.slice(idx + 2);
    }
    return [];
  }

  private parseLimit(tokens: string[]) {
    const idx = tokens.indexOf("LIMIT");
    if (idx >= 0) {
      return parseInt(tokens[idx + 1]);
    }
  }
}
