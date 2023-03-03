import { Parser } from "./Parser";

export class XMLParser implements Parser<any> {
  /**
   * Parses the input XML text into an object or array of objects.
   *
   * @param text the input XML text to parse
   * @returns an object or array of objects representing the XML data
   * @throws an error if the input text is not valid XML
   */
  parse(text: string): any {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    if (!xml) {
      throw new Error(`Failed to parse XML text: '${text}'`);
    }

    if (xml.children.length === 1) {
      return this.parseElement(xml.children[0]);
    }

    return Array.from(xml.children).map((element) =>
      this.parseElement(element)
    );
  }

  private parseElement(element: Element): any {
    const obj: any = {};

    for (const child of element.children) {
      const childObj = this.parseElement(child);

      if (!obj[child.tagName]) {
        obj[child.tagName] = childObj;
      } else if (Array.isArray(obj[child.tagName])) {
        obj[child.tagName].push(childObj);
      } else {
        obj[child.tagName] = [obj[child.tagName], childObj];
      }
    }

    if (!Object.keys(obj).length) {
      return element.textContent?.trim();
    }

    if (element.attributes.length) {
      obj["@attributes"] = {};

      for (const attribute of element.attributes) {
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }

    if (element.textContent?.trim()) {
      obj["#text"] = element.textContent.trim();
    }

    return obj;
  }
}
