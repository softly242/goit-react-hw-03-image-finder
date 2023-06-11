const MY_KEY = '34154795-6fcd5a0715506f88bd4f4189d';

const getImages = (query, page = 1) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Нет картинки с таким названием'));
  });
};

export default getImages;