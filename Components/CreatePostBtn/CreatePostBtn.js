//This component is used in HomePage.js
//It shows the CreatePostModal

import classes from "./CreatePostBtn.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Link from "next/link";

export default function CreatePostBtn(props) {
  if (props.isLoggedIn != true) {
    return (
      <div className={classes.mainDiv}>
        <Link className={classes.linkAlt} href="/LogIn">
            <p className={classes.buttonText}>Log In to Create a Post</p>
          </Link>
      </div>
    );
  } else {
    return (
      <div className={classes.mainDiv} onClick={() => props.setOpenModal(true)}>
        <Link className={classes.link} href="/">
            <p className={classes.buttonText}>Create a Post</p>
          </Link>
      </div>
    );
  }
}
