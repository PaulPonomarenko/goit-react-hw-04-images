import { ColorRing } from 'react-loader-spinner';
import css from '../ErrorMessage/ErrorMasage.module.css';

export const Loader = () => {
  return (
    <>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass={css.loader}
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </>
  );
};
