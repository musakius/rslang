export const filterWords = (result, userWordsResult) => {
  if (userWordsResult.length === 0) return result;
  return result.filter(
    (word) =>
      userWordsResult.filter((userWord) => userWord.wordId === word.id)
        .length === 0
  );
};

export const filterUserDeletedWords = (result) => {
  if (result.length === 0) return result;
  return result.filter((word) => word.optional.isDeleted === true);
};

export const filterUserDifficultyWords = (result) => {
  if (result.length === 0) return result;
  return result
    .map((word) => {
      if (word.difficulty === 'high') {
        return word.wordId;
      }
      return null;
    })
    .filter((id) => id !== null);
};

export const countPages = (length) => {
  if (length === 0) return length;
  if (length < 20) return 1;
  return Math.ceil(length / 20);
}