import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
const Register = () => {
  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo)
            .then((response) => {
              // console.log(response);
              navigate("/", { state: { message: '🦄 Create account successful!' } });
            });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // login with google
  const handleRegister = () => {
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
            navigate("/", { state: { message: '🦄 Create account successful!' } });
          });
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
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-center">Create An Account!</h3>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Enter your name"
                className="input input-bordered"
                {...register("name")}
              />
            </div>

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
                {...register("password")}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error message */}
            <p>{errors.message}</p>

            {/* submit btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn bg-primary text-white"
                value="Sign up"
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

            <div className="text-center my-2">
              Have an account?
              <Link to="/login">
                <button className="ml-2 underline text-soft-red">Login Here</button>
              </Link>
            </div>
          </form>
          <div className="text-center space-x-3">
            <button
              onClick={handleRegister}
              className="btn btn-circle hover:bg-primary hover:text-white"
            >
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
    </div>
  );
};

export default Register;
