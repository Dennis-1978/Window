const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
     
        trigger.forEach(item => {  
            if (!(item.classList.contains('glazing_price_btn')) &&
                !(item.classList.contains('popup_engineer_btn'))) {
                item.disabled = true;
            }

            item.addEventListener('click', (event) => {
                if (event.target) {
                    event.preventDefault();
                }

                // Закрываем все модальные окна c data-атрибутами
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                if (state.width && state.height) {
                    document.querySelector('.popup_calc_button').disabled = false;
                } else {
                    document.querySelector('.popup_calc_button').disabled = true;
                }
        
                if (state.profile) {
                    document.querySelector('.popup_calc_profile_button').disabled = false;
                } else {
                    document.querySelector('.popup_calc_profile_button').disabled = true;
                }
                
                openModal();
                // document.body.classList.add('modal-open');

            });
        });

        // Закрытие модального окна при клике на крестик
        close.addEventListener('click', () => {
            // Закрываем все модальные окна c data-атрибутами
            windows.forEach(item => {
                item.style.display = 'none';
            });

            closeModal();
            // document.body.classList.remove('modal-open');
        });

        // Закрытие модального окна при клике на подложку
        modal.addEventListener('click', (event) => {
            if (event.target === modal && closeClickOverlay) {
                // Закрываем все модальные окна c data-атрибутами
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                closeModal();
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time){
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth; // получили ширину прокрутки
        div.remove();

        return scrollWidth;
    }
       
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    // вызов 1-го модального окна калькулятора
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    // вызов 2-го модального окна калькулятора
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    // вызов 3-го модального окна калькулятора
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    showModalByTime('.popup', 60000);
};

export default modals;