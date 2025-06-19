import React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { customerReachSchema } from "../validations/formSchema";
import { Input } from "../components/ui/input";
import { useDispatch } from "react-redux";
import { saveStepData } from "../features/seller/sellerRegistrationSlice";

const bussinessDetails = () => {
  const dispatch=useDispatch()
      const navigate = useNavigate();
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(customerReachSchema),
      });
    
      const onSubmit = (data, e) => {

        e.preventDefault();
        console.log("Form Submitted:", data);
    dispatch(saveStepData({step:'bussinessdetails',data}))
    console.log(saveStepData({step:'bussinessdetails',data}));
    
        navigate("/bankingdetails");
      };
  return (
     <section className="w-full my-10 lg:my-40 flex justify-center align-baseline   ">
      <div className="container max-w-full  mx-auto  my-auto flex flex-col justify-start gap-4  px-4 lg:px-32   ">
        <div className="Top text-gray-500">Step 2 of 3</div>
        <div className="font-bold  max-w-2xl flex flex-col gap-5">
          <h1 className=" text-3xl lg:text-4xl">
            {" "}
    Bussiness Details
          </h1>

    
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 flex flex-col">
          <Label className="text-gray-500 text-sm ">
          Whats the best email address for your company to the world?
          </Label>
          <Input {...register("email")} className="lg:w-1/2 " />
     {
      errors.email && (
        <p className="text-red-500 text-xs">{errors.email.message}</p>
      )}
        
     

        </div>
        <div className="space-y-2 flex flex-col">
          <Label className="text-gray-500 text-sm ">
          Whats the  address for your company to the world?
          </Label>
          <Input {...register("email")} className="lg:w-1/2 " />
     {
      errors.email && (
        <p className="text-red-500 text-xs">{errors.email.message}</p>
      )}
        
     

        </div>
        <div className="space-y-2 flex flex-col">
          <Label className="text-gray-500 text-sm">
            What's your company's contact number
          </Label>
          <Input {...register("phone")} className="lg:w-1/2 " />
          {
            errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )
          }
        </div>
        <Button className="lg:w-36  text-white bg-red-500">Next</Button>
      </form>
      </div>
    </section>
  )
}

export default bussinessDetails