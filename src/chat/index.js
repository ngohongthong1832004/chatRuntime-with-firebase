import { useEffect, useState, useRef } from "react";
import { database, ref, push, onValue, signOut, auth, provider } from "../firebase";
import moment from "moment";
import { useNavigate } from "react-router-dom";


function ChatBox() {

    const [valueMess, setValueMess] = useState("");
    const [dataFireBase, setDataFireBase] = useState([]);
    const inputRef = useRef();
  
    useEffect(() => {
      onValue(ref(database, "message"), (data) => {
        console.log("data :", data);
        const arr = [];
        data.forEach((item) => {
          arr.push(item.val());
        });
        setDataFireBase(arr);
      });
    }, []);
  
    const handleClickLogOut = () => {
      signOut(auth).then(() => {
        navigate('/')
      }).catch((error) => {
        // An error happened.
      });
    }

    const handleSendMessage = () => {
      push(ref(database, "message"), {
        name: "Anonymous",
        text: valueMess,
        createAt: moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
      });
      setValueMess("");
      inputRef.current.focus();
    };

    const navigate = useNavigate()
   
    console.log("dataFireBase : ", dataFireBase);
  return (
    <div>
      <button onClick={handleClickLogOut}>Log Out</button>
      <h2> ChatRunTime</h2>
      <ul>
        {dataFireBase.map((message, index) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              key={index}
            >
              <li
                style={{
                  listStyle: "none",
                  fontWeight: 600,
                  marginRight: "10px",
                  fontSize: "18px",
                }}
              >
                {message.name} : {message.text}
              </li>
              <label style={{ fontSize: "11px" }}>{message.createAt}</label>
            </div>
          );
        })}
      </ul>
      <input
        ref={inputRef}
        value={valueMess}
        onChange={(e) => setValueMess(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

export default ChatBox;
