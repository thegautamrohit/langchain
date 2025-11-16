import { Ollama } from "@langchain/ollama";
import fs from "fs"
import { load } from "@langchain/core/load";


const LLM = new Ollama({
    model: "qwen3:4b",
    temperature: 0.7,
});

const jsonString = fs.readFileSync("./template.json", "utf-8");
const loadedPrompt = await load(jsonString);

const chain = loadedPrompt.pipe(LLM)

const response = await chain.invoke({
    topic: "Men's Fashion"
});

console.log(response);

// This approach prevents the need to invoke the prompt separately and then the LLM separately
//  We can create the chain usig pipe() method and then invoke the chain with the input variables