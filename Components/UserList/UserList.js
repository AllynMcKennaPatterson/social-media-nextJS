import GlobalContext from "@/Store/globalContext";
import classes from "./UserList.module.css";
import Card from "../Card/Card";
import FollowUser from "../FollowUser/FollowUser";


export default function UserList(props) {
    
    return (
        <div className={classes.userListContainer}>
           <Card>
                <h3>Follow Other Users</h3>
                <ul className={classes.list}>
                    {props.users.map((user) => (
                    <div className={classes.user}>
                        <Card>
                        <FollowUser
                        username={user.username}
                        profilePic={user.profilePic}
                        />
                    </Card>
                    </div>
                    
                    ))}
                </ul>
            </Card>   
        </div>
               
    );
  }
  