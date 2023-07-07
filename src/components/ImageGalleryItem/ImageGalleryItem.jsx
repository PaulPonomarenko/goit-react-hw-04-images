import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          data-src={largeImageURL}
          className={css.ImageGalleryItem__image}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired,
};
