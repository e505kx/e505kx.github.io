/*!
devtools-detect
Detect if DevTools is open
https://github.com/sindresorhus/devtools-detect
By Sindre Sorhus
MIT License
*/
(function () {
	'use strict';

	const devtools = {
		isOpen: false,
		orientation: undefined
	};

	const threshold = 160;

	const emitEvent = (isOpen, orientation) => {
		window.dispatchEvent(new CustomEvent('devtoolschange', {
			detail: {
				isOpen,
				orientation
			}
		}));
	};

	setInterval(() => {
		const widthThreshold = window.outerWidth - window.innerWidth > threshold;
		const heightThreshold = window.outerHeight - window.innerHeight > threshold;
		const orientation = widthThreshold ? 'vertical' : 'horizontal';

		if (
			!(heightThreshold && widthThreshold) &&
			((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
		) {
			if (!devtools.isOpen || devtools.orientation !== orientation) {
				emitEvent(true, orientation);
			}

			devtools.isOpen = true;
			devtools.orientation = orientation;
		} else {
			if (devtools.isOpen) {
				emitEvent(false, undefined);
			}

			devtools.isOpen = false;
			devtools.orientation = undefined;
		}
	}, 500);

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = devtools;
	} else {
		window.devtools = devtools;
	}
})();

var poster = document.querySelector('#background-video source');
var number = Math.floor(Math.random() * 10) + 1;
poster.src += number +'.mp4';

document.addEventListener("DOMContentLoaded", function() {
    var volumeControl = document.getElementById('volumeControl');

    function checkDeviceType() {
        // Проверка ширины экрана, 768px - предполагаемый порог между мобильными и десктопными устройствами
        if (window.innerWidth <= 768) {
            // Мобильное устройство, скрыть ползунок громкости
            volumeControl.style.display = 'none';
        } else {
            // Десктопное устройство, показать ползунок громкости
            volumeControl.style.display = 'block';
        }
    }

    // Проверка при загрузке страницы
    checkDeviceType();

    // Проверка при изменении размера окна браузера
    window.addEventListener('resize', checkDeviceType);
});
