"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Tiptap from "./components/Tiptap";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title not long enough" })
    .max(100, { message: "Title is too long" })
    .trim(),

  description: z
    .string()
    .min(5, { message: "Title not long enough" })
    .max(100, { message: "Title is too long" })
    .trim(),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onError(errors: any) {
    console.error("Form validation errors:", errors);
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label 
            htmlFor="title" 
            className="text-sm font-medium"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            placeholder="Enter a Title here"
            className="px-3 py-2 border rounded-md"
          />
          {errors.title && (
            <span className="text-sm text-red-500">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label 
            htmlFor="description" 
            className="text-sm font-medium"
          >
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Tiptap 
                description={field.name} 
                onChange={field.onChange} 
              />
            )}
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <button 
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}