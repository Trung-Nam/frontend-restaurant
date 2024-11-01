import React from 'react'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Modal = () => {
    return (
        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">


                <div className="modal-action mt-0 flex-col">
                    <form className="card-body" method='dialog'>
                        <h1 className='font-bold text-2xl text-center'>Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Enter your email address..." className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Enter your password..." className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <input
                                type="submit"
                                value="Login"
                                className="btn bg-primary text-white"
                            />
                        </div>

                        <p className="text-center my-2">
                            Do not have an account?{" "}
                            <Link to="/signup" className="underline text-soft-red ml-1">
                                Signup
                            </Link>{" "}
                        </p>
                    </form>

                    {/* social sign in */}
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

                </div>
            </div>
        </dialog>
    )
}

export default Modal