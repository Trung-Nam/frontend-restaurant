import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm, useFieldArray } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';

const AddMenu = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const { fields: ingredientFields, append: addIngredient } = useFieldArray({ control, name: "ingredients" });
  const { fields: instructionFields, append: addInstruction } = useFieldArray({ control, name: "instructions" });

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: parseFloat(data.price),
        image: hostingImg.data.data.display_url,
        ingredients: data.ingredients,
        instructions: data.instructions.map(inst => ({ description: inst.description })),
      };

      const postMenuItem = await axiosSecure.post('/menu', menuItem);
      if (postMenuItem) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Item is inserted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4 text-center uppercase">
        Upload A New <span className="text-primary">Menu Item</span>
      </h2>

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
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Description<span className="text-red-600">*</span></span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Brief description of the recipe"
          ></textarea>
        </div>

        {/* Category & Price */}
        <div className="flex items-center gap-4">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text font-medium">Category<span className="text-red-600">*</span></span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered"
              defaultValue="default"
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
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full"
          />
        </div>

        {/* Ingredients */}
        <div className="form-control my-6">
          <label className="label">
            <span className="label-text font-medium">Ingredients<span className="text-red-600">*</span></span>
          </label>
          {ingredientFields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                placeholder="Ingredient Name"
                {...register(`ingredients.${index}.ingredientName`, { required: true })}
                className="input input-bordered w-1/2"
              />
              <input
                type="text"
                placeholder="Ingredient Image URL"
                {...register(`ingredients.${index}.ingredientImage`, { required: true })}
                className="input input-bordered w-1/2"
              />
            </div>
          ))}
          <button type="button" onClick={() => addIngredient({})} className="btn btn-sm my-2">
            Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="form-control my-6">
          <label className="label">
            <span className="label-text font-medium">Instructions<span className="text-red-600">*</span></span>
          </label>
          {instructionFields.map((item, index) => (
            <div key={item.id} className="mb-2">
              <textarea
                placeholder="Step description"
                {...register(`instructions.${index}.description`, { required: true })}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
          ))}
          <button type="button" onClick={() => addInstruction({})} className="btn btn-sm my-2">
            Add Instruction
          </button>
        </div>



        <button className="btn bg-primary text-white px-6">
          Add Item <FaUtensils />
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
