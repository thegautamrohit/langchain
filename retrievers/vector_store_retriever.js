import { Chroma } from "@langchain/community/vectorstores/chroma";
import { Document } from "@langchain/core/documents";
import { OllamaEmbeddings } from "@langchain/ollama";

const embedder = new OllamaEmbeddings({
    model: "nomic-embed-text",
});

const docs = [
    new Document({
        pageContent: "Langchain helps developers build LLM applications easily.",
        metadata: {
            source: "langchain-docs",
        },
    }),
    new Document({
        pageContent: "Chroma is a vector database opttimised for LLM based search.",
        metadata: {
            source: "chroma-docs",
        },
    }),
    new Document({
        pageContent: "Embeddings convert text into high dimensional vectors.",
        metadata: {
            source: "embeddings-docs",
        },
    }),
    new Document({
        pageContent: "OpenAI provides powerful embedding models ",
        metadata: {
            source: "openai-docs",
        },
    }),
    new Document({
        pageContent: "Langchain gives support in JS and python.",
        metadata: {
            source: "langchain-docs",
        },
    }),
]

const chromaVectorStore = new Chroma(embedder, {
    collectionName: "langchain-docs",
    url: "http://localhost:8000",
})

await chromaVectorStore.addDocuments(docs)
console.log("Documents added to Chroma successfully!")

const retriever = chromaVectorStore.asRetriever({
    k: 2,
})
const result = await retriever.invoke("What is Chroma used for?")
console.log(result)


// Currently, in this implementation it may seem like that this is exactly the same as the vector store search and get functionality where we used
// vectorstore.similaritySearch and vectorstore.similaritySearchWithScore. But the difference is that here we are using the Chroma retriever to retrieve the documents.
// This is different that that because first of all it is a runnable , so it can be chaine with any pipelines for retrieval and 
// most importantly, here we are just using the basic level of searching. In upcoming examples, we will see how we can use this to perform more complex search techniques through this.