//This component is shown on every page

import { useRouter } from "next/navigation";
import { useContext } from "react";
import classes from "./Header.module.css";
import { FaUser } from "react-icons/fa";
import GlobalContext from "@/Store/globalContext";
import Link from "next/link";
import { IconContext } from "react-icons";
// import myLogo from "./logo.png";

function Header() {
  const globalCtx = useContext(GlobalContext);

  if (globalCtx.theGlobalObject.loggedIn == true) {
    return (
      <div className={classes.mainNavbar}>
        <div className={classes.logoContainer}>
          <Link className={classes.link} href="/">
            <p className={classes.buttonText}>Home</p>
          </Link>
        </div>
        {/* <div className={classes.logoContainer}>
          <img src={myLogo} alt="picSync logo" />
        </div> */}
        <div className={classes.iconsContainer}>
          <IconContext.Provider
            value={{ color: "#000", size: "30px", marginRight: "5px" }}
          >
            <FaUser />
          </IconContext.Provider>
          <Link className={classes.link} href="/Profile">
            <p className={classes.buttonText}>My Profile</p>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.mainNavbar}>
        <div className={classes.logoContainer}>
          <Link className={classes.link} href="/">
            <p className={classes.buttonText}>Home</p>
          </Link>
        </div>
        {/* <div>
          <div className={classes.logoContainer}>
            <a src={myLogo} alt="picSync logo" className={classes.logo} />
          </div>
        </div> */}
        <div className={classes.logIn}>
          <Link className={classes.link} href="/LogIn">
            <p className={classes.buttonText}>Log In</p>
          </Link>
          <Link className={classes.link} href="/SignUp">
            <p className={classes.buttonText}>Sign Up</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
