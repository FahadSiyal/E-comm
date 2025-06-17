import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { brandNameSchema } from "../validations/formSchema";
import { Input } from "../components/ui/input"
import { FaImage } from "react-icons/fa6";


import { Textarea } from "../components/ui/textarea";
import React from "react";
const shopDetails = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(brandNameSchema),
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("Form Submitted:", data);

    navigate("/bussinessdetails");
  };
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("No file chosen");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };
  return (
 <section className="w-full my-10 lg:my-40 flex justify-center align-baseline">
      <div className="container max-w-full mx-auto my-auto flex flex-col justify-start gap-4 px-4 lg:px-32">
        <div className="Top text-gray-500">Step 1 of 4</div>
        <div className="font-bold max-w-2xl flex flex-col gap-5">
          <h1 className="text-3xl lg:text-4xl  lg:tracking-normal">
            How would you describe your company to the world?
          </h1>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 flex flex-col">
          <Label className="text-gray-500 text-sm">
            What's the name of your brand
          </Label>
          <Input {...register("name")} className="lg:w-1/2 outline-none outline-black" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-gray-500 text-sm">
            Describe your brand in a few words to help define its identity
          </Label>
          <Textarea {...register("description")} className="lg:w-1/2" />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* File Upload Section */}
        <div className="space-y-2 flex flex-col">
          <Label className="text-gray-500 text-sm">
            Upload an image to represent your brand
          </Label>
          <div className="flex items-center gap-3 mt-3">
            <button
              type="button"
              onClick={handleClick}
              className="border border-green-950 px-3 py-2 rounded-md flex gap-2 items-center"
            >
              <span>Select File</span>
            <FaImage />
              {/* <img src="/image.svg" alt="Upload Icon" /> */}
            </button>

            <div>{fileName}</div>
          </div>
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            name="fileSelection"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 lg:flex-row flex-col">
          <Button className="lg:w-36 text-white bg-red-500">Next</Button>
       <Link to={"/step6"}> 
          <Button className="lg:w-36 text-white bg-gray-400">Skip</Button>
          </Link>
        </div>
        </form>
      </div>
    </section>
  )
}

export default shopDetails