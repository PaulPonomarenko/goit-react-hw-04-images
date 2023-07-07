import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, onClick }) => {
  return (
    <>
      <ul className={css.ImageGallery} onClick={onClick}>
        {pictures.map(picture => (
          <ImageGalleryItem
            key={picture.id}
            webformatURL={picture.webformatURL}
            tags={picture.tags}
            largeImageURL={picture.largeImageURL}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
