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

export class App extends React.Component {
  state = {
    inputValue: '',
    page: 1,
    pictures: [],
    error: null,
    isOpen: false,
    modalSrc: '',
    loading: false,
    totalImage: null,
  };

  async componentDidUpdate(_, prevState) {
    const { inputValue, page } = this.state;

    if (inputValue !== prevState.inputValue || page !== prevState.page) {
      try {
        this.setState({ loading: true });
        const data = await gallaryApi(inputValue, page);
        this.setState(prevState => ({
          pictures:
            page === 1 ? data.hits : [...prevState.pictures, ...data.hits],
          totalImage: data.totalHits,
        }));
        if (data.totalHits === 0) {
          throw new Error('По вашому запиту картинок не знайдено...');
        }
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onModalOpen = event => {
    this.setState({ isOpen: true, modalSrc: event.target.dataset.src });
  };

  onModalClose = () => {
    this.setState({ isOpen: false });
  };

  handleSearch = inputValue => {
    if (this.state.inputValue === inputValue) {
      return toast.error('Картинки по цьому запиту вже на екрані!');
    }
    this.setState({
      inputValue,
      modalSrc: '',
      isOpen: false,
      loading: false,
      page: 1,
      pictures: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { error, pictures, modalSrc, isOpen, loading, totalImage, page } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery pictures={pictures} onClick={this.onModalOpen} />
        <ToastContainer autoClose={3000} />
        {totalImage / pictures.length > page && (
          <Button onClick={this.handleLoadMore} />
        )}
        {totalImage === 0 && <ErrorMasage error={error} />}
        {loading && <Loader />}
        {isOpen && <Modal modalSrc={modalSrc} onClose={this.onModalClose} />}
      </>
    );
  }
}
