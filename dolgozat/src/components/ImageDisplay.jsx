import { useState } from "react";

function ImageDisplay({ src, rating = 0, id, ratePicture }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const totalStars = 5;

  const handleRatePicture = async (id, rating) => {
    setIsAnimating(true);
    await ratePicture(id, rating);
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <div className="card max-w-full flex flex-col items-center mb-20">
      <div className="aspect-square w-48 h-48 mb-4 rounded-xl shadow-xl">
        <img
          src={src}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      <div
        className={`stars rotate-180 justify-self-center ${
          isAnimating ? "rating-in-progress" : ""
        }`}
      >
        {[...Array(totalStars)].map((_, i) => {
          const index = totalStars - 1 - i;
          return (
            <span
              key={index}
              className={index < rating ? "active" : ""}
              onClick={() => handleRatePicture(id, index + 1)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              ✦
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default ImageDisplay;
