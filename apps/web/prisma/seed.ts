import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const traces = [
  {
    name: "step1",
    inputs: ["dog"],
    outputs: {
      dog: "dog",
    },
    tags: ["example"],
    id: "bf6059cb-a119-44a6-aa34-79eeb0ac211c",
    parentId: "6102c965-1939-495d-bacd-320bc04b2751",
    children: [],
    timestamp: 1676299968397,
  },
  {
    name: "step1",
    inputs: ["dog"],
    outputs: {
      dog: "dog",
    },
    tags: ["example"],
    id: "3e240f2e-b69e-4384-8a20-569835488133",
    parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
    children: [],
    timestamp: 1676299968398,
  },
  {
    name: "step2",
    inputs: [
      {
        dog: "dog",
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "07ebdd02-3e9d-4997-a42c-3f32622b2545",
    parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
    children: [],
    timestamp: 1676299968399,
  },
  {
    name: "step2",
    inputs: [
      {
        dog: "dog",
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "08919bd3-3473-473d-9f35-a7313648ce7a",
    parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
    children: [],
    timestamp: 1676299968399,
  },
  {
    name: "step3",
    inputs: [
      {
        dog: {
          dog: "dog",
        },
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "3f4fab42-69fa-4980-ada7-6d05f9d14bd0",
    parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
    children: [],
    timestamp: 1676299968400,
  },
  {
    name: "step3",
    inputs: [
      {
        dog: {
          dog: "dog",
        },
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "bd22b04f-a734-4c94-88da-e77770a181d2",
    parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
    children: [],
    timestamp: 1676299968400,
  },
  {
    name: "substep",
    inputs: [
      {
        dog: "dog",
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: [],
    id: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
    parentId: "6102c965-1939-495d-bacd-320bc04b2751",
    children: [
      {
        name: "step2",
        inputs: [
          {
            dog: "dog",
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "07ebdd02-3e9d-4997-a42c-3f32622b2545",
        parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
        children: [],
        timestamp: 1676299968399,
      },
      {
        name: "step3",
        inputs: [
          {
            dog: {
              dog: "dog",
            },
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "3f4fab42-69fa-4980-ada7-6d05f9d14bd0",
        parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
        children: [],
        timestamp: 1676299968400,
      },
    ],
    timestamp: 1676299968398,
  },
  {
    name: "substep",
    inputs: [
      {
        dog: "dog",
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: [],
    id: "15009f56-d609-4829-8cf2-ba9cef98f225",
    parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
    children: [
      {
        name: "step2",
        inputs: [
          {
            dog: "dog",
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "08919bd3-3473-473d-9f35-a7313648ce7a",
        parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
        children: [],
        timestamp: 1676299968399,
      },
      {
        name: "step3",
        inputs: [
          {
            dog: {
              dog: "dog",
            },
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "bd22b04f-a734-4c94-88da-e77770a181d2",
        parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
        children: [],
        timestamp: 1676299968400,
      },
    ],
    timestamp: 1676299968398,
  },
  {
    name: "step3",
    inputs: [
      {
        dog: {
          dog: "dog",
        },
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "5e2d4f80-0c33-4a09-bef1-4e5f12208156",
    parentId: "6102c965-1939-495d-bacd-320bc04b2751",
    children: [],
    timestamp: 1676299968401,
  },
  {
    name: "step3",
    inputs: [
      {
        dog: {
          dog: "dog",
        },
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "7322bd4b-0816-4764-8271-785dbb55c29c",
    parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
    children: [],
    timestamp: 1676299968401,
  },
  {
    name: "first",
    inputs: [],
    tags: [],
    id: "6102c965-1939-495d-bacd-320bc04b2751",
    children: [
      {
        name: "step1",
        inputs: ["dog"],
        outputs: {
          dog: "dog",
        },
        tags: ["example"],
        id: "bf6059cb-a119-44a6-aa34-79eeb0ac211c",
        parentId: "6102c965-1939-495d-bacd-320bc04b2751",
        children: [],
        timestamp: 1676299968397,
      },
      {
        name: "substep",
        inputs: [
          {
            dog: "dog",
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: [],
        id: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
        parentId: "6102c965-1939-495d-bacd-320bc04b2751",
        children: [
          {
            name: "step2",
            inputs: [
              {
                dog: "dog",
              },
            ],
            outputs: {
              dog: {
                dog: "dog",
              },
            },
            tags: ["example"],
            id: "07ebdd02-3e9d-4997-a42c-3f32622b2545",
            parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
            children: [],
            timestamp: 1676299968399,
          },
          {
            name: "step3",
            inputs: [
              {
                dog: {
                  dog: "dog",
                },
              },
            ],
            outputs: {
              dog: {
                dog: "dog",
              },
            },
            tags: ["example"],
            id: "3f4fab42-69fa-4980-ada7-6d05f9d14bd0",
            parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
            children: [],
            timestamp: 1676299968400,
          },
        ],
        timestamp: 1676299968398,
      },
      {
        name: "step3",
        inputs: [
          {
            dog: {
              dog: "dog",
            },
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "5e2d4f80-0c33-4a09-bef1-4e5f12208156",
        parentId: "6102c965-1939-495d-bacd-320bc04b2751",
        children: [],
        timestamp: 1676299968401,
      },
    ],
    timestamp: 1676299968396,
  },
  {
    name: "second",
    inputs: [],
    tags: [],
    id: "109671ab-3aae-4fac-ab9f-4581268a636f",
    children: [
      {
        name: "step1",
        inputs: ["dog"],
        outputs: {
          dog: "dog",
        },
        tags: ["example"],
        id: "3e240f2e-b69e-4384-8a20-569835488133",
        parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
        children: [],
        timestamp: 1676299968398,
      },
      {
        name: "substep",
        inputs: [
          {
            dog: "dog",
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: [],
        id: "15009f56-d609-4829-8cf2-ba9cef98f225",
        parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
        children: [
          {
            name: "step2",
            inputs: [
              {
                dog: "dog",
              },
            ],
            outputs: {
              dog: {
                dog: "dog",
              },
            },
            tags: ["example"],
            id: "08919bd3-3473-473d-9f35-a7313648ce7a",
            parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
            children: [],
            timestamp: 1676299968399,
          },
          {
            name: "step3",
            inputs: [
              {
                dog: {
                  dog: "dog",
                },
              },
            ],
            outputs: {
              dog: {
                dog: "dog",
              },
            },
            tags: ["example"],
            id: "bd22b04f-a734-4c94-88da-e77770a181d2",
            parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
            children: [],
            timestamp: 1676299968400,
          },
        ],
        timestamp: 1676299968398,
      },
      {
        name: "step3",
        inputs: [
          {
            dog: {
              dog: "dog",
            },
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "7322bd4b-0816-4764-8271-785dbb55c29c",
        parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
        children: [],
        timestamp: 1676299968401,
      },
    ],
    timestamp: 1676299968397,
  },
].reverse();

async function main() {
  for (const trace of traces) {
    const seedTrace = await prisma.trace.create({
      data: {
          trace: JSON.stringify(trace),
      },
    })
    console.log({ seedTrace })
  }

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })