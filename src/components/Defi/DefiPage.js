import React from 'react';
import DefiCourse from './DefiCourse';
import DefiPushup from './DefiPushup';


const DefiPage = ({updatePoints}) => {

  

  return (    
    <div>
    <DefiCourse/>   
    <DefiPushup  updatePoints={updatePoints}/>   
    </div>
  );
};

export default DefiPage;
