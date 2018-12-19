//Require NPM Packages
//NPM modules that are needed for this app

var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Create connection to inventory's database
//Add name of database as well as my password
//Assign a local host and port number
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "inventory_DB"
});
//Once connected display
connection.connect(function (err) {
    if (err) throw err;
    managerPrompt();
});

// Manager Prompt function

function managerPrompt() {
    inquirer
        .prompt([{
                name: "action",
                type: "list",
                message: "Welcome to your store's inventory! What would you like to do?",
                choices: ["View Items for Sale", "View Low Inventory", "Add to Inventory", "Add New Item"],
            }
            // Create switch statements depending on what the manager chooses to do.
            //Manager has the option to view items that are for sale, low inventory items, 
            //update current inventory for an existing item or add a new item. 
        ]).then(function (answers) {
                var managerAction = answers.action;

                switch (managerAction) {
                    case "View Items for Sale":
                        displayInventory();
                        break;
                    case "View Low Inventory":
                        viewLowInventory();
                        break;
                    case "Add to Inventory":
                        addInventory();
                        break;
                    case "Add New Item":
                        addNewItem();
                        break;
                };
//Function to display the current inventory if manager takes this action.
//This will display the stock of each item that's currently for sale.
                function displayInventory() {
                    connection.query(
                        "SELECT * FROM items",
                        function (err, res) {
                            if (err) throw err;

                            console.table(res);

                        })
                }
                //Function that will display the items that are low in inventory, manager is able to see if they're almost
                //running out of stock for a certain item.
                function viewLowInventory() {
                    connection.query("SELECT id, item, category, price, inventoryQuantity FROM items", function (err, res) {

                        var table = new Table({
                            head: ["ID", "Item", "Category", "Price", "In Stock"],
                            colWidths: [10, 25, 20, 10, 10]
                        });

                        for (var i = 0; i < res.length; i++) {
                            if (res[i].inventoryQuantity < 100) {
                                table.push(
                                    [res[i].id, res[i].item, res[i].category, res[i].price, res[i].inventoryQuantity],
                                );
                            }
                        }
                        console.log("\nThese are all the items with less than 100 units left in their inventory: ")
                        console.log(table.toString());
                    })

                    // Function that allows manager to update inventory of an existing item


                    function addInventory() {
                        displayInventory();
                        inquirer.prompt([{
                                type: "input",
                                name: "newItem",
                                message: "\nWhat is the ID number of the item you would like to update? \n"
                            },
                            {
                                name: "updateAmount",
                                message: "Amount to add to inventory: \n"
                            }
                        ]).then(function (answers) {
                            var itemChosen = answers.itemChoice
                            connection.query("SELECT * FROM items", function (err, res) {

                                function newQuantity() {
                                    for (var i = 0; i < res.length; i++) {
                                        if (itemChosen == res[i].id) {

                                            return res[i].inventoryQuantity
                                        }
                                    }
                                }

                                var updateQuantity = newQuantity() + parseInt(answers.updateAmount)

                                connection.query(
                                    "UPDATE items SET ? WHERE ?", [{
                                            inventoryQuantity: updateQuantity
                                        },
                                        {
                                            id: itemChosen
                                        }
                                    ],
                                    function (err, res) {
                                        console.log("\nItem inventory updated successfully!:");
                                        displayInventory();
                                    }
                                );
                            })
                        })

                    }

                    // Function that allows manager to add a new item to sell

                    function addNewItem() {
                        console.log("\nEnter the required information to create new item.\n")
                        inquirer
                            .prompt([{
                                    type: "input",
                                    name: "item",
                                    message: "Name of new item: \n"
                                },
                                {
                                    type: "input",
                                    name: "category",
                                    message: "Category of new item: \n"
                                },
                                {
                                    type: "input",
                                    name: "price",
                                    message: "Item price: \n"
                                },
                                {
                                    type: "input",
                                    name: "inventory",
                                    message: "Inventory quantity: \n"
                                }
                            ]).then(function (answers) {
                                connection.query(
                                    "INSERT INTO items SET ?", {
                                        item: answers.item,
                                        category: answers.category,
                                        price: answers.price,
                                        inventoryQuantity: answers.inventory
                                    },
                                    function (err, res) {
                                        if (err) throw err;
                                        console.log("\nYour new item has been added to the inventory successfully!\n");
                                        displayInventory();

                                    }
                                )

                            })
                        }
                    }
                })
            }
                        