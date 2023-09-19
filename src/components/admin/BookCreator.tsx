
import React, { Fragment } from 'react'
import Image from 'next/image'
import Input from '../reusable/Input'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import Btn from '../reusable/Button'

import {FaImage} from "react-icons/fa"
const Schema = z.object({
  title: z.string().min(1, "Please enter book title"),
  description: z.string().min(1, "Please enter description"),
  number: z.number().min(0, "number of book must be greater than 0."),
  authorName: z.string().min(1, "Please enter author name."),
  categoryName: z.string().min(1, "Plase enter category of this book")

})
export default function BookCreator() {

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(Schema) })
  const submitHandler = async () => {

  }
  return (
    <Fragment>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => (document.getElementById("my_modal_1") as HTMLDialogElement).showModal()}>open modal</button>
      <dialog id="my_modal_1" className="modal">
        <div className="">
          <div className="rounded-md m-auto max-w-xl md:w-[900px] w-[90%] p-5 bg-base-100" >
            {/* input container  */}
            <form action="" className="flex w-full flex-col gap-5">
            <h3 className="font-bold md:text-3xl text-xl text-center">Book Information</h3>
              {/* inside input container  */}
              <div className=" md:p-2 p-5  bg-red  gap-2 overflow-auto h-[450px] w-full flex flex-col justify-between">

                {/* line 1  */}
                <div className='create_book_inputBox'>
                  <div className="create_book_input">
                    <label htmlFor="">Title</label>
                    <Input  type='text' name="title" errors={errors} register={register} />
                  </div>
                  <div className="create_book_input">
                    
                    <label htmlFor="">Number</label>
                    <Input type='number' name="number" errors={errors} register={register} />
                  </div>
                  
                </div>

                {/* line 2 */}

                <div className="create_book_inputBox">
                <div className="create_book_input">
                    <label htmlFor="">Author Name</label>
                    <Input type='text' name="authorName" errors={errors} register={register} />
                  </div>
                 

                  <div className="create_book_input">
                    <label htmlFor="">Category</label>
                    <Input type='number' name="Category" errors={errors} register={register} />
                  </div>
                
                </div>
                {/* line 3 */}
                <div className="create_book_inputBox">
                <div className="create_book_input">
                    <label htmlFor="uploadFile">Author Name</label>
                    <div id="uploadFile" className="w-full flex justify-center items-center h-44 ">
                    {/* <p className="text-4xl "> <FaImage /></p> */}
                    <Image className="object-cover w-full h-full rounded-md" src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg" alt='' width={400} height={400}/>
                    </div>
                    <Input type='file'  className='hidden'  name="file" errors={errors} register={register} />
                  </div>
                  <div className="create_book_input">
                    <label htmlFor="">Book Description</label>
                  <textarea className=" h-44 w-full resize-none textarea textarea-bordered" placeholder="Bio"></textarea>
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <div className="flex gap-4">
                  <Btn className="bg-red-500  text-white">Cancel</Btn>
                  <Btn className="bg-blue-500 text-white w-16"> Save </Btn>

                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </Fragment>
  )
}
