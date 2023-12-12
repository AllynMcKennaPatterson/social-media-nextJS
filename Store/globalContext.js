// Lets do all database stuff here and just share this global context with the rest of the App
// - so no database code anywhere else in our App
// - every CRUD function the App needs to do is in here, in one place
// - makes debugging etc so much easier
// - all external connections still have to go through /api routes

import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const [globals, setGlobals] = useState({
    hideModal: true,
    posts: undefined,
    dataLoaded: false,
    loggedIn: false,
    userData: [],
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
    console.log(data)
    setGlobals((previousGlobals) => {
      const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
      newGlobals.posts = data.posts;
      if (newGlobals.posts === undefined) {
        newGlobals.dataLoaded = false;
      } else {
        newGlobals.dataLoaded = true;
        console.log(newGlobals.posts  )
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
        body: command.newVal,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json(); // Should check here that it worked OK
      console.log(data)
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        console.log(globals.posts)
        console.log(newGlobals.posts)
        newGlobals.posts.push(JSON.stringify(command.newVal))
        console.log(newGlobals.posts)
        return newGlobals;
      });
    }
    // if (command.cmd == "logIn") {
    //     const response = await fetch("../pages/api/log-in", {
    //       method: "POST",
    //       body: JSON.stringify(command.newVal),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const data = await response.json(); // Should check here that it worked OK
    //     setGlobals((previousGlobals) => {
    //       const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
    //       //Check if credentials are valid before setting loggedIn to true
    //     //   newGlobals.loggedIn = true;
    //     //   newGlobals.currentUser =
    //       return newGlobals;
    //     });
    //   }

    // if (command.cmd == "signUp") {
    //     const response = await fetch("../pages/api/sign-up", {
    //       method: "POST",
    //       body: JSON.stringify(command.newVal),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const data = await response.json(); // Should check here that it worked OK
    //     setGlobals((previousGlobals) => {
    //       const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
    //       //Check if credentials are valid before setting loggedIn to true
    //     //   newGlobals.loggedIn = true;
    //     //   newGlobals.currentUser =
    //       return newGlobals;
    //     });
    //   }
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
