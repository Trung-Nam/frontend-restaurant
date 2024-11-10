import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const ForgetPassword = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { resetPassword } = useAuth();


    const navigate = useNavigate();

    //react hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email } = data;
        resetPassword(email)
            .then(() => {
                setErrorMessage("Password reset link has been sent to your email. Please check your email!")
            })
            .catch(() => {
                setErrorMessage("Error sending reset email. Please try again");
            });
        reset();
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
                        <h2 className="font-bold text-2xl text-center">Reset Password!</h2>

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


                        {/* show errors */}
                        {errorMessage && (
                            <p className="text-soft-red text-xs italic">
                                {errorMessage}
                            </p>
                        )}

                        {/* submit btn */}
                        <div className="form-control mt-4">
                            <input
                                type="submit"
                                className="btn bg-primary text-white"
                                value="Send"
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
                            Are you ready account?
                            <Link to="/login" className="underline text-soft-red ml-1">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;
