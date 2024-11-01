import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from 'react-icons/fa'; // Added FaRegUser for icon
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose }) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    const navigate = useNavigate();
    const [isSignin, setIsSignin] = useState(true);

    // Close the modal and navigate to home
    const closeModal = () => {
        onClose(); // Call the onClose function from props
        navigate('/'); // Navigate to home or any desired route
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
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className='font-bold text-2xl text-center'>
                            {isSignin ? 'Sign in' : 'Create an account'}
                        </h1>

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
                        <button className="btn btn-circle hover:bg-primary hover:text-white">
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
            </div>
        </dialog>
    );
};

export default Modal;
