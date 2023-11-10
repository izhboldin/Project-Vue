<template>
  <div class="fon">
    <button class="btn them-btn toggle-button" @click="toggleTheme()">Сменить тему</button>
    <section v-if="examinationAllPage()">
      <header class="header p-2">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-4">
              <router-link v-if="route.name !== 'book'" class="btn btn-outline-primary btn-sm"
                :to="{ name: 'book' }">Поиск</router-link>⠀
              <router-link v-if="myUser && route.name !== 'favorites'" class="btn btn-outline-primary btn-sm"
                :to="{ name: 'favorites' }">Избранные
                <span v-if="myFavorCoun != 0" class="badge text-bg-danger">{{ myFavorCoun }}</span>
              </router-link>
            </div>
            <div v-if="!myUser" class="col-4">
              <router-link class="btn btn-outline-primary btn-sm"
                :to="{ name: 'regist' }">Зарегистрироваться</router-link>⠀
              <router-link class="btn btn-outline-primary btn-sm"
                :to="{ name: 'authorization' }">Авторизоваться</router-link>
            </div>
            <div v-else class="col-4">
              <span class="fw-bold user-name">Привет, {{ myUser.displayName }}⠀</span>
              <img referrerpolicy="no-referrer" v-if="myUser.photoURL" :src="myUser.photoURL" alt="user-photo"
                style="width: 32px; border-radius: 50%;" class="me-2">
              <button @click="removeUser()" class="btn btn-outline-danger btn-sm">выйти</button>
            </div>
          </div>
        </div>

      </header>

      <section v-if="this.$route.name == undefined">
        <div class="container-fluid d-flex align-items-center justify-content-center" style="height: 90vh">
          <div class="container mt-4">
            <div class="row">
              <div class="col-md-12">
                <div class="card mb-4 about-me pt-4">
                  <AboutUs>
                    <template v-slot:text>
                      <p>Добро пожаловать на сайт для поиска интересующих вас книг! 📚 <br><br>

                        🔍 Поиск Книг: Используйте наш умный поиск, чтобы найти книги по названиям или интересующим вас
                        темам.
                        Погрузитесь в океан знаний. <br><br>

                        📖 Для вас: Откройте для себя новые миры и найдите те книги, которые точно вас заинтересуют.
                        <br><br>

                        📚 Личная библиотека: Сохраняйте свои любимые книги в личной библиотеке. <br><br>

                        Присоединяйтесь к нам и дайте миру книг вашу историю! 📚 <br><br>
                      </p>
                    </template>
                  </AboutUs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <router-view></router-view>
  </div>
</template>

<script setup>
import AboutUs from "./components/aboutUs.vue"
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAlertsStore } from '@/store/Store.js';


const route = useRoute();
const { getBooks, auth, removeUser, loadFavorCoun} = useAlertsStore();
const { myUser, myFavorCoun } = storeToRefs(useAlertsStore());

const toggleTheme = () => {
  const body = document.body;
  body.classList.toggle('dark-theme');
}
const examinationAllPage = () => {
  if (route.name !== 'regist' && route.name !== 'authorization') {
    return true;
  }
  return false
}

onMounted(() => {
  auth();
  getBooks('')
  loadFavorCoun()
});
</script>

<style>
div,
header,
input,
button,
select {
  transition: all 0.3s !important;
  -webkit-transition: all 0.3s !important;
  -ms-transition: all 0.3s !important;
  transition: all 0.3s !important;
}

.toggle-button {
  position: fixed;
  top: 5px;
  right: 20px;
  z-index: 999;
}

:root {
  --backgound-color: #f8f9fa;
  --backgound-color-inside: #eeeeee;
  --header-background-color: white;
  --input-background-color: #fff;
  --color-text: #2c3e50;
  --webkit-box-shadow: 0 0 0 30px #fff inset !important;
  --backgound-color-them-btn: #343a40;
  --color-them-btn: #fff;
}

:root .dark-theme {
  --backgound-color: #343a40;
  --backgound-color-inside: #2c3136;
  --header-background-color: #222;
  --input-background-color: #1e1d2b;
  --color-text: #fff;
  --webkit-box-shadow: 0 0 0 30px #1e1d2b inset !important;
  --backgound-color-them-btn: #eeeeee;
  --color-them-btn: #2c3e50
}

.them-btn {
  background-color: var(--backgound-color-them-btn) !important;
  color: var(--color-them-btn) !important;
}

.header {
  background-color: var(--header-background-color);
  background-position: center;
}

.about-me {
  background-color: var(--backgound-color) !important;
  color: var(--color-text) !important;
}

.book-dody {
  background-color: var(--backgound-color) !important;
  color: var(--color-text) !important;
}

.book-dody-inside {
  background-color: var(--backgound-color-inside) !important;
  color: var(--color-text) !important;
}

input:-webkit-autofill,
input,
select {
  background-color: var(--input-background-color) !important;
  color: var(--color-text) !important;
  -webkit-background-clip: text;
  -webkit-box-shadow: var(--webkit-box-shadow);
  -webkit-text-fill-color: var(--color-text);
}

input::placeholder {
  color: var(--color-text) !important;
}

.user-name {
  color: var(--color-text) !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.fon {
  background-image: url('@/assets/headerBack.jpg');
  min-height: 100vh;
  background-position: center;
}

.background {
  background-image: url('@/assets/background.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
}
</style>
