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

//! 4. Дженерики
//! 1. Зачем нужны дженерики
const array: Array<string> = ['a', 'b', 'c']
const array2: Array<number> = [1, 2, 3]

const promise = new Promise<number>((resolve) => {
  setTimeout(() => {
    resolve(42)
  })
})

promise.then((value) => value.toFixed())

//! 2. Функции
function double<T>(array: T[]): T[] {
  return array.concat(array)
}

function fill<T>(array: any[], value: T): T[] {
  return array.fill(value)
}

const res1 = double(['a', 'b', 'c'])
const res2 = double([1, 2, 3])

const res3 = fill(['a', 'b', 'c'], 1)
const res4 = fill([1, 2, 3], false)

res1.map((item) => item.concat('s'))
res2.map((item) => item.toFixed())

function merge<T, R>(a: T, b: R): T & R {
  return Object.assign({}, a, b)
}

const res5 = merge({ a: 1 }, { b: 2, c: { d: 3 } })
const res6 = res5.c.d.toFixed()

console.log(res1)
console.log(res2)
console.log(res3)
console.log(res4)
console.log(res5)
console.log(res6)

//! 3. Ограничения дженериков
function log1<T extends string | number>(data: T): T {
  console.log(data)
  return data
}

let res7 = <string>log1('I am string')
let res8 = log1(42) as number
// let res9 = log1(true) // error

//! 4. Оператор keyof
const obj = { a: 1, b: 2, c: 'a', key: 77 }
const obj2 = { test: 100 }

function getValue<T extends object, R extends keyof T>(obj: T, key: R) {
  return obj[key]
}

const res10 = getValue(obj, 'key')
const res11 = getValue(obj2, 'test')

console.log(res10)
console.log(res11)

//! 5. Классы
//! Синтаксис классов. Методы. Геттеры и сеттеры
class Human {
  date: Date

  constructor(date: Date) {
    this.date = date ?? new Date()
  }

  isProgrammer(): boolean {
    return false
  }
}

//! Наследование
class UserClass extends Human {
  _name: string
  // birthYear: Date
  _hobbies: string[] = ['workout']

  constructor(name: string, date: Date) {
    super(date)
    this._name = name
    // this.birthYear = birthYear ?? new Date()
  }

  get hobbies(): string[] {
    // this.setName('Egorka')
    console.log('Getting hobbies...')
    return this._hobbies
  }

  set name(newName: string) {
    this._name = newName
  }

  override isProgrammer(): boolean {
    console.log('super.isProgrammer():', super.isProgrammer())
    return true
  }

  // getHobbies(): string[] {
  //   return this.hobbies
  // }

  //   addHobby(hobby: string): void {
  //     this.hobbies.push(hobby)
  //   }

  // setName(newName: string): this {
  //   this.name = newName
  //   return this
  // }
}

const user = new UserClass('Egor', new Date())
// user.addHobby('coding')
// user.addHobby('gaming')
// user.setName('Egorka').addHobby('relax')
// const allHobbiesToUpperCase = user.getHobbies().map((s) => s.toUpperCase())
const userHobbyFromGetter = user.hobbies
const newUserName = (user.name = 'Egorka')

// console.log('user from UserClass:', user)
// console.log(user.getHobbies())
// console.log('allHobbiesToUpperCase:', allHobbiesToUpperCase)
console.log('userHobbyFromGetter:', userHobbyFromGetter)
console.log('newUserName:', newUserName)
console.log('user._name:', user._name)
console.log('date:', user.date)
console.log('user.isProgrammer():', user.isProgrammer())

//! Модификаторы доступа. Статические методы и свойства. Модификатор readonly. Свойства параметров
class Figure {
  static BASE_TYPE = 'FIGURE'
  public size: number = 10
  public color: string = 'red'
  // protected id: number
  private id: number

  constructor() {
    this.id = Math.random()
  }
  
  protected getId(): number {
    return this.id
  }
}

class Box extends Figure {
  static readonly TYPE = 'BOX'
  #weight: number = 30 // вместо # рекомендуется использовать модификатор доступа private

  static logId() {
    // console.log('this:', this) // в статических методах не доступно ключевое слово this
    console.log('Box.logId():', Math.random())
  }

  public getInfo() {
    return {
      size: this.size,
      color: this.color,
      // id: this.id,
      id: this.getId(),
      weight: this.#weight,
    }
  }
}

// Box.TYPE = 'change Box.TYPE: BOX to CHANGE_BOX' // при добавлении модификатора readonly статическое поле поменять не удастся

const box = new Box()
console.log('box.getInfo():', box.getInfo())
console.log('Box.TYPE:', Box.TYPE)
console.log('Figure.BASE_TYPE:', Figure.BASE_TYPE)
console.log('Box.BASE_TYPE:', Box.BASE_TYPE)
Box.logId()

//! Свойства параметров
class Car {
  // упрощенная запись для инициализации классов в TypeScript, для этого модификаторы свойств (public, private, protected) пропиши в конструкторе
  // model: string
  // color: string

  constructor(public model: string, public color: string) {
    // this.model = model
    // this.color = color
  }
}

const ford = new Car('ford', 'red')

//! Реализация интерфейсов классами
interface Lifecycle {
  onInit(): void

  onDestroy?(abort: boolean): void
}

interface ComponentOnChange {
  hasChanged: boolean

  onChange(data: number): boolean
}

class Component implements Lifecycle, ComponentOnChange {
  hasChanged: boolean = false

  onChange(data: number): boolean {
    if (data > 1) {
      return true
    }
    return false
  }

  onInit(): void {
    console.log('Component on init')
  }

  // onDestroy(abort: boolean): void {
  //   if (abort) {
  //     console.log('Component on destroy')
  //   }
  // }
}

//! Абстрактные классы

class Collection<T extends string | number> {
  constructor(private _items: T[]) {}

  add(value: T) {
    this._items.push(value)
  }

  get items(): T[] {
    return this._items
  }
}

const col1 = new Collection<number>([1, 2, 3])
col1.add(4)

const col2 = new Collection<string>(['a', 'b'])
col2.add('c')

class List<R> extends Collection<string> {
  constructor(public type: R) {
    super(['a'])
  }
}

const list1 = new List('qwerty')
const list2 = new List(1977)
