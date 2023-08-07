export const GetAllExerciseDetails = async() => {
  
    const url = "/.netlify/functions/GetExerciseDetails";
    
    let result = await fetch(url).then(response => response.json());   
  
    return result;
};
