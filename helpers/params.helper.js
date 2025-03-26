function getClarifyParams(parsedParams) {
  const limit = Number(parsedParams?.limit) || 10;
  const page = Number(parsedParams?.page) || 1;

  const filters = parsedParams?.filters || null;
  const sort = parsedParams?.sort || null;

  const offset = page === 1 ? 0 : (page - 1) * limit;

  return {
    filters,
    sort,
    limit,
    offset,
  };
}

module.exports = {
  getClarifyParams,
};
