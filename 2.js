// Создаём JS-объект, соответствующий образцу JSON
const person = {
    name: "Anton",
    age: 36,
    skills: ["Javascript", "HTML", "CSS"],
    salary: 80000
};

// Преобразуем в JSON строку
const jsonString = JSON.stringify(person);

// Выводим в консоль
console.log(jsonString);