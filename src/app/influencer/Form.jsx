"use client"

import React, { useState } from 'react'
import FileInput from '@/components/FileInput'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'

const Form = () => {
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const submit = async (data) => {
    console.log("data is ", data);
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_HOST}/api/v1/influencer/details/create`,
        data: { ...data, created_by: "web", type_of_entity: "test", other_notes: "be polite" },

      })
      reset()
    } catch (error) {
      console.log(error);
      alert("Could not add lead")
    }
  };

  const formFields = [
    { name: 'name', label: 'Name*', type: 'text', validation: { required: "Name is required" } },
    { name: 'contact', label: 'Contact* ', type: 'number', validtion: { required: { value: true, message: "Your contact number is required" }, minLength: { value: 10, message: "Contact number must contain atleast 10 digits" }, maxLength: { value: 12, message: "Contact number can max contain 12 digits" } } },
    { name: 'location', label: 'Where are you based?* Area, city', type: 'text', validation: { required: "Locatin is required" } },
    { name: 'handle', label: 'Your Instagram / Youtube handle*', type: 'text', validation: { required: "Instagram / Youtube handle is required" } },
    { name: 'followers', label: 'Approx followers / subscribers* ', type: 'text', validation: { required: "Follower count is required" } },
    {
      name: 'followers_ratio_image',
      label: 'Attach screenshot of Men Women followers ratio (Optional)',
      type: 'file',
      // validation: { required: "This file is required" },
      exampleImage: '/men-women-ratio.jpeg'
    },
    {
      name: 'top_cities_image',
      label: 'Attach screenshot of Top cities (Optional)',
      type: 'file',
      // validation: { required: "This file is required" },
      exampleImage: '/cities.jpeg'
    },
    {
      name: 'age_range_image',
      label: 'Attach screenshot of Age range (Optional)',
      type: 'file',
      // validation: { required: "This file is required" },
      exampleImage: '/Age-range.jpeg'
    },
    { name: 'about', label: 'Tell us about you and your audience (optional)', type: 'text' },

  ];

  return (
    <div className='my-8  max-w-[1200px] mx-auto'>
      <h2 className='font-medium text-[20px] text-center'>Join our community </h2>
      <p className='mb-[30px] text-[10px] text-[#707070] text-center'>(All fields are mandatory)</p>

      <form onSubmit={handleSubmit(submit)} className='mx-[22px] text-[13px] flex flex-col gap-[14px]'>
        {formFields.map((field, index) => (
          <div key={index}>
            {(field.type === 'text' || field.type === "number") && (
              <div className="relative w-full">
                <input
                  type={field.type}
                  name={field.name}
                  // value={formData[field.name]}
                  placeholder=""
                  {...register(field.name, field.validation)}
                  // onChange={handleChange}
                  className={`block p-[15px] w-full text-base text-gray-900 bg-white border ${errors[field.name] ? 'border-red-500' : 'border-[#B9B9B9]'} rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 peer`}
                />
                <label
                  htmlFor={field.name}
                  className='absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3'
                >
                  {field.label}
                </label>
                {/* {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>}
                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>} */}
              </div>
            )}
            {field.type === 'file' &&
              <Controller
                name={field.name}
                control={control}
                rules={field.validation}
                render={({ field: { onChange } }) => (
                  <FileInput
                    label={field.label}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      onChange(file); // Pass the file to react-hook-form
                    }}
                    name={field.name}
                    exampleImage={field.exampleImage}
                  // exampleImage='/1.png'
                  />
                )}
              />
            }
            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>}
          </div>
        ))}

        <button type="submit" className='bg-[#72B5EC] text-white font-semibold text-[16px] px-[50px] py-[15px] rounded-lg'>
            {
              isSubmitting ? <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg> :
                "Submit"
            }
        </button>
      </form>
    </div>
  )
}

export default Form;
