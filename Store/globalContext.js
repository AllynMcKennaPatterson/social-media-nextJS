// Lets do all database stuff here and just share this global context with the rest of the App
// - so no database code anywhere else in our App
// - every CRUD function the App needs to do is in here, in one place
// - makes debugging etc so much easier
// - all external connections still have to go through /api routes

import { comma } from "postcss/lib/list";
import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const [globals, setGlobals] = useState({
    hideModal: true, posts: [], meetings: [],
    loggedIn: false,
    currentUser: null,
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts() {
    const response = await fetch("/api/get-posts", {
      method: "GET",
      // body: JSON.stringify({ posts: "all" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGlobals((previousGlobals) => {
      const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
      newGlobals.posts = data
      if (newGlobals.posts === undefined) {
        newGlobals.dataLoaded = false;
      } else {
        newGlobals.dataLoaded = true;
        // console.log("All posts from database: ", JSON.stringify(newGlobals.posts))
      }
      return newGlobals;
    });
  }

  async function editGlobalData(command) {
    // {cmd: someCommand, newVal: 'new text'}
    if (command.cmd == "hideModal") {
      // {cmd: 'hideHamMenu', newVal: false}
      //  WRONG (globals object reference doesn't change) and react only looks at its 'value' aka the reference, so nothing re-renders:
      //    setGlobals((previousGlobals) => { let newGlobals = previousGlobals; newGlobals.hideHamMenu = command.newVal; return newGlobals })
      // Correct, we create a whole new object and this forces a re-render:
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        newGlobals.hideModal = command.newVal;
        return newGlobals;
      });
    }
    if (command.cmd == "addPost") {
      console.log(command.newVal)
      const response = await fetch("/api/new-post", {
        method: "POST",
        body: JSON.stringify(command.newVal),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json(); // Should check here that it worked OK
      // console.log(data)
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        // console.log(JSON.stringify(globals.posts))
        // console.log(JSON.stringify(newGlobals.posts))
        newGlobals.posts.push(command.newVal)
        console.log(newGlobals.posts)
        return newGlobals;
      });
    }

    if (command.cmd == "logIn") {
      const response = await fetch("/api/log-in", {
        method: "POST",
        body: JSON.stringify(command.newVal),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json(); // Should check here that it worked OK
      // console.log({data.username,data.profilepic})
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        // Check if credentials are valid before setting loggedIn to true
        if (data !== null) {
          // console.log(data)
          newGlobals.loggedIn = true;
          // let {username,profilepic} = data
          const newUser = {username,profilepic}
          console.log(JSON.stringify(newUser))
          newGlobals.currentUser = newUser
          console.log("changed globals after login")
        }
        return newGlobals;
      });
    }

    if (command.cmd == "signUp") {
      console.log(command.newVal)
      const response = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(command.newVal),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json(); // Should check here that it worked OK
      console.log("Signup status:", data)
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        // Check if credentials are valid before setting loggedIn to true
        console.log("signed in")
        if (data.Signup === true) {
          newGlobals.loggedIn = true
          let {username, profilepic} = command.newVal
          let newUser = {username, profilepic}
          newGlobals.currentUser = newUser
        }
        // verify that currentUser object is being updated
        console.log(newGlobals.currentUser)
        return newGlobals;
      })
    }
  }

  const context = {
    updateGlobals: editGlobalData,
    theGlobalObject: globals,
  }

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
