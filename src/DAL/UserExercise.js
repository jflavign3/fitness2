export const GetAllUserExercises = async() => {
  
    const url = "/.netlify/functions/GetUserExercise";
    
    let result = await fetch(url).then(response => response.json());   
  
    return result;
};
