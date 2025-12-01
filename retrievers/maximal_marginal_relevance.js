import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import { OllamaEmbeddings } from "@langchain/ollama";

const embedder = new OllamaEmbeddings({
    model: "nomic-embed-text",
});

const docs = [
    new Document({
        pageContent: "Langchain makes it easy to work with LMS.",
        metadata: {
            source: "langchain-docs",
        },
    }),
    new Document({
        pageContent: "Langchain is used to build LLM based applications.",
        metadata: {
            source: "langchain-docs",
        },
    }),
    new Document({
        pageContent:
            "Chroma is used to store and search vector embedddings.",
        metadata: {
            source: "chroma-docs",
        },
    }),
    new Document({
        pageContent:
            "Embeddings are vector representations of text.",
        metadata: {
            source: "embeddings-docs",
        },
    }),
    new Document({
        pageContent:
            "MMR helps you to get diverse results when doing similarity search.",
        metadata: {
            source: "mmr-docs",
        },
    }),
    new Document({
        pageContent:
            "Langchain supports FAISS, Chroma, Pinecone etc",
        metadata: {
            source: "langchain-docs",
        },
    }),
];

// MemoryVectorStore supports MMR and requires no additional dependencies


// A MemoryVectorStore is an in-memory (RAM-based) vector database implementation provided by LangChain.

// It behaves like a normal vector store (with add, similarity search, retriever, etc.) but:

// ❌ Not persisted to disk

// ❌ Not shared between app restarts

// ⚡ Extremely fast

// 💡 Perfect for testing embeddings, RAG prototypes, and small experiments
const vectorStore = await MemoryVectorStore.fromDocuments(docs, embedder);

/**
 * MMR (Maximal Marginal Relevance) explained:
 * 
 * Normal similarity search might return very similar/redundant results.
 * MMR ensures diversity by:
 * 1. First fetching 'fetchK' most similar documents (10 in this case)
 * 2. Then selecting 'k' documents (3) that are:
 *    - Relevant to the query
 *    - Different from each other (diverse)
 * 
 * This prevents getting 3 nearly identical documents about the same topic!
 */
const retriever = vectorStore.asRetriever({
    searchType: "mmr", // Use MMR instead of similarity search
    k: 3,     // Return "n" final diverse results
    lambda: 0,       // relevance-diversity balance. Ranges from 0 to 1. 1 will behave exactly like similarity search.
    // fetchK: 10,        // Fetch 10 candidates first, then select 3 diverse ones
});

const result = await retriever.invoke("What is Langchain?");
result.forEach((doc, i) => {
    console.log(`${i + 1}. ${doc.pageContent}`);
    console.log(`   Source: ${doc.metadata.source}\n`);
});