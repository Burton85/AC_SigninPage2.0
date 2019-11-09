function checkAccount(email, password) {
  const users = require("./accounts.json").users;
  let userId;
  if (email && password) {
    const user = users.find(
      item => item.email === email && item.password === password
    );
    if (user) {
      userId = user.id;
    }
  }

  return userId;
}

module.exports = checkAccount;
