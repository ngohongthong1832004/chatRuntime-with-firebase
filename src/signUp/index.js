import classNames from 'classnames/bind';
import { useState } from 'react';
import {
    EyeOutlined,
    EyeInvisibleOutlined,
} from '@ant-design/icons';
import  {Link} from "react-router-dom"
import styles from './SignUp.module.scss';
import { auth, createUserWithEmailAndPassword  } from '../firebase';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function SignUp() {
    const[eye,setEye] = useState(true)
    const[eye1,setEye1] = useState(true)
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const [confirmPass, setConfirmPass] = useState("")
    const history = useNavigate()

    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [confirmPassErr, setConfirmPassErr] = useState(false)

  
    const validEmail = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
      );
    
        
     const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

    const  handleShowEye = ()=>{
        const inputPasswordEl = document.querySelector('.password')
        if(eye){
            inputPasswordEl.setAttribute('type','text')
        }else{
            inputPasswordEl.setAttribute('type','password')
        }
        setEye(pre=>pre = !pre)
    }
    const  handleShowEye1 = ()=>{
        const inputPasswordEl1 = document.querySelector('.password1')
        if(eye1){
            inputPasswordEl1.setAttribute('type','text')
        }else{
            inputPasswordEl1.setAttribute('type','password')
        }
        setEye1(pre=>pre = !pre)
    }

    const handleCreateAccountWithEmailAndPass = async() => {
        const rs  = await createUserWithEmailAndPassword(auth, emailValue, passValue)
        const user = rs.user
        // console.log("user : ", user)
    }
    const handleClickCreateAccount = (e) => {
        let validateErr = false
        e.preventDefault()

        if (!validEmail.test(emailValue)) {
            // console.log("chay setEmailErr")
            setEmailErr(true);
             validateErr  = true
        }
        if (!validPassword.test(passValue)) {
            // console.log("chay setPwdErr")
            setPwdError(true);
             validateErr  = true
        }
        if( passValue !== confirmPass){
            validateErr  = true
            // console.log("chay setConfirmErr")
            setConfirmPassErr(true)
        }

        if(validateErr === false) {
            handleCreateAccountWithEmailAndPass()
            history("/")
        }
    }
    return (
        <div className={cx('wrapper', 'container-fluid')}>
            <div className={cx('form')}>
                <div className={cx('header')}>
                    SIGN UP
                </div>
                <div className={cx('body')}>
                    <form action='/' method='get'>
                        <div className={cx('wrapper-input')}>
                                <div className = {cx('form-group')}>
                                    <label className={cx('label')}>Gmail :</label>
                                    <input value={emailValue} onChange = {(e) =>{ setEmailValue(e.target.value) ; setEmailErr(false)}} className={cx('input')} name = 'gmail' type={'text'} placeholder={'Your Gmail...'} required/>
                                </div>
                                    {emailErr  ? <p style={{ fontSize : '12px', color : 'red', marginTop : '-1px', marginRight : '15px'}}>Your email is invalid !!</p> : <p></p>}
                                <div className = {cx('form-group')}>
                                    <label className={cx('label')}>Password :</label>
                                    <input value={passValue} onChange = {(e) => {setPassValue(e.target.value) ; setPwdError(false) }} className={cx('input','password1')} name = 'pass1' type={'password'} placeholder={'Your password...'} required/>
                                    {!eye1 ?<span onClick={handleShowEye1} className={cx('eye')}><EyeInvisibleOutlined /></span>: <span onClick={handleShowEye1} className={cx('eye')}><EyeOutlined /></span>}
                                </div>
                                    {pwdError ? <p style={{ fontSize : '12px', color : 'red', marginTop : '-1px', marginRight : '-10px'}}>Your password is invalid !!</p> : <p style={{ fontSize : '12px', color : 'blue', marginRight : "-25px", marginTop : '-1px' }}>at least 6 cherater(1-9 & a-z)</p>}
                                <div className = {cx('form-group')}>
                                    <label className={cx('label')}>Password Again :</label>
                                    <input value={confirmPass} onChange = {(e) =>{ setConfirmPass(e.target.value) ; setConfirmPassErr(false)}} className={cx('input','password')} name = 'pass2' type={'password'} placeholder={'Your password again...'} required/>
                                    {!eye ?<span onClick={handleShowEye} className={cx('eye')}><EyeInvisibleOutlined /></span>: <span onClick={handleShowEye} className={cx('eye')}><EyeOutlined /></span>}
                                </div>
                                    { confirmPassErr && <p style={{ fontSize : '12px', color : 'red', marginTop : '-1px', marginRight : '0'}}>Password is not match !!</p>}
                        </div>
                        <div className={cx('wrapper-btn')}>
                            <button className={cx('btn')} onClick = {handleClickCreateAccount}>Create Account</button>
                        </div>
                    </form>
                </div>
                <div className={cx('footer')}>
                    <span>Are you have an account ?</span>
                    <Link to = {"/"}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
