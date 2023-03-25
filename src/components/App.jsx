import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { getImg } from 'services/getImg';
import { Wrapper } from 'components/ImageGallery/ImageGallery.styled';

export class App extends Component {
  state = {
    value: '',
    gallery: [],
    totalImg: 0,
    page: 1,
    isModalOpen: false,
    modalUrl: '',
    isLoading: false,
    isShowBtn: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.value !== this.state.value
    ) {
      this.setState({
        isLoading: true,
      });
      this.createGallery();
    }
  }
  createGallery = () => {
    const value = this.state.value;
    const page = this.state.page;
    try {
      getImg(value, page)
        .then(data => {
          if (data.total === 0) {
            Notify.failure('No results found!');
          }

          this.setState(prevState => ({
            gallery:
              page === 1 ? data.hits : [...prevState.gallery, ...data.hits],
            totalImg: data.totalHits,
          }));
        })
        .finally(() => this.setState({ isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  };

  onClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
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

  onSubmit = query => {
    if (query.trim() === '') {
      Notify.info('Enter search query!');
    } else {
      this.setState({
        value: query,
        page: 1,
        gallery: [],
        isShowBtn: false,
      });
    }
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        <Wrapper>
          <ImageGallery
            gallery={this.state.gallery}
            handleModal={this.handleModal}
          />
          {this.state.gallery.length < this.state.totalImg && (
            <Button onClick={this.onClick} />
          )}
          {this.state.isLoading && <Loader />}
          {this.state.isModalOpen && (
            <Modal url={this.state.modalUrl} closeModal={this.closeModal} />
          )}
        </Wrapper>
      </Container>
    );
  }
}
