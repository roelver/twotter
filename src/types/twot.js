import PropTypes from 'prop-types';

export default {
  id: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  datePosted: PropTypes.string.isRequired
};
