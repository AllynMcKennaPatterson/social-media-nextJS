import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import GlobalContext from "../../Store/globalContext";
import classes from "./HomePage.module.css";

import Header from "@/Components/Header/Header";
import CreatePostModal from "@/Components/CreatePostModal/CreatePostModal";
import CreatePostBtn from "@/Components/CreatePostBtn/CreatePostBtn";
import HomeFeed from "@/Components/Home/HomeFeed/HomeFeed";
import UserList from "@/Components/UserList/UserList";

function HomePage() {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const globalCtx = useContext(GlobalContext);

  async function addPostHandler(enteredPostData) {
    await globalCtx.updateGlobals({ cmd: "addPost", newVal: enteredPostData });
    router.push("/");
  }

  if (globalCtx.theGlobalObject.dataLoaded == true) {
    return (
      <div className={classes.componentContainer}>
        <CreatePostModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAddPost={addPostHandler}
        />
        <CreatePostBtn
          setOpenModal={() => setOpenModal(true)}
          isLoggedIn={globalCtx.theGlobalObject.loggedIn}
        />
        <div className={classes.layers}>
          <Header />
          <div className={classes.componentContainer}>
            <HomeFeed
              posts={globalCtx.theGlobalObject.posts}
              followUsers={globalCtx.theGlobalObject.usersToFollow}
              unfollowUsers={globalCtx.theGlobalObject.usersToUnfollow}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.home}>
        <CreatePostModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAddPost={addPostHandler}
        />
        <CreatePostBtn setOpenModal={() => setOpenModal(true)} />
        <Header />
        <div className={classes.componentContainer}>
          <div>Loading data from database, please wait . . . </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
