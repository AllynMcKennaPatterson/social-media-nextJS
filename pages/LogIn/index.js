import classes from "./LogIn.module.css";
import { useRef } from "react";
import GlobalContext from "@/Store/globalContext";
import { useContext } from "react";

import Header from "@/Components/Header/Header";
import LogIn from "@/Components/LogIn/LogIn";
import { useRouter } from "next/navigation";

function LogInPage(props) {
    const router = useRouter();
    const globalCtx = useContext(GlobalContext);

  async function logInHandler(enteredPostData) {
    await globalCtx.updateGlobals({ cmd: "logIn", newVal: enteredPostData });
    router.push("/");
  }

  return (
    
    <div className={classes.profileContainer}>
      <Header />
        <LogIn
            onLogIn={logInHandler}
        />
    </div>
  );
}

export default LogInPage;
