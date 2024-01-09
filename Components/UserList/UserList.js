import GlobalContext from "@/Store/globalContext";
import classes from "./UserList.module.css";
import Card from "../Card/Card";
import FollowUser from "../FollowUser/FollowUser";


export default function UserList(props) {
    
    if(props.method == "follow"){
        return (
        <div className={classes.userListContainer}>
           <Card>
                <h3>Follow Other Users</h3>
                <ul className={classes.list}>
                    {props.users.map((user) => (
                    <li key={user.username}  className={classes.user}>
                        <Card>
                        <FollowUser
                        method = {props.method}
                        username={user.username}
                        profilepic={user.profilepic}
                        />
                    </Card>
                    </li>
                    
                    ))}
                </ul>
            </Card>   
        </div>
               
    );
    }
    else if(props.method == "unfollow"){
        if(props.users == 0){
            return;
        }
        return (
            <div className={classes.userListContainer}>
               <Card>
                    <h3>Unfollow Users</h3>
                    <ul className={classes.list}>
                        {props.users.map((user) => (
                        <li key={user.username}  className={classes.user}>
                            <Card>
                            <FollowUser
                            method = {props.method}
                            username={user.username}
                            profilepic={user.profilepic}
                            />
                        </Card>
                        </li>
                        
                        ))}
                    </ul>
                </Card>   
            </div>
                   
        );
    }
    
  }
  