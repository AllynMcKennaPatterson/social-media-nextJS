import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import GlobalContext from "../../Store/globalContext";
import classes from "./HomePage.module.css";

import Header from "@/Components/Header/Header";
import CreatePostModal from "@/Components/CreatePostModal/CreatePostModal";
import CreatePostBtn from "@/Components/CreatePostBtn/CreatePostBtn";
import HomeFeed from "@/Components/Home/HomeFeed/HomeFeed";

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
      <>
        <CreatePostModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAddPost={addPostHandler}
        />
        <CreatePostBtn setOpenModal={() => setOpenModal(true)} />
        <Header />
        <HomeFeed posts={globalCtx.theGlobalObject.posts} />
      </>
    );
  }
  return (
    <>
      <CreatePostModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddPost={addPostHandler}
      />
      <CreatePostBtn setOpenModal={() => setOpenModal(true)} />
      <Header />
      <div>Loading data from database, please wait . . . </div>
    </>
  );

  //Here for testing
  //   return (
  //     <>
  //       <CreatePostModal
  //         open={openModal}
  //         onClose={() => setOpenModal(false)}
  //         onAddPost={addPostHandler}
  //       />
  //       <CreatePostBtn setOpenModal={() => setOpenModal(true)} />
  //       <Header />
  //       <HomeFeed posts={globalCtx.theGlobalObject.posts} />
  //     </>
  //   );
}

export default HomePage;