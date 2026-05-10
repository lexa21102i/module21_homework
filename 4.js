// Создаём Promise
const randomNumberPromise = new Promise((resolve, reject) => {
  // Задержка 3 секунды
  setTimeout(() => {
    // Генерируем случайное целое число от 1 до 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    
    // Проверяем на чётность
    if (randomNumber % 2 === 0) {
      // Чётное число — успех
      resolve(randomNumber);
    } else {
      // Нечётное число — ошибка
      reject(randomNumber);
    }
  }, 3000); 
});

// Обрабатываем результат Promise
randomNumberPromise
  .then((number) => {
    console.log(`Завершено успешно. Сгенерированное число — ${number}`);
  })
  .catch((number) => {
    console.log(`Завершено с ошибкой. Сгенерированное число — ${number}`);
  });