import React, { useState } from 'react';

function omit(obj, key) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

const useValidator = (enqueueSnackbar, callback, failCallback) => {
  const [formDenied, setFormDenied] = useState(false);
  //Form values
  const [values, setValues] = useState({});
  //Errors
  const [errors, setErrors] = useState({ policy: 'Policy must be accepted' });

  //A method to handle form inputs
  const handleChange = (event) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);
    //Let's set these values in state
    setValues({
      ...values,
      [name]: val,
    });
  };

  const validate = (event, name, value) => {
    switch (name) {
      case 'username':
        if (value.length <= 2)
          setErrors({
            username: 'Username needs to have atleast 3 letters',
            ...errors,
          });
        else {
          let newObj = omit(errors, 'username');
          setErrors(newObj);
        }

        break;

      case 'email':
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            email: 'Enter a valid email address',
            ...errors,
          });
        } else {
          let newObj = omit(errors, 'email');
          setErrors(newObj);
        }
        break;
      case 'password':
      case 'password-check':
        handlePasswordCheck(name, value);
        break;

      case 'policy':
        if (value === 'false') {
          setErrors({
            ...errors,
            policy: 'Policy must be accepted',
          });
        } else {
          let newObj = omit(errors, 'policy');
          setErrors(newObj);
        }
        break;
      default:
        break;
    }
  };

  const handlePasswordCheck = (name, value) => {
    let pass = values['password'];
    let passCheck = values['password-check'];
    if (name === 'password') {
      pass = value;
    } else passCheck = value;

    let errorUpdate = omit(errors, 'password');
    errorUpdate = omit(errorUpdate, 'password-check');

    if (pass !== passCheck) {
      errorUpdate['password-check'] = 'Password does not match';
    }

    if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(pass)) {
      errorUpdate.password =
        'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers';
    }
    setErrors(errorUpdate);
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length === 5) {
      callback(values);
    } else {
      if (Object.keys(errors).length === 0)
        enqueueSnackbar("Don't forget to enter your information", {
          variant: 'error',
        });
      else
        enqueueSnackbar(errors[Object.keys(errors)[0]], { variant: 'error' });
      setFormDenied(true);
      failCallback();
    }
  };
  const clearForm = () => {
    setErrors({});
    setValues({});
    setFormDenied(false);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    formDenied,
    clearForm,
  };
};

export default useValidator;
