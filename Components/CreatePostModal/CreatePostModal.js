//This component is used in HomePage.js
//This is shown when CreatePostBtn is clicked
//It is hidden when the backdrop is clicked

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useRef } from "react";
import classes from "./CreatPostModal.module.css";

// import Link from "next/link";
// import ImgUpload from "../ImgUpload/ImgUpload";

function CreatePostModal(props) {
  if (!props.open) return null;
  const usernameInputRef = useRef();
  const contentInputRef = useRef();
  const imageInputRef = useRef();

  function zeroPad(number) {
    return number < 10 ? "0" + number : number;
  }

  function submitHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
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
        zeroPad(today.getMonth()) +
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
            e.stopPropagation(); //Prevents onClick from propogating to nested elements below
          }}
        >
          <div className={classes.postContainer}>
            <h1>Create your post</h1>
            <div className={classes.content}>
              <div className={classes.control}>
                <label htmlFor="username" className={classes.label}>
                  Username
                </label>
                <input
                  type="text"
                  required
                  id="username"
                  ref={usernameInputRef}
                  className={classes.inputBox}
                />
              </div>
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
              {/* <div className={classes.control}>
                <label htmlFor="image">Time</label>
                <input type="text" required id="image" ref={timeInputRef} />
              </div> */}
              <button className={classes.postBtn}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePostModal;
