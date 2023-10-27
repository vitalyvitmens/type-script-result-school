"use strict";
const totalPrice = ({ price, discount = 0, isInstallment, months = 12, }) => isInstallment
    ? (price * (1 - discount * 0.01)) / months
    : price * (1 - discount * 0.01);
const price = totalPrice({
    price: 100000,
    discount: 25,
    isInstallment: true,
    months: 12,
});
console.log(price); // 6250
