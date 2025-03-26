const formats = {
  lowercase: (string) => string.toLowerCase(),
  capitalize: (string) =>
    `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`,
};

module.exports = {
  formats,
};
