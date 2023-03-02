import PropTypes from 'prop-types';
import s from '../Notification/Notification.module.scss';

export const Notification = ({ msg }) => {
  return <h2 className={s.Notifikashka}>{msg}</h2>;
};

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
};
