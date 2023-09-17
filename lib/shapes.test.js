const { Triangle, Circle, Square } = require('./shapes');

describe('Triangle',() => {
    test('Triangle render() method should return SVG string with the specified color', () => {
        const triangle = new Triangle();
        triangle.setColor('blue');
        const expectedSvg = '<polygon points="150,18 244,182 56,182" fill="blue" />';
        expect(triangle.render()).toBe(expectedSvg);
    });
});

describe('Circle',() => {
    test('Circle render() method should return SVG string with the specified color', () => {
        const circle = new Circle();
        circle.setColor('red');
        const expectedSvg = '<circle cx="150" cy="100" r="80" fill="red" />';
        expect(circle.render()).toBe(expectedSvg);
    })
});

describe('Square',() => {
    test('Square render() method should return SVG string with the specified color', () => {
        const square = new Square();
        square.setColor('yellow');
        const expectedSvg = '<rect x="90" y="40" width="120" height="120" fill="yellow" />';
        expect(square.render()).toBe(expectedSvg);
    })
});