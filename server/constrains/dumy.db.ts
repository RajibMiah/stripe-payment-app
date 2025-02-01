type StoreItem = {
    quantity: any;
    id: number;
    priceInCents: number;
    name: string;
};

const storeItems: Map<number, StoreItem> = new Map([
    [1, { id: 1, priceInCents: 10000, name: 'Learn React Today' }],
    [2, { id: 2, priceInCents: 20000, name: 'Learn CSS today' }],
]);

export { storeItems, StoreItem };
