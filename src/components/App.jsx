import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadButton from './LoadButton/LoadButton';
import Loader from 'components/Loader/Loader';
import getImages from 'components/api/api';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    q: null,
    loading: false,
    images: [],
    showModal: false,
    selectedImage: null,
    page: 1,
    error: null,
    status: 'idle',
    buttonVisible: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      getImages(this.state.q, this.state.page)
        .then(response =>
          this.setState({
            images:
              prevState.page !== this.state.page
                ? [...prevState.images, ...response.hits]
                : response.hits,
            status: 'resolved',
            buttonVisible: !(
              Math.ceil(response.totalHits / 12) === this.state.page
            ),
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleFormSubmit = q => {
    this.setState({ q });
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

  handleLoadButtonClick() {
    this.setState(prev => ({ page: prev.page + 1 }));
  }

  render() {
    const { images, error, status } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={7000} />
        {status === 'idle' && <p className="enter-title">Enter the title</p>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {(status === 'resolved' || this.state.images.length > 0) && (
          <>
            <ImageGallery images={images} onImageClick={this.selectImage} />
            <Modal onClose={this.toggleModal} show={this.state.showModal}>
              <img src={this.state.selectedImage} alt="" />
            </Modal>
            <LoadButton
              onClick={() => this.handleLoadButtonClick()}
              show={this.state.buttonVisible}
            />
          </>
        )}
      </div>
    );
  }
}
