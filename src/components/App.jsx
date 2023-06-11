import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';


export default class App extends Component {
  state = {
    q: null,
    loading: false,
  };

  handleFormSubmit = q => {
    this.setState({ q });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={7000} />
        <ImageGallery q={this.state.q} />
      </div>
    );
  }
}
