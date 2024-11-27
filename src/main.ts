import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [];
let idCounter = 1;

async function main() {
  let userMoney = parseFloat(await rl.question("Enter your current money: "));

  while (true) {
    console.log("\n--- Product Management System ---");
    console.log("1. Add to Inventory");
    console.log("2. Purchase Product");
    console.log("3. Product List");
    console.log("4. Exit");
    const choice = await rl.question("Your choice: ");

    if (choice === "1") {
      console.log("\n--- Inventory Management ---");
      console.log("1. Add New Product");
      console.log("2. Add to Existing Product");
      const subChoice = await rl.question("Your choice: ");

      if (subChoice === "1") {
        const name = await rl.question("Product name: ");
        const price = parseFloat(await rl.question("Unit price: "));
        const stock = parseInt(
          await rl.question("Initial stock quantity: "),
          10
        );

        products.push({ id: idCounter++, name, price, stock });
        console.log("New product added successfully!");
      } else if (subChoice === "2") {
        console.log("\n--- Existing Products ---");
        products.forEach((product) => {
          console.log(
            `ID: ${product.id}, Name: ${
              product.name
            }, Price: $${product.price.toFixed(2)}, Stock: ${product.stock}`
          );
        });

        const productId = parseInt(
          await rl.question("Enter the product ID to add stock: "),
          10
        );
        const quantity = parseInt(
          await rl.question("Enter the quantity to add: "),
          10
        );

        const product = products.find((p) => p.id === productId);
        if (product) {
          product.stock += quantity;
          console.log(
            `Added ${quantity} units to ${product.name}. New stock: ${product.stock}`
          );
        } else {
          console.log("Invalid product ID.");
        }
      } else {
        console.log("Invalid choice.");
      }
    } else if (choice === "2") {
      console.log("\n--- Available Products ---");
      products.forEach((product) => {
        console.log(
          `ID: ${product.id}, Name: ${
            product.name
          }, Price: $${product.price.toFixed(2)}, Stock: ${product.stock}`
        );
      });

      const productId = parseInt(
        await rl.question("Enter the product ID to purchase: "),
        10
      );
      const quantity = parseInt(
        await rl.question("Enter the quantity to purchase: "),
        10
      );

      const product = products.find((p) => p.id === productId);
      if (product) {
        const totalCost = product.price * quantity;
        if (quantity > product.stock) {
          console.log("Not enough stock! Cannot complete the purchase.");
        } else if (totalCost > userMoney) {
          console.log("You don't have enough money to make this purchase.");
        } else {
          product.stock -= quantity;
          userMoney -= totalCost;
          console.log(
            `Purchased ${quantity} units of ${
              product.name
            } for $${totalCost.toFixed(
              2
            )}. Remaining money: $${userMoney.toFixed(2)}. Stock left: ${
              product.stock
            }`
          );
        }
      } else {
        console.log("Invalid product ID.");
      }
    } else if (choice === "3") {
      console.log("\n--- Product List ---");
      products.forEach((product) => {
        console.log(
          `ID: ${product.id}, Name: ${
            product.name
          }, Price: $${product.price.toFixed(2)}, Stock: ${product.stock}`
        );
      });
    } else if (choice === "4") {
      console.log("Exiting the program...");
      break;
    } else {
      console.log("Invalid choice. Please try again.");
    }
  }

  rl.close();
}

main();
