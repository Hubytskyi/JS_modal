const modal = modalFunc({
  title: 'Price of products',
  closable: true,
  footerButtons: [
    {
      text: 'Close', type: 'accepted', handler() {
        modal.close()
      }
    },
  ]
});

/**
 * HTML Card Template
 */

let fruits = [
  {
    id: 1,
    title: 'Яблоки',
    price: 35,
    img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'
  },
  {
    id: 2,
    title: 'Апельсини',
    price: 50,
    img: 'https://fruit-boutique.com.ua/content/images/43/apelsin-ispaniya-kg-92383155888981_small11.jpg'
  },
  {
    id: 3,
    title: 'Манго',
    price: 70,
    img: 'https://yesfrukt.com/storage/source/9f93a6908db208b5cf81fd540adc1ff5/product/1/7B2zZiW3DrZjuZPK4ZnI6xlgNBE0dk78.jpg'
  },
];

const toHTML = fruit => `
  <div class="card">
    <img src="${fruit.img}" alt="${fruit.title}">
    <h3>${fruit.title}</h3>
    <div class="buttons">
      <a href="#" class="button button-accepted" data-price="price" data-id="${fruit.id}">Show Price</a>
      <a href="#" class="button button-cancel" data-price="remove" data-id="${fruit.id}">Delete</a>
    </div>
  </div>
`;

function render() {
  const html = fruits.map(toHTML).join('');
  document.getElementById('card__list').innerHTML = html
}

render();

document.addEventListener('click', e => {
  e.preventDefault();
  const btnType = e.target.dataset.price;
  const id = +e.target.dataset.id;
  if (btnType === 'price') {
    const fruit = fruits.find(f => f.id === id);
    modal.setContent(`
      <div>Ціна на ${fruit.title}: <strong>${fruit.price}uah</strong></div>
    `);
    modal.open();
  } else if (btnType === 'remove') {
    const fruit = fruits.find(f => f.id === id);
    confirm({
      title: 'Are you sure?',
      content: `<div>You remove the fruit: <strong>${fruit.title}</strong></div>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== id);
      render();
      console.log('Remove')
    }).catch(() => {
      console.log('Cancel')
    })
  }
});