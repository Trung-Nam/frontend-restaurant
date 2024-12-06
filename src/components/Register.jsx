import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import {toast} from "react-toastify";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
  
    createUser(email, password)
      .then((result) => {
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfo)
          .then(() => {
            toast.success("Create account successful!");
            navigate("/");
          })
          .catch((error) => {
            toast.error("Failed to save user information. Please try again!");
            console.error("Error saving user data:", error);
          });
      })
      .catch((error) => {
        toast.error("Email already in use. Please try another email!");
        console.error("Error creating user:", error);
      });
  };
  


  // Watch password to compare with confirm password
  const password = watch("password");

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
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-center">Create An Account!</h3>

            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-soft-red text-xs italic mt-2">{errors.name.message}</p>}
            </div>

            {/* Email */}
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

            {/* Password */}
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
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && <p className="text-soft-red text-xs italic mt-2">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn bg-primary text-white"
                value="Sign up"
              />
            </div>

            {/* Close Button */}
            <Link to="/">
              <div
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </div>
            </Link>

            <div className="text-center my-2">
              Have an account?
              <Link to="/login">
                <button className="ml-2 underline text-soft-red">Login Here</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
