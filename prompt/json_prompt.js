import { Ollama } from "@langchain/ollama";
import fs from "fs"
import { load } from "@langchain/core/load";

// Read the JSON file content and pass it to load
const jsonString = fs.readFileSync('./template.json', 'utf-8');
const loadedPrompt = await load(jsonString);

// console.log('Loaded prompt:', loadedPrompt);

const resultantPrompt = await loadedPrompt.invoke({
    topic: "AI startups",
});

const LLM = new Ollama({
    model: "qwen3:4b",
    temperature: 0.7,
});

const response = await LLM.invoke(resultantPrompt);

console.log(response);    