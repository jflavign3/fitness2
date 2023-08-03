export const GetAllExercises = async() => {
  
    const url = "/.netlify/functions/GetExercises";
    
    let result = await fetch(url).then(response => response.json());   
  
    return result;
};
