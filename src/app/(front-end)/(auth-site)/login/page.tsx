"use client";
import Button from "@/components/reusable/Button";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { SlLogin } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "@/components/reusable/Input";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spin";
import ToggleTheme from "@/components/toggleTheme";
export default function Page() {
  const [loader, setLoader] = useState(false);
  // const {data:session} = useSession()
  const router = useRouter();
  const schema = z.object({
    username: z.string().min(1, "Please enter your username or email"),
    password: z.string(),
  });
  type LoginType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(schema) });
  
  useEffect(()=>{
    setLoader(false)
  },[])
  const handleLogin = async (data: any) => {
    
    console.log(data);
    toast.dismiss();
    toast.loading("wait a second!", { id: "loading" });
 signIn("credentials", { ...data, redirect: false }).then((callback) => {
      
    if (!callback?.error) {
        
        toast.dismiss("loading");
        toast.success("Logged in successfully!", { id: "success" });
        setTimeout(() => {
          router.refresh();
        }, 2000);
        
      }
      if (callback?.error && callback.ok) {
       
        toast.dismiss("loading");
        toast.error(callback.error);
      }
    });
  };

  return (
    <Fragment>
      {loader && <Spinner />}
      <ToggleTheme float={true}/>
      <div className="h-screen w-full flex justify-center items-center animate-dimScreen" >
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex gap-7 flex-col w-11/12 max-w-xl p-8 shadow-lg "
        >
          <div className="header_form">
            <span>Login</span>
            <span>
              {" "}
              <SlLogin />
            </span>
          </div>

          <div className="input_container">
            <label htmlFor="">Email</label>
            <Input
              type="text"
              register={register}
              name={"username"}
              errors={errors}
            />
          </div>

          {/* password  */}
          <div className="input_container">
            <div className="flex w-full justify-between">
              <label htmlFor="">Password</label>
              <Link href={"/"} className="text-blue-500">
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              errors={errors}
              register={register}
              name="password"
            />
          </div>

          {/* password  */}

          <Button
            type="submit"
            className="bg-blue-500 text-white text-lg hover:bg-blue-700  "
          >
            Login
          </Button>

          <div className="flex flex-col items-center gap-5">
            <p>
              {" "}
              Don't have an account?{" "}
              <Link onClick={()=>{setLoader(!loader)}} className="text-blue-600" href="/signup">
                Register here.
              </Link>
            </p>
            <p>sign up with:</p>
            <Button
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
              }}
              className="bg-white rounded-none gap-3 border-2 border-blue-500 hover:bg-blue-100 shadow-lg w-full p-3 flex justify-center text-3xl"
            >
              <FcGoogle />
              <p className="text-lg text-black">log in with Google.</p>
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
