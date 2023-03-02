import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { LoaderInModal } from '../Loader/Loader';
import s from '../Modal/Modal.module.scss';

export const Modal = ({ closeModal, url }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const closeByEsc = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const loadHandler = () => {
    setLoaded(true);
  };

  return (
    <>
      <div className={s.overlay} onClick={closeByBackdrop}>
        <div className={s.modal}>
          <img
            src={url}
            alt=""
            onLoad={loadHandler}
            style={{ display: loaded ? 'block' : 'none' }}
          />
          {!loaded && <LoaderInModal />}
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
