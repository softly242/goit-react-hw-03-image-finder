import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import getImages from 'components/api/api';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    images: null,
    selectedImage: null,
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    buttonVisible: true,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  selectImage = image => {
    this.setState({ selectedImage: image });
    this.toggleModal();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.q !== this.props.q) {
      this.setState({ status: 'pending' });
      getImages(this.props.q, this.state.page)
        .then(images =>
          this.setState({
            images,
            status: 'resolved',
            buttonVisible: !(
              Math.ceil(images.totalHits / 12) === this.state.page
            ),
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleClickButton() {
    getImages(this.props.q, this.state.page + 1)
      .then(data => {
        const page = this.state.page + 1;
        this.setState(prev => {
          return {
            images: {
              ...prev.images,
              hits: [...prev.images.hits, ...data.hits],
            },
            status: 'resolved',
            page: page,
            buttonVisible: !(Math.ceil(data.totalHits / 12) === page),
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div>Enter the title</div>;
    }
    if (status === 'pending') {
      return (
        <div>
          <Loader />
        </div>
      );
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className="ImageGallery">
            {images.hits.map(({ id, webformatURL, largeImageURL }, index) => (
              <ImageGalleryItem
                onClick={this.selectImage}
                key={id + '-' + index}
                data={{ id, webformatURL, largeImageURL }}
              />
            ))}
          </ul>
          {this.state.showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={this.state.selectedImage} alt="" />
            </Modal>
          )}
          {this.state.buttonVisible && (
            <Button onClick={() => this.handleClickButton()} />
          )}
        </div>
      );
    }
  }
}
ImageGallery.protoType = {
 q: PropTypes.string.isRequired,
};