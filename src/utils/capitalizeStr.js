/*
  Converts a string to have only the first letter capitalized like this sentence.
*/
const capitalizeStr = (str) => {
  const lowerCaseCharsArr = str.trim().toLowerCase().split('');
  const firstLetterCapitalized = lowerCaseCharsArr[0].toUpperCase();
  const capitalizedStr = [firstLetterCapitalized, ...lowerCaseCharsArr.slice(1)].join('');
  return capitalizedStr;
};

export default capitalizeStr;
