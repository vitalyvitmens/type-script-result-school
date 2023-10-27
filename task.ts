//! Задание #1
// Напишите и типизируйте функцию, рассчитывающую стоимость с учетом скидки и рассрочки на заданное количество месяцев:
// const totalPrice = ({ price, discount, isInstallment, months }) => { }
//! Решение
// Создаем интерфейс TotalPrice для функции totalPrice, описывая типы полей, не забывая что есть опциональные поля
// Реализуем саму функцию totalPrice, для параметров функции discount и months задаем значения по умолчанию, что бы избежать ошибок в реализиции логики функции
// Типизируем функцию totalPrice при помощи интерфейса : TotalPrice и типизируем возвращаемое функцией значение : number
// Пишем логику при помощи тернарного оператора, если рассрочка есть, то стоимость умножаем на 1 минус скидку, преобразованную из % в число (скидка * 0.01) и делим полученный результат на количество месяцев рассрочки, а если рассрочки нет, то делаем тоже самое, за исключением деления на количество месяцев рассрочки
// По времени понадобилось 2 дня по 30мин
interface TotalPrice {
  price: number
  discount?: number
  isInstallment?: boolean
  months?: number
}

const totalPrice = ({
  price,
  discount = 0,
  isInstallment,
  months = 12,
}: TotalPrice): number =>
  isInstallment
    ? (price * (1 - discount * 0.01)) / months
    : price * (1 - discount * 0.01)

const price = totalPrice({
  price: 100000,
  discount: 25,
  isInstallment: true,
  months: 12,
})

console.log(price) // 6250
