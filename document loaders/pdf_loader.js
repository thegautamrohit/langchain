import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.3,
});
const loader = new PDFLoader('./usa_china_geopolitics.pdf');
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