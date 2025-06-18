// src/components/Card.tsx
import { Trash2 } from "lucide-react";
import React from "react";

interface CardProps {
  data: {
    type: "document" | "tweet" | "youtube" | "link";
    link: string;
    title: string;
    tags: string[];
    imgUrl?: string; // Optional for future use
    description?: string; // Optional for future use

  };
  onDelete?: () => void;
}

const typeColors = {
  document: "bg-blue-100 text-blue-800",
  tweet: "bg-sky-100 text-sky-800",
  youtube: "bg-red-100 text-red-800",
  link: "bg-green-100 text-green-800",
};

const Card: React.FC<CardProps> = ({ data, onDelete }) => {
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
        {data.imgUrl && (
            <img
                src={data.imgUrl}
                alt={data.title}
                className="mt-4 w-full h-32 object-cover rounded-lg"
            />
        )}
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
