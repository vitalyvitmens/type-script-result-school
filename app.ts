//! 2. Базовые типы
//! 1. Работа с числами
function sum(a: number, b: number): number {
  return a + b
}

const n1: number = 40
const n2: number = 2.56

let a = 12
let b = Infinity
let c = NaN
let d = 0x1
let e = 0.1
let f: 24 = 24 // в typescript любые числа могут быть типами

console.log(sum(n1, n2))

//! 2. Строки. Логический тип. Базовая типизация функций
let string = 'Hello TypeScript'

function transform(str: string, uppercase: boolean): string {
  if (uppercase) {
    return str.toUpperCase()
  }
  return str.toLowerCase()
}

let isUppercase = true

console.log(transform(string, isUppercase))
console.log(transform(string, false))

const arrowTransform = (str: string, uppercase: boolean): string => {
  if (uppercase) {
    return str.toUpperCase()
  }
  return str.toLocaleLowerCase()
}

console.log(arrowTransform(string, isUppercase))
console.log(arrowTransform(string, false))

//! 3. Объекты
const person: {
  name: string
  age: number
  surname: string
  address: { city: string; street: string }
} = {
  name: 'Egor',
  age: 15,
  surname: 'Menshikov',
  address: {
    city: 'Mogilev',
    street: 'Panfilovskay',
  },
}

// function fullname(name: string, surname: string): string {
//   return name + ' ' + surname
// }

function fullname(obj: { name: string; surname: string }): string {
  return obj.name + ' ' + obj.surname
}

console.log(fullname(person))

//! 4. Массивы
// const names: any[] = ['egor', 'danik', 'david', 15]
const names: string[] = ['egor', 'danik', 'david']

names.push('olesya')
// names.push(15) // error
// names.push(true) // error

for (let name of names) {
  console.log(name.toUpperCase())
}

const result = names
  .filter((n) => n !== 'olesya')
  .map((n) => n.length)
  .reduce((acc, cur) => (acc += cur), 0)
console.log(result)

//! 5. Кортежи (Tuples)
const tuple: readonly [number, string] = [100, 'i am string']
// const [count, setCount] = React.useState(100)

// tuple[0] = 'typescript' // error (Type 'string' is not assignable to type 'number')
// const temp = tuple[2] // error (Tuple type '[number, string]' of length '2' has no element at index '2')
// tuple.push('false') // error (Property 'push' does not exist on type 'readonly [number, string]')

const tuple2: [boolean, string, ...number[]] = [
  true,
  'typescript',
  1,
  2,
  3,
  4,
  5,
]

//! 6. Перечисления (Enums)
// const ROLES = {
//   ADMIN: 'admin',
//   USER: 'user',
// }

enum Roles {
  admin,
  user,
}

const person1 = {
  role: Roles.admin,
}

const person2 = {
  role: Roles.user,
}

function check(person: { role: Roles }) {
  if (person.role === Roles.admin) {
    console.log('user is admin')
  } else {
    console.log('user is user')
  }
}

const temp = {
  role: 'star wars',
}

check(person1)
check(person2)
// check(temp) // error

//! 7. Символ. BigInt
let z: symbol = Symbol('key')
let x: symbol = Symbol('key')

console.log(z === z)
console.log(x === x)
console.log(z === x)

const big1: bigint = 123n
const big2: bigint = BigInt(200)

//! 8. void vs undefined
function log(message: string): void {
  console.log(message)
  // return undefined
}

let temp2: undefined

//! 9. Подробнее о типизации функций
function log2(data: any): void {
  console.log(data)
}

function sum2(a: number, b: number, callback: (d: any) => void): number {
  const result = a + b
  callback(result)
  return result
}

let fn: (n1: number, n2: number, cb: (d: any) => void) => number

fn = sum2
// fn = log2 // error

fn(2, 40, log2)

//! 3. Работа с типами
//! 1. Объединения (Union Types)
function compute(p1: number | string, p2: number | string) {
  if (typeof p1 === 'number' && p2 === 'number') {
    return p1 + p2
  }
  return p1.toString() + ' ' + p2.toString()
}

console.log(compute(4, 5))
console.log(compute('hello', 'world'))

function logError(err: string | string[]): string | void {
  if (Array.isArray(err)) {
    return err.reduce((acc, cur) => (acc += ' ' + cur), '')
  } else {
    console.log(err)
  }
}

//! 2. Литералы (Literal Types)
type OutputType = 'text' | 'json'
type Person = { age: number; name: string }

const person3: Person = {
  age: 15,
  name: 'Egor',
}

function convert(data: object, type: OutputType) {
  if (type === 'text') {
    return JSON.stringify(data)
  } else if (type === 'json') {
    return { ...data }
  }
}

console.log(convert({ a: 1 }, 'text'))
console.log(convert({ b: 2 }, 'json'))

//! 3. Интерфейсы
// type User = {
//   name: string
//   age: number
//   hobbies: string[]
// }

// type CallbackFn = (data: string[]) => void

interface User {
  name: string
  age: number
  hobbies: string[]
}

interface Address {
  city: string
  street: string
}

interface FullUser extends User, Address {
  date: Date
}

const person4: FullUser = {
  name: 'Egor',
  age: 15,
  hobbies: ['a', 'b', 'c'],
  city: 'Mogilev',
  street: 'Panfilovskay',
  date: new Date(),
}

interface UserMap {
  [key: number]: FullUser
  date?: Date
}

const userMap = {
  // date: new Date(),
  1: person4,
  2: person4,
  3: person4,
} as UserMap

// console.log(userMap[1].name) // Egor
// console.log(userMap[1].street) // Panfilovskay
console.log(userMap[2].name) // Egor
console.log(userMap[2].street) // Panfilovskay

//! 4. unknown
let p: unknown = 42

let n = p === 10 // == === || && ? !
// let k = p + 10 // error
if (typeof p === 'number') {
  let k = p + 10
}

//! 5. never
function throwError(message: string): never {
  throw new Error(message)
}

function loop(): never {
  while (true) {}
}

function rec(): never {
  return rec()
}

//! 6. Защитники типа (Type Guard)
function isBoolean(val: string | boolean): val is boolean {
  return typeof val === 'boolean'
}

function isString(val: string | boolean): val is string {
  return typeof val === 'string'
}

function logFlag(flag: string | boolean) {
  if (isBoolean(flag)) {
    console.log('Hey this is boolean')
  } else if (isString(flag)) {
    console.log('Hey this is string')
  }
}

logFlag(true)
logFlag('true')
