// DOM элементы
const pageInput = document.getElementById('pageInput');
const limitInput = document.getElementById('limitInput');
const fetchButton = document.getElementById('fetchButton');
const errorMessageDiv = document.getElementById('errorMessage');
const galleryDiv = document.getElementById('gallery');

// Ключ для localStorage
const STORAGE_KEY = 'lastGalleryData';

/**
 * Показывает ошибку
 * @param {string} message - текст ошибки
 */
function showError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
}

/**
 * Скрывает ошибку
 */
function hideError() {
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';
}

function isValidNumber(value) {
    const num = Number(value);
    return !isNaN(num) && Number.isInteger(num) && num >= 1 && num <= 10;
}

/**
 * Отображает галерею изображений
 * @param {Array} images - массив объектов с изображениями
 */
function renderGallery(images) {
    if (!images || images.length === 0) {
        galleryDiv.innerHTML = '<div class="empty-state">📷 Нет изображений для отображения</div>';
        return;
    }
    
    const galleryHtml = images.map(image => `
        <div class="image-card">
            <img src="${image.download_url}" alt="${image.author}" loading="lazy">
            <div class="image-info">
                <div class="image-id">ID: ${image.id}</div>
                <div class="image-author">📸 ${escapeHtml(image.author)}</div>
            </div>
        </div>
    `).join('');
    
    galleryDiv.innerHTML = galleryHtml;
}

/**
 * Экранирует HTML символы для безопасности
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

/**
 * Показывает состояние загрузки
 */
function showLoading() {
    galleryDiv.innerHTML = '<div class="loading">⏳ Загрузка изображений...</div>';
}

/**
 * Сохраняет данные в localStorage
 * @param {Object} data - данные для сохранения
 */
function saveToLocalStorage(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
    }
}

/**
 * Загружает данные из localStorage
 * @returns {Object|null} - сохраненные данные или null
 */
function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error('Ошибка загрузки из localStorage:', error);
    }
    return null;
}

/**
 * Выполняет запрос к API
 * @param {number} page - номер страницы
 * @param {number} limit - лимит
 */
async function fetchImages(page, limit) {
    showLoading();
    hideError();
    
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Сохраняем в localStorage вместе с параметрами запроса
        const savedData = {
            images: data,
            params: { page, limit },
            timestamp: new Date().toISOString()
        };
        
        saveToLocalStorage(savedData);
        renderGallery(data);
        
    } catch (error) {
        console.error('Ошибка запроса:', error);
        galleryDiv.innerHTML = '<div class="empty-state">❌ Ошибка загрузки изображений. Попробуйте позже.</div>';
    }
}

function handleRequest() {
    const pageValue = pageInput.value.trim();
    const limitValue = limitInput.value.trim();
    
    const isPageValid = isValidNumber(pageValue);
    const isLimitValid = isValidNumber(limitValue);
    
    if (pageValue === '' || limitValue === '') {
        if (pageValue === '' && limitValue === '') {
            showError('Номер страницы и лимит вне диапазона от 1 до 10');
        } else if (pageValue === '') {
            showError('Номер страницы вне диапазона от 1 до 10');
        } else {
            showError('Лимит вне диапазона от 1 до 10');
        }
        return;
    }
    
    if (!isPageValid && !isLimitValid) {
        showError('Номер страницы и лимит вне диапазона от 1 до 10');
        return;
    }
    
    if (!isPageValid) {
        showError('Номер страницы вне диапазона от 1 до 10');
        return;
    }
    
    if (!isLimitValid) {
        showError('Лимит вне диапазона от 1 до 10');
        return;
    }
    
    const page = Number(pageValue);
    const limit = Number(limitValue);
    fetchImages(page, limit);
}

/**
 * Загружает последние данные при перезагрузке страницы
 */
function loadLastData() {
    const savedData = loadFromLocalStorage();
    
    if (savedData && savedData.images && savedData.params) {
        if (savedData.params.page) {
            pageInput.value = savedData.params.page;
        }
        if (savedData.params.limit) {
            limitInput.value = savedData.params.limit;
        }
        
        renderGallery(savedData.images);
        
        console.log('Данные восстановлены из localStorage');
    } else {
        galleryDiv.innerHTML = '<div class="empty-state">🖼️ Введите параметры и нажмите "Запрос"</div>';
    }
}

fetchButton.addEventListener('click', handleRequest);

pageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleRequest();
    }
});

limitInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleRequest();
    }
});

// При загрузке страницы восстанавливаем последние данные
window.addEventListener('DOMContentLoaded', loadLastData);