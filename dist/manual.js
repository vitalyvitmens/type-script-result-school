"use strict";
const key = 'name';
const user = { name: 'Egor', age: 15 };
const anotherUser = { name: 'Vitaly', age: 46 };
const obj = { a: 1, b: 2, c: 3 };
function makeSound(animal) {
    console.log(animal.name + ' говорит ' + animal.sound);
}
const dog = { name: 'Richie', sound: 'woof', breed: 'Beagle' };
makeSound(dog);
function fn(x, y) {
    return { x, y };
}
const result = fn(42, 'Max');
console.log(result);
function fn2() {
    return Math.random() < 0.5 ? 42 : 'Max';
}
const result2 = fn2();
console.log(result2);
