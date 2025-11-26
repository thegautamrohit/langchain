import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnableLambda, RunnableParallel, Runnable, RunnablePassthrough } from "@langchain/core/runnables";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

const genrateJokePrompt = new PromptTemplate({
    template: "Give me a joke about {topic}",
    inputVariables: ["topic"],
})

const countWords = (input) => {
    return input.split(" ").length
}

const countLambda = RunnableLambda.from(countWords)

const generateJoke = RunnableSequence.from([
    genrateJokePrompt, LLM
])

const parallelChain = RunnableParallel.from({
    joke: new RunnablePassthrough(),
    wordCount: countLambda,
})

const resultantChain = RunnableSequence.from([generateJoke, parallelChain])

const result = await resultantChain.invoke({
    topic: "Bodybuilding"
})

console.log(result);