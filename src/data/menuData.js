// Menu data with products organized by categories
export const menuCategories = [
  {
    id: 'food',
    name: 'Taomlar',
    icon: 'IoFastFood',
    products: [
      { id: 'shashlik', name: 'Shashlik', price: 25000, image: '/menu/taomlar/shashlik.png' },
      { id: 'qozon-kabob', name: 'Qozon kabob', price: 30000, image: '/menu/taomlar/qozon-kabob.png' },
      { id: 'lagmon', name: "Lag'mon", price: 20000, image: '/menu/taomlar/lagmon.png' },
      { id: 'osh', name: 'Osh', price: 18000, image: '/menu/taomlar/osh.png' },
      { id: 'somsa', name: 'Somsa', price: 8000, image: '/menu/taomlar/somsa.png' },
      { id: 'manti', name: 'Manti', price: 15000, image: '/menu/taomlar/manti.png' },
    ],
  },
  {
    id: 'drinks',
    name: 'Ichimliklar',
    icon: 'IoCafe',
    products: [
      { id: 'choy', name: 'Choy', price: 3000, image: '/menu/ichimliklar/choy.png' },
      { id: 'kofe', name: 'Kofe', price: 8000, image: '/menu/ichimliklar/coffe.png' },
      { id: 'cola', name: 'Cola', price: 5000, image: '/menu/ichimliklar/cola.png' },
      { id: 'fanta', name: 'Fanta', price: 5000, image: '/menu/ichimliklar/fanta.png' },
      { id: 'suv', name: 'Suv', price: 2000, image: '/menu/ichimliklar/suv.png' },
      { id: 'ayron', name: 'Ayron', price: 4000, image: '/menu/ichimliklar/ayron.png' },
    ],
  },
  {
    id: 'bread',
    name: 'Non va shirinliklar',
    icon: 'GiBread',
    products: [
      { id: 'non', name: 'Non', price: 2000, image: '/menu/non/non.png' },
      { id: 'kulcha', name: 'Kulcha', price: 3000, image: '/menu/non/kulcha.png' },
      { id: 'pahlava', name: 'Pahlava', price: 25000, image: '/menu/non/pahlava.png' },
      { id: 'qulupnayli-rulet', name: 'Qulupnayli rulet', price: 8000, image: '/menu/non/qulupnayli-rulet.png' },
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