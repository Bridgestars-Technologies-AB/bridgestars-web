/* eslint-disable no-unused-vars */
// const usernameEl = document.querySelector('#username');
// const emailEl = document.querySelector('#email');
// const passwordEl = document.querySelector('#password');
// const confirmPasswordEl = document.querySelector('#confirm-password');

export default function InitAuthFormValidation(form, callback) {
  const { t } = useTranslate();
  const usernameEl = form.querySelector("#username");
  const usernameEmailEl = form.querySelector("#username-email");
  const emailEl = form.querySelector("#email");
  const passwordEl = form.querySelector("#password");
  const passwordSignInEl = form.querySelector("#password-signin");
  const passwordConfirmEl = form.querySelector("#password-confirm");
  const termsEl = form.querySelector("#terms-accept");
  const firstNameEl = form.querySelector("#first-name");
  const lastNameEl = form.querySelector("#last-name");
  let errorElement = null;
  let hasSubmitted = false;
  //
  //
  //
  const checkUsernameEmail = () => {
    if (!usernameEmailEl) return false;
    const username = usernameEmailEl.value.trim();

    if (!isRequired(username)) {
      showError(usernameEmailEl, t("auth:error:userEmail.blank"));
      return false;
    } else {
      showSuccess(usernameEmailEl);
      return true;
    }
  };
  const checkTerms = () => {
    if (!termsEl) return false;
    const terms = termsEl.checked;
    if (!terms) {
      showError(termsEl, t("auth:error:terms"));
      return false;
    } else {
      showSuccess(termsEl);
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
      showError(usernameEl, t("auth:error:username.blank"));
    } else if (!isBetween(username.length, min, max)) {
      showError(
        usernameEl,
        //This is not very pretty....
        t("auth:error.username.length", { min, max }),
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
      showError(emailEl, t("auth:error:email.blank"));
    } else if (!isEmailValid(email)) {
      showError(emailEl, t("auth:error:email.notValid"));
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };
  const checkLastName = () => {
    if (!lastNameEl) return false;
    let valid = false;
    const name = lastNameEl.value.trim();
    if (!isRequired(name)) {
      showError(lastNameEl, "Glöm inte fylla i ditt efternamn");
    } else {
      showSuccess(lastNameEl);
      valid = true;
    }
    return valid;
  };
  const checkFirstName = () => {
    if (!firstNameEl) return false;
    let valid = false;
    const name = firstNameEl.value.trim();
    if (!isRequired(name)) {
      showError(firstNameEl, "Glöm inte fylla i ditt förnamn");
    } else {
      showSuccess(firstNameEl);
      valid = true;
    }
    return valid;
  };

  const checkPasswordSignIn = () => {
    if (!passwordSignInEl) return false;
    const password = passwordSignInEl.value.trim();

    if (!isRequired(password)) {
      showError(passwordSignInEl, t("auth:error:password.blank"));
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

    // TODO change requirements
    if (!isRequired(password)) {
      showError(passwordEl, t("auth:error:password.blankSignup"));
      // } else if (password.search(/[a-z]/) < 0) {
      //   showError(passwordEl, t("auth:error:password.atLeastLower"));
      // } else if (password.search(/[A-Z]/) < 0) {
      //   showError(passwordEl, t("auth:error:password.atLeastUpper"));
      // } else if (password.search(/[0-9]/) < 0) {
      //   showError(passwordEl, t("auth:error:password.atLeastDigit"));
    } else if (password.length < 8) {
      showError(passwordEl, t("auth:error:password.atLeastChar"));
    } else {
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
      showError(passwordConfirmEl, t("auth:error:password.enterAgain"));
    } else if (password !== passwordConfirm) {
      showError(passwordConfirmEl, t("auth:error:password.noMatch"));
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
    let formField = input.parentElement;
    if (input === termsEl) formField = formField.parentElement;
    // add the error class
    formField.classList.remove("success");
    formField.classList.add("error");

    if (errorElement === input || errorElement === null) {
      // show the error message
      const error = formField.querySelector("small");
      error.textContent = message;
      errorElement = input;
    }
  };

  const showSuccess = (input) => {
    // get the form-field element
    if (errorElement === input) {
      errorElement = null;
      checkAll();
    }
    let formField = input.parentElement;
    if (input === termsEl) formField = formField.parentElement;

    // remove the error class
    formField.classList.remove("error");
    formField.classList.add("success");

    // hide the error message
    const error = formField.querySelector("small");
    error.textContent = "";
  };

  form.addEventListener("submit", function (e) {
    errorElement = null;
    hasSubmitted = true;
    // prevent the form from submitting
    e.preventDefault();
    // validate fields
    const isFirstNameValid = checkFirstName(),
      isLastNameValid = checkLastName(),
      isEmailValid = checkEmail(),
      isUsernameValid = checkUsername(),
      isUsernameEmailValid = checkUsernameEmail(),
      isPasswordSignInValid = checkPasswordSignIn(),
      isPasswordValid = checkPassword(),
      isConfirmPasswordValid = checkConfirmPassword(),
      isTermsChecked = checkTerms();

    let isSignUpValid =
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isUsernameValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isTermsChecked &&
      !usernameEmailEl &&
      !passwordSignInEl;

    let isSignInValid =
      isUsernameEmailValid &&
      isPasswordSignInValid &&
      !emailEl &&
      !passwordConfirmEl &&
      !firstNameEl &&
      !lastNameEl &&
      !usernameEl;

    let isForgotValid =
      isEmailValid &&
      !passwordEl &&
      !passwordConfirmEl &&
      !usernameEl &&
      !nameEl &&
      !usernameEmailEl;

    let isResetValid =
      isPasswordValid &&
      isConfirmPasswordValid &&
      !emailEl &&
      !usernameEl &&
      !nameEl &&
      !usernameEmailEl &&
      !passwordSignInEl;

    // submit to the server if the form is valid
    if (isSignInValid) {
      callback({
        email: usernameEmailEl.value,
        password: passwordSignInEl.value,
      });
    } else if (isSignUpValid) {
      callback({
        username: usernameEl.value,
        email: emailEl.value,
        lastName: lastNameEl.value,
        firstName: firstNameEl.value,
        password: passwordEl.value,
        confirmPassword: passwordConfirmEl.value,
      });
    } else if (isForgotValid) {
      callback({
        email: emailEl.value,
      });
    } else if (isResetValid) {
      callback({
        password: passwordEl.value,
        confirmPassword: passwordConfirmEl.value,
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
  function checkAll() {
    if (!hasSubmitted) return;
    checkFirstName();
    checkLastName();
    checkEmail();
    checkUsername();

    checkUsernameEmail();
    checkPasswordSignIn();
    checkPassword();
    checkConfirmPassword();
    checkTerms();
  }

  form.addEventListener(
    "input",
    debounce(function (e) {
      errorElement = null;
      switch (e.target.id) {
        case "username":
          checkUsername();
          break;
        case "last-name":
          checkLastName();
          break;
        case "first-name":
          checkFirstName();
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
      if (errorElement == null) {
        checkAll();
      }
    }),
  );
}
