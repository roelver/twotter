import PropTypes from 'prop-types';
import User from './user';

export default {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  posted: PropTypes.string.isRequired,
  user: PropTypes.shape(User).isRequired
};
