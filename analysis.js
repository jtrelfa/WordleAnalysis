const readFile = async () => {
  let fileHandle;
  [fileHandle] = await window.showOpenFilePicker();
  const f = await fileHandle.getFile();
  const response = await f.text();
  const words = response
    .toUpperCase()
    .split(/\r?\n/)
    .filter((word) => word.length === 5);

  // Create letter frequency map for each position
  const positionFreq = Array(5)
    .fill(null)
    .map(() => ({}));
  const letterFreq = {};

  words.forEach((word) => {
    [...word].forEach((letter, pos) => {
      // Position-specific frequency
      positionFreq[pos][letter] = (positionFreq[pos][letter] || 0) + 1;
      // Overall letter frequency
      letterFreq[letter] = (letterFreq[letter] || 0) + 1;
    });
  });

  // Score words based on letter frequency, uniqueness, and common consonants
  function scoreWord(word) {
    const letters = [...new Set(word)]; // unique letters
    const posScore = [...word].reduce(
      (score, letter, pos) => score + positionFreq[pos][letter],
      0
    );
    const freqScore = letters.reduce(
      (score, letter) => score + letterFreq[letter],
      0
    );
    return {
      word,
      score: posScore + freqScore,
      uniqueLetters: letters.length,
    };
  }

  const wordScores = words.map(scoreWord).sort((a, b) => {
    // Prioritize words with more unique letters, then by score
    if (b.uniqueLetters !== a.uniqueLetters) {
      return b.uniqueLetters - a.uniqueLetters;
    }
    return b.score - a.score;
  });

  const results = document.getElementById("results");
  const msg = ["Top 10 opening words:"];
  wordScores.slice(0, 10).forEach(({ word, score, uniqueLetters }) => {
    msg.push(
      `${word}: score=${score.toFixed(0)}, unique letters=${uniqueLetters}`
    );
  });
  results.value = msg.join("\n");
};
