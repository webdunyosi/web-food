// Menu data with products organized by categories
export const menuCategories = [
  {
    id: 'food',
    name: 'Taomlar',
    icon: '🍖',
    products: [
      { id: 'shashlik', name: 'Shashlik', price: 25000, image: '/menu/shashlik.png' },
      { id: 'qozon-kabob', name: 'Qozon kabob', price: 30000, image: '/menu/shashlik.png' },
      { id: 'lagmon', name: "Lag'mon", price: 20000, image: '/menu/shashlik.png' },
      { id: 'osh', name: 'Osh', price: 18000, image: '/menu/shashlik.png' },
      { id: 'somsa', name: 'Somsa', price: 8000, image: '/menu/somsa.png' },
      { id: 'manti', name: 'Manti', price: 15000, image: '/menu/somsa.png' },
    ],
  },
  {
    id: 'drinks',
    name: 'Ichimliklar',
    icon: '🥤',
    products: [
      { id: 'choy', name: 'Choy', price: 3000, image: '/menu/kola.png' },
      { id: 'kofe', name: 'Kofe', price: 8000, image: '/menu/kola.png' },
      { id: 'cola', name: 'Cola', price: 5000, image: '/menu/kola.png' },
      { id: 'fanta', name: 'Fanta', price: 5000, image: '/menu/kola.png' },
      { id: 'suv', name: 'Suv', price: 2000, image: '/menu/kola.png' },
      { id: 'ayron', name: 'Ayron', price: 4000, image: '/menu/kola.png' },
    ],
  },
  {
    id: 'bread',
    name: 'Non va shirinliklar',
    icon: '🍞',
    products: [
      { id: 'non', name: 'Non', price: 2000, image: '/menu/non.png' },
      { id: 'kulcha', name: 'Kulcha', price: 3000, image: '/menu/non.png' },
      { id: 'tort', name: 'Tort', price: 25000, image: '/menu/non.png' },
      { id: 'pirojniy', name: 'Pirojniy', price: 8000, image: '/menu/non.png' },
    ],
  },
];

export const getProductById = (productId) => {
  for (const category of menuCategories) {
    const product = category.products.find(p => p.id === productId);
    if (product) {
      return product;
    }
  }
  return null;
};