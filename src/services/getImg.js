const KEY = '33416978-83b6039768e3c677abe323884';

export const getImg = (searchText, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchText}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
