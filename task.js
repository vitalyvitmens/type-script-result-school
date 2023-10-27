'use strict'
//! Задание #1
// Напишите и типизируйте функцию, рассчитывающую стоимость с учетом скидки и рассрочки на заданное количество месяцев:
// const totalPrice = ({ price, discount, isInstallment, months }) => { }
const totalPrice = ({ price, discount = 0, isInstallment, months = 12 }) =>
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
