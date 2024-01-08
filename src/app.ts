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

console.log('res1:', res1)
console.log('res2:', res2)
console.log('res3:', res3)
console.log('res4:', res4)
console.log('res5:', res5)
console.log('res6:', res6)

//! 3. Ограничения дженериков
function log1<T extends string | number>(data: T): T {
  console.log(data)
  return data
}

let res7 = <string>log1('I am string')
let res8 = log1(42) as number
// let res9 = log1(true) // error

//! 4. Оператор keyof и typeof
const obj = { a: 1, b: 2, c: 'a', key: 77 }
const obj2 = { test: 100 }

function getValue<T extends object, R extends keyof T>(obj: T, key: R) {
  return obj[key]
}

const res10 = getValue(obj, 'key')
const res11 = getValue(obj2, 'test')

console.log(res10)
console.log(res11)

interface User2 {
  name: string
  age: number
}

type User2Key = keyof User2
const key2: User2Key = 'name'

const str2: string = 'hello'
type MyString2 = typeof str2

const user2: User2 = { age: 15, name: 'Egor' }

type User3Key = keyof typeof user2

const key3: User3Key = 'name'

//! Утилиты: Partial. Readonly. Required. Omit. Pick. Extract. Exclude. ReturnType. Parameters. ConstructorParameters.
interface User3 {
  id?: number
  age: number
  name: string
}
// Partial
function createAndValidate(name: string, age: number): User3 {
  const newUser3: Partial<User3> = {}

  if (name.length > 0) {
    newUser3.name = name
  }

  if (age >= 18) {
    newUser3.age = age
  }

  return newUser3 as User3
}
// Readonly
const user3: Readonly<User3> = { age: 15, name: 'Egor' }
// Required
type RequiredUser3 = Required<User3>
const createRequiredUser3: RequiredUser3 = { id: 1, age: 15, name: 'Egor' }

interface User4 {
  name: string
  age: number
  hobbies: []
}
// Omit - позволяет указать какие поля объекта нужно исключить
type UserData4WithOmit = Omit<User4, 'hobbies'>
// Pick - позволяет указать только те поля объекта которые нужно включить
type UserData4WithPick = Pick<User4, 'age' | 'name'>
// Extract - с его помощью можно передавать какой-то тип и говорить по какому условию нам необходимо распаковать только те поля, которые нам нужны
type UserData4WithExtract = Extract<'age' | 'some' | 'hobbies', keyof User4>
// type UserData4WithExtract = Extract<'age' | 'some' | User4, string>
// Exclude -
// type UserData4WithExclude = Exclude<'a' | 'b' | User4, string>
type UserData4WithExclude = Exclude<'a' | 'b' | User4, User4>
// ReturnType. Parameters. ConstructorParameters.
function log4(data: string[], num: number): boolean {
  console.log(data, num)
  return false
}

type LogReturn = ReturnType<typeof log4>
type LogParams = Parameters<typeof log4>[0] // type LogParams = string[]
type LogParams2 = Parameters<typeof log4>[1] // type LogParams2 = number

class User5 {
  constructor(public name: string, public age?: number) {}
}

type UserParams = Required<ConstructorParameters<typeof User5>>[0] // type UserParams = string
type UserParams2 = Required<ConstructorParameters<typeof User5>>[1] // type UserParams = number

//! 5. Классы
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
abstract class Logger {
  abstract log(messege: string): void

  table(data: object) {
    console.table(data)
  }
}

// const Logger = new Logger() // не возможно создать экземпляр абстрактного класса

class MessageLogger extends Logger {
  log(messege: string): void {
    console.log(messege)
  }
}

const logger = new MessageLogger()
logger.log('Hello')
logger.table({
  a: 1.1,
  b: 1.2,
  c: { a: 2.1, b: 2.2, c: 2.3, d: { a: 3.1, b: 3.2, c: 3.3 } },
})

//! Дектораторы
class User6 {
  isProgrammer?: boolean

  constructor(public name: string) {}

  sayMyName() {
    console.log(this.name)
  }
}

function makeProgrammer(user: User6) {
  user.isProgrammer = true
  return user
}

const user6 = makeProgrammer(new User6('Vitaly'))

console.log(user6.isProgrammer)
user6.sayMyName()

//! Паттерн “Декоратор”. Декораторы класса
// В файле tsconfig.json включаем поле: "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
function ClassDecorator(target: Function) {
  console.log('Class Decorator', target)
}

function ClassDecorator2(target: Function) {
  console.log('Class Decorator 2', target)
}

@ClassDecorator
@ClassDecorator2
class User7 {
  constructor(public isProgrammer: boolean) {
    console.log('Constructor')
  }
}

const user7 = new User7(true)

//! Практический пример. Декоратор с параметрами
interface ComponentProps {
  template: string
  selector: string
}

function Component2(props: ComponentProps) {
  return function (constructor: any) {
    //! Что бы запустить файл index.html в live Server раскомментируй закомментируемые 6 строк ниже
    // const node = document.querySelector(props.selector)
    // const instance = new constructor('Egor')
    // if (node) {
    //   node.insertAdjacentHTML('afterbegin', props.template)
    //   node.querySelector('span')!.textContent = instance.name
    // }
  }
}

@Component2({
  selector: '#app',
  template: `
  <h1>This is User Component</h1>
  <h2>User name is <span></span></h2>
  `,
})
class UserComponent2 {
  constructor(public name: string) {
    console.log('Constructor2')
  }
}

const user8 = new UserComponent2('Vitaly')

//! Декораторы свойств
function MaxChildren(limit: number) {
  return function (target: Object, key: string | symbol) {
    // console.log(target)
    // console.log(key)
    let value: number

    const get = () => value

    const set = (newValue: number) => {
      if (newValue > limit) {
        value = limit
        console.warn('Вы превысили лимит. Максимум детей:', limit)
      } else {
        value = newValue
      }
    }

    Object.defineProperty(target, key, {
      get,
      set,
    })
  }
}
class User9 {
  @MaxChildren(10)
  children: number

  constructor(children: number) {
    this.children = children
  }
}

const user91 = new User9(100)
console.log('user91.children:', user91.children)
const user92 = new User9(5)
console.log('user92.children:', user92.children)

//! Декораторы методов
function Autobind(target: any, name: string, descriptor: PropertyDescriptor) {
  // console.log('target:', target)
  // console.log('name:', name)
  // console.log('descriptor:', descriptor)
  const newDescriptor: PropertyDescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      return descriptor.value.bind(this)
    },
  }

  return newDescriptor
}
class User10 {
  constructor(public name: string) {}

  @Autobind
  sayMyName() {
    console.log(this?.name)
  }
}

const user101 = new User10('Egor')
user101.sayMyName()

function nameSayer(fn: Function) {
  fn()
}

// nameSayer(user101.sayMyName) // так не работает, потому что потерялся контекст
// nameSayer(user101.sayMyName.bind(user101)) // так работает, потому что привязали контекст, но есть способ лучше привязать контекст через создание функции декоратора Autobind

//! Примеры использования декораторов

//! Логгер
function log11(target: any, key: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value
  descriptor.value = function (...args: any[]) {
    console.log(`Entering ${key} with arguments: ${JSON.stringify(args)}`)
    const result = fn.apply(this, args)
    console.log(`Exiting ${key} with result: ${JSON.stringify(result)}`)
    return result
  }
  return descriptor
}

class MyClass11 {
  @log11
  foo(a: string, b: number) {
    return `${a} ${b}`
  }
}

const myClass11 = new MyClass11()
myClass11.foo('Result', 42)
// Entering foo with arguments: ["Result",42]
// Exiting foo with result: "Result 42"

//! Мемоизация
function memoize(target: any, key: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value
  const cache = new Map()

  descriptor.value = function (...args: any[]) {
    const cacheKey = `${key}_${JSON.stringify(args)}`

    if (cache.has(cacheKey)) {
      console.log(`Returning cached result for ${key}(${args})`)
      return cache.get(cacheKey)
    }

    const result = fn.apply(this, args)
    console.log(`Caching result for ${key}(${args})`)
    cache.set(cacheKey, result)
    return result
  }

  return descriptor
}

class MyClass12 {
  @memoize
  foo(a: number, b: number) {
    // simulation of heavy computing (1 second)
    const startTime = Date.now()
    while (Date.now() - startTime < 1000) {}
    return a + b
  }

  @memoize
  bar() {
    return Math.random()
  }
}

const myClass12 = new MyClass12()
console.log(myClass12.foo(41, 1)) // 42, calculated result
console.log(myClass12.foo(41, 2)) // 43, calculated result
console.log(myClass12.foo(41, 1)) // 42, cached result
console.log(myClass12.foo(41, 1)) // 42, cached result
console.log(myClass12.foo(41, 2)) // 43, cached result
console.log(myClass12.foo(41, 2)) // 43, cached result
12
console.log(myClass12.bar()) // calculated result
console.log(myClass12.bar()) // cached (the same result)
console.log(myClass12.bar()) // cached (the same result)

//!Debounce
// function debounce(delay: number) {
//   return function (target: any, key: string, descriptor: PropertyDescriptor) {
//     let timer: ReturnType
//     const fn = descriptor.value

//     descriptor.value = function (...args: any[]) {
//       clearTimeout(timer)
//       timer = setTimeout(() => {
//         fn.call(this, ...args)
//       }, delay)
//     }

//     return descriptor
//   }
// }

// class MyClass13 {
//   @debounce(500)
//   foo() {
//     console.log('foo')
//   }
// }

// const myClass13 = new MyClass13()
// myClass13.foo()
// myClass13.foo()
// myClass13.foo()
// myClass13.foo()
// myClass13.foo()
// myClass13.foo() // foo

// setTimeout(() => myClass13.foo(), 1000) // foo

//! Calculate execution time
// import for node.js
// import { performance } from "perf_hooks";

const measure = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const fn = descriptor.value

  descriptor.value = function (...args: any[]) {
    const start = performance.now()
    const result = fn.apply(this, args)
    const finish = performance.now()
    console.log(`Execution time: ${finish - start} milliseconds`)
    return result
  }

  return descriptor
}

class MyClass14 {
  @measure
  foo() {
    console.log('foo')
  }

  @measure
  bar() {
    // simulation of heavy computing (1 second)
    const startTime = Date.now()
    while (Date.now() - startTime < 1000) {}
    console.log('bar')
  }
}

const myClass14 = new MyClass14()
myClass14.foo() // foo
// Execution time: 2.299999952316284 milliseconds

myClass14.bar() // bar
// Execution time: 1002.1000001430511 milliseconds

//! Retry
function retry(numRetries: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value

    descriptor.value = async function (...args: any[]) {
      for (let i = 0; i <= numRetries; i++) {
        try {
          return await fn.apply(this, args)
        } catch (error: any) {
          console.log(
            `Method ${key} failed (${i + 1}/${numRetries + 1} retries): ${
              error.message
            }`
          )
          if (i === numRetries) {
            throw error
          }
        }
      }
    }

    return descriptor
  }
}

class MyClass15 {
  @retry(3)
  async fetch(url: string) {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`
      )
    }
    return response.json()
  }
}

// const myClass15 = new MyClass15()
// MyClass15.fetch('https://jsonplaceholder.typicode.com/posts/1').then(
//   console.log
// )

//! Deprecated
function deprecated(message: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = function (...args: any[]) {
      console.warn(`Method ${key}() is deprecated. ${message}`)
      return fn.apply(this, args)
    }
    return descriptor
  }
}

class MyClass16 {
  @deprecated('Please use bar() instead.')
  foo(): void {
    console.log('foo')
  }

  bar(): void {
    console.log('bar')
  }
}

const myClass16 = new MyClass16()
myClass16.foo()

/*
Такое поведение — и есть асинхронная работа. useEffect() никогда не сработает одновременно с обновлением самого компонента, а только на следующий тик браузера, на следующий заход событийного цикла (Event Loop). Чтобы было понятней, можете представить, что useEffect() срабатывает наподобие функции setTimeout() с задержкой 0. Если смотреть в браузер, то может показаться, что всё произошло одновременно, но на самом деле — строго последовательно, просто очень быстро.

И наконец, в третьих, если в коллбеке хука useEffect() вернуть в return ещё один, другой коллбек, то этот второй коллбек будет выполняться в момент, когда компонент удаляется. Получается как замена этапа размонтирования в жизненном цикле. Такой приём часто используют для подписки и отписки от событий, которые нужно обработать вне React-приложения. В таких случаях приходится использовать обычный addEventListener(), так как средства React уже не помогут.
*/

/*
import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = ({ siteUrl }) => {
  const [products, setProducts] = useState([]);

  const onClickHandler = () => {};

  useEffect(() => {
    document.addEventListener('click', onClickHandler);

    return () => document.removeEventListener('click', onClickHandler);
  }, [siteUrl]);

  return (
    <div className={styles.app}>
      {products.map(({ id, name, price }) => (
        <div key={id}>{name} - {price} руб</div>
      ))}
    </div>
  );
};
*/

/*
Если внимательно прочитать описание хука useEffect() в документации React, то можно увидеть, что второй коллбек (тот который возвращается в первом), выполняется не только при размонтировании компонента, но и каждый раз перед повторным выполнением эффекта. Это может звучать сложновато для начинающего. Такой приём используется не часто, но понимать принцип работы хука всё равно нужно. Проще говоря, после самого первого рендера компонента вызовется только первый коллбек, переданный в useEffect(). А при каждом следующем рендере, сначала запустится второй коллбек, который был создан на прошлом рендере, а сразу после него — первый коллбек текущего рендера:
*/

/*
import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('Первый-' + counter);

    return () => console.log('Второй-' + counter);
  }, [counter]);

  return (
    <div className={styles.app}>
      <button onClick={() => setCounter(counter + 1)}>+ 1</button>
    </div>
  );
};
*/

/*
Кстати, в useEffect() можно вообще не передавать массив зависимостей вторым аргументом. Тогда он просто будет срабатывать всегда, после каждого рендера компонента.

Сделав функциональные компоненты в React на замену классовых, разработчики оставили возможность выполнять все те же трюки, как и раньше. Просто в другом формате — более удобном, потому что декларативном. Но это не единственный плюс. Хук useEffect() можно легко вынести в другой файл и переиспользовать, а в классовых компонентах с этим было намного сложнее — пришлось бы выносить код по частичкам из разных методов жизненного цикла. Было бы более сложно и запутанно.

Возвращаясь к HTTP-запросам — с хуком useEffect() можно использовать вообще любой JavaScript-код, необязательно именно функцию fetch(). Для работы на более низком уровне можно создать XHR-запрос с помощью XMLHttpRequest. А есть наоборот — сторонние библиотеки для работы на более высоком уровне, например — Axios. Это по сути обёртка над XMLHttpRequest, которая используется так же удобно, как fetch(), но имеет более богатые возможности. Почитать про XMLHttpRequest можно на MDN. Когда-то это был единственный способ делать запросы на сервер из JavaScript в браузере.

А если хотите узнать чуть больше про Axios, то куда нужно идти? Правильно — сначала в Google, а оттуда — в официальную документацию. Всё как обычно.

Промежуточные итоги

Рендер — создание виртуального представления компонента на основе его состояния и пропсов. Происходит при монтировании компонента, а также при его обновлении. Не обязательно приводит к изменению DOM, но создает обновленное виртуальное представление компонента.

Монтирование — компонент добавлен на странцу (в DOM).

Обновление — обновление виртуального представления компонента при изменении его состояния или пропсов с последующим обновлением соответствующих элементов на странице (в DOM).

Размонтирование — компонент удален со страницы (из DOM).

useEffect() — это хук, который позволяет выполнять код на разных этапах жизненного цикла компонента, а также реагировать на изменения зависимостей.
Часто используется для синхронизации компонента с внешней системой (например, выполнения сетевых запросов).
Может использоваться как замена методам жизненного цикла классовых компонентов: componentDidMount(), componentDidUpdate(), componentWillUnmount() (познакомимся с ними в одном из следующих уроков).
Массив зависимостей в useEffect() передается вторым аргументом, в нем содержатся переменные, значения которых должны быть отслеживаемыми.
Когда одно из значений в массиве зависимостей изменяется, вызывается функция, переданная первым аргументом в useEffect().
Кроме того, можно передать пустой массив зависимостей, чтобы указать, что переданная функция должна выполниться только один раз при монтировании компонента.
Если массив зависимостей вовсе не указан, то переданная функция будет выполняться при любом обновлении компонента.
Внутри функции, переданной первым аргументом в useEffect(), можно возвращать функцию очистки. React будет вызывать эту функцию каждый раз перед повторным выполнением эффекта, а также в конечном итоге при размонтировании компонента.
Axios — это популярная JavaScript-библиотека, которая используется для выполнения HTTP-запросов из браузера или Node.js.
Работает на основе промисов, что позволяет легко использовать асинхронные операции.
Предоставляет удобный API, который облегчает отправку запросов к серверу и обработку ответов.
*/

//! Что такое пространства имен (Namespaces)
namespace Lib {
  export const NUM = 42

  const privateConst = 'test'

  export const NUM_2 = privateConst + ' hello'

  export interface ILib {
    log(): void
  }
}

console.log(Lib.NUM)
console.log(Lib.NUM_2)

const fn2: Lib.ILib = {
  log() {},
}
