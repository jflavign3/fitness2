//import {User} from "../../Types";
import UserCard from './UserCard';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

//
//using avatar from UI Material


//const Login = (users: User[]) => {
  const Login = ({users, setCurrentUser}) => {
 // debugger;
  return (    
    <div>


<div className='loginLabel'>Qui suis-je?</div>
    <Stack direction="row" spacing={2}>    

      {users.map((user, i) => {
        return <Avatar key={i} onClick={()=>setCurrentUser(user.userId)} sx={{ width: 200, height: 200 }} alt="" src={user.avatar} />
      })}      
      
    </Stack>


      {users.map((user, i) => {
        return <UserCard key={i} {...user} />;
      })}
    </div>
  );
};

  export default Login;
  