import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";

const wiki = new WikipediaQueryRun({
  topKResults: 2, // How many no of documents to return
  maxDocContentLength: 4000, // Maximum length of the document content
});


const query = 'How piezoelectric crystals work ?'

const result = await wiki.invoke(query);
console.log(result);


// At first, it may seem like it is a ddocument loader, but it is not. It is a retriever. It is used to retrieve the documents from the Wikipedia.
// It is picking the keywords from the query and using a logical search from wikipedia API to get the documents. Unlike in
// Document loader we just load the content directly from the URL