import React from "react";

interface BookCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  image,
  price,
  rating,
}) => {
  return (
    <div
      className="border p-4 rounded shadow hover:shadow-lg flex flex-col h-full
                 transform scale-90 hover:scale-93 transition-transform duration-200 ease-in-out
                 bg-gray-50 group"
    >
      {/* Image Container */}
      <div className="w-full aspect-square overflow-hidden rounded mb-3 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h2 className="font-bold text-lg leading-tight line-clamp-2 mb-1">
          {title}
        </h2>

        <p className="text-green-600 font-semibold mt-auto mb-1">${price}</p>

        <p className="text-yellow-500">⭐ {rating}</p>
      </div>
    </div>
  );
};

export default BookCard;
