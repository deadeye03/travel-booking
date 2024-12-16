import React from 'react';

interface DescriptionProps {
  tour: {
    name: string;
    description: string;
  };
}

const Description: React.FC<DescriptionProps> = ({ tour }) => {
  return (
    <div className="description-box py-10 px-10 pb-[calc(1vw+var(--section-rotate))] flex-[0_0_50%]">
      <h2 className="heading-secondary mb-[35px]">About {tour.name} Tour</h2>
      <p className="description__text text-[17px] mb-8">{tour.description}</p>
      <p className="description__text text-[17px]">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!
      </p>
    </div>
  );
};

export default Description;

