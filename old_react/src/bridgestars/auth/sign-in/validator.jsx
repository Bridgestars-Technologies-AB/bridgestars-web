import React, { useState } from 'react';

function omit(obj, key) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

const useValidator = (enqueueSnackbar, successCallback, failCallback) => {
  const [formDenied, setFormDenied] = useState(false);
  //Form values
  const [values, setValues] = useState({});
  //Errors
  const [errors, setErrors] = useState({});

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
        if (value.length < 4)
          setErrors({
            ...errors,
            username: 'Username needs to have atleast 4 letters',
          });
        else {
          let newObj = omit(errors, 'username');
          setErrors(newObj);
        }

        break;

      // case 'email':
      // if (
      //   !new RegExp(
      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //   ).test(value)
      // ) {
      //   setErrors({
      //     ...errors,
      //     email: 'Enter a valid email address',
      //   });
      // } else {
      //   let newObj = omit(errors, 'email');
      //   setErrors(newObj);
      // }
      // break;
      case 'password':
        if (value.length < 6)
          setErrors({
            ...errors,
            password: 'Invalid password',
          });
        else {
          let newObj = omit(errors, 'password');
          setErrors(newObj);
        }
        break;
      default:
        break;
    }
  };

  const validatorHandleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length === 2) {
      successCallback({
        username: values['username'],
        password: values['password'],
        setErrors: setErrors,
      });
    } else {
      failCallback();
      if (Object.keys(errors).length === 0)
        enqueueSnackbar("Don't forget to enter your information", {
          variant: 'error',
        });
      else
        enqueueSnackbar(errors[Object.keys(errors)[0]], { variant: 'error' });
      setFormDenied(true);
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
    validatorHandleSubmit,
    formDenied,
    clearForm,
  };
};

export default useValidator;
