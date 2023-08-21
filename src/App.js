import "./App.scss";
import { useState, useEffect } from 'react';
import Home from './components/ExerciseList/Home';
import Setup from './components/Setup/Setup';
import MenuBar from "./components/MenuBar/MenuBar";
import {GetAllUsers} from "./Users";
import Login from './components/Login/Login';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./ErrorBoundary";
//import coin from "/coin.png";


function App() {
 
  const [users, setUsers] = useState([]);  
  const [user, setUser] = useState(null);  
  const [page, setPage] = useState(null);  
  const [points, setPoints] = useState(0);

  const GetListOfUsers = async () => {   
    console.log(`Getting list of all users`);
    let allUsers = await GetAllUsers();
    setUsers(allUsers);       

    debugger;
    var currentPoints = sessionStorage.getItem("userPoints");   
    if (currentPoints){
      updatePoints(currentPoints);
    }
  };

  const SetCurrentPage = async(page) => {
       
    console.log(`Page ${page.name} was selected.`);
    sessionStorage.setItem("__page",page.name);
    setPage(page.name); 
   
  }
const updatePoints = (total) =>{
  setPoints(total);  
  sessionStorage.setItem("userPoints",total);   
}

  const SetCurrentUser = async (user) => {
  

    setPoints(user.points);
     console.log(`User ${user.name} was selected. Load home data.`);
     
     sessionStorage.setItem("__userId",user.userId);     
     sessionStorage.setItem("userName",user.name); 
     sessionStorage.setItem("userPoints",user.points);     
     setUser(user.userId);
     sessionStorage.setItem("__page","Home");     
     setPage("Home");

  };
  
  console.log('Session:page= ' + page);

//debugger;
useEffect(() => {
  console.log("useEffect app");
  GetListOfUsers();

  //on first rerender take page from session
  var pageSession = sessionStorage.getItem("__page");
  if (pageSession){
    setPage(pageSession);
  }

  //on first rerender take user from session
  var userSession = sessionStorage.getItem("__userId");
  if (!user && users && userSession){
   
    setUser(userSession);
  }

},[]);



 return (   

<>   
<ErrorBoundary>

<ToastContainer
   autoClose={2000}
   hideProgressBar={true}
   position="top-center"
/>

    {
        (!user && users) || page === "User"
          ? <main> <section className='containerLogin'>
            <Login users={users} setCurrentUser={SetCurrentUser}></Login>
          </section></main>: (
           

<main>       
    
    <div className="leftMenuForBigScreen">
      <MenuBar setCurrentPage={SetCurrentPage}></MenuBar>
    </div>

<div className="main">
  <div className="topBar">
    <div>
  <img id="coinImage" src="/coin.png" alt="image" />
  </div>
  <div  className="pointNumber">
  {points}
  </div>
  </div>
    {page === "Home" ? (
      <Home updatePoints={updatePoints}/>   
 
    ) : (<Setup/>)
    
    }

</div>


      <div id="bottomMenuForSmallScreen">
        <div id="spacer"></div>
        <MenuBar setCurrentPage={SetCurrentPage}></MenuBar>
      </div>

    </main>)}

 
    </ErrorBoundary>
    </>
    )
}

export default App;
