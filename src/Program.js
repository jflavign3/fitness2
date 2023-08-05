export const GetProgramsByUserId = async(userId) => {
  
    if (userId === 0) return;
    
    const url = `/.netlify/functions/GetPrograms?userId=${userId}`;
    
    let result = await fetch(url).then(response => response.json());   
    
  
    return result;
};
