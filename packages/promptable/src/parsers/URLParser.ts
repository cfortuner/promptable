import { Parser } from "./Parser";

interface URL {
  protocol: string;
  host: string;
  path: string;
  query: { [key: string]: string };
  fragment: string;
}

export class URLParser implements Parser<URL> {
  /**
   * Parses the input URL string into an object representing the parsed URL.
   *
   * @example
   * const parser = new URLParser();
   * const url = parser.parse("https://www.example.com/path/to/file.html?param1=value1&param2=value2#section1");
   * console.log(url);
   * {
   *   protocol: 'https:',
   *   host: 'www.example.com',
   *   path: '/path/to/file.html',
   *   query: { param1: 'value1', param2: 'value2' },
   *   fragment: 'section1'
   * }
   *
   *
   * @param text the input URL string to parse
   * @returns an object representing the parsed URL
   * @throws an error if the input text is not a valid URL
   */
  parse(text: string): URL {
    const urlRegex = /^([a-z]+:\/\/)?([^\/]+)(\/[^?#]*)(\?[^#]*)?(#.*)?$/i;
    const match = text.match(urlRegex);
    if (!match) {
      throw new Error("Invalid URL format");
    }
    const [
      ,
      protocol = "http://",
      host,
      path,
      queryString = "",
      fragment = "",
    ] = match;
    const query = this.parseQueryString(queryString);
    return { protocol: protocol.toLowerCase(), host, path, query, fragment };
  }

  private parseQueryString(queryString: string): { [key: string]: string } {
    const query: { [key: string]: string } = {};
    if (!queryString) {
      return query;
    }
    queryString
      .substr(1)
      .split("&")
      .forEach((param) => {
        const [key, value] = param.split("=");
        query[key] = decodeURIComponent(value);
      });
    return query;
  }
}
