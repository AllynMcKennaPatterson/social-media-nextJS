//This component is used in HomePage.js
//It shows the CreatePostModal

import classes from "./CreatePostBtn.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function CreatePostBtn(props) {
  return (
    <div className={classes.mainDiv} onClick={() => props.setOpenModal(true)}>
      <span className={classes.mainSpan}>
        <IconContext.Provider
          value={{
            color: "#0b0a52",
          }}
        >
          <AiFillPlusCircle />
        </IconContext.Provider>
      </span>
    </div>
  );
}
