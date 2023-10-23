"use strict";
//! 1. Работа с числами
function sum(a, b) {
    return a + b;
}
const n1 = 40;
const n2 = 2.56;
let a = 12;
let b = Infinity;
let c = NaN;
let d = 0x1;
let e = 0.1;
let f = 24; // в typescript любые числа могут быть типами
console.log(sum(n1, n2));
//! 2. Строки. Логический тип. Базовая типизация функций
let string = 'Hello TypeScript';
function transform(str, uppercase) {
    if (uppercase) {
        return str.toUpperCase();
    }
    return str.toLowerCase();
}
let isUppercase = true;
console.log(transform(string, isUppercase));
console.log(transform(string, false));
const arrowTransform = (str, uppercase) => {
    if (uppercase) {
        return str.toUpperCase();
    }
    return str.toLocaleLowerCase();
};
console.log(arrowTransform(string, isUppercase));
console.log(arrowTransform(string, false));
//! 3. Объекты
const person = {
    name: 'Egor',
    age: 15,
    surname: 'Menshikov',
    address: {
        city: 'Mogilev',
        street: 'Panfilovskay',
    },
};
// function fullname(name: string, surname: string): string {
//   return name + ' ' + surname
// }
function fullname(obj) {
    return obj.name + ' ' + obj.surname;
}
console.log(fullname(person));
//! 4. Массивы
// const names: any[] = ['egor', 'danik', 'david', 15]
const names = ['egor', 'danik', 'david'];
names.push('olesya');
// names.push(15) // error
// names.push(true) // error
for (let name of names) {
    console.log(name.toUpperCase());
}
const result = names
    .filter((n) => n !== 'olesya')
    .map((n) => n.length)
    .reduce((acc, cur) => (acc += cur), 0);
console.log(result);
//! 5. Кортежи (Tuples)
const tuple = [100, 'i am string'];
// const [count, setCount] = React.useState(100)
// tuple[0] = 'typescript' // error (Type 'string' is not assignable to type 'number')
// const temp = tuple[2] // error (Tuple type '[number, string]' of length '2' has no element at index '2')
// tuple.push('false') // error (Property 'push' does not exist on type 'readonly [number, string]')
const tuple2 = [
    true,
    'typescript',
    1,
    2,
    3,
    4,
    5,
];
//! 6. Перечисления (Enums)
// const ROLES = {
//   ADMIN: 'admin',
//   USER: 'user',
// }
var Roles;
(function (Roles) {
    Roles[Roles["admin"] = 0] = "admin";
    Roles[Roles["user"] = 1] = "user";
})(Roles || (Roles = {}));
const person1 = {
    role: Roles.admin,
};
const person2 = {
    role: Roles.user,
};
function check(person) {
    if (person.role === Roles.admin) {
        console.log('user is admin');
    }
    else {
        console.log('user is user');
    }
}
const temp = {
    role: 'star wars',
};
check(person1);
check(person2);
// check(temp) // error
//! 7. Символ. BigInt
let z = Symbol('key');
let x = Symbol('key');
console.log(z === z);
console.log(x === x);
console.log(z === x);
const big1 = 123n;
const big2 = BigInt(200);
//! 8. void vs undefined
function log(message) {
    console.log(message);
    // return undefined
}
let temp2;
//! 9. Подробнее о типизации функций
function log2(data) {
    console.log(data);
}
function sum2(a, b, callback) {
    const result = a + b;
    callback(result);
    return result;
}
let fn;
fn = sum2;
// fn = log2 // error
fn(2, 40, log2);
