import axios from 'axios';

export const requestApi = async (q, page, imagesPerPage) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '29884952-0a1ce1203a17cb22a427e3a5c',
      per_page: imagesPerPage,
      q: `${q}`,
      image_type: 'photo',
      orientation: 'horizontal',
      page,
    },
  });
  return data;
};
