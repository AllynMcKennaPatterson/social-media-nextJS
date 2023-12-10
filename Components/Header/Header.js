//This component is shown on every page

import { useRouter } from "next/navigation";
import { useContext } from "react";
import classes from "./Header.module.css";

import Link from "next/link";

function Header() {
  return (
    <div className={classes.mainNavbar}>
      <div className={classes.logoContainer}>
        <Link className={classes.link} href="/">
          <p className={classes.navButton}>Home</p>
        </Link>
      </div>
      <div>
        <div className={classes.searchInputContainer}>
          {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" /> */}
          <input
            type="text"
            name=""
            id=""
            className={classes.searchInput}
            placeholder="search your friends"
          ></input>
        </div>
      </div>
      <div className={classes.iconsContainer}>
        {/* <FontAwesomeIcon icon={faBell} className="icons" />
        <FontAwesomeIcon icon={faMessage} className="icons" /> */}
        <Link className={classes.link} href="/Profile">
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <img src={`${ProfileImage}`} alt="" className="profileImage"></img> */}
            <p style={{ marginLeft: "5px" }}>My Profile</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
