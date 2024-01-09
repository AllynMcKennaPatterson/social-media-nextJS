
import { useContext } from "react";
import classes from "./Post.module.css";
import GlobalContext from "@/Store/globalContext";

function Post(props) {
  const globalCtx = useContext(GlobalContext);


  if (globalCtx.theGlobalObject.loggedIn == false) {
    return (
      <div className={classes.item}>
        <div className={classes.username}>
          <h3>{props.username}</h3>
        </div>
        <div className={classes.postImage}>
          <img src={props.image} alt={props.username} />
          <div className={classes.frosted}><h2 className={classes.message}>Log In To View Posts</h2></div>
        </div>
        <div className={classes.caption}>
          <h4 style={{marginRight:'5px'}}>{props.username}:</h4>
          <p>{props.text}</p>
        </div>
      </div>
    );
  }
  else{
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
      </div>
    );
  }
}

export default Post;
