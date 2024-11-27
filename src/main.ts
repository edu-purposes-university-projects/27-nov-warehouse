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
let totalPurchased = 0;
let totalSold = 0;

async function main() {
  while (true) {
    console.log("\n--- Product Management System ---");
    console.log("1. Add Product");
    console.log("2. Purchase Product");
    console.log("3. Sell Product");
    console.log("4. Product List");
    console.log("5. Exit");
    const choice = await rl.question("Your choice: ");

    if (choice === "1") {
      const name = await rl.question("Product name: ");
      const price = parseFloat(await rl.question("Product price: "));
      const stock = parseInt(await rl.question("Stock quantity: "), 10);

      products.push({ id: idCounter++, name, price, stock });
      console.log("Product added successfully!");
    } else if (choice === "2") {
      console.log("\n--- Product List ---");
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
        product.stock += quantity;
        totalPurchased += quantity;
        console.log(
          `${quantity} units of ${product.name} purchased successfully. New stock: ${product.stock}`
        );
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

      const productId = parseInt(
        await rl.question("Enter the product ID to sell: "),
        10
      );
      const quantity = parseInt(
        await rl.question("Enter the quantity to sell: "),
        10
      );

      const product = products.find((p) => p.id === productId);
      if (product) {
        if (product.stock >= quantity) {
          product.stock -= quantity;
          totalSold += quantity;
          const totalRevenue = quantity * product.price;
          console.log(
            `${quantity} units of ${
              product.name
            } sold successfully. Total revenue: $${totalRevenue.toFixed(
              2
            )}. New stock: ${product.stock}`
          );
        } else {
          console.log("Insufficient stock!");
        }
      }
    } else if (choice === "4") {
      console.log("\n--- Product List ---");
      products.forEach((product) => {
        console.log(
          `ID: ${product.id}, Name: ${
            product.name
          }, Price: $${product.price.toFixed(2)}, Stock: ${product.stock}`
        );
      });
    } else if (choice === "5") {
      console.log("\n--- End of Day Report ---");
      console.log(`Total purchased quantity: ${totalPurchased}`);
      console.log(`Total sold quantity: ${totalSold}`);
      console.log("Exiting the program...");
      break;
    } else {
      console.log("Invalid choice. Please try again.");
    }
  }

  rl.close();
}

main();
