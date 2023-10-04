import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./password.scss";




const Password = ({handlePassword}) => {

  const [password, setPassword] = useState('');

  const handleValueChange = (e) =>
  {
    setPassword(e);
  }
  
  return (    

<>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
        <TextField id="standard-basic" label="Enter password" onChange={(e)=>{handleValueChange(e.target.value);}}  variant="standard" />
      </Box>
   <Button type='button' onClick={()=>handlePassword(password)} variant="contained">Save</Button>  
</>
   
    

  );
};

export default Password;
