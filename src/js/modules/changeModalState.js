import checkNumInputs from './checkNumInputs';


const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'), // форма окна
          windowWidth = document.querySelectorAll('#width'), // окно ввода ширины окна
          windowHeight = document.querySelectorAll('#height'), // окно ввода высоты окна
          windowType = document.querySelectorAll('#view_type'), // тип окна
          windowProfile = document.querySelectorAll('.checkbox'); // профиль окна

    checkNumInputs('#width');
    checkNumInputs('#height'); 

    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }

                // console.log(state);
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
            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'height');
    bindActionToElems('input', windowHeight, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;