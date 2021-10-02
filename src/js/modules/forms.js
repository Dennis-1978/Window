import checkNumInputs from './checkNumInputs';


const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          modal = document.querySelector('.popup_calc_end');

    function closeModalByTime() {
        setTimeout(function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 0);
    }

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    const clearProperty = () => {
        for (let key in state) {
            if (key !== 'form' && key !== 'type') {
                delete state[key];
            }
        }
    };

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
               for (let key in state) {
                   formData.append(key, state[key]);
               }
            }

            postData('assets/server.php', formData)
                .then(result => {
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    console.log('Before:', state);
                    clearProperty();
                    clearInputs();
                    console.log('After:', state);
                    setTimeout(() => {
                        statusMessage.remove();
                        closeModalByTime();
                    }, 2000);
                });
        });
    });
};

export default forms;