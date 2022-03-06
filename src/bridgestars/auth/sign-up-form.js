import React, { useState } from 'react';

function omit(obj, key) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

const useSignUpForm = (callback) => {
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

    console.log('Form Values ', values);
    console.log('Form errors ', errors);
  };

  const validate = (event, name, value) => {
    switch (name) {
      case 'username':
        if (value.length <= 4)
          setErrors({
            ...errors,
            username: 'Username needs to have atleast 5 letters',
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
            ...errors,
            email: 'Enter a valid email address',
          });
        } else {
          let newObj = omit(errors, 'email');
          setErrors(newObj);
        }
        break;
      case 'password':
        handlePasswordCheck();
        break;
      case 'passwordCheck':
        handlePasswordCheck();
        break;

      case 'policy':
        if (!value) {
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

  const handlePasswordCheck = () => {
    let passCheck = values['passwordCheck'];
    let pass = values['password'];

    console.log('pass: ' + pass);
    console.log('passCheck: ' + passCheck);
    if (pass === passCheck) {
      //setErrors(omit(errors, 'passwordCheck'));
    } else {
      console.log('ADDING ERRORS');
      setErrors({
        ...errors,
        passwordCheck: 'Password does not match',
      });
    }

    if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(pass)) {
      setErrors({
        ...errors,
        password:
          'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers',
      });
    } else {
      let newObj = omit(errors, 'password');
      setErrors(newObj);
    }
    //console.log('render()');
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      alert(errors[Object.keys(errors)[0]]);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useSignUpForm;
