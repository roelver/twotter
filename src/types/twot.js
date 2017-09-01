import PropTypes from 'prop-types';

export default {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  datePosted: PropTypes.string.isRequired
};
