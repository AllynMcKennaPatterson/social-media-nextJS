//This component is shown on every page

import { useRouter } from "next/navigation";
import { useContext } from "react";
import classes from "./Header.module.css";
import { FaUser } from "react-icons/fa";
import GlobalContext from "@/Store/globalContext";
import Link from "next/link";
import { IconContext } from "react-icons";

function Header() {
  const globalCtx = useContext(GlobalContext);

  if (globalCtx.theGlobalObject.loggedIn == true) {
    return (
      <div className={classes.mainNavbar}>
        <div className={classes.logoContainer}>
          <Link className={classes.link} href="/">
            <p style={{ color: "#33024d" }}>Home</p>
          </Link>
        </div>
        <div>
        </div>
        <div className={classes.iconsContainer}>
          <IconContext.Provider
            value={{ color: "#33024d", size: "30px", marginRight: "5px" }}
          >
            <FaUser />
          </IconContext.Provider>
          <Link className={classes.link} href="/Profile">
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginLeft: "5px", color: "#33024d" }}>My Profile</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className={classes.mainNavbar}>
        <div className={classes.logoContainer}>
          <Link className={classes.link} href="/">
            <p style={{ color: "#33024d" }}>Home</p>
          </Link>
        </div>
        <div>
        </div>
        <div className={classes.logIn}>
          <Link className={classes.link} href="/LogIn">
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginLeft: "5px", color: "#33024d" }}>Log In</p>
            </div>
          </Link>
          <h2> | </h2>
          <Link className={classes.link} href="/SignUp">
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginLeft: "5px", color: "#33024d" }}>Sign Up</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
