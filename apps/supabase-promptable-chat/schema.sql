--Enable Vector extension 
create extension vector;

--create table to store docs and embeddings
create table documents (
  id bigserial primary key,
  content text,
  embedding vector (1536)
);

--perform similarity search over embeddings
create or replace function match_documents (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    id,
    content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > similarity_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

--Speed up queries by adding an index
create index on documents 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);