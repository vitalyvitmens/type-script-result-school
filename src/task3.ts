//! Задание #3
// Напишите и типизируйте функцию, выполняющую запрос за данными по переданному URL. Выведите их в консоль в формате: "ID: id, Email: email".
//! Решение
// Определяем интерфейс Comment
interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

// Определяем функцию getData
const getData = (url: string): Promise<Comment[]> => {
  // Используем объект fetch для выполнения GET-запроса
  return fetch(url)
    .then((response) => {
      // Получаем данные из объекта Response в формате JSON
      return response.json()
    })
    .then((data) => {
      // Указываем, что данные являются массивом объектов типа Comment
      return data as Comment[]
    })
}

// Задаем константу с URL-адресом
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments'

// Вызываем функцию getData и обрабатываем результат
getData(COMMENTS_URL).then((data) => {
  // Проходим по массиву data
  data.forEach((comment) => {
    // Получаем id и email комментария
    const { id, email } = comment
    // Формируем строку в нужном формате
    const output = `ID: ${id}, Email: ${email}`
    // Выводим строку в консоль
    console.log(output)
  })
})

/**
 * ID: 1, Email: Eliseo...
 * ID: 2, Email: Jayne_Kuhic...
 * ID: 3, Email: Nikita...
 * ID: 4, Email: Lew...
 * ...
 */
