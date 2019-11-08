function checkAccount(input) {
  const users = [
    {
      firstName: "Tony",
      email: "tony@stark.com",
      password: "iamironman"
    },
    {
      firstName: "Steve",
      email: "captain@hotmail.com",
      password: "icandothisallday"
    },
    {
      firstName: "Peter",
      email: "peter@parker.com",
      password: "enajyram"
    },
    {
      firstName: "Natasha",
      email: "natasha@gamil.com",
      password: "*parol#@$!"
    },
    {
      firstName: "Nick",
      email: "nick@shield.com",
      password: "password"
    }
  ];
  let result = {};
  users.forEach(user => {
    if (input.email === user.email) {
      if (input.password === user.password) {
        result.sentence = "Welcome," + user.firstName + "!";
        result.back = false;
      } else {
        result.sentence = "抱歉，您輸入的密碼錯誤。";
        result.back = true;
      }
    } else {
      result.sentence = "抱歉，您輸入的帳號不存在。";
      result.back = true;
    }
  });

  return result;
}

module.exports = checkAccount;
