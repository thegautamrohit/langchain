import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

const parser = new StringOutputParser();

const prompt = new PromptTemplate({
    template: "GIve 5 key points about {topic}",
    inputVariables: ["topic"],
});

const chain = prompt.pipe(LLM).pipe(parser);

const result = await chain.invoke({
    topic: "AI",
});

console.log(result);

//  Here we are not creating the prompt via prompt.invoke() method instead we are creating the prompt via prompt.pipe() method.
// Also we are not using the LLM.invoke() method instead we are using the prompt.pipe() method to create a chain of prompts.
//  Using this we can just create a chain of actions using pipe() method and execute it in one go
