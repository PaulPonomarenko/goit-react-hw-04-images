import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Modal({ onClose, modalSrc, alt }) {
  const handleOverayClick = event => {
    if (event.target === event.currentTarget) onClose();
  };
  const hanleKeyDown = event => {
    if (event.code === 'Escape') onClose();
  };

  useEffect(() => {
    console.log('hi');
    window.addEventListener('keydown', hanleKeyDown);
    return () => {
      window.removeEventListener('keydown', hanleKeyDown);
    };
  });

  return (
    <>
      <div className={css.Overlay} onClick={handleOverayClick}>
        <div className={css.Modal}>
          <img src={modalSrc} alt={alt} />
        </div>
      </div>
    </>
  );
}

Modal.proptTypes = {
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
