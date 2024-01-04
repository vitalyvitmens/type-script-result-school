"use strict";
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
let f = 24;
console.log(sum(n1, n2));
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
const person = {
    name: 'Egor',
    age: 15,
    surname: 'Menshikov',
    address: {
        city: 'Mogilev',
        street: 'Panfilovskay',
    },
};
function fullname(obj) {
    return obj.name + ' ' + obj.surname;
}
console.log(fullname(person));
const names = ['egor', 'danik', 'david'];
names.push('olesya');
for (let name of names) {
    console.log(name.toUpperCase());
}
const result = names
    .filter((n) => n !== 'olesya')
    .map((n) => n.length)
    .reduce((acc, cur) => (acc += cur), 0);
console.log(result);
const tuple = [100, 'i am string'];
const tuple2 = [
    true,
    'typescript',
    1,
    2,
    3,
    4,
    5,
];
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
let z = Symbol('key');
let x = Symbol('key');
console.log(z === z);
console.log(x === x);
console.log(z === x);
const big1 = 123n;
const big2 = BigInt(200);
function log(message) {
    console.log(message);
}
let temp2;
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
fn(2, 40, log2);
function compute(p1, p2) {
    if (typeof p1 === 'number' && p2 === 'number') {
        return p1 + p2;
    }
    return p1.toString() + ' ' + p2.toString();
}
console.log(compute(4, 5));
console.log(compute('hello', 'world'));
function logError(err) {
    if (Array.isArray(err)) {
        return err.reduce((acc, cur) => (acc += ' ' + cur), '');
    }
    else {
        console.log(err);
    }
}
const person3 = {
    age: 15,
    name: 'Egor',
};
function convert(data, type) {
    if (type === 'text') {
        return JSON.stringify(data);
    }
    else if (type === 'json') {
        return { ...data };
    }
}
console.log(convert({ a: 1 }, 'text'));
console.log(convert({ b: 2 }, 'json'));
const person4 = {
    name: 'Egor',
    age: 15,
    hobbies: ['a', 'b', 'c'],
    city: 'Mogilev',
    street: 'Panfilovskay',
    date: new Date(),
};
const userMap = {
    1: person4,
    2: person4,
    3: person4,
};
console.log(userMap[2].name);
console.log(userMap[2].street);
let p = 42;
let n = p === 10;
if (typeof p === 'number') {
    let k = p + 10;
}
function throwError(message) {
    throw new Error(message);
}
function loop() {
    while (true) { }
}
function rec() {
    return rec();
}
function isBoolean(val) {
    return typeof val === 'boolean';
}
function isString(val) {
    return typeof val === 'string';
}
function logFlag(flag) {
    if (isBoolean(flag)) {
        console.log('Hey this is boolean');
    }
    else if (isString(flag)) {
        console.log('Hey this is string');
    }
}
logFlag(true);
logFlag('true');
const array = ['a', 'b', 'c'];
const array2 = [1, 2, 3];
const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve(42);
    });
});
promise.then((value) => value.toFixed());
function double(array) {
    return array.concat(array);
}
function fill(array, value) {
    return array.fill(value);
}
const res1 = double(['a', 'b', 'c']);
const res2 = double([1, 2, 3]);
const res3 = fill(['a', 'b', 'c'], 1);
const res4 = fill([1, 2, 3], false);
res1.map((item) => item.concat('s'));
res2.map((item) => item.toFixed());
function merge(a, b) {
    return Object.assign({}, a, b);
}
const res5 = merge({ a: 1 }, { b: 2, c: { d: 3 } });
const res6 = res5.c.d.toFixed();
console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);
console.log(res5);
console.log(res6);
function log1(data) {
    console.log(data);
    return data;
}
let res7 = log1('I am string');
let res8 = log1(42);
const obj = { a: 1, b: 2, c: 'a', key: 77 };
const obj2 = { test: 100 };
function getValue(obj, key) {
    return obj[key];
}
const res10 = getValue(obj, 'key');
const res11 = getValue(obj2, 'test');
console.log(res10);
console.log(res11);
class Human {
    date;
    constructor(date) {
        this.date = date ?? new Date();
    }
    isProgrammer() {
        return false;
    }
}
class UserClass extends Human {
    _name;
    _hobbies = ['workout'];
    constructor(name, date) {
        super(date);
        this._name = name;
    }
    get hobbies() {
        console.log('Getting hobbies...');
        return this._hobbies;
    }
    set name(newName) {
        this._name = newName;
    }
    isProgrammer() {
        console.log('super.isProgrammer():', super.isProgrammer());
        return true;
    }
}
const user = new UserClass('Egor', new Date());
const userHobbyFromGetter = user.hobbies;
const newUserName = (user.name = 'Egorka');
console.log('userHobbyFromGetter:', userHobbyFromGetter);
console.log('newUserName:', newUserName);
console.log('user._name:', user._name);
console.log('date:', user.date);
console.log('user.isProgrammer():', user.isProgrammer());
class Collection {
    _items;
    constructor(_items) {
        this._items = _items;
    }
    add(value) {
        this._items.push(value);
    }
    get items() {
        return this._items;
    }
}
const col1 = new Collection([1, 2, 3]);
col1.add(4);
const col2 = new Collection(['a', 'b']);
col2.add('c');
class List extends Collection {
    type;
    constructor(type) {
        super(['a']);
        this.type = type;
    }
}
const list1 = new List('qwerty');
const list2 = new List(1977);