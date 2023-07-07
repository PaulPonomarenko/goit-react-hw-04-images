import css from './ErrorMasage.module.css';
import PropTypes from 'prop-types';

export const ErrorMasage = ({ error }) => {
  return (
    <>
      <h2 className={css.ErrorMasage}>{error}</h2>
    </>
  );
};
ErrorMasage.propTypes = {
  error: PropTypes.string,
};
