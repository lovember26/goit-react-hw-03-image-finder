import { Component } from 'react';
import { Backdrop, ModalWrap } from './Modal.styled';
import PropTypes from 'prop-types';
export class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener('keydown', this.handleModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModal);
  }
  handleModal = ({ code }) => {
    if (code === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    return (
      <Backdrop className="overlay" onClick={this.props.closeModal}>
        <ModalWrap className="modal">
          <img src={this.props.url} alt="" />
        </ModalWrap>
      </Backdrop>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,

  closeModal: PropTypes.func.isRequired,
};
