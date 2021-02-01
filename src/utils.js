const generateRandomLetter = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export default generateRandomLetter;
