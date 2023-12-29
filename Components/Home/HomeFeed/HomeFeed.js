import classes from "./HomeFeed.module.css";
import Post from "../Post/Post";
import Card from "@/Components/Card/Card";

function HomeFeed(props) {
  return (
    <div className={classes.mainPostContainer}>
      <ul className={classes.list}>
        {props.posts.map((post) => (
          <Card>
            <Post
            username={post.userName}
            image={post.imgString}
            text={post.postText}
          />
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default HomeFeed;
