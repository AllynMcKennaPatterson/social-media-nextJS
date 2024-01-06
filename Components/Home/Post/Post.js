
import classes from "./Post.module.css";

function Post(props) {

  return (
    <div className={classes.item}>
      <div className={classes.username}>
        <h3>{props.username}</h3>
      </div>
      <div className={classes.postImage}>
        <img src={props.image} alt={props.username} />
      </div>
      <div className={classes.caption}>
        <h4 style={{marginRight:'5px'}}>{props.username}:</h4>
        <p>{props.text}</p>
      </div>
      {/* <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div> */}
    </div>
  );
}

export default Post;
