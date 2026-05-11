// DOM элементы
const userIdInput = document.getElementById('userIdInput');
const fetchButton = document.getElementById('fetchButton');
const resultArea = document.getElementById('resultArea');

/**
 * @param {string} text - текст сообщения
 * @param {boolean} isError - флаг ошибки (меняет стиль)
 */
function showMessage(text, isError = false) {
    resultArea.innerHTML = `
        <div class="message ${isError ? 'error-message' : ''}">
            ${isError ? '⚠️ ' : 'ℹ️ '} ${escapeHtml(text)}
        </div>
    `;
}

/**
 * Вспомогательная функция для экранирования HTML спецсимволов (безопасность)
 */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderTodoList(todos, userId) {
    if (!todos || todos.length === 0) {
        showMessage(`📭 У пользователя с ID ${userId} нет задач.`, false);
        return;
    }

    const total = todos.length;
    const completedCount = todos.filter(todo => todo.completed === true).length;
    const pendingCount = total - completedCount;

    // Генерируем HTML-список
    const listItems = todos.map(todo => {
        const isCompleted = todo.completed === true;
        const itemClass = isCompleted ? 'task-item completed-task' : 'task-item';
        const checkboxCheckedAttr = isCompleted ? 'checked' : '';
        const titleSafe = escapeHtml(todo.title);

        return `
            <li class="${itemClass}">
                <div class="task-status">
                    <input type="checkbox" ${checkboxCheckedAttr} disabled>
                </div>
                <div class="task-title">
                    ${titleSafe}
                </div>
                <div class="badge">
                    ID: ${todo.id}
                </div>
            </li>
        `;
    }).join('');

    // Итоговый вывод
    const html = `
        <div class="task-header">
            <div class="stats">
                ✅ Выполнено: ${completedCount} &nbsp;|&nbsp;
                ⏳ Осталось: ${pendingCount} &nbsp;|&nbsp;
                📋 Всего: ${total}
            </div>
            <div class="stats">
                👤 Пользователь #${userId}
            </div>
        </div>
        <ul class="task-list">
            ${listItems}
        </ul>
    `;

    resultArea.innerHTML = html;
}

async function getTodosForUser(userId) {
    // Валидация
    if (!Number.isInteger(userId) || userId <= 0) {
        showMessage('❌ ID пользователя должен быть положительным целым числом.', true);
        return;
    }

    resultArea.innerHTML = `
        <div class="message" style="background:#eef2ff;">
            🔄 Проверка пользователя и загрузка задач... (ID: ${userId})
        </div>
    `;

    try {
        // ШАГ 1: проверить существование пользователя
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!userResponse.ok) {
            if (userResponse.status === 404) {
                showMessage(`❌ Пользователь с указанным id ${userId} не найден.`, true);
            } else {
                showMessage(`⚠️ Ошибка при проверке пользователя. Код: ${userResponse.status}`, true);
            }
            return;
        }

        // ШАГ 2: пользователь существует, получаем список задач
        const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);

        if (!todosResponse.ok) {
            showMessage(`❌ Не удалось загрузить задачи. Код ошибки: ${todosResponse.status}`, true);
            return;
        }

        const todos = await todosResponse.json();

        if (!Array.isArray(todos)) {
            showMessage(`⚠️ Некорректный формат данных от сервера.`, true);
            return;
        }

        if (todos.length === 0) {
            showMessage(`📭 Пользователь с ID ${userId} найден, но список задач пуст.`, false);
            return;
        }

        renderTodoList(todos, userId);

    } catch (error) {
        console.error('Ошибка запроса:', error);
        showMessage('❌ Проблема соединения. Проверьте интернет и попробуйте снова.', true);
    }
}

function onFetchClick() {
    const rawValue = userIdInput.value.trim();
    
    if (rawValue === "") {
        showMessage("⚠️ Введите число — ID пользователя.", true);
        return;
    }

    const userIdNumber = Number(rawValue);
    
    if (isNaN(userIdNumber) || !Number.isInteger(userIdNumber)) {
        showMessage("❌ ID должен быть целым числом (например, 1, 2, 5).", true);
        return;
    }

    if (userIdNumber <= 0) {
        showMessage("❌ ID пользователя не может быть меньше или равен 0.", true);
        return;
    }

    getTodosForUser(userIdNumber);
}

// Добавляем обработчики событий
fetchButton.addEventListener('click', onFetchClick);

// При нажатии Enter в поле ввода тоже вызываем поиск
userIdInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        onFetchClick();
    }
});

// При загрузке страницы автоматически загружаем задачи для пользователя 3
window.addEventListener('DOMContentLoaded', () => {
    const defaultUserId = 3;
    userIdInput.value = defaultUserId;
    getTodosForUser(defaultUserId);
});