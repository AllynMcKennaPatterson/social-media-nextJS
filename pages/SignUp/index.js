import classes from "./LogIn.module.css";
import { useRef } from "react";
import GlobalContext from "@/Store/globalContext";
import { useContext } from "react";

import Header from "@/Components/Header/Header";
import { useRouter } from "next/navigation";
import SignUp from "@/Components/SignUp/SignUp";

function SignUpPage(props) {
    const router = useRouter();
    const globalCtx = useContext(GlobalContext);

  async function signUpHandler(enteredPostData) {
    await globalCtx.updateGlobals({ cmd: "signUp", newVal: enteredPostData });
    router.push("/");
  }

  return (
    
    <div className={classes.profileContainer}>
      <Header />
        <SignUp
            onSignUp={signUpHandler}
        />
    </div>
  );
}

export default SignUpPage;
