import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableLambda } from "@langchain/core/runnables";

const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

const promptTemplate = new PromptTemplate({
    template: "Explain {userInput} in simple terms.",
    inputVariables: ["userInput"],
});

const promptTemplate2 = new PromptTemplate({
    template: "Give me the summary of the following text: {description}",
    inputVariables: ["description"],
});

// const finalPrompt = await promptTemplate.invoke({
//     userInput: "Black hole",
// });

// const response = await LLM.invoke(finalPrompt);

// const finalPrompt2 = await promptTemplate2.invoke({
//     text: response,
// });

// const response2 = await LLM.invoke(finalPrompt2);
// console.log(response);
// console.log("-----------------------------------------");
// console.log(response2);

//  See how we have to pass the response of the first LLM to the second LLM as a string.
// In order to do this seamlessly, we have to use the StringOutputParser.

const parser = new StringOutputParser();

// This is a way to convert the output of the first LLM to a text object that can be passed to the second LLM.
const toTextObject = new RunnableLambda({
    func: (output) => ({ description: output }),
  });
  

const chain = promptTemplate
    .pipe(LLM)
    .pipe(parser)
    .pipe(toTextObject)
    .pipe(promptTemplate2)
    .pipe(LLM)
    .pipe(parser);

const response3 = await chain.invoke({
    userInput: "Black hole",
});

console.log(response3);
