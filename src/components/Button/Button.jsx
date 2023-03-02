import PropTypes from 'prop-types';

import { AiOutlineSearch } from 'react-icons/ai';
import s from './Button.module.scss';

export const ButtonSubmit = () => {
  return (
    <button type="submit" className={s.buttonSubmit}>
      <AiOutlineSearch className={s.buttonSubmitSvg} size={18} />
    </button>
  );
};

export const ButtonLoader = ({ nextPageHandler }) => {
  return (
    <button type="button" className={s.ButtonLoader} onClick={nextPageHandler}>
      Load more
    </button>
  );
};
ButtonLoader.propTypes = {
  nextPageHandler: PropTypes.func.isRequired,
};
