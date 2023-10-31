const {stringSimilarity}  = require("string-similarity-js")

// Rearranged words
console.log(stringSimilarity("App Store & iTunes Canada", "App Store & iTunes"))
// Returns a score of 0.9

// Typos
stringSimilarity("The quick brown fox jumps over the lazy dog", "The quck brown fx jumps over the lazy dog")
// 0.92

// Even more different
stringSimilarity("The quick brown fox jumps over the lazy dog", "The quack brain fax jomps odor the lady frog")
// 0.65

// Completely different strings
stringSimilarity("The quick brown fox jumps over the lazy dog", "Lorem ipsum")
// 0.07

// Tiny strings are less effective with default settings
stringSimilarity("DMV", "DNV")
// Returns 0, because technically there are no bigrams in common between the two

// Passing in a substring length of 1 may improve accuracy on tiny strings
stringSimilarity("DMV", "DNV", 1)
// Returns 0.67, the percentage of letters in common between the two