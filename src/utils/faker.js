import { fakerES as faker } from "@faker-js/faker";

export const generateProduct = () => {
    const product = {
        id: faker.database.mongodbObjectId(), 
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.commerce.productMaterial(),
        price: faker.number.int(1000),//faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
        status: faker.datatype.boolean(),
        stock: faker.number.int(100),
        category: faker.commerce.department(),
        //thumbnails:,
    };
    return product;
};