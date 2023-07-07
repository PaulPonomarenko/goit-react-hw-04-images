import React from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      return toast.info('Введіть назву!');
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <>
      <header className={css.searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <SearchIcon width={30} height={30} />
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
