//This component is shown on HomePage.js
//It will show all posts from the user's friends

import { useRouter } from "next/navigation";
import classes from "./HomeFeed.module.css";

// import Link from "next/link";
import Post from "../Post/Post";
// import PostContent from "../PostContent/PostContent";
// import CreatePostModal from "@/Components/CreatePostModal/CreatePostModal";

function HomeFeed(props) {
  return (
    <div className={classes.mainPostContainer}>
      <ul className={classes.list}>
        {props.posts.map((post) => (
          <Post
            // key={meetup.meetingId}
            username={post.userName}
            image={post.imgString}
          // content={post.}

          // title={post.title}
          // address={post.address}
          />
        ))}
      </ul>
    </div>
  );
}

export default HomeFeed;
