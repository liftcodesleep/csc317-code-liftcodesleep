function pwValidation() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const cpsw = document.getElementById("cpsw").value;
  const response = document.getElementById("message");
  const error = "";
  console.log("You clicked on submit.");
  const passwordCheck = false;
  const usernameCheck = false;
  const aplhanum = /^[a-z0-9]+$/;
  if (
    ("a" > username[0] || username[0] > "z") &&
    ("A" > username[0] || username[0] > "Z")
  ) {
    error += "Username must begin with a letter.<br>";
  }
  else if (username.length < 3 || !aplhanum.test(username)) {
    error +=
      "Username must include 3 or more alphanumeric characters.<br>";
  } else {
    usernameCheck = true;
  }
  const num = /[0-9]/;
  const uppercase = /[A-Z]/;
  const specialchar = /[/*-+!@#$^&*]/;
  if (password.length < 8) {
    console.log("I am in length test");
    error += "Password must be 8 or more characters.<br>";
  }
  else if (!uppercase.test(password)) {
    error += "Password must contain at least one uppercase Letter.";
  }
  else if (!num.test(password)) {
    console.log("I am in at least one number test");
    error += "Password must contain at least one number.<br>";
  }
  else if (!specialchar.test(password)) {
    error += "Password must contain one of the following characters: /*-+!@#$^&*.<br>";
  }
  else if (password !== cpsw) {
    error += "Both passwords must be identical!";
  } else {
    passwordCheck = true;
  } if (passwordCheck && usernameCheck) {
    document.getElementById("reg-form").submit();
  } else {
    response.innerHTML = error;
    response.style.color = "red";
  }
}

