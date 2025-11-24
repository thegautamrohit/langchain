import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableParallel, RunnableSequence } from "@langchain/core/runnables";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

const tweetPrompt = new PromptTemplate({
    template: "Give me a viral tweet about {topic}",
    inputVariables: ["topic"],
});

const linkedInPrompt = new PromptTemplate({
    template: "Give me a LinkedIn post about {topic}",
    inputVariables: ["topic"],
})

// const parallelChain = RunnableParallel.from({
//     tweet: tweetPrompt.pipe(LLM),
//     linkedIn: linkedInPrompt.pipe(LLM),
// })

const parallelChain = RunnableParallel.from({
    tweet: RunnableSequence.from([tweetPrompt, LLM]),
    linkedIn: RunnableSequence.from([linkedInPrompt, LLM])
})

const result = await parallelChain.invoke({
    topic: "AI",
});

console.log(result);