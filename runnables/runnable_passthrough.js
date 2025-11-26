import { Ollama } from "@langchain/ollama";
import {
  RunnableParallel,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";

const LLM = new Ollama({
  model: "qwen2.5:1.5b",
  temperature: 0.7,
});

const jokePrompt = new PromptTemplate({
  template: "Give me a joke about {topic}",
  inputVariables: ["topic"],
});

const explainPrompt = new PromptTemplate({
  template: "Explain the following joke: {joke}",
  inputVariables: ["joke"],
});

const jokeGeneratorSequence = jokePrompt.pipe(LLM)

const parallelJokeChain = RunnableParallel.from({
  joke: new RunnablePassthrough(),
  explanation: explainPrompt.pipe(LLM),
})

const finalJokeChain = RunnableSequence.from ([
  jokeGeneratorSequence,
  (joke) => ({ joke }),
  parallelJokeChain,  
])

const result = await finalJokeChain.invoke({
  topic: "Women's Fashion",
});

console.log(result);