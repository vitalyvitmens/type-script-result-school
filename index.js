"use strict";
//! Задание #1
// Напишите и типизируйте функцию, рассчитывающую стоимость с учетом скидки и рассрочки на заданное количество месяцев:
// const totalPrice = ({ price, discount, isInstallment, months }) => {
// Your code here...
// }
const totalPrice = ({ price, discount = 0, isInstallment, months = 12, }) => {
    if (discount) {
        discount = discount / 100;
    }
    const priceWithDiscount = price - price * discount;
    const result = isInstallment ? priceWithDiscount / months : priceWithDiscount;
    return Number(result.toFixed());
};
const price = totalPrice({
    price: 100000,
    discount: 25,
    isInstallment: true,
    months: 12,
});
console.log(price); // 6250
