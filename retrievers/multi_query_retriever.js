import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Ollama } from "@langchain/ollama";
import { MultiQueryRetriever } from "@langchain/classic/retrievers/multi_query";
const embedder = new OllamaEmbeddings({
    model: "nomic-embed-text",
});

// LLM is required for MultiQueryRetriever to generate alternative queries
const llm = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

const docs = [
    new Document({
        pageContent:
            "Regular walking boosts heart health and can reduce symptoms of depression.",
        metadata: { source: "H1" },
    }),
    new Document({
        pageContent:
            "Consuming leafy greens and fruits helps detox the body and improve longevity.",
        metadata: { source: "H2" },
    }),
    new Document({
        pageContent:
            "Deep sleep is crucial for cellular repair and emotional regulation.",
        metadata: { source: "H3" },
    }),
    new Document({
        pageContent:
            "Mindfulness and controlled breathing lower cortisol and improve mental clarity.",
        metadata: { source: "H4" },
    }),
    new Document({
        pageContent:
            "Drinking sufficient water throughout the day helps maintain metabolism and energy.",
        metadata: { source: "H5" },
    }),
    new Document({
        pageContent:
            "The solar energy system in modern homes helps balance electricity demand.",
        metadata: { source: "I1" },
    }),
    new Document({
        pageContent:
            "Python balances readability with power, making it a popular system design language.",
        metadata: { source: "I2" },
    }),
    new Document({
        pageContent:
            "Photosynthesis enables plants to produce energy by converting sunlight.",
        metadata: { source: "I3" },
    }),
    new Document({
        pageContent:
            "The 2022 FIFA World Cup was held in Qatar and drew global energy and excitement.",
        metadata: { source: "I4" },
    }),
    new Document({
        pageContent:
            "Black holes bend spacetime and store immense gravitational energy.",
        metadata: { source: "I5" },
    }),
];

// Create vector store
const vectorStore = await MemoryVectorStore.fromDocuments(docs, embedder);

// Create base retriever from vector store
const baseRetriever = vectorStore.asRetriever({
    k: 3,
});

/**
 * MultiQueryRetriever explained:
 *
 * Problem: A single query might miss relevant documents due to wording differences.
 *
 * Solution: Use an LLM to generate multiple variations of the user's query, then:
 * 1. Generate 3-5 alternative versions of the original query
 * 2. Run similarity search with each query version
 * 3. Combine and deduplicate the results
 *
 * Example: "How to stay healthy?" might generate:
 * - "What are tips for maintaining good health?"
 * - "Ways to improve physical wellbeing"
 * - "Healthy lifestyle practices"
 */
const multiQueryRetriever = MultiQueryRetriever.fromLLM({
    llm: llm,
    retriever: baseRetriever,
    queryCount: 3, // Generate 3 alternative queries
});

// Test the multi-query retriever
const query = "How to stay healthy and energetic?";
console.log(`🔍 Original query: "${query}"\n`);
console.log(
    "📝 MultiQueryRetriever will generate alternative queries and search with each...\n"
);

const result = await multiQueryRetriever.invoke(query);

console.log(`📚 Retrieved ${result.length} unique documents:\n`);
result.forEach((doc, i) => {
    console.log(`${i + 1}. ${doc.pageContent}`);
    console.log(`   Source: ${doc.metadata.source}\n`);
});
