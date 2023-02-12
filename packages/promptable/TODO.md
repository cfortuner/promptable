# TODO

Prompts

- Formatters

  - Truncate input by characters
  - Truncate input by words

- Selectors / Filters

  - Select a random subset of the input
  - Fuzzy search examples based on input
  - Regex for filtering input

- Utilities
  - Define dags / workflows
  - log completions
  - standardize input/output data structures for each Completion call
  - Retry completions (prompt-level)
  - Parallelize completions (with max parallelism dynamically configured by system load)
  - prompt
    - define
    - store
      - Store prompts somewhere - let Business people write prompts / debug prompt outputs
    - templating language
    - run
  - stream completions to frontend
  - Single API for multiple providers (OAI, Anthro)
  - Visualize prompt chain outputs and debug
  - ASR utils (for speech recognition)
  - Integrations (like PipeDream) for Slack, Discord
  - Pre-built prompts for common tasks:
    - ReACT / CoT
    - q/a,
    - summarize,
    - self-eval,
    - chat
    - Few shot
    - Chain of thought
    - etc.
  - Utils for creating/store/fetch embeddings + loading into prompt
  - Document Loaders / Readers
  - text splitting, transformation
    - https://github.com/retextjs/retext
    - 'retext-simplify', 'retext-redundant-acronyms','retext-repeated-words'
    - 'remove stopwords' -> https://github.com/fergiemcdowall/stopw
    - https://github.com/NaturalNode/natural
  - summarization (https://thetokenizer.com/2013/04/28/build-your-own-summary-tool/)
- Prompt Parsers
  - Parse the output of a prompt
    - Json
    - XML
    - Variables
    - etc.
- Chains
- Agents
- Memory
- How to design Tools
- What does middleware look like
- How to allow for storage, documents and file readers
- How to create indexes / datastructures that can be used across many chains / multiple chain executions etc.
- Prompt input formatters / text splitting, etc.
- Prompt output Parsers
- Plugins / extensions system
- Step Retries
- Chain / Step serialization / retry logic
- Browser / Edge support?
- How to deploy a promptable.js app
