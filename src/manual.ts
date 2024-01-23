// TypeScript Учебник

// keyof: возвращает объединение строковых или числовых литералов, которые являются ключами объекта
interface User {
  name: string
  age: number
}

type UserKey = keyof User // "name" | "age"
const key: UserKey = 'name' // OK
// const key: UserKey = "email" // Ошибка: Тип "email" не может быть присвоен типу "name" | "age"

// typeof: возвращает тип значения или выражения
const user: User = { name: 'Egor', age: 15 }
type UserType = typeof user // User
const anotherUser: UserType = { name: 'Vitaly', age: 46 } // OK
// const anotherUser: UserType = { name: "Vitaly", age: "46" } // Ошибка: Тип "string" не может быть присвоен типу "number"

// in: перебирает ключи объекта
type Keys = 'a' | 'b' | 'c'
type Obj = { [key in Keys]: number } // создает новый тип с теми же ключами, что и Keys, но со значениями типа number
const obj: Obj = { a: 1, b: 2, c: 3 } // OK
// const obj: Obj = { a: 1, b: 2, c: "3" } // Ошибка: Тип "string" не может быть присвоен типу "number"

// extends: проверяет, является ли тип подтипом другого типа
type Animal = {
  name: string
  sound: string
}

type Dog = Animal & {
  breed: string
}

function makeSound<T extends Animal>(animal: T) {
  // T extends Animal означает, что T должен быть подтипом Animal
  console.log(animal.name + ' говорит ' + animal.sound)
}

const dog: Dog = { name: 'Richie', sound: 'woof', breed: 'Beagle' }
makeSound(dog) // OK
// makeSound({ name: "Richie", sound: "woof" }) // Ошибка: Свойство "breed" отсутствует в типе "{ name: string sound: string }", но требуется в типе "Dog"

// Зависит от того, как определена функция fn, если принимает два параметра типа number и string, то <number, string> означает, что мы будем передавать в функцию число и строку. Например:
function fn<T, U>(x: T, y: U) {
  return { x, y } // создаем новый объект с коротким синтаксисом
}

const result = fn<number, string>(42, 'Max')
console.log(result) // result вернет объект { x: 42, y: 'Max' }

// Если же fn возвращает значение типа number или string, то <number, string> означает, что мы будем возвращать из функции число или строку. Например:
function fn2<T, U>(): T | U {
  return Math.random() < 0.5 ? (42 as T) : ('Max' as U) // рандомно вернёт либо значение типа T, либо значение типа U (42 или 'Max')
}

const result2 = fn2<number, string>() 
console.log(result2) // result2 имеет тип number | string и вернет значение 42 или 'Max'

// В общем случае, <number, string> означает, что мы указываем типы T и U для функции, которые могут использоваться как для параметров, так и для возвращаемого значения, называется обобщенным программированием (generic programming), дженерики позволяют создавать функции и классы, которые работают с разными типами данных.
