import classes from "./Profile.module.css";
import Header from "@/Components/Header/Header";
import Bio from "@/Components/Bio/Bio";

function Profile() {
  return (
    <div className={classes.profileContainer}>
      <Header />
      <div className={classes.subProfileContainer}>
        <div>
          <Bio />
        </div>
      </div>
    </div>
  );
}

export default Profile;
