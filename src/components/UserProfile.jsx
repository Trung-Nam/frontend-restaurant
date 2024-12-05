import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { FaCamera, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
    const { user, updateUserProfile, setUser } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [editingField, setEditingField] = useState(null);
    const fileInputRef = useRef(null);

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch(image_hosting_api, {
            method: "POST",
            body: formData,
        });
        const result = await response.json();

        if (result.success) {
            return result.data.url;
        } else {
            throw new Error("Image upload failed.");
        }
    };

    const handleUpdate = async (data) => {
        try {
            if (data.image && data.image[0]) {
                const photoURL = await uploadImage(data.image[0]);
                data.photoURL = photoURL;
            }

            // Merge updated field with existing user data
            const updatedUser = await updateUserProfile(user, data);

            if (updatedUser) {
                setUser(updatedUser);
                setEditingField(null);
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            toast.error("Failed to update profile.");
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        handleUpdate({ image: [file] });
    };

    const handleFieldEdit = (field) => {
        setEditingField(field);
    };

    const handleFieldCancel = () => {
        setEditingField(null);
        reset();
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100 p-6">
                <h2 className="font-bold text-center text-3xl mb-12">Profile Details</h2>
                <div className="flex flex-col items-center">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <div className="relative group">
                        <img
                            src={
                                user?.photoURL ||
                                'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'
                            }
                            alt="avatar"
                            className="rounded-full w-40 h-40 mb-4 cursor-pointer"
                            onClick={() => fileInputRef.current.click()}
                        />
                        <button
                            className="rounded-full w-40 h-40 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FaCamera size={25} />
                        </button>
                    </div>


                </div>

                {/* Editable Name */}
                <div className="form-control mb-4">
                    <label className="label font-bold">Name</label>
                    {editingField === 'name' ? (
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <input
                                {...register('name')}
                                type="text"
                                defaultValue={user?.name}
                                className="input input-bordered w-full mb-2"
                                required
                            />
                            <div className="flex gap-2">
                                <button className="btn bg-success text-white">Save</button>
                                <button
                                    type="button"
                                    className="btn bg-warning"
                                    onClick={handleFieldCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex justify-between items-center">
                            <span className="ml-1">{user?.name || 'No Name Provided'}</span>
                            <FaPen
                                className="cursor-pointer text-gray-500"
                                onClick={() => handleFieldEdit('name')}
                            />
                        </div>
                    )}
                </div>

                {/* Editable Email */}
                <div className="form-control mb-4">
                    <label className="label font-bold">Email</label>
                    <div className="flex justify-between items-center">
                        <span className="ml-1">{user?.email}</span>
                    </div>
                </div>


                {/* Editable Address */}
                <div className="form-control mb-4">
                    <label className="label font-bold">Address</label>
                    {editingField === 'address' ? (
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <input
                                {...register('address.street')}
                                type="text"
                                defaultValue={user?.address?.street}
                                placeholder="Street"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                {...register('address.city')}
                                type="text"
                                defaultValue={user?.address?.city}
                                placeholder="City"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                {...register('address.state')}
                                type="text"
                                defaultValue={user?.address?.state}
                                placeholder="State"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                {...register('address.country')}
                                type="text"
                                defaultValue={user?.address?.country}
                                placeholder="Country"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                {...register('address.zipCode')}
                                type="text"
                                defaultValue={user?.address?.zipCode}
                                placeholder="Zip Code"
                                className="input input-bordered w-full mb-2"
                            />
                            <div className="flex gap-2">
                                <button className="btn bg-success text-white">Save</button>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={handleFieldCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex justify-between items-center">
                            <span className="ml-1">
                                {user?.address?.street || 'No Address Provided'}, {user?.address?.city || ''}, {user?.address?.country || ''}
                            </span>
                            <FaPen
                                className="cursor-pointer text-gray-500"
                                onClick={() => handleFieldEdit('address')}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
