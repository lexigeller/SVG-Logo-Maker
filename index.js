const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

async function main() {
  try {
    const userInput = await inquirer.prompt([
      // Define Inquirer prompts here based on the README's requirements
    ]);

    // Create an instance of the selected shape (e.g., Triangle, Circle, Square)
    const shape = new SelectedShape();

    // Set the shape's color based on user input
    shape.setColor(userInput.shapeColor);

    // Generate the SVG string for the shape
    const svg = shape.render();

    // Save the SVG to a file named 'logo.svg'
    fs.writeFileSync('logo.svg', svg);

    console.log('Generated logo.svg');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
