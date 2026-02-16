// Waiters data
export const waiters = [
  { id: 1, firstName: "Alimardon", lastName: "Rahimov" },
  { id: 2, firstName: "Dilnoza", lastName: "Karimova" },
  { id: 3, firstName: "Javohir", lastName: "Toshmatov" },
  { id: 4, firstName: "Gulnora", lastName: "Sharipova" },
  { id: 5, firstName: "Sardor", lastName: "Yo'ldoshev" },
];

export const getWaiterById = (waiterId) => {
  return waiters.find(w => w.id === waiterId) || null;
};

export const getWaiterFullName = (waiter) => {
  if (!waiter) return '';
  return `${waiter.firstName} ${waiter.lastName}`;
};