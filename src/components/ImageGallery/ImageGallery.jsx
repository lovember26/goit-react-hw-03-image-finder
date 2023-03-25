import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ gallery, handleModal }) => {
  return (
    <Gallery className="gallery">
      {gallery.map(el => {
        return (
          <ImageGalleryItem
            key={el.id}
            url={el.webformatURL}
            handleModal={handleModal}
            largeUrl={el.largeImageURL}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.shape),
  handleModal: PropTypes.func.isRequired,
};
