"use strict";
const getData = (url) => {
    return fetch(url)
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        return data;
    });
};
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
getData(COMMENTS_URL).then((data) => {
    data.forEach((comment) => {
        const { id, email } = comment;
        const output = `ID: ${id}, Email: ${email}`;
        console.log(output);
    });
});
