import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function Valid() {
    const formVerification = (login, email, pass1, pass2,) => {
        if (login.trim() === '' || email.trim() === '' || pass1.trim() === '' || pass2.trim() === '') {
            toast.error("Все поля должны быть заполнены!", { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
            return false;
        }
        else if (login.trim().length < 4 || login.trim().length > 30) {
            toast.error("Логин должен быть не меньше 4, и не больше 30 символов!", { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
            return false
        }
        else if (checkEmail(email.trim())) {
            toast.error("Невалидный адрес электронной почты!", { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
            return false;
        }
        else if (checkPass(pass1.trim())) {
            toast.error("Пароль должен быть не меньше 6 и не больше 25 символов!", { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
            return false;
        }
        else if (pass1.trim() !== pass2.trim()) {
            toast.error("Пароли должны совпадать!", { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
            return false;
        }
        return true
    }
    const authorization = (email, pass) => {
        if (email.trim() === '' || pass.trim() === '') {
            toast.error("Все поля должны быть заполнены!", { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
            return false;
        }
        else if (checkEmail(email.trim())) {
            toast.error("Невалидный адрес электронной почты!", { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
            return false;
        }
        else if (checkPass(pass.trim())) {
            toast.error("Пароль должен быть не меньше 6 и не больше 25 символов!", { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
            return false;
        }
        return true
    }
    const checkEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailPattern.test(email)) {
            return false
        }
        return true
    }
    const checkPass = (pass) => {
        if (pass.length > 6 || pass.length < 26) {
            return false
        }
        return true
    }
    return {
        formVerification,
        authorization,
    }
}
