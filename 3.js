// Функция для форматирования даты в удобочитаемый вид
function formatDateTime(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Получаем текущую дату и время
const currentVisit = new Date();
const formattedCurrentDate = formatDateTime(currentVisit);

// Проверяем, есть ли данные в localStorage
const userData = localStorage.getItem('user');

if (userData) {
  // Если данные есть, то пользователь уже заходил
  const parsedData = JSON.parse(userData);
  const userName = parsedData.name;
  const lastVisit = parsedData.lastVisit;

  alert(`Добрый день, ${userName}! Давно не виделись. В последний раз вы были у нас ${lastVisit}`);

  // Обновляем дату последнего визита (сохраняем только новую дату, имя оставляем прежним)
  const updatedUserData = {
    name: userName,
    lastVisit: formattedCurrentDate
  };
  localStorage.setItem('user', JSON.stringify(updatedUserData));
} else {
  // Если данных нет — пользователь зашёл впервые
  const userName = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя');

  if (userName && userName.trim() !== '') {
    // Записываем имя и дату визита в localStorage
    const newUserData = {
      name: userName.trim(),
      lastVisit: formattedCurrentDate
    };
    localStorage.setItem('user', JSON.stringify(newUserData));
  } else {
    // Если пользователь ничего не ввел или нажал "Отмена"
    alert('Вы не ввели имя. При следующем визите вас снова попросят представиться.');
  }
}