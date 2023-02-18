import "./App.css";
import SignUp from "./signUp";
import Login from "./logIn";
import { BrowserRouter , Route , Routes, Switch } from  'react-router-dom'
import ChatBox from "./chat";

function App() {
 

  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/chatbox" element = {<ChatBox /> }></Route>
          <Route path="/signup" element = {<SignUp/> }></Route>
          <Route path="/" element = {<Login/> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
