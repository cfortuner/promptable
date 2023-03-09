# Promptable.js Universal Starter (Expo + Next.js + Promptable.js + NativeWind + Solito)

<img width="1237" alt="desktop and mobile view of app" src="https://user-images.githubusercontent.com/1574028/221014822-3b0de38d-8391-487f-98a8-c5dd18e85799.png">


## 🔦 About this starter

This monorepo is a starter for a Expo + Next.js app using [Promptable](https://promptable.ai) for building LLM apps in Typescript/Javascript, [NativeWind](https://nativewind.dev) for its styling & [Solito](https://solito.dev) for navigation.
It is a refactor of the [Promptable.js](https://promptable.ai) Next.js starter on top to make it a universal app.
That means that you can use the same codebase for both web and native when creating your app on top of Promptable.js.
Create once a screen and share across Expo and Next.js. For this port we have used same tailwind.js utility classes with the needed changes to use Nativewind in replacement.

## 🚀 Getting started
`git clone https://github.com/cfortuner/promptable.git` and pick the `apps/solito-app` folder


## ☝️Configuration

- Set your OpenAI API key in `apps/solito-app/apps/next/.env` file on the `OPENAI_API_KEY` variable.
- Set your Next.js API proxy url in `packages/app/CONST.ts` file on the `PROXY_API_URL` variable.

## 🤖 About Promptable

Promptable is a library that enables you to build powerful AI applications with LLMs and Embeddings providers such as OpenAI, Hugging Face, Cohere and Anthropic. It provides a flexible and extensible API that makes it easy to compose LLMs with data and tools to build complex applications quickly and easily.
With Promptable, you can combine LLMs with other powerful tools and data sources, such as databases and APIs, to create a wide range of AI applications.
Find out more at [Promptable Github repo](https://github.com/bidah/promptable) or in [documentation](https://docs-promptable.vercel.app/docs/introduction)

## 👓 How NativeWind works with Solito

### Fast on every platform

NativeWind lets you use Tailwind while reducing runtime work on every platform.

### iOS and Android

Most approaches to using Tailwind in React Native do something like this at runtime:

```ts
const styles = props.className
  .split(' ')
  .map((className) => makeStyle(className))

return <View style={styles} />
```

This means that every component ends up parsing strings to construct predictable style objects.

NativeWind takes a new approach by doing this work upfront with a Babel plugin.

NativeWind turns `className` strings into cached `StyleSheet.create` objects at build time, avoiding the [slow string parsing problem](https://twitter.com/terrysahaidak/status/1470735820915150850?s=20&t=w9VUPwiTFxBkRBHWTtDz1g) of libraries like `styled-components/native`.

Keep in mind that the Babel plugin will get used on iOS/Android only; on Web, we don't need the plugin since we are using `className`.

### Web

On Web, NativeWind uses Next.js' `PostCSS` feature to output CSS StyleSheets.

Which means that **on Web, you're using CSS class names.**

Yes, that's right. We aren't parsing className strings into objects for React Native Web to use. Instead, we're actually forwarding CSS classnames to the DOM. That means you can get responsive styles, dark mode support, & pseudo-selectors _with server-side rendering support_.

This is finally possible with the release of React Native Web 0.18.

As a result, using NativeWind with React Native doesn't have significant overhead compared to plain old Tailwind CSS in a regular React app.

If you're planning on making a website with Tailwind, why not use Solito with NativeWind?

You might accidentally make a great native app when you thought you were just making a website.

### Bringing it together

Components are written using the `styled()` higher-order component.

In your app's design system, you can start by building your own UI primitives:

```tsx
// packages/app/design/typography
import { Text } from 'react-native'
import { styled } from 'nativewind'

export const P = styled(Text, 'text-base text-black my-4')
```

Notice that you can set base styles using the second argument of `styled`.

You can then use the `className` prop, just like regular Tailwind CSS:

```tsx
<P className="dark:text-white">Solito + NativeWind</P>
```

Take a look at the [`packages/app/design`](https://github.com/nandorojo/solito/tree/master/example-monorepos/with-tailwind/packages/app/design) folder to see how components are created with ease.

> If you're reading the NativeWind docs, you might find that you can use `className` directly without using `styled`. Since this requires the Babel plugin for all platforms, it won't work with Solito. Be sure to always wrap your components with `styled`.

## 📦 Included packages

- `promptable.js` for building LLM apps
- `solito` for cross-platform navigation
- `moti` for animations
- `nativewind` for theming/design (you can bring your own, too)
- Expo SDK 46
- Next.js 12.3
- React Navigation 6

## 🗂 Folder layout

- `apps` entry points for each app

  - `expo`
  - `next`

- `packages` shared packages across apps
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
      - `chat` chat component
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation` Next.js has a `pages/` folder. React Native doesn't. This folder contains navigation-related code for RN. You may use it for any navigation code, such as custom links.
    - `design` your app's design system. organize this as you please.
      - `typography` (components for all the different text styles)
      - `layout` (components for layouts)

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

- Install dependencies: `yarn`

- Next.js local dev: `yarn web`
  - Runs `yarn next`
  - Use your your computer IP to grab your Next.js api route or run a proxy using a service like NGROK. Set it in `PROXY_API_URL` on the `CONST.ts` file.
- Expo local dev: `yarn native`
  - Runs `expo start`

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `apps/expo`:

```sh
cd apps/expo
yarn add react-native-reanimated

cd ../..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

## 🎙 About the creator

### Rodrigo Figueroa

Follow Rodrigo Figueroa, creator of `Promptable.js Universal Starter`, on Twitter: [@bidah](https://twitter.com/bidah)

### Colin Fortuner

Follow Colin Fortuner, creator of `Promptable.js`, on Twitter: [@colinfortuner](https://twitter.com/colinfortuner)

### Fernando Rojo

Follow Fernando Rojo, creator of `solito`, on Twitter: [@FernandoTheRojo](https://twitter.com/fernandotherojo)

### Mark Lawlor

Follow Mark Lawlor, creator of `NativeWind`, on Twitter: [@mark\_\_lawlor](https://twitter.com/mark__lawlor)

## 🧐 Why use Expo + Next.js?

See talk about this topic at Next.js Conf 2021:

<a href="https://www.youtube.com/watch?v=0lnbdRweJtA"><img width="1332" alt="image" src="https://user-images.githubusercontent.com/13172299/157299915-b633e083-f271-48c6-a262-7b7eef765be5.png">
</a>
