import classes from "./LogIn.module.css";
import { useRef } from "react";
import GlobalContext from "@/Store/globalContext";
import { useContext } from "react";

import Header from "@/Components/Header/Header";
import Link from "next/link";

function LogIn(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  function logInHandler(event) {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const logInData = {
      username: enteredUsername,
      password: enteredPassword,
    };
    console.log(logInData);
    props.onLogIn(logInData);
  }

  return (
    <form className={classes.postContainer} onSubmit={logInHandler}>
      <h1>Log in to your account</h1>
      <div className={classes.content}>
        <div className={classes.control}>
          <label htmlFor="username" className={classes.label}>
            Username
          </label>
          <input
            type="text"
            required
            id="username"
            ref={usernameInputRef}
            className={classes.inputBox}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image" className={classes.label}>
            Password
          </label>
          <input
            type="password"
            required
            id="password"
            ref={passwordInputRef}
            className={classes.inputBox}
          />
        </div>
        <div>
          <button className={classes.postBtn}>Log in</button>
          <Link className={classes.link} href="/SignUp">
            <button className={classes.postBtn}>Create account</button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LogIn;
