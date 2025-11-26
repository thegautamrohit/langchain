import {
  RecursiveCharacterTextSplitter,
  CharacterTextSplitter,
} from "@langchain/textsplitters";

const textSplitter = new CharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 20, // it signifies the overlap between the chunks
});

const recursiveTextSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 20, // it signifies the overlap between the chunks
});

const text = `Bitcoin (abbreviation: BTC; sign: ₿) is the first decentralized cryptocurrency. Based on a free-market ideology, bitcoin was invented in 2008 when an unknown entity published a white paper under the pseudonym of Satoshi Nakamoto.[4] Use of bitcoin as a currency began in 2009,[5] with the release of its open-source implementation.[6]: ch. 1  From 2021 to 2025, El Salvador adopted it as legal tender currency before revoking it.[7][8][9] As bitcoin is pseudonymous, its use by criminals has attracted the attention of regulators, leading to its ban by several countries.[10]

Bitcoin works through the collaboration of computers, each of which acts as a node in the peer-to-peer bitcoin network. Each node maintains an independent copy of a public distributed ledger of transactions, called a blockchain, without central oversight. Transactions are validated through the use of cryptography, preventing one person from spending another person's bitcoin, as long as the owner of the bitcoin keeps certain sensitive data secret.[6]: ch. 5 

Consensus between nodes about the content of the blockchain is achieved using a computationally intensive process based on proof of work, called mining, which is performed by purpose-built computers.[6]: ch. 12  Mining consumes large quantities of electricity and has been criticized for its environmental impact.[11]`;
const chunks = await textSplitter.splitText(text);
console.log(chunks, chunks.length);

const chunks2 = await recursiveTextSplitter.splitText(text);
console.log(chunks2, chunks2.length);
