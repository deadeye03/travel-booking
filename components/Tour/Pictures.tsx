import Image from 'next/image';
import React from 'react';

interface PicturesProps {
  images: string[];
  name: string;
}

const Pictures: React.FC<PicturesProps> = ({ images, name }) => {
  return (
    <section className="section-pictures ">
      {images?.map((image, index) => (
        <div key={index} className="picture-box">
          <Image
            className={`picture-box__img picture-box__img--1`}
            src={`/img/tours/${image}`}
            alt={`${name} Tour ${index + 1}`}
            height={500}
            width={500}
          />
        </div>
      ))}
    </section>
  );
};

export default Pictures;

