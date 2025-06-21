import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const contentSchema = z.object({
  type: z.enum(["document", "tweet", "youtube", "link"]),
  link: z.string().url("Must be a valid URL"),
  title: z.string().min(1, "Title is required"),
  tags: z.array(z.string()).max(10, "Max 10 tags"),
  description: z.string().optional(),
});

type ContentForm = z.infer<typeof contentSchema>;


const AddContentPage: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  
  const navigation=useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContentForm>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      type: "document",
      link: "",
      title: "",
      tags: [],
      description: "",
    },
  });

  const handleTagAdd = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const updated = [...tags, trimmed];
      setTags(updated);
      setValue("tags", updated);
      setTagInput("");
    }
  };

  const handleTagRemove = (tag: string) => {
    const updated = tags.filter((t) => t !== tag);
    setTags(updated);
    setValue("tags", updated);
  };



  const onSubmit = async(data: ContentForm) => {
    console.log("Validated Data:", {
      ...data,
      tags,
    });

const token = localStorage.getItem("token"); // This should be the plain token, no "Bearer" prefix

if (!token) {
  console.error("Token not found in localStorage");
}
    await axios.post('http://localhost:3000/addcontent', {
      link:data.link,
      type: data.type,
      title: data.title,
      tags:data.tags,
      description :data.description
    }, {
  headers: {
    Authorization: `Bearer ${token}`,// This is the correct format
    "Content-Type": "application/json"
  }
})
      .then(res => {
        alert("added")
       navigation('/content')
      })
      .catch(err => {
      alert("error");
      });

    reset();
    setTags([]);
  };

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#e0e7fe] px-2 sm:px-4">
      <div className="flex items-center justify-center bg-white rounded-2xl shadow-md w-full max-w-lg sm:max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full bg-white p-4 sm:p-8 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
          action={"/addcontent"}
          method="post"
          encType="multipart/form-data"
        >
          <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Content</h2>
      <Button
        variant="close"
        size="small"
        label="Close"
        onClick={()=>{navigation("/content")}}
      />
      </div>
        {/* Type */}
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            {...register("type")}
            className="w-full p-2 border rounded-lg"
          >
            <option value="document">Document</option>
            <option value="tweet">Tweet</option>
            <option value="youtube">YouTube</option>
            <option value="link">Link</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register("title")}
            type="text"
            className="w-full p-2 border rounded-lg"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Link */}
        <div>
          <label className="block mb-1 font-medium">Link</label>
          <input
            {...register("link")}
            type="url"
            className="w-full p-2 border rounded-lg"
          />
          {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 p-2 border rounded-lg"
              placeholder="Enter tag"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="bg-blue-500 text-white px-3 rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
        </div>


        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description (optional)</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>

        
        <Button variant="primary" size="large" label="ADD CONTENT" type="submit" onClick={()=>{handleSubmit}}></Button>
      </form>
    </div>
    </div>
  );
};

export default AddContentPage;
