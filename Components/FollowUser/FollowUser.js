import GlobalContext from "@/Store/globalContext";
import classes from "./FollowUser.module.css";
import Card from "../Card/Card";
import Link from "next/link";
import {useContext } from "react";

export default function FollowUser(props) {
  const globalCtx = useContext(GlobalContext);

  async function followHandler(){
    let userFollowing = {myUsername: JSON.parse(globalCtx.theGlobalObject.currentUser).username, userToFollow: props.username, email: JSON.parse(globalCtx.theGlobalObject.currentUser).email}
    console.log("Followed: " + JSON.stringify(userFollowing))
    await globalCtx.updateGlobals({ cmd: "addFollow", newVal: userFollowing});
  }

  async function unfollowHandler(){
    let userFollowing = {myUsername: JSON.parse(globalCtx.theGlobalObject.currentUser).username, userToFollow: props.username, email: JSON.parse(globalCtx.theGlobalObject.currentUser).email}
    console.log("Unfollowed: " + JSON.stringify(userFollowing))
    await globalCtx.updateGlobals({ cmd: "removeFollow", newVal: userFollowing});
  }

  if(globalCtx.theGlobalObject.currentUser === null){
    return (
      <div className={classes.userContainer}>
        <div className={classes.profilePic}>
          <img src={props.profilepic} />
        </div>
        <p className={classes.username}>{props.username}</p>
        <Link className={classes.linkDisabled} href="/LogIn">
          <p className={classes.buttonText}>Log In to Follow</p>
        </Link>
      </div>
    );
  }
  else{
    if(props.method == "follow"){
      return (
      <div className={classes.userContainer}>
        <div className={classes.profilePic}>
          <img src={props.profilepic} />
        </div>
        <p className={classes.username}>{props.username}</p>
        <Link className={classes.link} href="/" onClick={followHandler}>
          <p className={classes.buttonText}>Follow</p>
        </Link>
      </div>
    );
    }
    else if(props.method == "unfollow"){
      return (
      
        <div className={classes.userContainer}>
          <div className={classes.profilePic}>
            <img src={props.profilepic} />
          </div>
          <p className={classes.username}>{props.username}</p>
          <Link className={classes.linkUnfollow} href="/" onClick={unfollowHandler}>
            <p className={classes.buttonText}>Unfollow</p>
          </Link>
        </div>
      );
    }
  }
}
