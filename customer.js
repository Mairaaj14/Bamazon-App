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
    port: 3502,
    user: "root",
    password: "password",
    database: "inventory_DB"
});
//Variables to store items data
var customerChoice = [];
var itemName;
var itemQuantity;
var itemPrice;

// When connection funtion happens and there's an errow 
//throw error alert & if not console log connected as
connection.connect(function (err) {
    //if (err) throw err;
    console.log("\n============================================\n");
    console.log("\n Welcome to Bamazon!\n")
    console.log("\n============================================\n");
    console.log("\nWhat would you like to purchase?\n")
    console.log("\n============================================\n");
    console.log("\n Take a look at our inventory and place your order before Christmas!\n");
    console.log("\n============================================\n");
    displayInventory();
});


//Costumer prompt function/ displayInventory
//Function to display inventory

function displayInventory() {
    //Set up inquier prompt to ask customer what they would like to do. 
    //Either purchase an item or give them the option to exit
    connection.query(
            "SELECT * FROM items",
            function (err, res) {
                //if (err) throw err;

                console.table(res);

                inquirer.prompt([{
                        name: "itemID",
                        type: "input",
                        message: "What's the ID of the item you would like to buy?",
                    },
                    {
                        name: "quantity",
                        type: "list",
                        message: "How many would you like to order?",
                        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+10"],
                    }
                ]).then(function (answers) {
                    var customerChoice = parseInt(answers.itemID);
                    var itemQuantity = parseInt(answers.quantity);
                    var itemName;
                    var currentInventory;
                    var itemPrice;

                    for (var i = 0; i < res.length; i++) {
                        if (userChoice === res[i].item_id) {
                            currentInventory = res[i].inventory_quantity;
                            itemPrice = res[i].price;
                            itemName = res[i].item_name;
                        }
                    }

                    if (!currentInventory) {
                        console.log("The itemID you entered has not been found. Please try again!")
                        displayInventory();
                    } else {
                        if (itemQuantity > currentInventory) {
                            console.log("We're Sorry, quantity requested is insufficient for that item.")
                            displayInventory();
                        } else {
                            console.log("Updating inventory...");
                            updateInventory(customerChoice, itemQuantity, currentInventory, itemPrice, itemName);
                        }

                    }

                })

            })
        }

            //Function that will update database inventory quantity
            function updateInventory(customerChoice, itemQuantity, currentInventory, itemPrice, itemName) {
                if (customerChoice) {

                currentInventory -= itemQuantity;

                connection.query("UPDATE items SET ? WHERE ?", [
                    {
                    inventory_quantity: currentInventory
                    },
                    {
                    item_id: customerChoice
                    }
                ], function (err, res) {
                    if (err) throw err;
                    comsole.log("Updating your order...");
                    displayTotal(customerChoice, itemQuantity, itemPrice, itemName);

                }
                )
            }
        }

// Function that will display the customers total upon finising their order
function displayTotal(customerChoice, itemQuantity, itemPrice, itemName) {
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        var total;
        total = itemPrice * itemQuantity;
        console.log("\nYour order total for :" + itemQuantity + "x" + itemName + "items" + "$" + total.toFixed(2) + "\n");
        inquirer.prompt([
            {
                name: "order",
                type: "list",
                message: "Would you like to place another order?",
                choices:["Yes", "Exit"]
            }
        ]).then (function (answer) {
            var Yes = answer.order;
            if (Yes === "Yes") {
                displayInventory;
            } else {
                console.log("Thank you for your business! Please come back soon!");
                connection.end();
            }
        })
    })
    
}
                
         