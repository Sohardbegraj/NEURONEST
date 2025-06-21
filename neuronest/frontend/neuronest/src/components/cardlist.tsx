import React, { useState } from "react";
import Card from "./Card";
import usecontent from "../hooks/usecontent";

type CardType = "document" | "tweet" | "youtube" | "link";

type CardData = {
  _id:string;
  type: CardType;
  link: string;
  title: string;
  tags: string[];
  imgUrl?: string;
  description?: string;
  [key: string]: any;
};

const CardList: React.FC = () => {
  const [filter, setFilter] = useState<CardType | "all">("all");
  const content = usecontent() as CardData[];


  const filteredCards =
    filter === "all"
      ? content
      : content.filter((card) => card.type === filter);

  const types: (CardType | "all")[] = ["all", "document", "tweet", "youtube", "link"];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card, index) => (
          <Card key={index} data={card} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
