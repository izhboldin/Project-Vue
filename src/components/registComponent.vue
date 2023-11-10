<template lang="">
    <div class="background">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="card book-dody">
                        <div class="card-header">Регистрация</div>
                        <div class="card-body">
                            <form action="" @submit.prevent>
                                <div class="form-group">
                                    <label for="username">Имя пользователя (Логин)</label>
                                    <input type="text" v-model="username" class="form-control" name="username" required>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" v-model="email" class="form-control" name="email" required>
                                </div>
                                <div class="form-group">
                                    <label for="password">Пароль</label>
                                    <input type="password" v-model="password" class="form-control" name="password" maxlength="25" required>
                                </div>
                                <div class="form-group">
                                    <label for="secondPassword">Повторите пароль</label>
                                    <input type="password" v-model="secondPassword" class="form-control" name="password" maxlength="25" required>
                                </div>
                                <br>
                                <button class="btn btn-secondary" @click="router.push({name: 'book'})">Назад</button>⠀
                                <button type="submit" class="btn btn-primary" @click="Verifi()">Зарегистрироваться</button>⠀
                                <button type="submit" class="btn btn-primary" @click="signInWithGoogle()">войти с помощью <img style="width: 22px;" src="../assets/Google-logo.png" alt=""></button>
                                <br>    
                                        
                                если у вас уже есть аккаунт, <router-link :to="{name: 'authorization'}">войти  </router-link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { Valid } from '@/services/mixin';
import { useRouter } from 'vue-router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAlertsStore } from '@/store/Store.js';

const { formVerification } = Valid();
const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const secondPassword = ref('');

const {register, clearFavorCoun, getBooks} = useAlertsStore();

const Verifi = () => {
    if (formVerification(username.value, email.value, password.value, secondPassword.value)) {
        clearFavorCoun();
        getBooks('');
        register(email.value, password.value, username.value);
    }
}

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const user = await signInWithPopup(getAuth(), provider).user
        clearFavorCoun();
        getBooks('')
        router.push({ name: 'book' });

    } catch (error) {
        console.log(error.code);
    }
}
</script>
<style></style>