import fs from "fs"
import { PromptTemplate } from "@langchain/core/prompts";

const promptString = `
You are a viral tweet generator.

Write a viral tweet about {topic} in under 100 words.
`;

const jsonPrompt = new PromptTemplate({
    template: promptString,
    inputVariables: ['topic'],
    validateTemplate: true,
});

// Convert to JSON
const jsonData = jsonPrompt.toJSON();

// Write to file
fs.writeFileSync('./template.json', JSON.stringify(jsonData, null, 2));