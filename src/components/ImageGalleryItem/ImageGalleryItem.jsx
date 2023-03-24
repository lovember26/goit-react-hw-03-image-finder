import { Item, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, largeUrl, handleModal }) => {
  return (
    <Item className="gallery-item" onClick={() => handleModal(largeUrl)}>
      <Img src={url} alt="" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
};
