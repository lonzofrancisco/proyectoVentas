// test-hash.js
const bcrypt = require("bcryptjs");

(async () => {
  const hash = await bcrypt.hash("123456", 10);
  console.log(hash);

  const match = await bcrypt.compare("123456", hash);
  console.log("MATCH:", match);
})();