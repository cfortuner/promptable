import { ExtractVariableNames, ExtractFormatObject } from '@utils/type-utils';

export type Expect<T extends true> = T;
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
    T,
>() => T extends Y ? 1 : 2
    ? true
    : false;

test("ExtractFormatObject", () => {
    // These tests will cause a compile time error if the types don't match
    type tests = [
        Expect<Equal<ExtractFormatObject<"this is a test.">, {}>>,
        Expect<Equal<ExtractFormatObject<"this is a {{test}}.">, { test: string }>>,
        Expect<Equal<ExtractFormatObject<"this is a {{test}} {{test2}}.">, { test: string, test2: string }>>,
        Expect<Equal<ExtractFormatObject<"{{test}}{{test2}}">, { test: string, test2: string }>>,
        Expect<Equal<ExtractFormatObject<"{{test}}{{test2}}{{test3}}">, { test: string, test2: string, test3: string }>>,
    ];
});

test("ExtractVariableNames", () => {
    // These tests will cause a compile time error if the types don't match
    type tests = [
        Expect<Equal<ExtractVariableNames<"this is a test.">, Array<never>>>,
        Expect<Equal<ExtractVariableNames<"this is a {{test}}.">, Array<"test">>>,
        Expect<Equal<ExtractVariableNames<"this is a {{test}} {{test2}}.">, Array<"test" | "test2">>>,
        Expect<Equal<ExtractVariableNames<"{{test}}{{test2}}">, Array<"test" | "test2">>>,
        Expect<Equal<ExtractVariableNames<"{{test}}{{test2}}{{test3}}">, Array<"test" | "test2" | "test3">>>,
    ];
});


