/**
 * Обрабатывает данные компании и возвращает результат.
 * @param {Object} item
 * @param {string} photoUrl
 * @return {Object}
 */
function parseOne(item, photoUrl) {
  return {
    ...item,
    photos: item.photos.map((photo) => ({
      ...photo,
      name: `${photoUrl}static/${photo.name}`,
      thumbpath: `${photoUrl}static/${photo.thumbpath}`,
    })),
  };
}

/**
 * Обрабатывает данные компаний и возвращает результат.
 * @param {Object} items
 * @param {string} photoUrl
 * @return {Object}
 */
function parseMany(items, photoUrl) {
  const { count, companies } = items;

  return {
    count,
    companies: companies.map((company) => parseOne(company, photoUrl)),
  };
}

module.exports = { parseOne, parseMany };
