import { useEffect, useState, useRef } from "react";
import { database, ref, push, onValue, signOut, auth } from "../firebase";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/selector";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/authenticationSlice";


function ChatBox() {
  const [valueMess, setValueMess] = useState("");
  const [dataFireBase, setDataFireBase] = useState([]);
  const inputRef = useRef();
  const userInfo = useSelector(userState);
  const history = useNavigate();
  const btnSendMess = useRef()

  const dispath = useDispatch()
 

  useEffect(() => {
    if (userInfo.name === "Anonymous" && userInfo.avatar === "") {
      history("/");
    }
  }, []);
  const tenMessage = dataFireBase.length - 6;
  // console.log("tenMessage : ", tenMessage);

  // console.log("userInfo :", userInfo);
  useEffect(() => {
    onValue(ref(database, "message"), (data) => {
      // console.log("data :", data);
      const arr = [];
      data.forEach((item) => {
        arr.push(item.val());
      });
      setDataFireBase(arr);
    });
  }, []);

  const handleClickLogOut = () => {
    signOut(auth)
      .then(() => {
        dispath(logOut({
          name : "Anonymous",
          avatar : ""
        }))
        history("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleSendMessage = () => {
    if (valueMess === "") return;
    push(ref(database, "message"), {
      name: userInfo.name,
      text: valueMess,
      createAt: moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
      avatar: userInfo.avatar,
    });
    setValueMess("");
    inputRef.current.focus();
  };

  window.onkeydown = e => {
    if (e.keyCode === 13){
      btnSendMess.current.click()
    }
  }

  // console.log("dataChatBoxMessage : ", dataFireBase);
  return (
    <div>
      <div
        style={{
          // position: "fixed",
          // top: "0",
          // right: "0",
          width: "100vw",
          height: "40px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "9999px",
            border: "1px solid black",
          }}
          src={
            userInfo.avatar === "no img"
              ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/800px-Anonymous_emblem.svg.png"
              : userInfo.avatar
          }
        ></img>
        <label style={{ padding: "10px" }}>{userInfo.name}</label>
        <button onClick={handleClickLogOut} style={{ marginRight: "20px" }}>
          Log Out
        </button>
      </div>
      <h2 style={{
        textAlign : 'center',
        marginTop : '20px',
        fontWeight : '700',
        fontSize : '40px',
        color : 'black',
        fontFamily : "'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif'",
        padding : ' 0 10px',
        borderBottom : '1px dashed black',
        display : 'inline-block',
      }}
      >SuperCuIf Chat</h2>
      <div>
          <input
            ref={inputRef}
            value={valueMess}
            onChange={(e) => setValueMess(e.target.value)}
            placeholder="Enter your message"
            style = {{width: "250px",
            borderTopLeftRadius : '16px',
            borderBottomLeftRadius : "16px",
            fontSize : "13px",
            paddingLeft : '12px',
            outline : 'none',
            height: "30px",
            border : '1px solid black',
            borderRight : 'none',
          }}
          />
          <button ref = {btnSendMess} style={{
          width : "120px",
          backgroundColor : 'rgba(99, 99, 99, 0.7)',
          color : 'white',
          height: "34px",
          fontSize : '13px',
          borderTopRightRadius : '16px',
          borderBottomRightRadius : '16px',
          borderColor : 'transparent',
          }} onClick={handleSendMessage}>Send Message</button>
        </div>
      <div
        style={{
          display: "flex",

          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ul style={{ margin: 0, padding: 0, width: "400px", display : "flex", flexDirection : 'column-reverse' }}>
          {dataFireBase.map((message, index) => {
            if (index < tenMessage) return null;
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "5px",
                  padding: "5px",
                  flexDirection: "column",
                }}
                key={index}
              >
                <div style={{ display: "flex" }}>
                  <img
                    src={
                      message.avatar === "no img"
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/800px-Anonymous_emblem.svg.png"
                        : message.avatar
                    }
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "9999px",
                      objectFit: "cover",
                      marginRight: "5px",
                    }}
                    alt="img"
                  ></img>
                  <li
                    style={{
                      listStyle: "none",
                      fontWeight: 600,
                      marginRight: "10px",
                      fontSize: "18px",
                    }}
                  >
                    <span style={{ fontSize: "14px", marginRight: "10px" }}>
                      {message.name}
                    </span>
                    <span style={{ fontSize: "11px" }}>{message.createAt}</span>
                  </li>
                </div>
                <div
                  style={{
                    display: "flex",
                    border: " 1px solid black ",
                    borderRadius: "10px",
                    marginTop: "2px",
                    justifyContent: "flex-start",
                    padding: " 5px 5px",
                    width: "100%",
                    backgroundColor: "rgba(99, 99, 99, 0.3)",
                  }}
                >
                  {message.text}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ChatBox;
