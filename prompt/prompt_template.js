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


const prompt = await promptTemplate.invoke({
    userInput: 'pythagoras theorem',
});

console.log(prompt);

const response = await LLM.invoke(prompt);

console.log(response);

// This is how we can use the prompt template to generate a prompt for the LLM
// The prompt can have multiple variables and we can invoke the prompt template to generate a prompt for the LLM
// Creating the prompt template is a good way to avoid hardcoding the prompt in the code and it also provides a better way
// to manage and safe check the prompt for execution