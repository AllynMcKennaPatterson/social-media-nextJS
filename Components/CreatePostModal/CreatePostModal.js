import { useContext, useState } from "react";
import { useRef } from "react";
import classes from "./CreatPostModal.module.css";
import GlobalContext from "@/Store/globalContext";

function CreatePostModal(props) {
  const globalctx = useContext(GlobalContext);
  if (!props.open) return null;
  const contentInputRef = useRef();
  const imageInputRef = useRef();

  function zeroPad(number) {
    return number < 10 ? "0" + number : number;
  }

  function submitHandler(event) {
    event.preventDefault();

    let currUser = JSON.parse(globalctx.theGlobalObject.currentUser);

    const enteredUsername = currUser.username;
    const enteredContent = contentInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    let today = new Date();

    const postData = {
      userName: enteredUsername,
      postText: enteredContent,
      imgString: enteredImage,
      dateTimeofUpload:
        today.getFullYear() +
        "-" +
        zeroPad(today.getMonth() + 1) +
        "-" +
        zeroPad(today.getDate()) +
        "T" +
        zeroPad(today.getHours()) +
        ":" +
        zeroPad(today.getMinutes()) +
        ":" +
        zeroPad(today.getSeconds()),
    };
    console.log(postData);
    props.onAddPost(postData);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.overlay} onClick={props.onClose}>
        <div
          className={classes.card}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={classes.postContainer}>
            <h1>Create your post</h1>
            <div className={classes.content}>
              <div className={classes.control}>
                <label htmlFor="content" className={classes.label}>
                  Post text
                </label>
                <input
                  type="text"
                  required
                  id="text"
                  ref={contentInputRef}
                  className={classes.inputBox}
                />
              </div>

              <div className={classes.control}>
                <label htmlFor="image" className={classes.label}>
                  Post Image
                </label>
                <input
                  type="url"
                  required
                  id="image"
                  ref={imageInputRef}
                  className={classes.inputBox}
                />
              </div>
              <button className={classes.postBtn}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePostModal;
