const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

async function main() {
  try {
    const userInput = await inquirer.prompt([
      {
        type: 'input',
        name: 'logoText',
        message: 'Enter up to three characters for the logo text:',
        validate: function (input) {
          return input.length <= 3 ? true : 'Please enter up to three characters.';
        },
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color keyword or hexadecimal number for the text color:',
        validate: function (input) {
          // You can add more validation here based on color formats
          return /^[a-fA-F0-9]{6}$/.test(input) || /[a-z]+/i.test(input) ? true : 'Invalid color format.';
        },
      },
      {
        type: 'list',
        name: 'shapeChoice',
        message: 'Choose a shape for the logo:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a color keyword or hexadecimal number for the shape color:',
        validate: function (input) {
          // You can add more validation here based on color formats
          return /^[a-fA-F0-9]{6}$/.test(input) || /[a-z]+/i.test(input) ? true : 'Invalid color format.';
        },
      },
    ]);

    // Create an instance of the selected shape class
    let selectedShape;
    switch (userInput.shapeChoice) {
      case 'circle':
        selectedShape = new Circle();
        break;
      case 'triangle':
        selectedShape = new Triangle();
        break;
      case 'square':
        selectedShape = new Square();
        break;
    }

    // Set the shape's color based on user input
    selectedShape.setColor(userInput.shapeColor);

    // Generate the SVG string for the shape
    const svg = selectedShape.render();

    // Save the SVG to a file named 'logo.svg'
    fs.writeFileSync('logo.svg', svg);

    console.log('Generated logo.svg');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
