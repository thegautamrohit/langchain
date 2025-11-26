import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { TextLoader } from '@langchain/classic/document_loaders/fs/text';
import { StringOutputParser } from "@langchain/core/output_parsers";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.3,
});

const loader = new TextLoader('./semiconductor.txt', { encoding: 'utf-8' });
const docs = await loader.load();
const docData = docs[0]?.pageContent

const prompt = new PromptTemplate({
    template: 'Write a summary for this under 50 words: {text} and keep it concise',
    inputVariables: ['text'],
})

const parser = new StringOutputParser()

const chain = prompt.pipe(LLM).pipe(parser)

const result = await chain.invoke({
    text: docData,
})

console.log(result);



