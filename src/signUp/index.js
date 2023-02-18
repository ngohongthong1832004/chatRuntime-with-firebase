import classNames from 'classnames/bind';
import { useState } from 'react';
import {
    EyeOutlined,
    EyeInvisibleOutlined,
} from '@ant-design/icons';
import  {Link} from "react-router-dom"
import styles from './SignUp.module.scss';

const cx = classNames.bind(styles);

function SignUp() {
    const[eye,setEye] = useState(true)
    const[eye1,setEye1] = useState(true)

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
                                    <input className={cx('input')} name = 'gmail' type={'text'} placeholder={'Your Gmail...'} />
                                </div>
                                <p></p>
                                <div className = {cx('form-group')}>
                                    <label className={cx('label')}>Password :</label>
                                    <input className={cx('input','password1')} name = 'pass1' type={'password'} placeholder={'Your password...'} />
                                {!eye1 ?<span onClick={handleShowEye1} className={cx('eye')}><EyeInvisibleOutlined /></span>: <span onClick={handleShowEye1} className={cx('eye')}><EyeOutlined /></span>}
                                </div>
                                <p></p>
                                <div className = {cx('form-group')}>
                                    <label className={cx('label')}>Password Again :</label>
                                    <input className={cx('input','password')} name = 'pass2' type={'password'} placeholder={'Your password again...'} />
                                {!eye ?<span onClick={handleShowEye} className={cx('eye')}><EyeInvisibleOutlined /></span>: <span onClick={handleShowEye} className={cx('eye')}><EyeOutlined /></span>}
                                </div>
                        </div>
                        <div className={cx('wrapper-btn')}>
                            <button className={cx('btn')}>Create Account</button>
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
