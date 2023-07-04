import "./App.css";
import SignUp from "./signUp";
import Login from "./logIn";
import { BrowserRouter , Route , Routes } from  'react-router-dom'
import ChatBox from "./chat";
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
 

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        theme="dark"
      />
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
