import React, { useContext, useEffect, useState } from 'react';
import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from 'react-icons/fa'; // Added FaRegUser for icon
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthProvider';
import useAxiosPublic from "../hooks/useAxiosPublic";

const Modal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset } = useForm();
    const [isSignin, setIsSignin] = useState(true);

    const { signUpWithGmail, login, createUser, updateUserProfile } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const axiosPublic = useAxiosPublic();

    // Redirect to home page 
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";


    const onSubmitSignIn = (data) => {
        const { email, password } = data;
        login(email, password)
            .then((result) => {
                // Signed in 
                const user = result.user;

                const userInfo = {
                    name: data.name,
                    email: data.email,
                };
                axiosPublic
                    .post("/users", userInfo)
                    .then((response) => {
                        // console.log(response);
                        alert("Login successful!");
                    });
                closeModal();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage("Provide a correct email and password");
            });
        reset();
    };

    const onSubmitSignup = (data) => {
        const { email, password } = data;
        createUser(email, password)
            .then((result) => {
                // Signed up 
                const user = result.user;
                updateUserProfile(data.email, data.photoURL).then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                    };
                    axiosPublic
                        .post("/users", userInfo)
                        .then((response) => {
                            // console.log(response);
                            alert("Account creation successfully!");
                            closeModal();
                        });
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage("Provide a correct email and password");
            });
        reset();
    }

    // login with google
    const handleLogin = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                };
                axiosPublic
                    .post("/users", userInfo)
                    .then((response) => {
                        // console.log(response);
                        alert("Login successful!");
                        closeModal();
                    });
            })
            .catch((error) => console.log(error));
    };

    // Close the modal and navigate to home
    const closeModal = () => {
        onClose(); // Call the onClose function from props
        // navigate('/'); // Navigate to home or any desired route
        navigate(from, { replace: true });
    };

    // Set default to sign-in when the modal opens
    useEffect(() => {
        if (isOpen) {
            setIsSignin(true);
            navigate('/signin'); // Optionally navigate to /signin
        }
    }, [isOpen, navigate]);

    return (
        <dialog id="my_modal" className={`modal modal-middle sm:modal-middle ${isOpen ? 'open' : ''}`}>
            <div className="modal-box">
                <div className="modal-action mt-0 flex flex-col justify-center">
                    <form onSubmit={handleSubmit(isSignin ? onSubmitSignIn : onSubmitSignup)} className="card-body">
                        <h1 className='font-bold text-2xl text-center'>
                            {isSignin ? 'Sign in' : 'Create an account'}
                        </h1>
                        {/* name */}
                        {!isSignin &&
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="name"
                                    placeholder="Your name"
                                    className="input input-bordered"
                                    {...register("name")}
                                />
                            </div>
                        }
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email address..."
                                className="input input-bordered"
                                required
                                {...register("email")}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password..."
                                className="input input-bordered"
                                required
                                {...register("password")}
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {
                            errorMessage ? <p className="text-soft-red text-xs italic">{errorMessage}</p> : ""
                        }

                        <div className="form-control mt-4">
                            <input
                                type="submit"
                                value={isSignin ? "Sign In" : "Sign Up"}
                                className="btn bg-primary text-white"
                            />
                        </div>

                        <p className="text-center my-2">
                            {isSignin ? (
                                <>
                                    Don't have an account?
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSignin(false);
                                            navigate('/signup');
                                        }}
                                        className="underline text-soft-red ml-1"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSignin(true);
                                            navigate('/signin');
                                        }}
                                        className="underline text-soft-red ml-1"
                                    >
                                        Sign In
                                    </button>
                                </>
                            )}
                        </p>
                    </form>

                    {/* Social sign in */}
                    <div className="text-center space-x-5 mb-5">
                        <button className="btn btn-circle hover:bg-primary hover:text-white" onClick={handleLogin}>
                            <FaGoogle />
                        </button>
                        <button className="btn btn-circle hover:bg-primary hover:text-white">
                            <FaFacebookF />
                        </button>
                        <button className="btn btn-circle hover:bg-primary hover:text-white">
                            <FaGithub />
                        </button>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={closeModal} // Close modal
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </div>
            </div >
        </dialog >
    );
};

export default Modal;
