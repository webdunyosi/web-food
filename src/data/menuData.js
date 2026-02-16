// Menu data with products organized by categories
export const menuCategories = [
  {
    id: 'food',
    name: 'Taomlar',
    icon: '🍖',
    products: [
      { id: 'shashlik', name: 'Shashlik', price: 25000 },
      { id: 'qozon-kabob', name: 'Qozon kabob', price: 30000 },
      { id: 'lagmon', name: "Lag'mon", price: 20000 },
      { id: 'osh', name: 'Osh', price: 18000 },
      { id: 'somsa', name: 'Somsa', price: 8000 },
      { id: 'manti', name: 'Manti', price: 15000 },
    ],
  },
  {
    id: 'drinks',
    name: 'Ichimliklar',
    icon: '🥤',
    products: [
      { id: 'choy', name: 'Choy', price: 3000 },
      { id: 'kofe', name: 'Kofe', price: 8000 },
      { id: 'cola', name: 'Cola', price: 5000 },
      { id: 'fanta', name: 'Fanta', price: 5000 },
      { id: 'suv', name: 'Suv', price: 2000 },
      { id: 'ayron', name: 'Ayron', price: 4000 },
    ],
  },
  {
    id: 'bread',
    name: 'Non va shirinliklar',
    icon: '🍞',
    products: [
      { id: 'non', name: 'Non', price: 2000 },
      { id: 'kulcha', name: 'Kulcha', price: 3000 },
      { id: 'tort', name: 'Tort', price: 25000 },
      { id: 'pirojniy', name: 'Pirojniy', price: 8000 },
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
