---
sidebar_label: 'How to use your SDK'
---

# SDK in the client code

## Import API from sdk

The Typescript client SDK exports an API constant which can be easily imported into your code and used to access every endpoint of the Bridge API.

## Example

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
        | { name: 'Wrong permission'; data?: any; status: 401 }
        | { status: 404; name: 'User not found' }
        | { name: 'Headers schema validation error'; status: 422; data: any }
        | { name: 'Axios Error'; status: 400; data: any }
        | { name: 'Internal Server Error'; status: 500 };
    }
> => '' as any 
    }
} 

// ---cut---

async () => {

    const { data, error } = await API.user.getMe({
        headers: { token: 'secretToken' }
    })

    if (data) console.log(data)
    //                      ^?


    if (error) {
        switch (error.name) {
            case "User not found":
            //...
            break;
        }

        console.log(error)
        //            ^?  
   }
}
```

Please visit https://bridge.codes/studio for more information.