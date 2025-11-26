import { DirectoryLoader } from "@langchain/classic/document_loaders/fs/directory";
import {
    JSONLoader,
} from "@langchain/classic/document_loaders/fs/json";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


const loader = new DirectoryLoader(
    "./assets",
    {
        ".json": (path) => new JSONLoader(path, "/colors"),
        ".pdf": (path) => new PDFLoader(path),
        ".docx": (path) => new DocxLoader(path),
    }
);

const docs = await loader.load();
console.log(docs);
console.log(docs.length);

for (const doc of docs) {
    console.log(doc.metadata);
}