# LangChain Learning Repository 🚀

A comprehensive collection of LangChain.js examples demonstrating various concepts, patterns, and implementations for building LLM-powered applications.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
  - [Models](#models)
  - [Prompts](#prompts)
  - [Chains](#chains)
  - [Runnables](#runnables)
  - [Document Loaders](#document-loaders)
  - [Text Splitters](#text-splitters)
  - [Vector Stores](#vector-stores)
  - [Retrievers](#retrievers)
  - [Structured Output](#structured-output)
- [Examples & Usage](#examples--usage)
- [Key Learnings](#key-learnings)

---

## 🎯 Overview

This repository contains practical examples and implementations covering the entire LangChain.js ecosystem. Each module is designed to demonstrate specific concepts with real-world use cases, from basic prompt engineering to advanced RAG (Retrieval-Augmented Generation) systems.

**Tech Stack:**

- **LangChain.js** - Framework for LLM applications
- **Ollama** - Local LLM inference (qwen2.5, qwen3)
- **HuggingFace** - Transformer models
- **ChromaDB** - Vector database for embeddings
- **Zod** - Schema validation for structured outputs

---

## ✅ Prerequisites

Before running the examples, ensure you have:

- **Node.js** (v18 or higher)
- **Ollama** installed with models:
  - `qwen2.5:1.5b`
  - `qwen3:4b`
  - `nomic-embed-text` (for embeddings)
- **ChromaDB** server running on `http://localhost:8000` (for vector store examples)

---

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd langchain

# Install dependencies
npm install

# Create .env file (if needed)
touch .env
```

---

## 📁 Project Structure

```
langchain/
├── models/                      # LLM model configurations
│   ├── hf_chat.js              # HuggingFace transformer models
│   └── ollama_chat.js          # Ollama local LLM setup
│
├── prompt/                      # Prompt engineering patterns
│   ├── basic_prompt.js         # Simple string prompts
│   ├── prompt_template.js      # Template-based prompts with variables
│   ├── chatbot.js              # Conversational chat with history
│   ├── json_prompt.js          # Loading prompts from JSON files
│   ├── chained_prompt.js       # Chaining prompts with pipe()
│   ├── message_placeholder.js  # Dynamic chat history insertion
│   └── prompt_generator.js     # Saving prompts to JSON files
│
├── chains/                      # Chain patterns
│   ├── simple_chain.js         # Basic prompt → LLM → output chain
│   ├── sequential_chain.js     # Multi-step sequential processing
│   └── parallel_chain.js       # Parallel chain execution
│
├── runnables/                   # Advanced runnable patterns
│   ├── runnable_sequence.js    # Sequential execution with RunnableSequence
│   ├── runnable_parallel.js    # Parallel execution patterns
│   ├── runnable_lambda.js      # Custom transformation functions
│   ├── runnable_branch.js      # Conditional branching logic
│   └── runnable_passthrough.js # Passing data through chains
│
├── document loaders/            # Loading data from various sources
│   ├── text_loader.js          # Load .txt files
│   ├── pdf_loader.js           # Load PDF documents
│   ├── webbase_loader.js       # Scrape web content with Cheerio
│   ├── directory_loader.js     # Batch load multiple file types
│   └── assets/                 # Sample documents
│       ├── colors.json
│       ├── prompt chaining.pdf
│       └── websockets.docx
│
├── text_splitters/              # Text chunking strategies
│   ├── length_split.js         # Character & recursive text splitting
│   └── document_structure_split.js  # Language-aware code splitting
│
├── vector stores/               # Vector database implementations
│   └── index.js                # ChromaDB integration with CRUD operations
│
├── retrievers/                  # Document retrieval strategies
│   ├── vector_store_retriever.js    # Basic similarity search retrieval
│   ├── wikipedia_retriever.js       # Wikipedia API-based retrieval
│   ├── multi_query_retriever.js     # Generate multiple query variations
│   └── maximal_marginal_relevance.js # MMR for diverse results
│
├── structured_output/           # Parsing and validating LLM outputs
│   ├── json_output_parser.js   # Basic JSON parsing
│   ├── json_schema.js          # Zod schema for structured extraction
│   └── string_output_parser.js # String output handling
│
└── package.json                # Project dependencies
```

---

## 🧠 Core Concepts

### Models

**Location:** `models/`

Learn how to initialize and configure different LLM providers:

- **Ollama Chat** (`ollama_chat.js`)

  - Local LLM inference with Ollama
  - Model: `qwen3:4b`
  - Example: English → French translation

- **HuggingFace Transformers** (`hf_chat.js`)
  - Using HuggingFace models locally
  - Model: `sshleifer/distilbart-cnn-6-6`
  - Example: Text summarization

**Key Takeaway:** Start with lightweight local models for rapid prototyping and testing.

---

### Prompts

**Location:** `prompt/`

Master the art of prompt engineering with various patterns:

#### Basic Prompt (`basic_prompt.js`)

Simple hardcoded string prompts - quick but not scalable.

#### Prompt Templates (`prompt_template.js`)

```javascript
const prompt = new PromptTemplate({
  template: "Explain {userInput} in simple terms.",
  inputVariables: ["userInput"],
  validateTemplate: true,
});
```

✅ **Benefits:** Type safety, reusability, validation

#### Chatbot with History (`chatbot.js`)

Implements conversational memory using:

- `SystemMessage` - Set bot behavior
- `HumanMessage` - User inputs
- `AIMessage` - Bot responses

**Best Practice:** Use typed message classes instead of string arrays for clarity.

#### Message Placeholder (`message_placeholder.js`)

Dynamic chat history insertion:

```javascript
ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant"],
  new MessagesPlaceholder("chat_history"),
  ["human", "{userInput}"],
]);
```

#### JSON Prompts (`json_prompt.js`, `prompt_generator.js`)

- **Save:** Export prompts to JSON for version control
- **Load:** Import prompts using `@langchain/core/load`

---

### Chains

**Location:** `chains/`

Chains allow you to combine multiple steps into a single execution flow.

#### Simple Chain (`simple_chain.js`)

```javascript
const chain = prompt.pipe(LLM).pipe(parser);
const result = await chain.invoke({ topic: "AI" });
```

#### Sequential Chain (`sequential_chain.js`)

Multi-step processing where output of one step feeds into the next:

```
Prompt1 → LLM → Parser → Transform → Prompt2 → LLM → Parser
```

**Use Case:** Get character description → Summarize description

#### Parallel Chain (`parallel_chain.js`)

Execute multiple LLM calls simultaneously:

```javascript
const parallelChain = RunnableParallel.from({
  character_description: prompt1.pipe(LLM),
  quizzes: prompt2.pipe(LLM),
});
```

**When to use:**

- ✅ Different prompts, same input
- ✅ Independent operations
- ⚠️ For quick analysis, use `Promise.all()`

---

### Runnables

**Location:** `runnables/`

Advanced execution patterns for complex workflows.

#### RunnableSequence (`runnable_sequence.js`)

Explicit sequential execution:

```javascript
const chain = RunnableSequence.from([prompt, LLM]);
```

Equivalent to: `prompt.pipe(LLM)`

#### RunnableParallel (`runnable_parallel.js`)

Parallel execution with named outputs:

```javascript
RunnableParallel.from({
  tweet: tweetPrompt.pipe(LLM),
  linkedIn: linkedInPrompt.pipe(LLM),
});
```

#### RunnableLambda (`runnable_lambda.js`)

Custom transformation functions:

```javascript
const countWords = RunnableLambda.from((input) => input.split(" ").length);
```

#### RunnableBranch (`runnable_branch.js`)

Conditional logic in chains:

```javascript
RunnableBranch.from([
  [(input) => input.category === "tech", techChain],
  [(input) => input.category === "health", healthChain],
  (input) => `No idea about ${input}`,
]);
```

#### RunnablePassthrough (`runnable_passthrough.js`)

Preserve input while adding new fields:

```javascript
RunnablePassthrough.assign({
  category: classifyChain,
});
```

---

### Document Loaders

**Location:** `document loaders/`

Load and process documents from various sources.

#### Text Loader (`text_loader.js`)

```javascript
const loader = new TextLoader("./file.txt", { encoding: "utf-8" });
const docs = await loader.load();
```

#### PDF Loader (`pdf_loader.js`)

```javascript
const loader = new PDFLoader("./document.pdf");
const docs = await loader.load();
```

#### Web Scraper (`webbase_loader.js`)

```javascript
const loader = new CheerioWebBaseLoader("https://example.com");
const docs = await loader.load();
```

#### Directory Loader (`directory_loader.js`)

Batch load multiple file types:

```javascript
const loader = new DirectoryLoader("./assets", {
  ".json": (path) => new JSONLoader(path, "/colors"),
  ".pdf": (path) => new PDFLoader(path),
  ".docx": (path) => new DocxLoader(path),
});
```

**Pro Tip:** Directory loader is perfect for RAG systems with mixed file types.

---

### Text Splitters

**Location:** `text_splitters/`

Split large documents into manageable chunks for LLM processing.

#### Character & Recursive Splitters (`length_split.js`)

```javascript
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 20, // Maintains context between chunks
});
```

**chunkOverlap:** Ensures important information at chunk boundaries isn't lost.

#### Language-Aware Splitting (`document_structure_split.js`)

```javascript
const jsSplitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
  chunkSize: 100,
  chunkOverlap: 20,
});
```

Splits code intelligently by respecting:

- Function boundaries
- Class definitions
- Code structure

**Supported languages:** JavaScript, Python, Markdown, and more.

---

### Vector Stores

**Location:** `vector stores/`

Store and search text embeddings using ChromaDB.

#### Features Demonstrated (`index.js`):

**1. Creating Vector Store**

```javascript
const vectorStore = new Chroma(embedder, {
  collectionName: "players",
  url: "http://localhost:8000",
});
```

**2. Adding Documents**

```javascript
await vectorStore.addDocuments(docs);
```

**3. Similarity Search**

```javascript
const results = await vectorStore.similaritySearch(query, k);
const scores = await vectorStore.similaritySearchWithScore(query, k);
```

**4. CRUD Operations**

- **Read:** `collection.get()`
- **Update:** Delete old + Add new with same ID
- **Delete:** `vectorStore.delete({ ids: [...] })`

**5. Metadata Filtering**
Filter results by metadata fields during search.

---

### Retrievers

**Location:** `retrievers/`

Advanced retrieval strategies for better search results.

#### Vector Store Retriever (`vector_store_retriever.js`)

Convert vector store to a runnable retriever:

```javascript
const retriever = vectorStore.asRetriever({ k: 2 });
const results = await retriever.invoke(query);
```

**Why use retrievers?**

- ✅ Runnable interface (chainable with `.pipe()`)
- ✅ Enables advanced retrieval techniques

#### Wikipedia Retriever (`wikipedia_retriever.js`)

```javascript
const wiki = new WikipediaQueryRun({
  topKResults: 2,
  maxDocContentLength: 4000,
});
const result = await wiki.invoke("piezoelectric crystals");
```

**Note:** This is a retriever, not a document loader. It performs intelligent keyword extraction and API search.

#### Multi Query Retriever (`multi_query_retriever.js`)

Generates multiple query variations to improve recall:

**How it works:**

1. LLM generates 3-5 alternative phrasings of the query
2. Runs similarity search for each variation
3. Combines and deduplicates results

```javascript
const multiQueryRetriever = MultiQueryRetriever.fromLLM({
  llm: llm,
  retriever: baseRetriever,
  queryCount: 3,
});
```

**Example:**

- Original: "How to stay healthy?"
- Generated:
  - "What are tips for maintaining good health?"
  - "Ways to improve physical wellbeing"
  - "Healthy lifestyle practices"

#### Maximal Marginal Relevance (`maximal_marginal_relevance.js`)

Ensures diversity in search results:

```javascript
const retriever = vectorStore.asRetriever({
  searchType: "mmr",
  k: 3, // Final diverse results
  lambda: 0, // 0 = max diversity, 1 = max relevance
  fetchK: 10, // Initial candidates
});
```

**Problem:** Normal search returns redundant similar documents
**Solution:** MMR balances relevance and diversity

**How it works:**

1. Fetch top 10 most similar documents
2. Select 3 that are:
   - Relevant to query
   - Different from each other

---

### Structured Output

**Location:** `structured_output/`

Parse and validate LLM outputs into structured formats.

#### String Output Parser (`string_output_parser.js`)

Convert LLM output to plain string for chaining:

```javascript
const parser = new StringOutputParser();
const chain = prompt.pipe(LLM).pipe(parser);
```

**Use Case:** Sequential chains where next prompt needs string input.

#### JSON Output Parser (`json_output_parser.js`)

Attempts to parse LLM output as JSON:

```javascript
const parser = new JsonOutputParser();
const prompt = new PromptTemplate({
  template: "Give me name, age and city. {format_instructions}",
  partialVariables: {
    format_instructions: parser.getFormatInstructions(),
  },
});
```

⚠️ **Limitation:** Often breaks during JSON parsing. Use Zod schema instead.

#### Zod Schema Validation (`json_schema.js`)

**Best approach for structured outputs:**

```javascript
const phoneReviewSchema = z.object({
  phoneName: z.string(),
  manufacturer: z.string(),
  display: z.object({
    size: z.string(),
    type: z.string(),
    // ... more fields
  }),
});

const structuredLLM = LLM.withStructuredOutput(phoneReviewSchema);
const data = await structuredLLM.invoke(prompt);
```

**Features:**

- ✅ Type-safe extraction
- ✅ Nested object support
- ✅ Array handling
- ✅ Field descriptions for better LLM understanding

⚠️ **Note:** `withStructuredOutput()` requires OpenAI or Anthropic. Ollama doesn't support this method.

---

## 💡 Examples & Usage

### Running Individual Examples

```bash
# Basic prompt example
node prompt/basic_prompt.js

# Sequential chain
node chains/sequential_chain.js

# RAG with vector store
node retrievers/vector_store_retriever.js

# Structured output
node structured_output/json_schema.js
```

### Common Patterns

#### 1. Simple RAG Pipeline

```javascript
// Load documents
const loader = new PDFLoader("./document.pdf");
const docs = await loader.load();

// Split into chunks
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
const chunks = await splitter.splitDocuments(docs);

// Create vector store
const vectorStore = await Chroma.fromDocuments(chunks, embedder);

// Retrieve and generate
const retriever = vectorStore.asRetriever({ k: 3 });
const relevantDocs = await retriever.invoke("your query");
```

#### 2. Multi-Step Analysis Chain

```javascript
const analysisChain = prompt1
  .pipe(LLM)
  .pipe(parser)
  .pipe(transformToObject)
  .pipe(prompt2)
  .pipe(LLM)
  .pipe(parser);
```

#### 3. Parallel Processing

```javascript
const parallelChain = RunnableParallel.from({
  summary: summaryPrompt.pipe(LLM),
  keywords: keywordPrompt.pipe(LLM),
  sentiment: sentimentPrompt.pipe(LLM),
});

const results = await parallelChain.invoke({ text: "..." });
```

---

## 🎓 Key Learnings

### Best Practices

1. **Use Prompt Templates** instead of hardcoded strings for maintainability
2. **Chain with `.pipe()`** for cleaner, more readable code
3. **Use typed messages** (`HumanMessage`, `AIMessage`) in chatbots
4. **Add chunk overlap** in text splitters to preserve context
5. **Use MMR** when you need diverse search results
6. **Validate structured outputs** with Zod schemas
7. **Start with lightweight models** (e.g., qwen2.5:1.5b) for development

### Performance Tips

1. **Parallel vs Sequential:**

   - Use `RunnableParallel` for independent operations
   - Use `Promise.all()` for quick one-off parallel calls
   - Use batch processing for same prompt on multiple inputs

2. **Memory Management:**

   - Use `MemoryVectorStore` for prototypes (fast, not persistent)
   - Use ChromaDB/Pinecone for production (persistent, scalable)

3. **Model Selection:**
   - Small models (1.5B-4B params) for simple tasks
   - Large models (7B+ params) for complex reasoning

### Common Pitfalls

❌ **Don't:** Mix formats in chat history (strings + message objects)
✅ **Do:** Use consistent message types

❌ **Don't:** Use `JsonOutputParser` alone (unreliable)
✅ **Do:** Use `withStructuredOutput()` with Zod schemas

❌ **Don't:** Load entire large documents into LLM context
✅ **Do:** Use text splitters and retrieval

---

## 🔧 Troubleshooting

### ChromaDB Connection Issues

```bash
# Start ChromaDB server
chroma run --host localhost --port 8000
```

### Ollama Model Not Found

```bash
# Pull required models
ollama pull qwen2.5:1.5b
ollama pull qwen3:4b
ollama pull nomic-embed-text
```

### Import Errors

Ensure you're using ES modules. Check `package.json`:

```json
{
  "type": "module"
}
```

---

## 📚 Additional Resources

- [LangChain.js Documentation](https://js.langchain.com/)
- [Ollama Models](https://ollama.ai/library)
- [ChromaDB Docs](https://docs.trychroma.com/)
- [Zod Documentation](https://zod.dev/)

---

## 📝 License

This project is for educational purposes. Feel free to use and modify as needed.

---

**Happy Learning! 🎉**
