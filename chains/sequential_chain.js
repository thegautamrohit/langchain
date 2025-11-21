import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableLambda } from "@langchain/core/runnables";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.3,
});

const parser = new StringOutputParser();

const prompt1 = new PromptTemplate({
    template: "Give me the details of the mentioned character: {character}",
    inputVariables: ["character"],
});

const prompt2 = new PromptTemplate({
    template: "Give 5 key points about the following text: {text}",
    inputVariables: ["text"],
});

const toTextObject = new RunnableLambda({
    func: (output) => ({ text: output }),
});

const chain = prompt1
    .pipe(LLM)
    .pipe(parser) // can be omitted
    .pipe(toTextObject) // this will pass the output of the first LLM to the second LLM as a text object
    .pipe(prompt2)
    .pipe(LLM)
    .pipe(parser); // same here

const result = await chain.invoke({
    character: "Harry Potter",
});

console.log(result);

//  This is a sequential chain. We are using the pipe() method to create a chain of prompts and LLMs.
// Instead of invoking the LLM with prompt1 and then passing the response to prompt2, we are using the pipe() method to create a chain of prompts and LLMs.
