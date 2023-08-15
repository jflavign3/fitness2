var offset = -300; //Timezone offset for EST in minutes.
/*
export const getTodayFormatted = () => {
 
    
    let dt = new Date(); 
    var today = new Date(dt.getTime() + offset*60*1000);    
    today = today.toISOString().split('T')[0];
  
    return today;
};*/

export const getToday = () => {
    
    let dt = new Date(); 
    var today = new Date(dt.getTime() + offset*60*1000);    

    return today;
}

export const getMonday = () => {
    
    let date = new Date(); 
    var day = date.getDay() || 7;   //if 0, becomes 7  
    if( day !== 1 ) 
        date.setHours(-24 * (day - 1)); 
    return date;
  };

  export const getSunday = () => {
    
    let date = new Date(); 
    var day = date.getDay() || 7;  //if 0, becomes 7
    if( day !== 7 ) 
        date.setHours(24 * (7 - day)); 
    return date;
  };