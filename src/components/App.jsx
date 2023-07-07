import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { gallaryApi } from 'api';
import { ErrorMasage } from './ErrorMessage/ErrorMasage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useState, useEffect } from 'react';

export function App() {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalImage, setTotalImage] = useState(null);

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    async function searchQuery() {
      setLoading(true);
      try {
        const data = await gallaryApi(inputValue, page);
        setPictures(prevState =>
          page === 1 ? data.hits : [...prevState, ...data.hits]
        );
        setTotalImage(data.totalHits);
        if (data.totalHits === 0) {
          throw new Error('По вашому запиту картинок не знайдено...');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    searchQuery();
  }, [inputValue, page]);

  const onModalOpen = event => {
    setIsOpen(true);
    setModalSrc(event.target.dataset.src);
  };

  const onModalClose = () => {
    setIsOpen(false);
  };

  const handleSearch = nextInputValue => {
    if (nextInputValue === inputValue) {
      return toast.error('Картинки по цьому запиту вже на екрані!');
    }
    setInputValue(nextInputValue);
    setIsOpen(false);
    setLoading(false);
    setModalSrc('');
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery pictures={pictures} onClick={onModalOpen} />
      <ToastContainer autoClose={3000} />
      {totalImage / pictures.length > page && (
        <Button onClick={handleLoadMore} />
      )}
      {totalImage === 0 && <ErrorMasage error={error} />}
      {loading && <Loader />}
      {isOpen && <Modal modalSrc={modalSrc} onClose={onModalClose} />}
    </>
  );
}
