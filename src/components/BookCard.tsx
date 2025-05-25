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
    <div className="border p-4 rounded">
      <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />
      <h2 className="font-bold">{title}</h2>
      <p>{price}</p>
    </div>
  );
};

export default BookCard;
