// Waiters data
export const waiters = [
  { id: 1, firstName: "Alimardon", lastName: "Rahimov", image: "/afitsant/waiter1.svg" },
  { id: 2, firstName: "Dilnoza", lastName: "Karimova", image: "/afitsant/waiter2.svg" },
  { id: 3, firstName: "Javohir", lastName: "Toshmatov", image: "/afitsant/waiter3.svg" },
  { id: 4, firstName: "Gulnora", lastName: "Sharipova", image: "/afitsant/waiter4.svg" },
  { id: 5, firstName: "Sardor", lastName: "Yo'ldoshev", image: "/afitsant/waiter5.svg" },
];

export const getWaiterById = (waiterId) => {
  return waiters.find(w => w.id === waiterId) || null;
};

export const getWaiterFullName = (waiter) => {
  if (!waiter) return '';
  return `${waiter.firstName} ${waiter.lastName}`;
};