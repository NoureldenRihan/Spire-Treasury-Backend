function generateAccountNumber() {
  // Generate two random uppercase letters
  const letters = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const letter1 = letters[Math.floor(Math.random() * letters.length)];
  const letter2 = letters[Math.floor(Math.random() * letters.length)];

  // Generate six random digits
  const digits = Array.from("0123456789");
  let number = "";
  for (let i = 0; i < 6; i++) {
    number += digits[Math.floor(Math.random() * digits.length)];
  }

  return letter1 + letter2 + number;
}

const serverFunctions = {
  generateAccountNumber,
};

module.exports = serverFunctions;
