
import React, { Fragment } from 'react'
import Input from '../reusable/Input'
import {z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from "react-hook-form"

const Schema =  z.object({
  title: z.string().min(1, "Please enter book title")

})
export default function BookCreator() {

  const {register, handleSubmit, formState:{errors}} = useForm({resolver: zodResolver(Schema)})

  return (
    <Fragment>
       {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>(document.getElementById("my_modal_1") as HTMLDialogElement).showModal()}>open modal</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        <Input type='text' name="search" errors={errors}  register={register}/>
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
        <button className="btn bg-blue-500 hover:bg-blue-600 active:scale-110 text-white">Save</button>
      </form>
    </div>
  </div>
</dialog>
    </Fragment>
  )
}
