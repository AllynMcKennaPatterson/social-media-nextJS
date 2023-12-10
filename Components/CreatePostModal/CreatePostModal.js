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
  const timeInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredContent = contentInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredTime = timeInputRef.current.value;

    const postData = {
      username: enteredUsername,
      content: enteredContent,
      image: enteredImage,
      time: enteredTime,
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
            <div className={classes.control}>
              <label htmlFor="image">Username</label>
              <input type="text" required id="image" ref={usernameInputRef} />
            </div>
            <div className={classes.content}>
              <label htmlFor="content">Post text</label>
              <textarea
                id="description"
                required
                rows="5"
                className={classes.input}
                ref={contentInputRef}
              ></textarea>
              <div className={classes.control}>
                <label htmlFor="image">Meetup Image</label>
                <input type="url" required id="image" ref={imageInputRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor="image">Time</label>
                <input type="text" required id="image" ref={timeInputRef} />
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
