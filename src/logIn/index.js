import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../store/selector";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  signInWithPopup,
  provider,
  GoogleAuthProvider,
  // GithubAuthProvider,
  // providerGithub,
  // providerFacebook,
  // FacebookAuthProvider,
  // signInWithEmailAndPassword,
} from "../firebase";
import { handleLoginGoogle, handleLoginEmailPass, fixErrEmailPass } from '../store/authenticationSlice'
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function Login() {
  const history = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const [valueInfoUser, setValueInfoUser] = useState({
    email: "",
    pass: "",
  });

  const [eye, setEye] = useState(true);

  const user = useSelector(userState);

  // console.log("user  test err reject: ", user)
  useEffect(()=> {
    if(user.err){
      // alert('Email or password is not invalid')
      toast.error('Email or password is not invalid')
    }
  },[user.err])

  useEffect(() => {
    dispatch(fixErrEmailPass(false))
  }, [valueInfoUser])

  // const loginGoogle = async () => {
  //   const result = await signInWithPopup(auth, provider);
  //   try {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = await GoogleAuthProvider.credentialFromResult(result);
      // console.log("credential :", credential);

  //     // The signed-in user info.
  //     const token = await credential.accessToken;
      // console.log("token : ", token);

  //     // IdP data available using getAdditionalUserInfo(result)
  //     const user = await result.user;
      // console.log("user :", user);
  //   } catch (error) {
  //     const errorCode = error.code;
      // console.log("errorCode :", errorCode);
  //     const errorMessage = error.message;
      // console.log("errorMessage : ", errorMessage);
  //     const email = error.customData.email;
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //   }
  // };

  //   const loginFacebook = async () => {
  //     const result = await signInWithPopup(auth, providerFacebook);
  //     try {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = await GithubAuthProvider.credentialFromResult(result);
        // console.log("credential :", credential);

  //       // The signed-in user info.
  //       const token = await credential.accessToken;
        // console.log("token : ", token);

  //       // IdP data available using getAdditionalUserInfo(result)
  //       const user = await result.user;
        // console.log("user :", user);
  //     } catch (error) {
  //       const errorCode = error.code;
        // console.log("errorCode :", errorCode);
  //       const errorMessage = error.message;
        // console.log("errorMessage : ", errorMessage);
  //       const email = error.customData.email;
  //       const credential = GithubAuthProvider.credentialFromError(error);
  //     }
  //   };
  //   const loginGithub = async () => {
  //     const result = await signInWithPopup(auth, providerGithub);
  //     try {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = await FacebookAuthProvider.credentialFromResult(
  //         result
  //       );
        // console.log("credential :", credential);

  //       // The signed-in user info.
  //       const token = await credential.accessToken;
        // console.log("token : ", token);

  //       // IdP data available using getAdditionalUserInfo(result)
  //       const user = await result.user;
        // console.log("user :", user);
  //     } catch (error) {
  //       const errorCode = error.code;
        // console.log("errorCode :", errorCode);
  //       const errorMessage = error.message;
        // console.log("errorMessage : ", errorMessage);
  //       const email = error.customData.email;
  //       const credential = FacebookAuthProvider.credentialFromError(error);
  //     }
  //   };

  const handleClickLoginGoogle = async() => {
      const rs = await dispatch(handleLoginGoogle('data'))
      history('/chatbox')
  };
  //   const handleClickLoginGithub = () => {
  //     loginGithub();
  //   };
  //   const handleClickLoginFacebook = () => {
  //     loginFacebook();
  //   };

  const handleShowEye = () => {
    const inputPasswordEl = document.querySelector(".password");
    if (eye) {
      inputPasswordEl.setAttribute("type", "text");
    } else {
      inputPasswordEl.setAttribute("type", "password");
    }
    setEye((pre) => (pre = !pre));
  };

  

  const handleLogin =async (e) => {
    e.preventDefault();
    if(valueInfoUser.name !== "Anonymous" && valueInfoUser.pass !== "" ){
      const rs = await dispatch(handleLoginEmailPass(valueInfoUser))
      history('/chatbox')
      // setValueInfoUser({ ...valueInfoUser, email: "", pass: "" });
    }else {
      // alert("Chua nhap gi kia cha noi !!")
      toast.error('Please fill in all fields!!')
    }
  };


  return (
    <div className={cx("wrapper", "container-fluid")}>
      <div className={cx("form")}>
        <div className={cx("header")}>LOG IN</div>
        <div className={cx("body")}>
          <form action="/" method="get">
            <div className={cx("wrapper-input")}>
              <div className={cx("form-group")}>
                <label className={cx("label")}>Gmail:</label>
                <input
                  ref={emailRef}
                  value={valueInfoUser.email}
                  onChange={(e) =>
                    setValueInfoUser({
                      ...valueInfoUser,
                      email: e.target.value,
                    })
                  }
                  className={cx("input")}
                  name="gmail"
                  type={"text"}
                  placeholder={"Your Gmail..."}
                  required
                />
              </div>
              { user.err ? <p style={{ fontSize : '12px', color : 'red'}}>Email or password is not invalid !!</p> :  <p></p> }
              <div className={cx("form-group")}>
                <label className={cx("label")}>Password:</label>
                <input
                  ref={passRef}
                  required
                  className={cx("input", "password")}
                  name="pass"
                  type={"password"}
                  placeholder={"Your password..."}
                  value={valueInfoUser.pass}
                  onChange={(e) =>
                    setValueInfoUser({ ...valueInfoUser, pass: e.target.value })
                  }
                />
                {!eye ? (
                  <span onClick={handleShowEye} className={cx("eye")}>
                    <EyeInvisibleOutlined />
                  </span>
                ) : (
                  <span onClick={handleShowEye} className={cx("eye")}>
                    <EyeOutlined />
                  </span>
                )}
              </div>
            </div>
            <div className={cx("wrapper-btn")}>
              <button className={cx("btn")} onClick={handleLogin}>
                Log In
              </button>
            </div>
          </form>

          <div className={cx("deco")}>
            <span>---------------------</span>
            <span> OR </span>
            <span>---------------------</span>
          </div>
        </div>
        <div className={cx("icon-link")}>
          <button className={cx("btn-icon")} onClick={handleClickLoginGoogle}>
            Log In with Google
          </button>
          {/* <button className={cx("btn-icon")} onClick={handleClickLoginGithub}>
            Log In with Github
          </button>
          <button className={cx("btn-icon")} onClick={handleClickLoginFacebook}>
            Log In with Facebook
          </button> */}
        </div>

        <div className={cx("footer")}>
          <span>New ?</span>
          <Link to={"/signup"} style={{color : "blue"}}>Sign Up with a new account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
