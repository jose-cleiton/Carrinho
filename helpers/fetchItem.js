const fetchItem = async (id) => {
  // seu código aqui
  try {
    const url = await `https://api.mercadolibre.com/items/${id}`;
    const pegaUrl = await fetch(url);
    const data = pegaUrl.json();   
    return data;
  } catch (err) {
    return new Error('You must provide an url');
  }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
