
import { useContext } from "react";
import classes from "./PostPreview.module.css";
import GlobalContext from "@/Store/globalContext";
import Card from "@/Components/Card/Card";

function PostPreview(props) {
  const globalCtx = useContext(GlobalContext);


  if (globalCtx.theGlobalObject.loggedIn == false) {
    return (
        <div className={classes.item}>
        <div className={classes.postImageAlt}>
          <img src={props.image} alt={props.username} />
          
        </div> 
        <div className={classes.frosted}></div>
      </div>
    );
  }
  else{
    return (
      <div className={classes.item}>
        <div className={classes.postImage}>
          <img src={props.image} alt={props.username} />
        </div>
      </div>
    );
  }
}

export default PostPreview;
