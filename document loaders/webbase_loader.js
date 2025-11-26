import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
// import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { StringOutputParser } from "@langchain/core/output_parsers";
// import { WebBaseLoader } from "@langchain/community/document_loaders/web/web_base"; Doesnot work with JS
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"; // JS Alternative from langchain itself


const LLM = new Ollama({
    model: "qwen2.5:1.5b",
    temperature: 0.7,
});

const parser = new StringOutputParser();
// const loader = YoutubeLoader.createFromUrl("https://youtu.be/bZQun8Y4L2A", {
//     language: "en",
//     addVideoInfo: true,
// });
// const docs = await loader.load();
// console.log(docs)

const webLoader = new CheerioWebBaseLoader(
    "https://www.gsmarena.com/samsung_galaxy_s25-13610.php"
);

const docs2 = await webLoader.load();
// console.log(docs2);

const prompt = new PromptTemplate({
    template: "Write a list of pointers of the features fo the device mentioned on the website {text}",
    inputVariables: ["text"],
});

const chain = prompt.pipe(LLM).pipe(parser);

const result = await chain.invoke({
    text: docs2[0]?.pageContent,
});

console.log(result);
