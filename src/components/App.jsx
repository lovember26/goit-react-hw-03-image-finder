import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export class App extends Component {
  state = {
    value: '',
  };

  onSubmit = e => {
    e.preventDefault();
    if (e.target[1].value.trim() === '') {
      Notify.info('Enter search query!');
    } else {
      this.setState({
        value: e.target[1].value,
      });
    }
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery value={this.state.value} />
      </Container>
    );
  }
}
