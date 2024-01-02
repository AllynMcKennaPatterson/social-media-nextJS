import classes from "./HomeFeed.module.css";
import { useContext, useState } from "react";
import Post from "../Post/Post";
import Card from "@/Components/Card/Card";
import UserList from "@/Components/UserList/UserList";
import GlobalContext from "@/Store/globalContext";

function HomeFeed(props) {

  const globalCtx = useContext(GlobalContext);
  return (
    <div className={classes.mainPostContainer}>
      <div className={classes.userListContainer}>
        <UserList users={globalCtx.theGlobalObject.users}/>
      </div>
        
      <ul className={classes.list}>
        {props.posts.map((post, currentUser) => (
          <div className={classes.postContainer}>
            <Card>
            <Post
              username={post.userName}
              image={post.imgString}
              text={post.postText}
              profilepic={currentUser.profilepic}
            />
          </Card>
          </div>
          
        ))}
      </ul>
      <div className={classes.userListContainer}>
      </div>
    </div>
  );
}

export default HomeFeed;
