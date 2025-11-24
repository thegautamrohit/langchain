import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableParallel } from "@langchain/core/runnables";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

const characterPrompt = new PromptTemplate({
    template: "Give me the details of the mentioned character: {character}",
    inputVariables: ["character"],
});

const quizzesPrompt = new PromptTemplate({
    template:
        "Give me the 5 quizzes question for the following text: {character}",
    inputVariables: ["character"],
});

const parallelChain = RunnableParallel.from({
    character_description: characterPrompt.pipe(LLM),
    quizzes: quizzesPrompt.pipe(LLM),
});

const finalPrompt = new PromptTemplate({
    template:
        "Give me merged response from the inputs. Put the description and quizzes in a single response. description: {character_description} quizzes: {quizzes}",
    inputVariables: ["character_description", "quizzes"],
});

const finalChain = parallelChain.pipe(finalPrompt).pipe(LLM);

const result = await finalChain.invoke({
    character: "Harry Potter",
});

console.log(result);



//  The above mentioned approach is the ideal way to deal with the parallel calls when the input and prompts are also different for both the prompts.

// But when for quick analysis we can use the following approach using Promise.all()
// Quick parallel calls (not a reusable chain)
const [analysis, summary, keywords] = await Promise.all([
    LLM.invoke("Analyze..."),
    LLM.invoke("Summarize..."),
    LLM.invoke("Extract keywords...")
]);

//  IN above example we are not using the RunnableParallel but we are using the Promise.all() to run the LLM calls in parallel. (for quick analysis not for complicated scaled solutions)


// Also there is an approach of batching to run the LLM calls at once in parallel

// Same prompt on 100 different users
// const userPrompts = users.map(u => `Summarize ${u}`);
// const results = await chain.batch(userPrompts, { maxConcurrency: 5 });