import classes from "./LogIn.module.css";
import GlobalContext from "@/Store/globalContext";
import { useContext } from "react";

import Header from "@/Components/Header/Header";
import LogIn from "@/Components/LogIn/LogIn";
import { useRouter } from "next/navigation";
import Card from "@/Components/Card/Card";

function LogInPage() {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);

  async function logInHandler(enteredPostData) {
    await globalCtx.updateGlobals({ cmd: "logIn", newVal: enteredPostData });
    router.push("/");
  }

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <Card>
          <LogIn onLogIn={logInHandler} />
        </Card>
      </div>
    </div>
  );
}

export default LogInPage;
