---
sidebar_label: 'Bridge React Query'
---

# Bridge React Query

We have created a bridge between react-query and the generated Bridge SDK, enabling you to use react-query seamlessly with the functions from the SDK and handle errors with full type information.

** Install bridge-react-query**
```bash title='terminal'
npm i bridge-react-query@latest
# or
pnpm add bridge-react-query
# or 
yarn add bridge-react-query
```

## Use Bridge Query

```ts twoslash title='client.ts' live

const API = {
    user: {
        getMe: async (p: {
            headers: { token: string }
        }): Promise<
  | {
      data: {
        _id: string
        username: string;
        email: string;
        age: number;
        language: 'english' | 'french';
        avatar?: string;
        createdAt: Date;
      };
      error: undefined;
    }
  | {
      data: undefined;
      error:
        | { name: 'Wrong permission'; status: 401; data?: any; }
        | { name: 'User not found'; status: 404; }
        | { name: 'Headers schema validation error'; status: 422; data: any }
        | { name: 'Axios Error'; status: 400; data: any }
        | { name: 'Internal Server Error'; status: 500 };
    }
> => '' as any 
    }
} 

// ---cut---
import { useBridgeQuery } from 'bridge-react-query';

const res = useBridgeQuery(['id'], () => API.user.getMe({ headers: { token: 'secretToken' } }), {
  onSuccess: (data) => {
    //          ^?

  },
  onError: (error) => {
    //        ^?

  }
})
```

## Use Bridge Mutation

```ts twoslash title='client.ts' live

const API = {
    user: {
        getMe: async (p: {
            headers: { token: string }
        }): Promise<
  | {
      data: {
        _id: string
        username: string;
        email: string;
        age: number;
        language: 'english' | 'french';
        avatar?: string;
        createdAt: Date;
      };
      error: undefined;
    }
  | {
      data: undefined;
      error:
        | { name: 'Wrong permission'; status: 401; data?: any; }
        | { name: 'User not found'; status: 404; }
        | { name: 'Headers schema validation error'; status: 422; data: any }
        | { name: 'Axios Error'; status: 400; data: any }
        | { name: 'Internal Server Error'; status: 500 };
    }
> => '' as any 
    }
} 

// ---cut---
import { useBridgeMutation } from 'bridge-react-query';

const res = useBridgeMutation(API.user.getMe, {
  onSuccess: (data) => {
    //          ^?

  },
  onError: (error) => {
    //        ^?

  }
})
```


If you require additional react-query functionality to be integrated with Bridge, please ask in our **[Discord Community](https://discord.gg/yxjrwm7Bfr)**.