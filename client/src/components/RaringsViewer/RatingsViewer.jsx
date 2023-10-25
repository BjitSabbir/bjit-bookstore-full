import "./ratingsViewer.scss"; // Import the SCSS file

export default function RatingsViewer({ rating }) {
  const roundedRating = parseFloat(rating.toFixed(1));
  const maxStars = 5;
  const filledStars = Math.round(roundedRating * 2) / 2;
  const unfilledStars = maxStars - filledStars;

  const filledStarsArray = [];
  for (let i = 0; i < filledStars; i++) {
    filledStarsArray.push(
      <span key={i} className="star filled-star">
        &#9733;
      </span>
    );
  }

  const unfilledStarsArray = [];
  for (let i = 0; i < unfilledStars; i++) {
    unfilledStarsArray.push(
      <span key={i} className="star unfilled-star">
        &#9733;
      </span>
    );
  }

  return (
    <div>
      <div className="stars-container">
        {filledStarsArray.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>

      <div className="stars-container">
        {unfilledStarsArray.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    </div>
  );
}
