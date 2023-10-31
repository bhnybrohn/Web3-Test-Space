

// Import the library
const stringSimilarity = require('string-similarity');

// Define two words to compare
const word1 = 'iphone 6s 128gb black';
const word2 = 'iphone black 6s  128gb';

// Calculate the similarity between the words
const similarity = stringSimilarity.compareTwoStrings(word1, word2);
console.log(similarity);
// Check if the similarity is above a certain threshold
if (similarity > 0.8) {
    console.log(`The words "${word1}" and "${word2}" are similar.`);
} else {
    console.log(`The words "${word1}" and "${word2}" are not similar.`);
}
