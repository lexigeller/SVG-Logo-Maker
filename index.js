const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./lib/shapes');

// Custom function to validate colors (using regular expressions)
function validateColor(color) {
  // Regular expression to validate color codes (hex or basic color names)
  const colorRegex = /^#([0-9a-fA-F]{3}){1,2}$|^(red|green|blue|cyan|magenta|yellow|black|white|gray|grey)$/i;
  return colorRegex.test(color);
}

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'What text should be displayed? Enter up to three characters.',
    validate: (text) => {
      if (text.length <= 3) return true;
      else return 'Text must be three or fewer characters.';
    },
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'What color would you like the text to be? Enter a color keyword (OR a hexadecimal number).',
    validate: (textColor) => {
      if (validateColor(textColor)) return true;
      else return 'Please enter a valid color (hex code or basic color name).';
    },
  },
  {
    type: 'list',
    name: 'shape',
    message: 'What shape should the logo be?',
    choices: ['Circle', 'Triangle', 'Square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'What color would you like the shape to be? Enter a color keyword (OR a hexadecimal number).',
    validate: (shapeColor) => {
      if (validateColor(shapeColor)) return true;
      else return 'Please enter a valid color (hex code or basic color name).';
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  const { text, textColor, shape, shapeColor } = answers;
  const fileName = 'logo.svg';
  let shapeObject;

  switch (shape.toLowerCase()) {
    case 'circle':
      shapeObject = new Circle();
      break;
    case 'triangle':
      shapeObject = new Triangle();
      break;
    case 'square':
      shapeObject = new Square();
      break;
    default:
      console.error('Invalid shape choice.');
      return;
  }

  shapeObject.setColor(shapeColor);

  const svgString = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <g>${shapeObject.render()}
      <text x="150" y="130" text-anchor="middle" font-size="40" fill="${textColor}">${text}</text>
    </g>
  </svg>`;

  fs.writeFile(fileName, svgString, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Generated logo.svg');
    }
  });
});
