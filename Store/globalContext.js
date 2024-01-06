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
    hideModal: true,
    posts: [],
    users: [],
    meetings: [],
    loggedIn: false,
    currentUser: null,
  });

  useEffect(() => {
    getAllPosts();
    updateUserList();
  }, []);

  async function updateUserList() {
    const response = await fetch("/api/get-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGlobals((previousGlobals) => {
      const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
      newGlobals.users = data;
      let arrayWithoutCurrentUser = [];
        if (newGlobals.currentUser === null) {
          return newGlobals;
        }
        else{
          newGlobals.users.forEach((user) => {
          if (user.username !== JSON.parse(newGlobals.currentUser).username) {
            arrayWithoutCurrentUser.push(user)
          }
          });
        }
      newGlobals.users = arrayWithoutCurrentUser;
      return newGlobals;
    });
  }

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
      newGlobals.posts = data;
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
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        newGlobals.hideModal = command.newVal;
        return newGlobals;
      });
    }
    if (command.cmd == "addPost") {
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
        newGlobals.posts.push(command.newVal);
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
          let { username, profilepic } = data;
          const newUser = { username, profilepic };
          console.log(JSON.stringify(newUser));
          newGlobals.currentUser = JSON.stringify(newUser);

          console.log("changed globals after login");
        }
        updateUserList();
        return newGlobals;
      });
    }

    if (command.cmd == "signUp") {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(command.newVal),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json(); // Should check here that it worked OK
      console.log("Signup status:", data);
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        // Check if credentials are valid before setting loggedIn to true
        console.log("signed in");
        if (data.Signup === true) {
          newGlobals.loggedIn = true;
          let { username, profilepic } = command.newVal;
          let newUser = { username, profilepic };
          newGlobals.currentUser = JSON.stringify(newUser);
        }
        // verify that currentUser object is being updated
        console.log(newGlobals.currentUser);
        updateUserList();
        return newGlobals;
      });
    }

    // if (command.cmd == "getFollowing") {
    //   const response = await fetch("/api/get-following/{}", {
    //     method: "GET",
    //     body: command.newVal,
    //   })
    //   const data = await response.json()
    //   console.log("Follwing list:", data)
    //   setGlobals((previousGlobals) => {
    //     const newGlobals = JSON.parse(JSON.stringify(previousGlobals))
    //     // verify that currentUser object is being updated
    //     console.log(newGlobals.currentUser)
    //     return newGlobals;
    //   })
    // }
  }
  const context = {
    updateGlobals: editGlobalData,
    theGlobalObject: globals,
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}
export default GlobalContext;
