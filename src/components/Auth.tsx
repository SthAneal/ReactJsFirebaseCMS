import React, { useRef, useState } from "react";
import { FlexDiv } from "../styles/globalStyleComponent";
import { Button } from "./Button";
import { Input } from "./Input";

import { sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; 
import { auth } from "../firebase";

export const Auth = ()=>{
    
    // define error message type
    type AuthErrorMessageType = {
        emailError:string
        loginError:string
    }

    // define state to associate to error message
    const [authErrorMessage,setErrorMessage] = useState({} as AuthErrorMessageType);


    // reference for NEW TO EVENTME? Tab and ALREADY REGISTERED? Tab
    const alreadyRegTab = useRef<HTMLDivElement>(null);

    /**
     * Toggles the tab
     * @param e : React.Mouse Event
     * @param tab : determines the targeted tab to be opened
     * @author Anil
     */
    const toggleTab = (e:React.MouseEvent<HTMLElement>, tab:React.RefObject<HTMLDivElement>)=>{
        const tabsBody = document.getElementsByClassName('tab__body--sec');
        const tabCapsule = document.getElementsByClassName('tab__capsule');

        // select or unselect tab capsule
        Array.from(tabCapsule).forEach((elem)=>{
            elem.classList.remove('tab__capsule--selected');
        });

        e.currentTarget.classList.add('tab__capsule--selected');

        // show or hide tabs body
        Array.from(tabsBody).forEach((elem)=>{
            elem.classList.add('tab__body--sec-hide');
        });

        tab.current?.classList.remove('tab__body--sec-hide');
    }

    /**
     * login based on email as user name and password
     * @param e 
     * @author Anil
     */
    const loginUser = (e:React.SyntheticEvent)=>{
        e.preventDefault();
        // type assertion to define login fields
        const target = e.target as typeof e.target & {
            email:{value:string};
            password:{value:string};
        }

        // retriev the value of the login field
        const email = target.email.value;
        const password = target.password.value;

        // login user using firebase auth

        //import { getAuth,  } from "firebase/auth";

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            //const user = userCredential.user;

            // send email verification link to the user
            if(!userCredential.user.emailVerified){
                sendEmailVerification(userCredential.user,{url:'http://localhost:3000/dashboard',handleCodeInApp:true})
                .then(()=>{
                    alert("An email verification link has been sent to your email. Please verify the email by clicking the link.");
                    // reset validation errors if any.
                    setErrorMessage({} as AuthErrorMessageType);
                    console.log(userCredential.user);
                }).catch((error)=>{
                    console.log(error.message);
                });
            }

            setErrorMessage({} as AuthErrorMessageType);
            console.log('Login Successfull');
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            setErrorMessage({...authErrorMessage, loginError:'Invalid Credentials'});
            console.log(error);
        });

    }

    /**
     * send password reset link to the nominated email address.
     * @param e : React synthetic event
     * @author: Anil
     */
    const sentPasswordResetLink = (e:React.SyntheticEvent)=>{
        // e.stopPropagation();
        e.preventDefault();
        let userEmail = prompt("Enter your valid email address.");
        // eslint-disable-next-line no-useless-escape
        let emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(userEmail){
            if(userEmail.match(emailRegx)){
                console.log(userEmail);
                sendPasswordResetEmail(auth, userEmail, {url:'http://localhost:3000/dashboard',handleCodeInApp:true})
                .then(() => {
                    alert("Password reset link is successfully sent to your Email.");
                })
                .catch((error) => {
                    console.error(error);
                });
            }else{
                alert("Please try entering correct email address.");
            }
        }

    }

    return (
        <FlexDiv flex="1 1 auto" minHeight="100%" justifyContent="center" alignItems="center" padding="50px 10px" className="authentication"> 
            <FlexDiv flex="0 1 500px"  className="tab" flexDirection="column" justifyContent="start" gap="5px">
                <FlexDiv flex="1" width="100%" className="tab__capsule-wrapper" gap="2px">
                    {/* <FlexDiv flex="1" className="tab__capsule" justifyContent="center" onClick={(e:React.MouseEvent<HTMLElement>)=>toggleTab(e, newToTab)}>NEW TO EVENTME?</FlexDiv> */}
                    <FlexDiv flex="1" className="tab__capsule tab__capsule--selected" justifyContent="center" onClick={(e:React.MouseEvent<HTMLElement>)=>toggleTab(e, alreadyRegTab)}>Admin Pannel Login</FlexDiv>
                </FlexDiv>
                <FlexDiv flex="1 1 auto" width="100%" className="tab__body" flexDirection="column">
                    <FlexDiv flex="1" width="100%" flexDirection="column" gap="20px" alignItems="center" className="tab__body--sec" ref={alreadyRegTab}>
                        <form onSubmit={loginUser} className="tab__body--sec-form">
                            {/* to display the login error message */}
                            { authErrorMessage.loginError?<FlexDiv flex="0 0 auto" alignItems="flex-strart" width="100%" className="error-message">{authErrorMessage.loginError} !!!</FlexDiv>:''}
                            <Input label="EMAIL" type="email" name="email" labelFor="loginEmail" 
                                pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$" 
                                title="Should be a valid email"
                                required={true}/>

                            <Input label="PASSWORD" type="password" name="password" labelFor="loginPassword" required={true}/>

                            <Button typeVariant="contained" typeColor="primary">LOG IN</Button>
                            {/* <Button typeVariant="contained" typeColor="secondary">LOG IN</Button>
                            <Button typeVariant="outlined" typeColor="primary">LOG IN</Button>
                            <Button typeVariant="outlined" typeColor="secondary">LOG IN</Button> */}
                        </form>
                        <form onSubmit={sentPasswordResetLink}>
                            <Button typeVariant="text" typeColor="primary">Forgot Password?</Button>
                        </form>
                    </FlexDiv>
                </FlexDiv>
            </FlexDiv>
        </FlexDiv>
    )
}