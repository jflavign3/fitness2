var offset = -300; //Timezone offset for EST in minutes.
/*
export const getTodayFormatted = () => {
 
    
    let dt = new Date(); 
    var today = new Date(dt.getTime() + offset*60*1000);    
    today = today.toISOString().split('T')[0];
  
    return today;
};*/

export const getDayName = (id, useToday) =>{

    const d = new Date();
    if (d.getDay()===id && useToday){
      return "Aujourd'hui";
    }
    switch(id){
      case 1: return('Lundi');
      case 2: return('Mardi');
      case 3: return('Mercredi');
      case 4: return('Jeudi');
      case 5: return('Vendredi');
      case 6: return('Samedi');
      case 0: return('Dimanche');
     }
     

  }

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