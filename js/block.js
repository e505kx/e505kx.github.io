let url = '../../main/videos/gadeniw.mp4';

// Функция для определения, является ли устройство мобильным
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Если устройство не мобильное, добавляем обработчик событий
if (!isMobileDevice()) {
    window.addEventListener('devtoolschange', event => {
        window.location = url;
    });
}
