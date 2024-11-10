import React, { useContext } from 'react'
import { useForm } from "react-hook-form"

import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthProvider';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
    const { user } = useAuth();
    const { updateUserProfile } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("image", data.image[0]);

            // Upload image to ImgBB
            const response = await fetch(image_hosting_api, {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                const imageUrl = result.data.url;

                // Update user profile with the image URL
                updateUserProfile(data.name, imageUrl)
                    .then(() => {
                        window.location.reload();
                    })
                    .catch((error) => {
                        toast.error("Error updating profile. Please try again.");
                    });
            } else {
                toast.error("Failed to upload image. Please try again.");
            }
        } catch (error) {
            toast.error("Error uploading image. Please try again.");
        }
    };



    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='font-bold text-center text-3xl mb-4'>Your Profile</h2>
                    <img
                        src={user?.photoURL ? user?.photoURL : "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"}
                        alt="avatar"
                        className='rounded-full w-40 h-40 mx-auto'
                    />
                    <h2 className='font-bold text-center text-3xl my-4'>{user?.name}</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Update Your Name ?</span>
                        </label>
                        <input {...register("name")} type="text" placeholder="Your name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload Update Avatar ?</span>
                        </label>

                        {/* <input type="text" {...register("photoURL")} placeholder="Photo URL" className="input input-bordered" required /> */}

                        {/* TODO: Uplodaing image will be later */}
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="file-input w-full"
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-primary text-white">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfile