import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL }, index) => (
        <div key={id + '-' + index} onClick={() => onImageClick(largeImageURL)}>
          <ImageGalleryItem data={{ id, webformatURL, largeImageURL }} />
        </div>
      ))}
    </ul>
  );
}
ImageGallery.protoType = {
  onImageClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
