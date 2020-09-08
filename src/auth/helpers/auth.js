import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';


export const authHelpers = {
  setAuthCookie,
  getAuthCookie,
  logout,
  isUserAuthenticated,
  getSignupError,
  getLoginError,
  getForgotPasswordResponse
};

function setAuthCookie(value, numberOfDays) {
	const cookies = new Cookies();
	let date = new Date();
	date.setTime(date.getTime() + (numberOfDays * 24 * 60 * 60 * 1000));
	cookies.set('AUTH', value, { expires: date, path: '/' });
}

function getAuthCookie() {
	const cookies = new Cookies();
	return cookies.get('AUTH');
}

function logoutNew() {
  const options = {
    path: '/',
  };
  const cookies = new Cookies();
  cookies.remove('AUTH', options);
  let url = '#/login';
  window.location.replace(url);

}

function logout(showDialog) {
  if (showDialog) {
    setTimeout(logoutNew, 2000);
    let msg = 'Your session is expired, please login again'
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
        autoClose: false
    });
  }
  else {
    logoutNew();
  }
}

function isUserAuthenticated() {
	return getAuthCookie();
}

function getSignupError(errorCode) {
	var error = {};
	switch(errorCode) {
		case 2:
			error['message'] = "This email is already registered.";
			error['field'] = "email";
			break;
		case 4:
      error['message'] = "Passwords dont match.";
			error['field'] = "password";
			break;
    case 5:
    case 7:
      error['message'] = "The email you have entered is not valid.";
			error['field'] = "email";
      break;
    case 6:
      error['message'] = "Not a valid Phone number.";
			error['field'] = "phone";
      break;
    default:
			error['message'] = "Error encounterd. Please try again.";
			break;
	}

	return error;
}

function getLoginError(errorCode) {
  var error = {};
  switch(errorCode) {
    case 2:
      error['message'] = "No such email. Authentication Failed";
      break;
    case 3:
      error['message'] = "Authentication Failed";
      break;
    case 5:
      error['message'] = "Email not verified. Check your email";
      break;
    default:
      error['message'] = "Some unknown error encounterd";
  }

  return error;
}

function getForgotPasswordResponse(apiResponse) {
  var response = {}
  response['success'] = apiResponse.success;
  console.log(apiResponse);
  console.log(apiResponse.message);

  switch(parseInt(apiResponse.message)) {
    case 1:
      response['message'] = "Request successful";
      break;
    case 2:
      response['message'] = "No such user/email registered.";
      break;
    case 4:
      response['message'] = "Email not verified. Please confirm your email and try again.";
      break;
    default:
      response['message'] = "An unknown error occured. Please try again later.";
      break;
  }

  return response;
}