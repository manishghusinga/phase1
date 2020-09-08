export const validationHelpers = {
  areAllFieldsPresent,
  isEmailValid,
  isPasswordValid,
  isRePasswordValid,
  isPhoneValid,
  getValidationErrors
};

function areAllFieldsPresent(formValues) {
  for(var value in formValues) {
    if(!formValues[value] || formValues[value].length === 0) {
      console.log(value + " is not present :/");
      return false;
    }
  }

  console.log("Form valid");
  return true;
}

function isEmailValid(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log("Email test: " + email + " " + regex.test(email));
  return regex.test(email);
}

function isPasswordValid(password) {
  return password && password.length >= 6;
}

function isRePasswordValid(password, repassword) {
  return repassword && repassword.length >= 6 && repassword == password;
}

function isPhoneValid(phone) {
  console.log("Phone test: " + phone);
   // + " " + phone.match(/^\d+/)
  return phone;
   // && phone.length === 10 && phone.match(/^\d+/)
}

function getValidationErrors(formData) {
  var errors = {};

  console.log("------------ get validation errors -------------");

  for(var value in formData) {
    console.log(value);

    if(!formData[value] || formData[value].length === 0) {
      errors[value] = 'This is a required field';
      console.log("Errors: " + errors);
    } else {
      switch(value) {
        case 'email':
          if(!isEmailValid(formData[value])) {
            errors[value] = 'Please enter a valid email';
          }
          break;
        case 'password':
          if(!isPasswordValid(formData[value])) {
            errors[value] = 'Password should be atleast 6 characters long.';
          }
          break;
        case 'password2':
          errors[value] = '';
          if(!isPasswordValid(formData[value])) {
            errors[value] += 'Password should be atleast 6 characters long. ';
          }
          if(formData[value] != formData['password']) {
            errors[value] += 'Value doesn\'t match the password.'
          }
          break;
        case 'phone':
          if(!isPhoneValid(formData[value])) {
            errors[value] = 'Please enter a valid phone number';
          }
          break;
        default:
          break; 
      }
    }
  }

  return errors;
}