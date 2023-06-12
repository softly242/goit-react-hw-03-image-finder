import PropTypes from 'prop-types';

const Button = ({ onClick, show }) => {
  if (!show) return null;
  return (
    <div>
      <button type="button" onClick={onClick} className="Button">
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Button;
