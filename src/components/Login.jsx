import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { signInWithGmail, login } = useAuth();
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

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
                // console.log(result);                
                alert("Login successful!");
                navigate("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage("Please provide valid email & password!");
            });
        reset()
    };

    // login with google
    const handleLoginWithGoogle = () => {
        signInWithGmail()
            .then((result) => {
                const user = result.user;
                console.log(user);
                
                // const userInfo = {
                //     name: result?.user?.displayName,
                //     email: result?.user?.email,
                // };
                // axiosPublic
                //     .post("/users", userInfo)
                //     .then((response) => {
                //         console.log(response);
                //         alert("Login successful!");
                //     });
                navigate("/");
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
            <div className="mb-5">
                <form
                    className="card-body"
                    method="dialog"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h3 className="font-bold text-lg">Please Login!</h3>

                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered"
                            {...register("email")}
                        />
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
                            {...register("password", { required: true })}
                        />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover mt-2">
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    {/* show errors */}
                    {errorMessage ? (
                        <p className="text-soft-red text-xs italic">
                            Provide a correct username & password.
                        </p>
                    ) : (
                        ""
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
                        </div></Link>

                    <p className="text-center my-2">
                        Don't have an account?
                        <Link to="/register" className="underline text-soft-red ml-1">
                            Register Now
                        </Link>
                    </p>
                </form>
                <div className="text-center space-x-3">
                    <button onClick={handleLoginWithGoogle} className="btn btn-circle hover:bg-primary hover:text-white">
                        <FaGoogle />
                    </button>
                    <button className="btn btn-circle hover:bg-primary hover:text-white">
                        <FaFacebookF />
                    </button>
                    <button className="btn btn-circle hover:bg-primary hover:text-white">
                        <FaGithub />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login