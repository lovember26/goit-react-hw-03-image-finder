import { getImg } from 'services/getImg';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Wrapper } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    perPage: 12,
    isModalOpen: false,
    modalUrl: '',
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        isModalOpen: false,
        perPage: 12,
      });
    }
    if (
      prevProps.value !== this.props.value ||
      prevState.perPage !== this.state.perPage
    ) {
      this.setState({
        isLoading: true,
      });
      try {
        getImg(this.props.value, this.state.perPage)
          .then(res => res.json())
          .then(data => {
            if (data.hits.length === 0) {
              Notify.failure('No results found!');
            } else this.setState({ gallery: data.hits });
          })
          .finally(() => this.setState({ isLoading: false }));
      } catch (error) {
        console.log(error);
      }
    }
  }
  onClick = () => {
    this.setState(prevState => ({
      perPage: prevState.perPage + 12,
    }));
  };
  handleModal = url => {
    this.setState({
      isModalOpen: true,
      modalUrl: url,
    });
  };
  closeModal = ({ target }) => {
    if (target.nodeName !== 'IMG') {
      this.setState({
        isModalOpen: false,
      });
    }
  };
  render() {
    const gallery = this.state.gallery;

    return (
      <Wrapper>
        <Gallery className="gallery">
          {gallery.map(el => {
            return (
              <ImageGalleryItem
                key={el.id}
                url={el.webformatURL}
                handleModal={this.handleModal}
                largeUrl={el.largeImageURL}
              />
            );
          })}
        </Gallery>
        {this.state.gallery.length > 0 && <Button onClick={this.onClick} />}
        {this.state.isLoading && <Loader />}
        {this.state.isModalOpen && (
          <Modal url={this.state.modalUrl} closeModal={this.closeModal} />
        )}
      </Wrapper>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};
