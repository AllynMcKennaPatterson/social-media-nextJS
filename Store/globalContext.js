// Lets do all database stuff here and just share this global context with the rest of the App
// - so no database code anywhere else in our App
// - every CRUD function the App needs to do is in here, in one place
// - makes debugging etc so much easier
// - all external connections still have to go through /api routes

import { comma } from "postcss/lib/list";
import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const defaultGlobals = {
    hideModal: true,
    posts: [],
    allPosts: [],
    users: [],
    usersToFollow: [],
    usersToUnfollow: [],
    followList: [],
    loggedIn: false,
    currentUser: null,
  };
  const [globals, setGlobals] = useState(defaultGlobals);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(true);
    getAllPosts();
  }, []);

  useEffect(() => {
    updateUserList();
    getFilteredPosts();
    getAllPosts();
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    getFilteredPosts();
  }, [globals.loggedIn]);


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
      let listOfFollowedUsers = [];
      // console.log(JSON.stringify(newGlobals.followList))
      if (newGlobals.currentUser === null || newGlobals.followList == undefined) {
        newGlobals.usersToFollow = data;
        return newGlobals;
      } else {
        newGlobals.users.forEach((user) => {
          if (
            user.username !== JSON.parse(newGlobals.currentUser).username &&
            newGlobals.followList.includes(user.username) !== true
          ) {
            arrayWithoutCurrentUser.push(user);
          }
          else{
            if(user.username !== JSON.parse(newGlobals.currentUser).username){
              listOfFollowedUsers.push(user);
            }
          }
        });
      }
      // console.log("arraywithoutcurruser " + JSON.stringify(arrayWithoutCurrentUser))
      // console.log("listOfFollowedUserObjs  " + JSON.stringify(listOfFollowedUsers))
      newGlobals.usersToFollow = arrayWithoutCurrentUser;
      newGlobals.usersToUnfollow = listOfFollowedUsers;
      // console.log("usertofollow: " + JSON.stringify(newGlobals.usersToFollow))
      // console.log("followed USers : " + JSON.stringify(newGlobals.usersToUnfollow))
      return newGlobals;
    });
  }

  async function getAllPosts() {
    const response = await fetch("/api/get-posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGlobals((previousGlobals) => {
      const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
      newGlobals.allPosts = data;
      if (newGlobals.allPosts === undefined) {
        newGlobals.dataLoaded = false;
      } else {
        newGlobals.dataLoaded = true;
      }
      // console.log("All posts" + JSON.stringify(newGlobals.allPosts))
      return newGlobals;
    });
  }

  async function getFilteredPosts() {
    const response = await fetch("/api/get-posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGlobals((previousGlobals) => {
      const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
      newGlobals.posts = data;
      let filteredPosts = [];
      if (globals.loggedIn == true) {
        newGlobals.posts.forEach((post) => {
          if (newGlobals.followList.includes(post.userName) == true) {
            filteredPosts.push(post);
          }
        });
        newGlobals.posts = filteredPosts;
      } else {
        newGlobals.posts = data;
      }
      if (newGlobals.posts === undefined) {
        newGlobals.dataLoaded = false;
      } else {
        newGlobals.dataLoaded = true;
      }
      return newGlobals;
    });
  }

  async function getFollowList(username) {
    console.log("Username from getFollowList: " + username);
    const response = await fetch(`/api/get-following/${username}`, {
      method: "GET",
    });
    const data = await response.json();
    setGlobals((previousGlobals) => {
      const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
      newGlobals.followList = data;
      newGlobals.loggedIn = true;
      console.log(
        "New globals follow list from getFollowList: " + newGlobals.followList
      );
      updateUserList();
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
        // newGlobals.allPosts.push(command.newVal);
        setRefresh(true);
        return newGlobals;
      });
    }
    if (command.cmd == "addFollow") {
      const response = await fetch("/api/follow-user", {
        method: "POST",
        body: JSON.stringify(command.newVal),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Data" + JSON.stringify(data));
      if (JSON.stringify(data.followed) == "true") {
        setGlobals((previousGlobals) => {
          const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
          newGlobals.followList.push(command.newVal.userToFollow);
          setRefresh(true);
          return newGlobals;
        });
      } else if (JSON.stringify(data.followed) == "false") {
        console.log("Data value = false");
      }
    }

    if (command.cmd == "removeFollow") {
      const response = await fetch("/api/unfollow-user", {
        method: "POST",
        body: JSON.stringify(command.newVal),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      let updatedFollowList = [];
      console.log("Data" + JSON.stringify(data));
      if (JSON.stringify(data.unfollowed) == "true") {
        setGlobals((previousGlobals) => {
          const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
          console.log("FOLLOWLIST BEFORE UF: " + JSON.stringify(newGlobals.followList))
          console.log("Updated followlist: " + JSON.stringify(updatedFollowList))

          console.log("USER TO UNFOLLOW: " + command.newVal.userToFollow)
          newGlobals.followList.forEach(name => {
            if(name !== command.newVal.userToFollow){
              console.log("Pushing " + name + " to updatedFollowList")
              updatedFollowList.push(name);
            }
            
          });
          newGlobals.followList = [];
          console.log("UPDATED FL AFTER FOREACH: " + updatedFollowList)
          newGlobals.followList = updatedFollowList;
          console.log("UPDATED FOLLOWLIST AFTER UF: " + newGlobals.followList)

          
          setRefresh(true);
          return newGlobals;
        });
      } else if (JSON.stringify(data.followed) == "false") {
        console.log("Data value = false");
      }
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
          let { username, profilepic, email } = data;
          const newUser = { username, profilepic, email };
          newGlobals.currentUser = JSON.stringify(newUser);
          getFollowList(newUser.username);
        }
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

      // Haven't tested this logic yet, will have to ensure it works when we connect to front end
      const response2 = await fetch(
        `/api/init-following/${command.newVal.username}`,
        {
          method: "POST",
        }
      );
    }

    if (command.cmd == "getFollowing") {
      const response = await fetch(`/api/get-following/${command.newVal}`, {
        method: "GET",
      });
      const data = await response.json();
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        newGlobals.followList = data;
        return newGlobals;
      });
    }

    if (command.cmd == "signOut") {
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        newGlobals.followList = [];
        newGlobals.loggedIn = false;
        newGlobals.currentUser = null;
        newGlobals.userToFollow = [];
        newGlobals.usersToUnfollow = [];
        setRefresh(true);
        return newGlobals;
      });
    }
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
