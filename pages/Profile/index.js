import classes from "./Profile.module.css";

import Header from "@/Components/Header/Header";
import Bio from "@/Components/Bio/Bio";
import HomeFeed from "@/Components/Home/HomeFeed/HomeFeed";

function Profile() {
  return (
    <div className={classes.profileContainer}>
      <Header />
      <div className={classes.subProfileContainer}>
        <div>
          <Bio />
          {/* <FriendList /> */}
        </div>
        
        {/* <MyPosts /> */}
        {/* <Explore /> */}
      </div>
    </div>
  );
}

export default Profile;
