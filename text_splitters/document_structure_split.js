import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const JSCodeTextSplitter = RecursiveCharacterTextSplitter.fromLanguage(
    "js",
    {
        chunkSize: 100,
        chunkOverlap: 20, // it signifies the overlap between the chunks
    }
);

const mergeSortCode = `
function mergeSort(arr) {
    // Base case: if the array has 0 or 1 element, it's already sorted
    if (arr.length <= 1) {
      return arr;
    }
  
    // Divide the array into two halves
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    // Recursively sort the two halves and then merge them
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left, right) {
    let resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    // Compare elements from both arrays and add the smaller one to resultArray
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    // Add any remaining elements from either the left or right array
    return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  
  // Example usage:
  const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
  const sortedArray = mergeSort(unsortedArray);
  console.log(sortedArray); // Output: [3, 9, 10, 27, 38, 43, 82]
`;
const JSCodeDocs = await JSCodeTextSplitter.createDocuments([
    mergeSortCode  // currently working in this syntax, but not as per the documentation needs to be reviewd later on, when the docs are upadted correctly
]);
console.log(JSCodeDocs);
