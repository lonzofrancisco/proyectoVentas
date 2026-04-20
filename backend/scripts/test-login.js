const axios = require("axios");

axios
  .post("http://localhost:3001/api/auth/login", {
    email: "owner@tienda.com",
    password: "password123",
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    if (err.response) {
      console.error(err.response.status, err.response.data);
    } else {
      console.error(err.message);
    }
    process.exit(1);
  });