import PropTypes from 'prop-types';
export default function ImageGalleryItem({ data: { id, webformatURL, largeImageURL }, onClick }) {
  return (
    <li className="ImageGalleryItem" onClick={() => onClick(largeImageURL)}>
      <img src={webformatURL} alt="" className="ImageGalleryItem-image"/>
    </li>
  );
}

ImageGalleryItem.propTypes = {
 data: PropTypes.shape({
    id: PropTypes.number,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired
};