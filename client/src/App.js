import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/users").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  return <div className="App">
    <div className="mostrarUsers">
      {listOfUsers.map((user)=>{
        return (
          <div> 
            <h1>Nome: {user.name}</h1>
            <h1>Idade: {user.age}</h1>
            <h1>cpf: {user.cpf}</h1>
            <h1>flamengo: {JSON.stringify(user.flamengo)}</h1>
          </div>
        );
      })}
    </div>
  </div>;
}

export default App;
