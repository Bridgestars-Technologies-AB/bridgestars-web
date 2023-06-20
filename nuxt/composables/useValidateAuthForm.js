// const usernameEl = document.querySelector('#username');
// const emailEl = document.querySelector('#email');
// const passwordEl = document.querySelector('#password');
// const confirmPasswordEl = document.querySelector('#confirm-password');
export default function InitAuthFormValidation(form, callback) {
  const usernameEl = form.querySelector("#username");
  const usernameEmailEl = form.querySelector("#usernameEmail");
  const emailEl = form.querySelector("#email");
  const passwordEl = form.querySelector("#password");
  const passwordSignInEl = form.querySelector("#password-signin");
  const confirmPasswordEl = form.querySelector("#password-confirm");
  //
  //
  //
  const checkUsernameEmail = () => {
    if (!usernameEmailEl) return false;
    const username = usernameEmailEl.value.trim();

    if (!isRequired(username)) {
      showError(usernameEmailEl, "Username/Email cannot be blank.");
      return false;
    } else {
      showSuccess(usernameEmailEl);
      return true;
    }
  };

  const checkUsername = () => {
    if (!usernameEl) return false;

    let valid = false;

    const min = 3,
      max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
      showError(usernameEl, "Username cannot be blank.");
    } else if (!isBetween(username.length, min, max)) {
      showError(
        usernameEl,
        `Username must be between ${min} and ${max} characters.`,
      );
    } else {
      showSuccess(usernameEl);
      valid = true;
    }
    return valid;
  };

  const checkEmail = () => {
    if (!emailEl) return false;
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
      showError(emailEl, "Email cannot be blank.");
    } else if (!isEmailValid(email)) {
      showError(emailEl, "Email is not valid.");
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };

  const checkPasswordSignIn = () => {
    if (!passwordSignInEl) return false;
    const password = passwordSignInEl.value.trim();

    if (!isRequired(password)) {
      showError(passwordSignInEl, "Password cannot be blank.");
      return false;
    } else {
      showSuccess(passwordSignInEl);
      return true;
    }
  };
  const checkPassword = () => {
    if (!passwordEl) return false;
    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
      showError(passwordEl, "Password cannot be blank.");
    } else if (!isPasswordSecure(password)) {
      showError(
        passwordEl,
        "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters and 1 number",
      );
    } else {
      showSuccess(passwordEl);
      valid = true;
    }

    return valid;
  };

  const checkConfirmPassword = () => {
    if (!confirmPasswordEl) return false;
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
      showError(confirmPasswordEl, "Please enter the password again");
    } else if (password !== confirmPassword) {
      showError(confirmPasswordEl, "The password does not match");
    } else {
      showSuccess(confirmPasswordEl);
      valid = true;
    }

    return valid;
  };

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isPasswordSecure = (password) => {
    const re = new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/");
    return re.test(password);
  };

  const isRequired = (value) => (value === "" ? false : true);
  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove("success");
    formField.classList.add("error");

    // show the error message
    const error = formField.querySelector("small");
    error.textContent = message;
  };

  const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove("error");
    formField.classList.add("success");

    // hide the error message
    const error = formField.querySelector("small");
    error.textContent = "";
  };

  form.addEventListener("submit", function (e) {
    // prevent the form from submitting
    e.preventDefault();
    // validate fields
    const isUsernameEmailValid = checkUsernameEmail(),
      isPasswordSignInValid = checkPasswordSignIn(),
      isUsernameValid = checkUsername(),
      isEmailValid = checkEmail(),
      isPasswordValid = checkPassword(),
      isConfirmPasswordValid = checkConfirmPassword();

    let isSignUpValid = isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      usernameEmailEl == null &&
      passwordSignInEl == null;

    let isSignInValid = isUsernameEmailValid &&
      isPasswordSignInValid &&
      emailEl == null &&
      passwordConfirmEl == null &&
      usernameEl == null;

    let isResetValid = isEmailValid && passwordEl == null &&
      confirmPasswordEl == null && usernameEl == null &&
      usernameEmailEl == null;

    let isFormValid = isSignUpValid || isSignInValid || isResetValid;

    // submit to the server if the form is valid
    if (isSignInValid) {
      callback({
        usernameEmail: usernameEmailEl.value,
        password: passwordSignInEl.value,
      });
    } else if (isSignUpValid) {
      callback({
        username: usernameEl.value,
        email: emailEl.value,
        password: passwordEl.value,
        confirmPassword: confirmPasswordEl.value,
      });
    }
    else if (isResetValid){
     callback({ 
        email: emailEl.value,
      });
    }
  });

  const debounce = (fn, delay = 2) => {
    let timeoutId;
    return (...args) => {
      // cancel the previous timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // setup a new timer
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
  };

  form.addEventListener(
    "input",
    debounce(function (e) {
      switch (e.target.id) {
        case "username":
          checkUsername();
          break;
        case "email":
          checkEmail();
          break;
        case "password":
          checkPassword();
          break;
        case "confirm-password":
          checkConfirmPassword();
          break;
      }
    }),
  );
}
