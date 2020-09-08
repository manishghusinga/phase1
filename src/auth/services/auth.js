import { authHelpers } from '../helpers/auth';
import { middlewareService } from '../../shared/service';

export const authService = {
    login,
    register,
    logout,
    signUp,
    sessionHandOver,
    confirmOtp,
    forgotPassword,
    resendOTP,
    verifyOTP
};

function login(email, password) {
    let paramsData = new URLSearchParams({ payload: 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password) + '&isAjax=true&Platform=web&source=iosApp' })
    let inputData = paramsData.toString();

    let payload = {
        email: email,
        password: password,
        isAjax: true,
        Platform: "web",
        source: "iosApp"
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            sessionId: "8ed83daa-e1ab-4e7c-ae57-df4549ec3f35",
            encryption: false,
            oroClient: process.env.REACT_APP_ORO_CLIENT
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    };

    return middlewareService.postApiData('/auth/login', payload)
        .then(response => response)
        .then(authResponse => {
            if (!authResponse.success || authResponse.message !== 1) {
                //Set error state and handle it
                var error = authHelpers.getLoginError(authResponse.message);
                error['success'] = false;
                return error;
            }

            //Set the auth cookie
            authHelpers.setAuthCookie(true, 1);
            //Return success.
            return ({
                success: true,
                message: "Login successful!",
                token: authResponse.token
            });
        });

}

function sessionHandOver(payload) {
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            encryption: false
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    };

    return middlewareService.postApiData('/partner/sessionHandover', payload)
        .then(response => response)

}


function signUp(email,payload) {

    payload.emailId = email;
    // let payload = {
    //     emailId: email,
    //     customerId: "12345",
    //     authToken: "abc123",
    //     mobileNumber: "7021540802",
    //     androidId: "qwerty12345"
    // }

    // const requestOptions = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json; charset=utf-8',
    //         encryption: false,
    //         // oroClient: process.env.REACT_APP_ORO_CLIENT
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(payload)
    // };

    return middlewareService.postApiData('/partner/signup', payload)
        .then(response => response)

}

function confirmOtp(email, otp,payload) {
    
        payload.emailId=  email;
        payload.otp = otp;
    

    // const requestOptions = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json; charset=utf-8',
    //         encryption: false,
    //         oroClient: process.env.REACT_APP_ORO_CLIENT
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(payload)
    // };

    return middlewareService.postApiData('/partner/validateEmailOtp', payload)
        .then(response => response)

}

function register(email, password, repassword, phone) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-partner' : 'xiaomi'
        },
        body: 'email=' + encodeURIComponent(email) +
               '&password=' + encodeURIComponent(password) + 
               '&repassword=' + encodeURIComponent(repassword) + 
               '&phone=' + encodeURIComponent(phone) + 
               '&isAjax=true' 
    };
    
    return fetch(process.env.REACT_APP_API_URL + '/auth/register', requestOptions)
        .then(response => response.json())
        .then(authResponse => {
            if (authResponse.success && authResponse.sendOtp) {
                return ({
                    success: true,
                    message: "Already verified",
                    sendOtp: authResponse.sendOtp
                });
            }

            if (!authResponse.success || authResponse.message !== 1) {
                //Set error state and handle it
                var error = authHelpers.getSignupError(authResponse.message);
                error['success'] = false;
                return error;
            }

            return ({
                success: true,
                message: "Registration successful!",
                otp: authResponse.otp,
                sendOtp: authResponse.sendOtp
            });
        });
}


function resendOTP(email) {
    let payload = {
        email: email
    }
    let url = '/xiaomi/resendOtp'
    return middlewareService.postApiData(url,payload)
}


function verifyOTP(email, otp) {

    let url = `/auth/verify?email=${email}&otp=${otp}`;


    return middlewareService.getApiData(url)
}


function logout() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            sessionId: "8ed83daa-e1ab-4e7c-ae57-df4549ec3f35",
            encryption: false,
            oroClient: process.env.REACT_APP_ORO_CLIENT,
            'X-partner' : 'xiaomi'
        },
        credentials: 'include',
    };

    return fetch(process.env.REACT_APP_API_URL + '/auth/logout', requestOptions)
        .then(response => response.json())
        .then(authResponse => {
            if (authResponse.errCode === 1) {
                authHelpers.logout('show');
                return {
                    message: `Unable to logout. Please try again later`
                };
            }
            else {
                authHelpers.logout();
                return {
                    success: true,
                    message: "Logout successful!"
                };
            }
        })
        .catch((error) => {
            return {
                message: `Unable to logout. Please try again later`
            };
        })
}



function forgotPassword(email) {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'email=' + encodeURIComponent(email)
    };
  
    return fetch(process.env.REACT_APP_API_URL + '/auth/forgotpassword', requestOptions)
      .then(response => response.json())
      .then(authResponse => {
        //Return status.
        return (authHelpers.getForgotPasswordResponse(authResponse));
      })
      .catch(error => {
        return({
          success: false,
          message: 'An unknown error occored. Please try again.'
        })
      });  
}



