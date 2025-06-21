// src/components/Card.tsx
import axios from "axios";
import { Trash2 } from "lucide-react";
import React from "react";

interface CardProps {
  data: {
    _id: String;
    type: "document" | "tweet" | "youtube" | "link";
    link: string;
    title: string;
    tags: string[];
    imgUrl?: string; // Optional for future use
    description?: string; // Optional for future use

  },

}

const typeColors = {
  document: "bg-blue-100 text-blue-800",
  tweet: "bg-sky-100 text-sky-800",
  youtube: "bg-red-100 text-red-800",
  link: "bg-green-100 text-green-800",
};

const Card: React.FC<CardProps> = ({ data }) => {
const token = localStorage.getItem("token"); 
if (!token) {
  console.error("Token not found in localStorage");
}
const onDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this item?")) return;
  console.log(data._id)
  try {
    await axios.delete("http://localhost:3000/content", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        contentId: data._id,
      },
    });
    alert("Deleted successfully");
    // You should also trigger a UI update (e.g. refetch or remove from state)
  } catch (error) {
    console.error("Delete error:", error);
  }
};

  return (
    <div className="relative block rounded-xl shadow-black hover:shadow-lg bg-[#e0e7fe] border border-gray-200 p-4 max-w-sm hover:bg-gray-950 hover:text-white text-gray-800 hover:transform hover:scale-105 transition-transform duration-300">
      <a
      href={data.link}
      target="_blank"
      rel="noopener noreferrer"
      className=""
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${typeColors[data.type]}`}
        >
          {data.type.toUpperCase()}
        </span>
      </div>

      <h3 className="text-lg font-medium  mb-2">{data.title}</h3>
        </a>
        {
            data.description && (
            <p className="text-sm  mt-2">
                {data.description}
            </p>
        )
        }
        <div className="flex flex-wrap gap-2 mt-2">
        {data.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
        <span className="text-xs absolute bottom-2 right-2 text-gray-400">{new URL(data.link).hostname}</span>
      </div>
      
    
    <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={onDelete}
          className="p-1 rounded-full bg-white hover:bg-red-100 text-red-600"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
        </div>
    </div>
  );
};

export default Card;
