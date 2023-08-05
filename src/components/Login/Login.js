
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

//
//using avatar from UI Material


const avatarClick = (user, setCurrentUser) =>
{
  console.log('Avatar clicked' + user.userId);
  setCurrentUser(user.userId)
}
//const Login = (users: User[]) => {
  const Login = ({users, setCurrentUser}) => {
  
  return (    
    <div>

<div className='loginLabel'>Qui suis-je?</div>
    <Stack direction="row" spacing={2}>    

      {users.map((user, id) => {
        return <Avatar key={id} onClick={()=>avatarClick(user, setCurrentUser)} sx={{ width: 200, height: 200 }} alt="" src={user.avatar} />
      })}      
      
    </Stack>


    </div>
  );
};

  export default Login;
  