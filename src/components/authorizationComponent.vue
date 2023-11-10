<template lang="">
    <div class="background">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="card book-dody">
                        <div class="card-header">Авторизация</div>
                        <div class="card-body">
                            <form action="" @submit.prevent>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" v-model="email" name="email" required>
                                </div>
                                <div class="form-group">
                                    <label for="password">Пароль</label>
                                    <input type="password" class="form-control" id="password" v-model="password" name="password" maxlength="25" required>
                                </div>
                                <p v-if="errorMessage" class="text-danger">{{errorMessage}}</p>
                                <br>
                                <button class="btn btn-secondary" @click="router.push({name: 'book'})">Назад</button>⠀
                                <button type="submit" class="btn btn-primary" @click="Verifi()">Войти</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Valid } from '@/services/mixin';
import { useAlertsStore } from '@/store/Store.js';
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const { authorization } = Valid();
const { getBooks, clearFavorCoun} = useAlertsStore();
const router = useRouter()
const email = ref('');
const password = ref('');
const errorMessage = ref(null);

const Verifi = () => {
    if (authorization(email.value, password.value)) {
        signIn();
    }
}
const signIn = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            getBooks('')
            clearFavorCoun()
            router.push({ name: 'book' });
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    errorMessage.value = "Неверный адрес электронной почты";
                    break;
                case "auth/user-not-found":
                    errorMessage.value = "Нет аккаунта";
                    break;
                case "auth/wrong-password":
                    errorMessage.value = "Неверный пароль";
                    break;
                default:
                    errorMessage.value = "Адрес электронной почты или пароль были неверными"
            }
            toast.error(error.message, { autoClose: 1000, position: toast.POSITION.TOP_CENTER, });
        })
}
</script>
<style></style>