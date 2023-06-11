import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <div>
    <button type="button" onClick={onClick} className="Button">
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;