import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

import s from './ImageGallery.module.scss';

export const ImageGallery = ({ images }) => {
  const [imageDimensions, setImageDimensions] = useState([]);
  useEffect(() => {
    const getDimensions = async () => {
      const dimensions = await Promise.all(
        images.map(async ({ largeImageURL }) => {
          const { width, height } = await getImageDimensions(largeImageURL);
          return { width, height };
        })
      );
      setImageDimensions(dimensions);
    };
    getDimensions();
  }, [images]);

  const getImageDimensions = src => {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        resolve({ width: image.width, height: image.height });
      };
      image.src = src;
    });
  };

  console.log(imageDimensions.length);
  const imgLoading = imageDimensions.length;
  return (
    <ul className={s.ImageGallery}>
      {imgLoading && (
        <Gallery>
          {images.map(({ largeImageURL, webformatURL }, index) => (
            <li key={index} className={s.GalleryItem}>
              <Item
                original={largeImageURL}
                thumbnail={webformatURL}
                width={imageDimensions[index]?.width}
                height={imageDimensions[index]?.height}
              >
                {({ ref, open }) => (
                  <img
                    src={webformatURL}
                    className={s.GalleryItemImage}
                    alt="finding img"
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
            </li>
          ))}
        </Gallery>
      )}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
