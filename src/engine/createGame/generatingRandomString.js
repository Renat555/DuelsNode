function generatingRandomString() {
  let string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
  let result = "";

  for (let i = 0; i < 10; i++) {
    result += string[Math.floor(Math.random() * Math.floor(62))];
  }

  return result;
}

module.exports = generatingRandomString;
