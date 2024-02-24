import React, { useState } from 'react';
import './RegisterPage.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QrCode from '../../pages/Home/project-tracker.png';

const RegisterPage = () => {
    toast.configure();
    const {
        reset,
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
        watch
    } = useForm({});

    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    let password = watch("password");
    const [login, setlogin] = useState(true);
    let userData = "";

    const onSubmit = async (data) => {
        navigate('/home');
        // try {
        //     login ? userData = await loginUser(data) : userData = await registerUser(data);
        //     if (userData?.status == 200) {
        //         setToken(userData.token);
        //         toast.success(userData.data, {
        //             position: toast.POSITION.TOP_RIGHT,
        //             autoClose: 10000
        //         });
        //         localStorage.setItem('token', token);
        //     } else {
        //         toast.error(userData.data, {
        //             position: toast.POSITION.TOP_RIGHT,
        //             autoClose: 10000
        //         });
        //     }
        // } catch (error) {
        //     console.log(error);
        //     toast.error(`Request failed. Please try again.`, {
        //         position: toast.POSITION.TOP_RIGHT,
        //         autoClose: 20000
        //     });
        // } finally {
        //     reset();
        // }
    };


    return (
        <div>
            <div className='rowA'>
                <img src={QrCode} alt="project tracker" />
            </div>
            <div className='rowB' style={!login ? { marginTop: 10 } : {}}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control f-c1" >
                        <label>Username</label>
                        <input type="text" style={{
                            borderWidth: 1,
                            borderColor: 'violet',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 300,
                            height: 50,
                            backgroundColor: '#fff',
                            borderRadius: 10,
                        }} name="username" {...register("username", {
                            required: "username is required."
                        })} autoComplete='off' />
                        {errors.username && <p className="errorMsg">{errors.username.message}</p>}
                    </div>
                    <div className="form-control f-c1" >
                        <label>Email</label>
                        <input type="text" style={{
                            borderWidth: 1,
                            borderColor: 'violet',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 300,
                            height: 50,
                            backgroundColor: '#fff',
                            borderRadius: 10,
                        }} name="email" {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Email is not valid."
                            }
                        })} autoComplete='off' />
                        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                    </div>
                    <div className="form-control">
                        <label>Password</label>
                        <input type="password" style={{
                            borderWidth: 1,
                            borderColor: 'violet',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 300,
                            height: 50,
                            backgroundColor: '#fff',
                            borderRadius: 10
                        }} name="password" {...register("password", {
                            required: true,
                            validate: {
                                checkLength: (value) => value.length >= 8,
                                matchPattern: (value) =>
                                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                                        value
                                    )
                            }
                        })} />
                        {errors.password?.type === "required" && (
                            <p className="errorMsg">Password is required.</p>
                        )}
                        {errors.password?.type === "checkLength" && (
                            <p className="errorMsg">
                                Password should be at-least 8 characters.
                            </p>
                        )}
                        {errors.password?.type === "matchPattern" && (
                            <p className="errorMsg">
                                Password should contain at least one uppercase letter, lowercase
                                letter, digit, and special symbol.
                            </p>
                        )}
                    </div>
                    <div className="form-control">
                        <label>Confirm Password</label>
                        <input type="password" style={{
                            borderWidth: 1,
                            borderColor: 'violet',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 300,
                            height: 50,
                            backgroundColor: '#fff',
                            borderRadius: 10
                        }} name="confirm_password" {...register("confirm_password", {
                            required: true,
                            validate: value => value === password || "The passwords do not match"
                        })} />
                        {errors.confirm_password && <p className="errorMsg">{errors.confirm_password.message}</p>}
                    </div>
                    {errors.apiError && <p>{errors.apiError.message}</p>}
                    <p id="registertxt">Already have an Account , Want to <Link><span onClick={() => { setlogin(true); clearErrors(["username", "email", "password", "confirm_password"]); reset(); }}>login</span></Link></p>
                    <div className="form-control">
                        <button style={{
                            borderWidth: 1,
                            // borderColor: 'violet',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 100,
                            height: 50,
                            // color: 'violet',
                            borderRadius: 40
                        }} type="submit" disabled={Object.keys(errors).length > 0}>Register</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default RegisterPage;