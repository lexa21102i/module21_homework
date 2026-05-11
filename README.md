Задание 1.

Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

 XML:

<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
JS-объект:

{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
Проверьте своё решение на этом объекте:

<list>
    <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
    <student>
        <name lang="en">
            <first>John</first>
            <second>Doe</second>
        </name>
        <age>40</age>
        <prof>engineer</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Анна</first>
            <second>Смирнова</second>
        </name>
        <age>32</age>
        <prof>doctor</prof>
    </student>
    <student>
        <name lang="en">
            <first>Sarah</first>
            <second>Johnson</second>
        </name>
        <age>45</age>
        <prof>lawyer</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Михаил</first>
            <second>Иванов</second>
        </name>
        <age>50</age>
        <prof>manager</prof>
    </student>
    <student>
        <name lang="en">
            <first>Emily</first>
            <second>Williams</second>
        </name>
        <age>28</age>
        <prof>architect</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Екатерина</first>
            <second>Павлова</second>
        </name>
        <age>37</age>
        <prof>accountant</prof>
    </student>
    <student>
        <name lang="en">
            <first>Michael</first>
            <second>Brown</second>
        </name>
        <age>48</age>
        <prof>scientist</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Дмитрий</first>
            <second>Кузнецов</second>
        </name>
        <age>42</age>
        <prof>musician</prof>
    </student>
    <student>
        <name lang="en">
            <first>Lisa</first>
            <second>Miller</second>
        </name>
        <age>30</age>
        <prof>artist</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Ольга</first>
            <second>Алексеева</second>
        </name>
        <age>25</age>
        <prof>designer</prof>
    </student>
</list>


Задание 2.

Дан образец  JSON-строки:

{"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}
Ваша задача — создать JS-объект, который при преобразовании в JSON будет возвращать в качестве результата такую же JSON-строку, как в образце. Получившуюся строку вывести в консоль.


Задание 3.

Написать скрипт, который при открытии страницы будет делать следующее:

Если пользователь зашел в первый раз, вывести окно prompt с сообщением: «Добро пожаловать! Назовите, пожалуйста, ваше имя».

После того, как пользователь введет имя, записать имя, дату и время визита в localStorage.

Подсказка: для определения текущей даты используйте new Date().
Если пользователь открывает страницу не впервые (это можно узнать по наличию соответствующих записей в localStorage), вывести в alert сообщение вида: «Добрый день, *имя пользователя*! Давно не виделись. В последний раз вы были у нас *дата последнего посещения*» и перезаписать дату последнего посещения.

Дату можно вывести в любом удобочитаемом формате (не Timestamp, должен четко читаться день, месяц, год и время — часы и минуты).


Задание 4.

Создать Promise, в котором c задержкой в три секунды сгенерировать случайное целое число от 1 до 100. Для создания задержки использовать setTimeout. Если сгенерированное число четное — Promise выполнится успешно (resolve), если нечетное — выполнится с ошибкой (reject). После разрешения Promise обработать результат его выполнения и вывести сообщение в консоль:

«Завершено успешно. Сгенерированное число — number», если Promise завершился успешно. Вместо number подставить сгенерированное число
«Завершено с ошибкой. Сгенерированное число — number», если Promise завершился с ошибкой. Вместо number подставить сгенерированное число


Задание 5.

Написать код приложения, интерфейс которого состоит из поля ввода и кнопки «Получить список задач». При нажатии на кнопку нужно отправить запрос с помощью fetch на URL https://jsonplaceholder.typicode.com/users/3/todos. Число 3 представляет собой id пользователя, вместо него нужно подставить число, введенное в поле. Если пользователь с таким id существует, вернется список задач для этого пользователя, каждая задача представлена объектом вида:

{
    "userId": 3,
    "id": 43,
    "title": "tempore ut sint quis recusandae",
    "completed": true
}
Где title — описание задачи, а completed — флаг, отображающий, выполнена задача или нет. Вывести данный список на страницу, оформив соответствующим образом: в виде списка (ul или ol), выполненные задачи должны быть написаны зачеркнутым текстом. Если пользователь с введенным id не существует, вывести сообщение:

«Пользователь с указанным id не найден».


Задание 6.

Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводится ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
