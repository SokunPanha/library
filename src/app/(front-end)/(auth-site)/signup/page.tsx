"use client";
import Btn from "@/components/reusable/Button";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { VscSignIn } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import Form from "@/components/Form";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/reusable/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spin";
import { Stepper, Step, Button } from "@material-tailwind/react";
import {
  UserIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { totalmem } from "os";
import ToggleTheme from "@/components/toggleTheme";

export default function Page() {
  const [isLoad, setLoader] = useState(false);
  const [effect, setEffect] = useState(false);
  const [isMatchPassword, SetIsMatchPassword] = useState(false)
  //check input
  const [userInfo, setUserInfo] = useState<SignUpType>({
    username: "",
    email: "",
    password: "1",
    confirmPassword: "",
  });
  const router = useRouter();
  const schema = z
    .object({
      username: z.string().min(3, "Username must be at least 3 character"),
      email: z.string().email(),
      password: z.string().min(6, "Your password must be at least 6 character"),
      confirmPassword: z.string().min(1, "Please confirm your passowrd"),
    })
    .refine((data) => data.confirmPassword == data.password, {
      message: "Password not match!",
      path: ["confirmPassword"],
    });
  type SignUpType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: any) => {
    try {
      toast.loading("Please wait a minutyye!", { id: "loading" });
      const response = await axios.post("/api/user/register", data);
      const { message } = response.data;
      if (response.status != 401) {
        toast.dismiss();
        toast.success(message, { id: "success" });
        router.push("/login");
      }
    } catch (err: any) {
      toast.dismiss();
      const { message } = err.response.data;
      toast.error(message, { id: "error" });
    }
  };

  useEffect(()=>{
    if(userInfo.confirmPassword == userInfo.password &&(userInfo.confirmPassword.length>=6 && userInfo.password.length>=6)){
      SetIsMatchPassword(true)
    }
    else{
      SetIsMatchPassword(false)
    }
  },[userInfo])
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => {
    if ( userInfo.username && userInfo.email)
      {
        !isLastStep && setActiveStep((cur) => cur + 1);
        setEffect(true);
      }else{
        toast.dismiss()
        toast.error("Please fill all the fiedl!")
      }
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  return (
    <Fragment>
      <ToggleTheme float={true}/>

      <Form
      
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleChange}
        className="animate-dimScreen"
      >
        <div className="header_form">
          <span>SING UP</span>
          <span>
            {" "}
            <VscSignIn />
          </span>
        </div>
        <div className="w-full py-4 px-8 ">
          <Stepper
          activeLineClassName="bg-green-500"
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            <Step
              activeClassName="bg-red-500"
              completedClassName={`${errors.email?.message || errors.username?.message ? "bg-red-500":"bg-green-500"}`}
              onClick={() => {
                console.log(errors.email?.message)
                if(!userInfo.email && !userInfo.email )
                setActiveStep(0);
              else
              setActiveStep(1)
              }}
            >
               { activeStep == 0 || (errors.email?.message || errors.username?.message )   ?  <UserIcon className="h-5 w-5" />:  <CheckCircleIcon className="h-5 w-5" />}
           
            </Step>
 
         

            <Step activeClassName={`${isMatchPassword ? "bg-green-500":"bg-red-500"}`} onClick={() => { 
                if(!userInfo.confirmPassword && !userInfo.email)
                   setActiveStep(0)
                 
                else{
                  setActiveStep(1)
                }
              }
                }>
            { isMatchPassword  && activeStep == 2 ?  <CheckCircleIcon className="h-5 w-5" />: <LockClosedIcon className="h-5 w-5" /> }

            </Step>
          </Stepper>
        </div>

        <div className="flex flex-col gap-3 scroll-auto overflow-hidden">
          {activeStep == 0 && (
            <>
              {/* controll both input  */}
              <div className={`${effect && "animate-wiggle"} `}>
                {/* controll one input  */}
                <div className=" input_container ">
                  <label htmlFor="">Username</label>
                  <Input
                    register={register}
                    name="username"
                    errors={errors}
                    type="text"
                    className={`w-full`}
                  />
                </div>

                <div className="input_container peer:hover:bg-red-500">
                  <label htmlFor="">Email</label>
                  <Input
                    register={register}
                    errors={errors}
                    name="email"
                    type="text"
                    className="w-full"
                  />
                </div>
              </div>
            </>
          )}
          {activeStep == 1 && (
            <>
              <div className={`${effect && "animate-wiggle"} `}>
                <div className="input_container">
                  <label htmlFor="">password</label>
                  <Input
                    register={register}
                    name="password"
                    onChange={handleSubmit(handleChange)}
                    errors={errors}
                    type="password"
                    className="w-full"
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="">Confirm password</label>
                  <Input
                    register={register}
                    name="confirmPassword"
                    errors={errors}
                    type="password"
                    className="w-full"
                  />
                </div>{" "}
              </div>
            </>
          )}
        </div>

        <div className="mt-2 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
      {
        activeStep == 1 ?<Button onClick={()=>{
            if(errors.email?.message){
              toast.error(errors.email.message)
              setActiveStep(0)
            }
            else{
              handleNext()
            }
          
        }} type="submit" className="bg-blue-500">
        submit
      </Button>: <Button onClick={handleNext} type="submit" disabled={isLastStep}>
        Next
      </Button>
     
      }
        </div>
        <div className="flex flex-col items-center gap-5">
          <p>
            {" "}
            Did you have an account?{" "}
            <Link onClick={()=>{setLoader(!isLoad)}} className="text-blue-600" href="/login">
              Login here.
            </Link>
          </p>
          <p>sign up with:</p>
          <Btn
            type="button"
            onClick={async () => {
              try{
                await signIn("google");
                setLoader(true);
              }catch(error:any){
                setLoader(false)
                toast.dismiss()
                toast.error(error)
              }
            }
            }
            className="bg-white rounded-none gap-3 border-2 border-blue-500 hover:bg-blue-100 shadow-lg w-full p-3 flex justify-center text-3xl"
          >
            <FcGoogle />
            <p className="text-lg text-black">Sign up with Google.</p>
          </Btn>
        </div>
      </Form>
      {isLoad && <Spinner />}
    </Fragment>
  );
}
