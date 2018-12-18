DROP DATABASE IF EXISTS inventory_DB;

CREATE DATABASE inventory_DB;

USE inventory_DB;

CREATE TABLE items (
    id INT AUTO_INCREMENT,
    item VARCHAR(50) NOT NULL,
    category VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    inventoryQuantity INT NOT NULL,
    PRIMARY KEY (id)

);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("flat iron", "beauty", 99, 15);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("blow dryer", "beauty", 99, 15);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("brush", "beauty", 15, 10);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("iphone 8", "electronics", 699, 10);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("iphone X", "electronics", 999, 8);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("ipad", "electronics", 499, 10);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("apple watch", "electronics", 399, 6);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("iphone 8 case", "accesories", 20, 15);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("iphone x phone case", "accesories", 20, 14);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("bath bomb", "beauty", 6, 20);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("sunglasses", "accesories", 399, 5);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("leggings", "women's clothing", 75, 40);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("windbreaker", "women's clothing", 95, 10);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("umbrella", "accesories", 15, 50);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("gloves", "accesories", 25, 30);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("beanie", "accesories", 24, 30);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("rings", "accesories", 50, 27);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("pillows", "bed decor", 40, 60);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("throw", "bed decor", 50, 40);

INSERT INTO items (item, category, price, inventoryQuantity) VALUES ("candles", "home decor", 20, 30); 

SELECT * FROM items;

