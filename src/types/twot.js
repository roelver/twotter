import PropTypes from 'prop-types';

export default {
  id: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  datePosted: PropTypes.string.isRequired
};
