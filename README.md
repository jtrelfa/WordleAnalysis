# Wordle Analysis
A wordle analyser that gives you the top 10 opening words based on a lit of potential words

## Support
As of this writing, the code only works in browsers that support the File System Access API (Chrome/Chromium and Edge) https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker

## Requirement
The word file should contain 1 word per line.

## Usage
1. Open the html file on your computer.
2. Click the "Go" button
3. Choose the list of available words from your computer
4. Done

## How it works
The javascript analyzer reads all of the words in the given file and gives them a "ranking" based on consonant and vowel positioning relative to the entire list.  Each word's score is based on frequency of each letter in the potential words.  The top 10 opening words are provided to you when the analysis is complete
