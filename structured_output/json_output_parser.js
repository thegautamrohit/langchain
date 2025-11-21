import { Ollama } from "@langchain/ollama";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});
const parser = new JsonOutputParser();

const promptTemplate = new PromptTemplate({
    template: "Give me name, age and city of a any character. {format_instructions}",
    inputVariables: [],
    partialVariables: {
        format_instructions: parser.getFormatInstructions(),
    },
});

const chain = promptTemplate.pipe(LLM).pipe(parser);

const result = await chain.invoke({});

console.log("Result:");
console.log(result);

// Kuch khass kaam smjh nhi aaya h iska , for better handling use structured output parser with ZOD
// Breaks while JSON parsing
// Use it with zode schema and structured output parser instead of json output parser
