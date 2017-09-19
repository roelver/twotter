import PropTypes from 'prop-types';

export default {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  dateJoined: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.string)
};
