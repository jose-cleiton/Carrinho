const fetchProducts = async (QUERY) => {
  try {
    const url = await `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
    const pegarUrl = await fetch(url);
    const promessa = pegarUrl.json();
    const promessaJason = await promessa;
    const { results } = promessaJason;
    
      return results;
  } catch (err) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
