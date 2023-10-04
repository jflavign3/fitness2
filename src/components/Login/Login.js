import "./login.scss";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { useState, useEffect } from 'react';
import Password from "../Password/password";
import { toast } from "react-toastify";
//
//using avatar from UI Material



 
const Login = ({users, setCurrentUser}) => {

  const [usersOrdered, setUsersOrdered] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handlePassword = (password) =>{
    
    if (password === '219'){
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated','true');

    }else{
      toast.error('wrong password');
    }

  }

  const avatarClick = (user, setCurrentUser) =>
{
  console.log('Avatar clicked' + user.userId);
  setCurrentUser(user)
}


useEffect(()=>{ 


  var _usersOrdered = [];
  _usersOrdered.push(users.filter(x=>x.name==='JF')[0]);
  _usersOrdered.push(users.filter(x=>x.name==='Joelle')[0]);
  _usersOrdered.push(users.filter(x=>x.name==='Samuel')[0]);
  _usersOrdered.push(users.filter(x=>x.name==='Alexane')[0]);
  setUsersOrdered(_usersOrdered);
  
  var auth = localStorage.getItem('isAuthenticated');
  
  if (auth === 'true'){
    setIsAuthenticated(true);
  }
  
},[users]);
  
  return (    
    <div>

      {isAuthenticated ?
      <>

<div className='loginLabel'>Qui suis-je?</div>
<div className='userBadgesSection'>
    <Stack direction="row" spacing={2}>    

      {usersOrdered.map((user, id) => {
        return <Avatar key={id} onClick={()=>avatarClick(user, setCurrentUser)} sx={{ width: 150, height: 150 }} alt="" src={user.avatar} />
      })}      
      
    </Stack>

    </div> </>: <Password handlePassword={handlePassword}></Password>
}


    </div>
  );
};

  export default Login;
  