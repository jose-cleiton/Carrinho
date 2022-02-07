require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('Teste se fetchProducts é uma função;', () => {
    expect(typeof fetchProducts).toEqual('function')
  })

  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    await fetchProducts("computador");
    expect(fetch).toHaveBeenCalled();
  })

  test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts("computador");
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  })

  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const testa = await fetchProducts("computador");
    expect(testa).toEqual(computadorSearch);
  })

  test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error(\'mensagem esperada aqui\') para comparar com o objeto retornado da API.', async () => {

    const testa5 = await fetchProducts();
    expect(testa5).toEqual(new Error('You must provide an url'))

  })

});
