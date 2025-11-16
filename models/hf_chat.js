import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HuggingFaceTransformers } from "@langchain/community/llms/huggingface";

const model = new HuggingFaceTransformers({
  modelName: "sshleifer/distilbart-cnn-6-6",  // small, fast summarizer
});

const prompt = ChatPromptTemplate.fromTemplate(
  "Summarize the following text:\n\n{text}\n\nSummary:"
);

const chain = prompt.pipe(model);


// Example text to summarize
const textToSummarize = `
The theory of relativity, developed by Albert Einstein, revolutionized our understanding 
of space, time, and gravity. Special relativity, published in 1905, introduced the concept 
that the laws of physics are the same for all non-accelerating observers, and showed that 
the speed of light is constant regardless of the observer's motion. General relativity, 
completed in 1915, extended this to include gravity, describing it not as a force but as 
a curvature of spacetime caused by mass and energy. These theories have been confirmed by 
numerous experiments and observations, and form the foundation of modern physics and cosmology.
`;

console.log("Summarizing text...\n");

const summary = await chain.invoke({
    text: textToSummarize.trim()
});

console.log("Summary:", summary);
console.log("\n✅ Done!");