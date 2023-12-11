import classes from "./SignUp.module.css";
import { useRef } from "react";

function SignUp(props) {
    const emailInputRef = useRef();
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    function signUpHandler(event) {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
    
        const signUpData = {
          email: enteredEmail,
          userName: enteredUsername,
          password: enteredPassword,
        };
        console.log(signUpData);
        props.onSignUp(signUpData);
      }

  return (
      <form className={classes.postContainer} onSubmit={signUpHandler}>
            <h1>Create a new account</h1>
            <div className={classes.content}>
                    <div className={classes.control}>
                <label htmlFor="username" className={classes.label}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  id="username"
                  ref={emailInputRef}
                  className={classes.inputBox}
                />
              </div>
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
              <button className={classes.postBtn}>Create account</button>
              </div>
              
            </div>
      </form>
  );
}

export default SignUp;