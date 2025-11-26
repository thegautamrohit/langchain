import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
    RunnableSequence,
    RunnableBranch,
    RunnableLambda,
    RunnablePassthrough,
} from "@langchain/core/runnables";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

const classifyPrompt = new PromptTemplate({
    template:
        "Is this about tech or health? Answer with 'tech' or 'health' only: {topic}",
    inputVariables: ["topic"],
});

const classifyChain = RunnableSequence.from([
    classifyPrompt,
    LLM,
    new StringOutputParser(),
]);

const techPrompt = new PromptTemplate({
    template: "Give me a tech related post about {topic}",
    inputVariables: ["topic"],
});

const healthPrompt = new PromptTemplate({
    template: "Give me a health related insight about {topic}",
    inputVariables: ["topic"],
});

const techChain = RunnableSequence.from([
    techPrompt,
    LLM,
    new StringOutputParser(),
]);
const healthChain = RunnableSequence.from([
    healthPrompt,
    LLM,
    new StringOutputParser(),
]);

const branchedChain = RunnableBranch.from([
    [(input) => input.category === "tech", techChain],
    [(input) => input.category === "health", healthChain],
    (input) => `No idea about ${JSON.stringify(input)}`,
]);

// Use RunnablePassthrough.assign to add the category field to the original input
const finalChain = RunnableSequence.from([
    RunnablePassthrough.assign({
        category: RunnableSequence.from([
            classifyChain,
            (output) => output.trim().toLowerCase(),
        ]),
    }),
    branchedChain,
]);

const result = await finalChain.invoke({
    topic: "Cold",
});

console.log(result);
