import GlobalContext from "@/Store/globalContext";
import classes from "./FollowUser.module.css";
import Card from "../Card/Card";
import Link from "next/link";

export default function FollowUser(props) {
  return (
    <div className={classes.userContainer}>
      <div className={classes.profilePic}>
        <img src={props.profilepic} />
      </div>
      <p className={classes.username}>{props.username}</p>
      <Link className={classes.link} href="/">
        <p className={classes.buttonText}>Follow</p>
      </Link>
    </div>
  );
}
