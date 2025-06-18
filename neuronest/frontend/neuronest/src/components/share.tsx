import React from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";



const ShareBrainModal: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#e0e7fe]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Share Your Content</h2>
            <Button
            variant="close"
            size="small"
            label="Close"
            onClick={()=>{ navigate("/content")}}
            ></Button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Share your entire collection of notes, documents, tweets, and videos with others.
          They'll be able to import your content into their own Neuronest.
        </p>

        {/* Share Button */}
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Share
        </button>
 </div>
    </div>
  );
};

export default ShareBrainModal;
