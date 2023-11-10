import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
import axiosInstance from '@/services/axios.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useAlertsStore = defineStore('alerts', () => {
    const books = ref([]);
    const bookNum = ref(null);
    const stateUser = ref(null);
    const favorCoun = ref(0);

    const myUser = computed(() => stateUser.value)
    const myBookNum = computed(() => bookNum.value)
    const myBooks = computed(() => books.value)
    const myFavorCoun = computed(() => favorCoun.value)

    const getBooks = async (searchTerm, category = '', sort = 'relevance') => {
        books.value = [];
        try {
            let result = await axiosInstance.get(`?q=${searchTerm}+subject:${category}&maxResults=40&&orderBy=${sort}&key=AIzaSyD_JUf6Lz0dvjlTANO6yoD3318LCHIemdc`);

            if (result.data && result.data.items) {
                result.data.items.forEach((item) => books.value.push(item))
                return
            } else {
                console.error("Получены некорректные данные");
            }
        } catch (error) {
            console.error("Произошла ошибка при выполнении запроса:", error);
        }
    }
    const getAboutBook = async (id) => {
        try {
            let result = await axiosInstance.get(`/${id}`);
            if (result) {
                bookNum.value = result.data;
            } else {
                console.error("Получены некорректные данные");
            }
        } catch (error) {
            console.error("Произошла ошибка при выполнении запроса:", error);
        }
    }
    const auth = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                stateUser.value = { ...user };
            }
        });
    }
    const register = (email, password, userName) => {
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(async () => {
                await updateProfile(getAuth().currentUser, {
                    displayName: userName,
                });
                stateUser.value = getAuth().currentUser;
                useRouter().push({ name: 'book' });
            })
            .catch((error) => {
                console.log(error.code);
                return toast.error(error.message, { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
            })
    }
    const removeUser = () => {
        signOut(getAuth()).then(() => {
            stateUser.value = null;
        })
    }
    const incrementFavorCoun = () => {
        favorCoun.value++;
        localStorage.setItem('favorCoun', JSON.stringify(favorCoun.value));
    }
    const clearFavorCoun = () => {
        favorCoun.value = 0;
        localStorage.setItem('favorCoun', JSON.stringify(favorCoun.value));
    }
    const loadFavorCoun = () => {
        if (localStorage.getItem('favorCoun')) {
            favorCoun.value = JSON.parse(localStorage.getItem('favorCoun'));
        }
    }

    return {
        myUser,
        myBookNum,
        myBooks,
        myFavorCoun,
        getBooks,
        auth,
        register,
        getAboutBook,
        removeUser,
        incrementFavorCoun,
        clearFavorCoun,
        loadFavorCoun
    }
})