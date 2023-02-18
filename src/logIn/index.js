import classNames from 'classnames/bind';
import { useState } from 'react';
import {EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';


const cx = classNames.bind(styles);

function Login() {


    const [eye, setEye] = useState(true);

    const handleShowEye = () => {
        const inputPasswordEl = document.querySelector('.password');
        if (eye) {
            inputPasswordEl.setAttribute('type', 'text');
        } else {
            inputPasswordEl.setAttribute('type', 'password');
        }
        setEye((pre) => (pre = !pre));
    };

    const history = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault()
        history('/chatbox')
    }


    return (
        <div className={cx('wrapper', 'container-fluid')}>
            <div className={cx('form')}>
                <div className={cx('header')}>
                    LOG IN
                </div>
                <div className={cx('body')}>
                    <form action="/" method='get'>
                        <div className={cx('wrapper-input')}>
                            <div className={cx('form-group')}>
                                <label className={cx('label')}>Gmail:</label>
                                <input className={cx('input')} name = 'gmail' type={'text'} placeholder={'Your Gmail...'} />
                            </div>
                            <p></p>
                            <div className={cx('form-group')}>
                                <label className={cx('label')}>Password:</label>
                                <input
                                    className={cx('input', 'password')}
                                    name = 'pass'
                                    type={'password'}
                                    placeholder={'Your password...'}
                                />
                                {!eye ? (
                                    <span onClick={handleShowEye} className={cx('eye')}>
                                        <EyeInvisibleOutlined />
                                    </span>
                                ) : (
                                    <span onClick={handleShowEye} className={cx('eye')}>
                                        <EyeOutlined />
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className={cx('forgot')}>Forgot password ?</p>
                        <div className={cx('wrapper-btn')}>
                            <button className={cx('btn')} onClick = {handleSignup}>Sign In</button>
                        </div>
                    </form>
                    <div className={cx('deco')}>
                        <span>--------------------------</span>
                        <span> OR </span>
                        <span>--------------------------</span>
                    </div>
                </div>
                <div className={cx('icon-link')}>
                    <button className={cx('btn-icon')} >
                        Log In with Github
                    </button>
                    <button className={cx('btn-icon')} >
                        Log In with Google
                    </button>
                    <button className={cx('btn-icon')} >
                        Log In with Facebook
                    </button>
                </div>

                <div className={cx('footer')}>
                    <span>New ?</span>
                    <Link to = {'/signup'}>
                        Sign Up with a new account
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
