import PropTypes from 'prop-types';

export default {
  twotname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  iconUrl: PropTypes.string,
  dateJoined: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string)
};
