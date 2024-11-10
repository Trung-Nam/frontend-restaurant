import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { signInWithGmail, login } = useAuth();
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    //react hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        login(email, password)
            .then((result) => {
                navigate("/", { state: { message: '🦄 Login successful!' } });
            })
            .catch((error) => {
                setErrorMessage("Please provide valid email & password!");
            });
        reset();
    };

    // login with google
    const handleLoginWithGoogle = () => {
        signInWithGmail()
            .then((result) => {
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                };
                axiosPublic
                    .post("/users", userInfo)
                    .then((response) => {
                        // console.log(response);
                        alert("Login successful!");
                    });
                navigate("/", { state: { message: '🦄 Login successful!' } });
            })
            .catch((error) => console.log(error));
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center p-8 rounded-lg relative">
                <div>
                    <form
                        className="card-body"
                        method="dialog"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2 className="font-bold text-2xl text-center">Please Login!</h2>

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && <p className="text-soft-red text-xs italic mt-2">{errors.email.message}</p>}
                        </div>

                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered"
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                        message: "Password must be at least 6 characters, include letters and numbers",
                                    },
                                })}
                            />
                            {errors.password && <p className="text-soft-red text-xs italic mt-2">{errors.password.message}</p>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover mt-2">
                                    Forgot password?
                                </a>
                            </label>
                        </div>

                        {/* show errors */}
                        {errorMessage && (
                            <p className="text-soft-red text-xs italic">
                                Provide a correct username & password.
                            </p>
                        )}

                        {/* submit btn */}
                        <div className="form-control mt-4">
                            <input
                                type="submit"
                                className="btn bg-primary text-white"
                                value="Login"
                            />
                        </div>

                        {/* close btn */}
                        <Link to="/">
                            <div
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            >
                                ✕
                            </div>
                        </Link>

                        <p className="text-center my-2">
                            Don't have an account?
                            <Link to="/register" className="underline text-soft-red ml-1">
                                Register Now
                            </Link>
                        </p>
                    </form>
                    <div className="text-center space-x-3">
                        <button onClick={handleLoginWithGoogle} className="btn btn-neutral text-white">
                            <FaGoogle /> Login with Google
                        </button>


                        {/* <button className="btn btn-circle hover:bg-primary hover:text-white">
                            <FaFacebookF />
                        </button>
                        <button className="btn btn-circle hover:bg-primary hover:text-white">
                            <FaGithub />
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
