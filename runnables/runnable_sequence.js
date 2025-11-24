import { Ollama } from "@langchain/ollama";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

const prompt = new PromptTemplate({
    template: "Give me the details of the mentioned character: {character}",
    inputVariables: ["character"],
});

const chain = RunnableSequence.from([prompt, LLM])

// const chain = prompt.pipe(LLM)
const result = await chain.invoke({
    character: "Aragorn",
});

console.log(result);