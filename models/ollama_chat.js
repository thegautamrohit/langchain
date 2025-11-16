import { ChatOllama } from "@langchain/ollama";

// Initialize Ollama with a lightweight local model
const llm = new ChatOllama({
    model: "qwen3:4b", // You already have this model!
    temperature: 0.7,
    // Performance optimizations
    numCtx: 2048, // Reduce context window for faster responses (default is 4096)
    numPredict: 128, // Limit max tokens generated (faster for short responses)
});

const aiMsg = await llm.invoke([
    [
        "system",
        "You are a helpful assistant that translates English to French. Translate the user sentence.",
    ],
    ["human", "I love programming."],
]);

console.log(aiMsg.content);
