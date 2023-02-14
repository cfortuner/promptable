---
sidebar_label: "Loaders"
---

# Loaders

Loaders are classes that implement the load() method to retrieve documents from various sources, such as files or databases.

## Documents

Document
The Document interface represents a single document and includes a content property containing the text of the document and a meta property containing any additional metadata.

```ts
export interface Document {
  content: string;
  meta?: Record<string, any>;
}
```

## Usage

To use a loader, simply instantiate the loader class and call the load() method. The load() method returns a promise that resolves to an array of documents.

Example usage:

```ts
const loader = new MyLoader();
const documents = await loader.load();
```

## Loader Types

### Loader

The Loader interface defines a single method, load(), which returns a promise that resolves to an array of documents.

```ts
export interface Loader {
  load(): Promise<Document[]>;
}
```

### FileLoader

The FileLoader class is a loader that reads documents from a file on the file system. It takes a path to a file and an optional metadata object as arguments.

Example usage

```ts
const loader = new FileLoader("/path/to/file.txt", { author: "John Doe" });
const documents = await loader.load();
```

The FileLoader class provides the following options:

- `path`: a string indicating the path to the file to load.
- `meta`: an optional object containing additional metadata to add to each document.

The load() method reads the contents of the file and returns a promise that resolves to an array containing a single document object. The content property of the document contains the contents of the file, and the meta property includes the path to the file and any additional metadata provided during instantiation.
