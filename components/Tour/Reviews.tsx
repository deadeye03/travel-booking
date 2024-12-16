import Image from 'next/image';
import React from 'react';

interface reviews {
  id: string;
  userId: string;
  toursId: string;
  review: string | null;
  rating: number;
  users: {
    id: string;
    name: string;
    toursId: string | null;
    email: string;
    photo: string | null;
    role: string | null;
    password: string;
    active: boolean;
  };
}
interface ReviewsProps {
  reviews: reviews[]
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  // This component is a placeholder. You'll need to implement the actual reviews functionality.
  return (
    <section className="section-reviews">
      <div className="reviews">
        {reviews.map((review) =>
          <div key={review.id} className='reviews__card'>

            <div className="reviews__avatar">
              <Image className="reviews__avatar-img" src={`/img/users/${review.users.photo}`}
                alt={`${review.users.name} `}  height={80} width={60} />
              <h6 className="reviews__user">
                {review.users.name}
              </h6>
            </div>
            <p className="reviews__text">
              {review.review}
            </p>
            <div className="reviews__rating">
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i}
                  className={`reviews__star reviews__star-- ${review.rating >= i ? 'active' : 'inactive'} `}>
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;

