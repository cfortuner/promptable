# TODO

Goal is to add examples for each one of these sections:

## Embeddings

#### Utils

- [ ] Build cache to save embeddings (save and load to file)
      The cache is a dictionary that maps tuples of (text, model) to an embedding, which is a list of floats. The cache is saved as a Python pickle file.

###### Advanced utils

- [ ] Long text embeddings  
       https://github.com/openai/openai-cookbook/blob/main/examples/Embedding_long_inputs.ipynb
- [ ] Huggingface support for Instruct embeddings
      https://twitter.com/LangChainAI/status/1621231779716956160?s=20&t=ph-W4evdsXjLjikCd3xzqg
- [ ] Visualize Embeddings
      https://github.com/openai/openai-cookbook/blob/main/examples/Recommendation_using_embeddings.ipynb
      https://github.com/openai/openai-cookbook/blob/main/examples/Visualizing_embeddings_in_2D.ipynb
  - [ ] Use t-SNE or PCA to compress embeddings down to 2-3 dimensions for charting
  - To get a sense of what our nearest neighbor recommender is doing, let's visualize the article embeddings. Although we can't plot the 2048 dimensions of each embedding vector, we can use techniques like t-SNE or PCA to compress the embeddings down into 2 or 3 dimensions, which we can chart.

#### Examples

- [ ] Recommendation using embeddings and nearest neighbor search
      To find similar articles, let's follow a three-step plan:
      Get the similarity embeddings of all the article descriptions
      Calculate the distance between a source title and all other articles
      Print out the other articles closest to the source title

- [ ] Custom embeddings
      Although OpenAI's embedding model weights cannot be fine-tuned, you can nevertheless use training data to customize embeddings to your application.

      In Customizing_embeddings.ipynb, we provide an example method for customizing your embeddings using training data. The idea of the method is to train a custom matrix to multiply embedding vectors by in order to get new customized embeddings. With good training data, this custom matrix will help emphasize the features relevant to your training labels. You can equivalently consider the matrix multiplication as (a) a modification of the embeddings or (b) a modification of the distance function used to measure the distances between embeddings.

## Constructing Prompts

### Prompt Templates

Prompt Templates are a way to create prompts in a reproducible way. They contain a template string, and a set of input variables. The template string can be formatted with the input variables to generate a prompt. The template string often contains instructions to the language model, a few shot examples, and a question to the language model.

- Prompt Builder / Templates
  https://langchain.readthedocs.io/en/latest/modules/prompts/examples/custom_prompt_template.html

### Example Selectors

If you have a large number of demonstrations, you may need to select which ones to include in the prompt.
https://langchain.readthedocs.io/en/latest/modules/prompts/examples/example_selectors.html

- [ ] Random Selection
      The RandomExampleSelector selects examples randomly. This is useful when you want to include a random sample of examples in the prompt.
- [ ] Similarity Selection
      The SemanticSimilarityExampleSelector selects examples based on which examples are most similar to the inputs. It does this by finding the examples with the embeddings that have the greatest cosine similarity with the inputs.
- [ ] LengthBased Selection
      This ExampleSelector selects which examples to use based on length. This is useful when you are worried about constructing a prompt that will go over the length of the context window. For longer inputs, it will select fewer examples to include, while for shorter inputs it will select more.

#### Advanced Example Selectors

- [ ] Max Marginal Relevance Selection
      The MaxMarginalRelevanceExampleSelector selects examples based on a combination of which examples are most similar to the inputs, while also optimizing for diversity. It does this by finding the examples with the embeddings that have the greatest cosine similarity with the inputs, and then iteratively adding them while penalizing them for closeness to already selected examples.

- [ ] NGram Overlap
      The NGramOverlapExampleSelector selects and orders examples based on which examples are most similar to the input, according to an ngram overlap score. The ngram overlap score is a float between 0.0 and 1.0, inclusive.

### Prompt Serialization

- [ ] Serialize Prompt

  - [ ] To JSON
  - [ ] To YAML

- [ ] Load Prompt
  - [ ] From JSON
  - [ ] From YAML

## Tools

- [ ] Serp api tool
      https://langchain.readthedocs.io/en/latest/reference/modules/serpapi.html
- [ ] REPL
- [ ] BASH
- [ ] SQL?
