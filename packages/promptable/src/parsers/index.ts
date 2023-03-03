import { CSVParser } from "./CSVParser";
import { JSONParser } from "./JSONParser";
import { RegexParser } from "./RegexParser";
import { CSSParser } from "./CSSParser";
import { MarkdownParser } from "./MarkdownParser";
import { XMLParser } from "./XMLParser";
import { YAMLParser } from "./YAMLParser";
import { HTMLParser } from "./HTMLParser";
import { BabelParser } from "./BabelParser";
import { ArrayParser } from "./ArrayParser";
import { MapParser } from "./MapParser";
import { SQLParser } from "./SQLParser";

// TODO: Parsers should be added as plugins / extensions
// to avoid bloating the package
export const Parsers = {
  CSSParser,
  JSONParser,
  CSVParser,
  RegexParser,
  MapParser,
  MarkdownParser,
  XMLParser,
  YAMLParser,
  HTMLParser,
  BabelParser,
  ArrayParser,
  SQLParser,
};

export type { Parser } from "./Parser";
