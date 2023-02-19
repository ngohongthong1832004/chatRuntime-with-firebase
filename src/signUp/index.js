import classNames from 'classnames/bind';
import { useState } from 'react';
import {
    EyeOutlined,
    EyeInvisibleOutlined,
} from '@ant-design/icons';
import  {Link} from "react-router-dom"
import styles from './SignUp.module.scss';
import { auth, createUserWithEmailAndPassword  } from '../firebase';

const cx = classNames.bind(styles);

function SignUp() {
    const[eye,setEye] = useState(true)
    const[eye1,setEye1] = useState(true)
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const [confirmPass, setConfirmPass] = useState("")

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
        console.log("user : ", user)
    }
    const handleClickCreateAccount =(e) => {
        e.preventDefault()
        if((confirmPass === passValue) && (passValue !== '')) handleCreateAccountWithEmailAndPass()
    }

    console.log("email : ", emailValue)
    console.log("pass : ", passValue)
    console.log("confirm Pass : ", confirmPass)
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
                                    <input value={emailValue} onChange = {(e) => setEmailValue(e.target.value)} className={cx('input')} name = 'gmail' type={'text'} placeholder={'Your Gmail...'} required/>
                                </div>
                                <p></p>
                                <div className = {cx('form-group')}>
                                    <label className={cx('label')}>Password :</label>
                                    <input value={passValue} onChange = {(e) => setPassValue(e.target.value)} className={cx('input','password1')} name = 'pass1' type={'password'} placeholder={'Your password...'} required/>
                                {!eye1 ?<span onClick={handleShowEye1} className={cx('eye')}><EyeInvisibleOutlined /></span>: <span onClick={handleShowEye1} className={cx('eye')}><EyeOutlined /></span>}
                                </div>
                                <p></p>
                                <div className = {cx('form-group')}>
                                    <label className={cx('label')}>Password Again :</label>
                                    <input value={confirmPass} onChange = {(e) => setConfirmPass(e.target.value)} className={cx('input','password')} name = 'pass2' type={'password'} placeholder={'Your password again...'} required/>
                                {!eye ?<span onClick={handleShowEye} className={cx('eye')}><EyeInvisibleOutlined /></span>: <span onClick={handleShowEye} className={cx('eye')}><EyeOutlined /></span>}
                                </div>
                        </div>
                        <div className={cx('wrapper-btn')}>
                            <button className={cx('btn')} onClick = {handleClickCreateAccount}>Create Account</button>
                        </div>
                    </form>
                </div>
                <div className={cx('footer')}>
                    <span>Are you have an account ?</span>
                    <Link to = {"/"} style = {{padding : "0 0 10px 0"}} >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
