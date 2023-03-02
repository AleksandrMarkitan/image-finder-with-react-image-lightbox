import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { maper } from '../utils/maper';
import { requestApi } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoader } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Notification } from './Notification/Notification';

export const App = () => {
  const imagesPerPage = 12;
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageInModal, setImageInModal] = useState(null);
  const [imagesQuantity, setImagesQuantity] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    imgFromApi(query, page, imagesPerPage);
  }, [query, page]);

  const imgFromApi = async (query, page, imagesPerPage) => {
    setNotFound(false);
    setError(null);
    setIsLoading(true);

    try {
      const data = await requestApi(query, page, imagesPerPage);
      const apiImages = data.hits;
      const totalHits = data.totalHits;
      if (apiImages.length) {
        setImages(prevState => [...prevState, ...maper(apiImages)]);
        setNotFound(false);
        setImagesQuantity(totalHits);
      } else {
        setImages([]);
        setNotFound(true);
        setImagesQuantity(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const nextPageHandler = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = e => {
    const imageInModal = e.target.dataset.url;
    setImageInModal(imageInModal);
  };

  const closeModal = () => {
    setImageInModal(null);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <Notification msg={error} />}
      {notFound && !error && (
        <Notification msg={'Nothing found for your request'} />
      )}
      {<ImageGallery images={images} openModal={openModal} />}
      {page < imagesQuantity / imagesPerPage && !isLoading && !error && (
        <ButtonLoader nextPageHandler={nextPageHandler} />
      )}
      {imageInModal && <Modal url={imageInModal} closeModal={closeModal} />}
    </>
  );
};
