import { Ollama } from "@langchain/ollama";
import 'dotenv/config';

const LLM = new Ollama({
    model: "qwen3:4b",
    temperature: 0.7,
})

const prompt = `
Explain pythagoras theorem in simple terms.
`;

const response = await LLM.invoke(prompt);
// console.log(response);