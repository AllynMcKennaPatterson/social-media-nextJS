import Card from "@/Components/Card/Card";
import classes from "./ExploreCard.module.css"
import PostPreview from "../PostPreview/PostPreview";

export default function ExploreCard(props) {
  return (
      <div className={classes.exploreCardContainer}>
      <Card><h3>All Posts</h3>
        <div className={classes.contents}>
          
        <ul className={classes.list}>
        {props.posts.map((post, currentUser) => (
          <li className={classes.postContainer}>
            <PostPreview
              username={post.userName}
              image={post.imgString}
              text={post.postText}
              profilepic={currentUser.profilepic}
            />
          </li>
          
        ))}
      </ul>
        </div>
        
      </Card>
      
    </div>
    
    
  );
}
