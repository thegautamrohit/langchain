import { Ollama } from "@langchain/ollama";
import {
    HumanMessage,
    SystemMessage,
    AIMessage,
} from "@langchain/core/messages";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";

const chat_history = [
    new HumanMessage("Which number is greater 10 or 20?"),
    new AIMessage("20 is greater than 10."),
];

const LLM = new Ollama({
    model: "qwen3:4b",
    temperature: 0.7,
});

// Look how the syntax is different from the chatbot.js file. Here we are using the MessagesPlaceholder to insert the chat history dynamically.
// And the system and human message are passed as strings instead of objects.
const chatTemplate = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant that can answer questions and help with tasks."],
    new MessagesPlaceholder("chat_history"), // This is a placeholder for the chat history for dynamic insertion of messages
    ["human", "{userInput}"],
]);

const chain = chatTemplate.pipe(LLM);

const response = await chain.invoke({
    userInput: "Multiply the greater no by 2.",
    chat_history: chat_history, // This way we can insert the previous records of chats for context from our DB
});

console.log(response);
