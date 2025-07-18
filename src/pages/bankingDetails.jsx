import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { saveStepData } from "../features/seller/sellerRegistrationSlice";
import { toast } from "react-toastify";

import axios from "../services/axiosInstance";

import { useSelector } from "react-redux";

// Schema for Banking Details
const bankingDetailsSchema = z.object({
  cnic: z.string().min(13, "CNIC must be at least 13 digits"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z
    .string()
    .min(10, "Account number must be at least 10 digits"),
});

const BankingDetails = () => {
  const registrationData = useSelector((state) => state.sellerRegistration);
  useEffect(() => {
    console.log("Updated Registration Data:", registrationData);
  }, [registrationData]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bankingDetailsSchema),
  });

  const onSubmit = async (data) => {
    dispatch(saveStepData({ step: "bankingdetails", data }));

    const payload = {
      // From shopdetails
      name: registrationData.shopdetails?.name,
      shopName: registrationData.shopdetails?.name,
      shopLogo: "", // Add this later if needed
      description: registrationData.shopdetails?.description,

      // From businessdetails
      businessEmail: registrationData.bussinessdetails?.email,
      phone: registrationData.bussinessdetails?.phone,
      businessAddress: registrationData.bussinessdetails?.address,

      // From bankingdetails
      CNIC: registrationData.bankingdetails?.cnic,
      bankName: registrationData.bankingdetails?.bankName,
      accountNumber: registrationData.bankingdetails?.accountNumber,

      // Extra (optional or default)
      bankAccountTitle: registrationData.shopdetails?.name, // or leave blank
      taxId: "",
      businessLicense: "",

      // User credentials (if needed)
      email: registrationData.bussinessdetails?.email,
      password: registrationData.bussinessdetails?.email, // you must collect this in Step 1 if required
    };

    try {
      const { data } = await axios.post("/seller/register", payload);
      console.log("Seller Registered:", data);
      toast.success("Seller in successfully!");
      navigate("/seller"); // or success page
    } catch (error) {
      toast.error("Seller Login Failed!");
      console.error(
        "Registration Error:",
        error.response?.data || error.message
      );
      navigate("/seller");
    }
  };

  return (
    <section className="w-full my-10 lg:my-40 flex justify-center">
      <div className="container max-w-full mx-auto flex flex-col gap-4 px-4 lg:px-32">
        <div className="text-gray-500">Step 3 of 3</div>
        <div className="font-bold max-w-2xl flex flex-col gap-5">
          <h1 className="text-3xl lg:text-4xl">Banking Details</h1>
          <p className="text-gray-600 text-sm font-normal">
            Enter your bank account details for payment processing.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* CNIC */}
          <div className="space-y-2 flex flex-col">
            <Label className="text-gray-500 text-sm">CNIC</Label>
            <Input
              {...register("cnic")}
              className="lg:w-1/2"
              placeholder="e.g. 42101-1234567-8"
            />
            {errors.cnic && (
              <p className="text-red-500 text-xs">{errors.cnic.message}</p>
            )}
          </div>

          {/* Bank Name */}
          <div className="space-y-2 flex flex-col">
            <Label className="text-gray-500 text-sm">Bank Name</Label>
            <Input
              {...register("bankName")}
              className="lg:w-1/2"
              placeholder="e.g. HBL, UBL"
            />
            {errors.bankName && (
              <p className="text-red-500 text-xs">{errors.bankName.message}</p>
            )}
          </div>

          {/* Account Number */}
          <div className="space-y-2 flex flex-col">
            <Label className="text-gray-500 text-sm">Account Number</Label>
            <Input
              {...register("accountNumber")}
              className="lg:w-1/2"
              placeholder="e.g. 1234567890123"
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-xs">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          <Button className="lg:w-36  text-white bg-red-500">Next</Button>
        </form>
      </div>
    </section>
  );
};

export default BankingDetails;
