import GlobalContext from "@/Store/globalContext";
import classes from "./FollowUser.module.css";
import Card from "../Card/Card";
import Link from "next/link";

export default function FollowUser(props) {
  return (
    <div className={classes.userContainer}>
      {/* <img src={props.profilePic} />
            <p>{props.username}</p> */}
      <div className={classes.profilePic}>
        <img src="https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg" />
      </div>
      <p className={classes.username}>User</p>
      {/* <div className={classes.link}>
        Follow
      </div> */}
      <Link className={classes.link} href="/">
            <p className={classes.buttonText}>Follow</p>
        </Link>
    </div>
  );
}
