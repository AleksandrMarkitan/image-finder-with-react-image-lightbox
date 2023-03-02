export const maper = images => {
  return images.map(({ id, largeImageURL, webformatURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }));
};
