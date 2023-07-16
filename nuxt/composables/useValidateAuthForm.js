// const usernameEl = document.querySelector('#username');
// const emailEl = document.querySelector('#email');
// const passwordEl = document.querySelector('#password');
// const confirmPasswordEl = document.querySelector('#confirm-password');

const { t } = await loadTranslations("auth");

export default function InitAuthFormValidation(form, callback) {
  const usernameEl = form.querySelector("#username");
  const usernameEmailEl = form.querySelector("#username-email");
  const emailEl = form.querySelector("#email");
  const passwordEl = form.querySelector("#password");
  const passwordSignInEl = form.querySelector("#password-signin");
  const passwordConfirmEl = form.querySelector("#password-confirm");
  //
  //
  //
  const checkUsernameEmail = () => {
    if (!usernameEmailEl) return false;
    const username = usernameEmailEl.value.trim();

    if (!isRequired(username)) {
      showError(usernameEmailEl, t("auth:error.blank1"));
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
      showError(usernameEl, t("auth:error.blank2"));
    } else if (!isBetween(username.length, min, max)) {
      showError(
        usernameEl,
        //This is not very pretty....
        `${t("auth:error.username1")} ${min} ${t("auth:error.username2")} ${max} ${t("auth:error.username3")}.`,
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
      showError(emailEl, t("auth:error.blank3"));
    } else if (!isEmailValid(email)) {
      showError(emailEl, t("auth:error.notValid"));
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
      showError(passwordSignInEl, t("auth:error.blank4"));
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
      showError(passwordEl, t("auth:error.blank4"));
    } 
    else if(password.length < 8){
      showError(passwordEl, t("auth:error.passError1"));
    }
    else if(password.search(/[a-z]/) < 0){
      showError(passwordEl, t("auth:error.passError2"));
    }
    else if(password.search(/[A-Z]/) < 0){
      showError(passwordEl, t("auth:error.passError3"));
    }
    else if(password.search(/[0-9]/) < 0){
      showError(passwordEl, t("auth:error.passError4"));
    }
    else {
      showSuccess(passwordEl);
      valid = true;
    }

    return valid;
  };

  const checkConfirmPassword = () => {
    if (!passwordConfirmEl) return false;
    let valid = false;
    // check confirm password
    const passwordConfirm = passwordConfirmEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(passwordConfirm)) {
      showError(passwordConfirmEl, t("auth:error.passError5"));
    } else if (password !== passwordConfirm) {
      showError(passwordConfirmEl, t("auth:error.passError6"));
    } else {
      showSuccess(passwordConfirmEl);
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
      !usernameEmailEl &&
      !passwordSignInEl;

    let isSignInValid = isUsernameEmailValid &&
      isPasswordSignInValid &&
      !emailEl &&
      !passwordConfirmEl  &&
      !usernameEl;

    let isResetValid = isEmailValid && !passwordEl &&
      !passwordConfirmEl && !usernameEl &&
      !usernameEmailEl;

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
        confirmPassword: passwordConfirmEl.value,
      });
    }
    else if (isResetValid){
     callback({ 
        email: emailEl.value,
      });
    }
    else {
      console.error("Invalid Form:", {
        isSignUpValid,
        isSignInValid,
        isResetValid,
        isFormValid,
        usernameEl,
        emailEl,
        passwordEl,
        passwordConfirmEl,
        usernameEmailEl,
        passwordSignInEl,
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
        case "password-confirm":
          checkConfirmPassword();
          break;
        case "username-email":
          checkUsernameEmail();
          break;
        case "password-signin":
          checkPasswordSignIn();
          break;
      }
    }),
  );
}