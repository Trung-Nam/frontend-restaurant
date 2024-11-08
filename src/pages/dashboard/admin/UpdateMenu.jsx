import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useForm, useFieldArray } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUtensils } from 'react-icons/fa';

const UpdateMenu = () => {
    const item = useLoaderData();
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            name: item.name,
            description: item.description || '',
            category: item.category,
            price: item.price,
            ingredients: item.ingredients || [{ ingredientName: "", ingredientImage: "" }],
            instructions: item.instructions || [{ description: "" }],
            image: item.image
        }
    });

    const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } = useFieldArray({ control, name: 'ingredients' });
    const { fields: instructionFields, append: addInstruction, remove: removeInstruction } = useFieldArray({ control, name: 'instructions' });

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Image hosting key and API endpoint
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { "content-type": "multipart/form-data" }
        });

        if (hostingImg.data.success) {
            const menuItem = {
                name: data.name,
                description: data.description,
                category: data.category,
                price: parseFloat(data.price),
                image: hostingImg.data.data.display_url,
                ingredients: data.ingredients,
                instructions: data.instructions.map(instruction => ({ description: instruction.description }))
            };

            const postMenuItem = await axiosSecure.patch(`/menu/${item._id}`, menuItem);
            if (postMenuItem) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your item updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/dashboard/manage-items");
            }
        }
    };

    return (
        <div className="w-full md:w-[870px] px-4 mx-auto">
            <h2 className="text-2xl font-semibold my-4 text-center uppercase">
                Update A <span className="text-primary">Menu Item</span>
            </h2>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Recipe Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Recipe Name<span className="text-red-600">*</span></span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Recipe Name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-medium">Description</span>
                        </label>
                        <textarea
                            {...register("description")}
                            className="textarea textarea-bordered h-24"
                            placeholder="Brief description of the recipe"
                        ></textarea>
                    </div>

                    {/* Category and Price */}
                    <div className="flex items-center gap-4">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text font-medium">Category<span className="text-red-600">*</span></span>
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className="select select-bordered"
                            >
                                <option disabled value="default" className="font-medium">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="popular">Popular</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Price<span className="text-red-600">*</span></span>
                            </label>
                            <input
                                type="number"
                                {...register("price", { required: true })}
                                placeholder="Price"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    {/* Image Upload */}
                    <div className="form-control w-full my-6 shadow-md">
                        <label className="label">
                            <span className="label-text font-medium">Image<span className="text-red-600">*</span></span>
                        </label>
                        <input
                            {...register("image")}
                            type="file"
                            className="file-input w-full"
                        />
                    </div>

                    {/* Ingredients */}
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text font-medium">Ingredients</span>
                        </label>
                        {ingredientFields.map((ingredient, index) => (
                            <div key={ingredient.id} className="flex items-center gap-4 my-2">
                                <input
                                    type="text"
                                    {...register(`ingredients.${index}.ingredientName`)}
                                    placeholder="Ingredient Name"
                                    className="input input-bordered w-full"
                                    defaultValue={ingredient.ingredientName}
                                />
                                <input
                                    type="url"
                                    {...register(`ingredients.${index}.ingredientImage`)}
                                    placeholder="Ingredient Image URL"
                                    className="input input-bordered w-full"
                                    defaultValue={ingredient.ingredientImage}
                                />
                                <button type="button" onClick={() => removeIngredient(index)} className="btn btn-error">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addIngredient({ name: "", image: "" })} className="btn btn-sm my-2">Add Ingredient</button>
                    </div>

                    {/* Instructions */}
                    <div className="form-control my-4">
                        <label className="label">
                            <span className="label-text font-medium">Instructions</span>
                        </label>
                        {instructionFields.map((instruction, index) => (
                            <div key={instruction.id} className="flex items-center gap-4 my-2">
                                <textarea
                                    {...register(`instructions.${index}.description`)}
                                    placeholder="Instruction Step"
                                    className="textarea textarea-bordered w-full"
                                    defaultValue={instruction.description}
                                ></textarea>
                                <button type="button" onClick={() => removeInstruction(index)} className="btn btn-error">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addInstruction({ description: "" })} className="btn btn-sm my-2">Add Instruction</button>
                    </div>



                    <button className="btn bg-primary text-white px-6">
                        Update Item <FaUtensils />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMenu;
