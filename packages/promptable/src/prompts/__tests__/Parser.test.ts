import { NoopParser, JSONParser, CSVParser, ListParser } from "@prompts/Parser"

test("NoopParser", () => {
    expect(new NoopParser().parse("test")).toEqual("test");
})

describe("JSONParser", () => {
    test("should throw error for invalid json", () => {
        const parser = new JSONParser();
        expect(() => parser.parse("")).toThrow("");
    });

    test("should parse valid json", () => {
        const parser = new JSONParser();
        expect(parser.parse('{ "hello": "world" }')).toEqual({ hello: "world" });
    });
});

describe("CSVParser", () => {
    test("should throw error for invalid csv", () => {
        const parser = new CSVParser();
        // @ts-expect-error
        expect(() => parser.parse(1)).toThrow("")
    });

    test("should parse valid csv", () => {
        const parser = new CSVParser();
        expect(parser.parse("a,b,c\n1,2,3")).toEqual([{
            a: "1",
            b: "2",
            c: "3"
        }])
    });
});


describe("ListParser", () => {
    test("should throw error for invalid json", () => {
        const parser = new ListParser();
        // @ts-expect-error
        expect(() => parser.parse(1)).toThrow("")
    });

    test("should parse valid json", () => {
        const parser = new ListParser();
        expect(parser.parse("a, b, c")).toEqual(["a", "b", "c"])
    });
});