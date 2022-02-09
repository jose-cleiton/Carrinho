const cart = document.querySelector('.cart__items');
const removeCart = document.querySelector('.empty-cart');
const itemLi = document.getElementsByClassName('cart__item');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = async () => {
  const itemPai = document.querySelectorAll('.item');
  itemPai.forEach((item) => {
    const btn = item.querySelector('.item__add');
    const id = item.querySelector('.item__sku').innerText;
    btn.addEventListener('click', async () => {
      const inform = await fetchItem(id);
      const sku = inform.id;
      const name = inform.title;
      const salePrice = Number(inform.price);
      const objProdutos = { sku, name, salePrice };
      cart.appendChild(createCartItemElement(objProdutos));
      saveCartItems(cart.innerHTML);      
    });
  });
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

//  function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

removeCart.addEventListener('click', () => {
  cart.innerHTML = '';
  localStorage.removeItem('cartItems');
});

const colocarProdutos = async () => {
    const produtosAColocar = await fetchProducts('computador');
    const listaDeProdutos = produtosAColocar.results;
    const itemPai = document.querySelector('.items');
    listaDeProdutos.forEach((item) => {
      const sku = item.id;
      const name = item.title;
      const image = item.thumbnail;
      const objProdutos = { sku, name, image };      
    itemPai.appendChild(createProductItemElement(objProdutos));
});
};

const apagaItemCarrinho = () => {
  for (let i = 0; i < itemLi.length; i += 1) {
    itemLi[i].addEventListener('click', (event) => cartItemClickListener(event));
  }
};
  cart.innerHTML = '';
window.onload = async () => {
  await colocarProdutos();
  await addToCart();
  await getSavedCartItems();
  cart.innerHTML = getSavedCartItems();
  await apagaItemCarrinho();
};
