import { Chroma } from "@langchain/community/vectorstores/chroma";
import { Document } from "@langchain/core/documents";
import { OllamaEmbeddings } from "@langchain/ollama";
import { ChromaClient } from "chromadb";

const embedder = new OllamaEmbeddings({
    model: "nomic-embed-text",
});

const collectionName = "players";
const docs = [
    new Document({
        pageContent:
            "Virat Kohli is one of the most successful and consistent batsmen in IPL history. Known for his aggressive batting style and leadership.",
        metadata: { team: "Royal Challengers Bangalore" },
    }),

    new Document({
        pageContent:
            "Rohit Sharma is the most successful captain in IPL history, leading Mumbai Indians to five titles. He's known for his calm leadership and explosive batting.",
        metadata: { team: "Mumbai Indians" },
    }),

    new Document({
        pageContent:
            "MS Dhoni, famously known as Captain Cool, has led Chennai Super Kings to multiple IPL titles. His finishing skills, wicketkeeping, and leadership are legendary.",
        metadata: { team: "Chennai Super Kings" },
    }),

    new Document({
        pageContent:
            "Jasprit Bumrah is considered one of the best fast bowlers in T20 cricket. Playing for Mumbai Indians, he is known for his yorkers and death bowling skills.",
        metadata: { team: "Mumbai Indians" },
    }),

    new Document({
        pageContent:
            "Ravindra Jadeja is a dynamic all-rounder who contributes with both bat and ball. Representing Chennai Super Kings, his quick fielding and finishing ability make him vital.",
        metadata: { team: "Chennai Super Kings" },
    }),
];

// Create Chroma vector store - note: embeddings is the FIRST parameter
const chromaVectorStore = new Chroma(embedder, {
    collectionName,
    url: "http://localhost:8000", // Chroma server URL
});

// Add documents to the vector store (only run once!)
await chromaVectorStore.addDocuments(docs);
console.log("✅ Documents added to Chroma successfully!\n");

async function search(query, similarItems) {
    const results = await chromaVectorStore.similaritySearch(query, similarItems);
    const scores = await chromaVectorStore.similaritySearchWithScore(
        query,
        similarItems
    ); // This will return the score of the similarity search. Also, we can filter  the basis of the metaData using this method.
    console.log(`\n🔍 Searching for '${query}':`, scores);
    results.forEach((doc, i) => {
        console.log(`\n${i + 1}. ${doc.pageContent.substring(0, 80)}...`);
    });
}
// Get all documents using the underlying ChromaDB client
const client = new ChromaClient({ path: "http://localhost:8000" });
const collection = await client.getCollection({ name: collectionName });

// Get all documents from the collection
const allData = await collection.get({
    limit: 100, // Adjust based on how many docs you have
    include: ["documents", "metadatas", "embeddings"],
});

// console.log(`📚 Total documents in collection: ${allData.ids.length}\n`);

// // Display all documents
allData.ids.forEach((id, i) => {
    console.log(`\n${i + 1}. ID: ${id}`);
    console.log(`   Content: ${allData.documents[i]}`);
    console.log(`   Metadata:`, allData.metadatas[i]);
    console.log(
        `   Embedding dimensions: ${allData.embeddings[i]?.length || "N/A"}`
    );
    console.log("   " + "-".repeat(80));
});

search("chennai super kings", 2);

async function updateDoc(docId, newDocument) {
    try {
        // Delete the old document
        await chromaVectorStore.delete({ ids: [docId] });

        // Add the new document with the same ID
        await chromaVectorStore.addDocuments([newDocument], { ids: [docId] });

        console.log(`Document ${docId} updated via delete + add!`);
    } catch (error) {
        console.error(`Error updating document ${docId}:`, error);
        throw error;
    }
}

const updatedDoc = new Document({
    pageContent:
        "Virat Kohli retired from international test cricket",
    metadata: { team: "Royal Challengers Bangalore" },
});

await updateDoc("94e1f7e0-ccfb-11f0-9880-6943fcc4f336", updatedDoc);

// // Verify the update
console.log("\n📖 Updated document:");
const updatedData = await collection.get({
    ids: ["94e1f7e0-ccfb-11f0-9880-6943fcc4f336"],
    include: ["documents", "metadatas"],
});
console.log(`Content: ${updatedData.documents[0]}`);
console.log(`Metadata:`, updatedData.metadatas[0]);
