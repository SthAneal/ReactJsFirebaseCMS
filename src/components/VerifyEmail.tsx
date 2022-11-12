import { useEffect } from "react";
import { FlexDiv } from "../styles/globalStyleComponent";
import { Button } from "./Button";

import { sendEmailVerification, User, onAuthStateChanged } from "firebase/auth"; 
import { auth } from "../firebase";

export const VerifyEmail = ()=>{
    let user: User | null;

    /**
     * send verification email to the registered user
     * @author Anil
     */
    const sendVerification = ()=>{
        sendEmailVerification(user!, {url:'http://localhost:3000/dashboard',handleCodeInApp:true}).then(()=>{
            alert("An email verification link has been sent to your email. Please verify the email by clicking the link.");
        }).catch((error)=>{
            console.log(error.message);
        })    
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
              // eslint-disable-next-line react-hooks/exhaustive-deps
              user = currentUser;
        }); 

        return ()=>{
            unsubscribe();
        };
    },[])

    return(
        <FlexDiv flex="1" minHeight="100%" flexDirection="column" alignItems="center"> 
            <FlexDiv>Please verify your Email before you continue.</FlexDiv>
            <FlexDiv className="terms-condition">
                <sub>You can verify your Email Id by clicking on the link sent to you in the same Email address.</sub>
            </FlexDiv> 
            {/* <Button typeVariant="text" typeColor="primary">Send new verification link</Button> */}
            <Button typeVariant="text" typeColor="primary" onClickFnc={sendVerification}>Send new verification link</Button>
        </FlexDiv>
    )
}