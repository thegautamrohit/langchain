import { Ollama } from "@langchain/ollama";
import readline from 'readline';
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to get user input
function getUserInput(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

const chatHistory = [];

// Appending the messages to chat history array like this is goog initially but not scalable because when the quantum is high
// then the LL will be confused on which message is LLM's response and which is the user's message.

// async function initChatbot() {
//     console.log("Chatbot started! Type 'exit' to quit.\n");

//     while (true) {
//         const userInput = await getUserInput("You: ");
//         chatHistory.push(userInput);
//         if (userInput.toLowerCase() === "exit") {
//             console.log("Goodbye!");
//             rl.close();
//             break;
//         }

//         const response = await LLM.invoke(chatHistory);
//         console.log("Chatbot:", response);
//         chatHistory.push(response);
//         console.log("Chat history:", chatHistory);
//         console.log(); // Empty line for readability
//     }
// }


// OPTIMISE VERSION OF CHATBOT

const chatContext = [
    new SystemMessage("You are a helpful assistant that can answer questions and help with tasks."),
]

async function initChatbot() {
    console.log("Chatbot started! Type 'exit' to quit.\n");

    while (true) {
        const userInput = await getUserInput("You: ");
        chatContext.push(new HumanMessage(userInput));
        if (userInput.toLowerCase() === "exit") {
            console.log("Goodbye!");
            rl.close();
            break;
        }

        const response = await LLM.invoke(chatContext);
        console.log("Chatbot:", response);
        chatContext.push(new AIMessage(response));
        console.log("Chat history:", chatContext);
        console.log(); // Empty line for readability
    }
}

initChatbot();