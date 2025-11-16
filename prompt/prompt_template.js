import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import 'dotenv/config';

const LLM = new Ollama({
    model: "qwen3:4b",
    temperature: 0.7,
});

// Create a prompt template with a variable and instructions to avoid thinking
const promptTemplate = PromptTemplate.fromTemplate(
    "Explain {userInput} in simple terms. Provide only the explanation without showing your thinking process."
);

// Create a chain by piping the prompt to the LLM
const chain = promptTemplate.pipe(LLM);

const userInput = 'pythagoras theorem';

// Invoke the chain with the variable values
const response = await chain.invoke({
    userInput: userInput,
});

console.log(response);