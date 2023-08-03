//import {User} from "../../Types";
import UserCard from './UserCard';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import logo from "../../images/vite.JPG";

//
//using avatar from UI Material

const SetUser = (user)=>{
    sessionStorage.setItem("userId",user.userId);
}

//const Login = (users: User[]) => {
  const Login = ({users}) => {
 // debugger;
  return (    
    <div>


<div className='loginLabel'>Qui suis-je?</div>
    <Stack direction="row" spacing={2}>    

      {users.map((user) => {
        return <Avatar onClick={()=>SetUser(user)} sx={{ width: 200, height: 200 }} alt="" src={user.avatar} />
      })}      
      
    </Stack>


      {users.map((user) => {
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
};

  export default Login;
  