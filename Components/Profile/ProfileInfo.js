// import Card from "../ui/Card";
import classes from "./ProfileInfo.module.css";
// import { useRouter } from "next/router";

function ProfileInfo(props) {
  //   const router = useRouter();

  //   function showDetailsHandler() {
  //     router.push("/" + props.id);
  //   }

  return (
    <li className={classes.item}>
      <div className={classes.username}>
        <h3>test</h3>
      </div>
      <div className={classes.postImage}>
        <img src={props.pro} alt={props.username} />
      </div>
      <div className={classes.caption}>
        <h4 style={{marginRight:'5px'}}>{props.username}:</h4>
        <p>{props.text}</p>
      </div>
      {/* <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div> */}
    </li>
  );
}

export default ProfileInfo;
