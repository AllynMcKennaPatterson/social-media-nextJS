import classes from "./SignUp.module.css";
import { useRef } from "react";
import GlobalContext from "@/Store/globalContext";
import { useContext } from "react";

import Header from "@/Components/Header/Header";
import { useRouter } from "next/navigation";
import SignUp from "@/Components/SignUp/SignUp";
import Card from "@/Components/Card/Card";

function SignUpPage(props) {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);

  async function signUpHandler(enteredPostData) {
    await globalCtx.updateGlobals({ cmd: "signUp", newVal: enteredPostData });
    router.push("/");
  }

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <Card>
          <SignUp onSignUp={signUpHandler} />
        </Card>
      </div>
    </div>
  );
}

export default SignUpPage;
