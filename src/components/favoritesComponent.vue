<template  lang="">
  <div>
    <div class="container mt-4">
      <div class="row">
        <div v-for="book in group" :key="book.id" class="col-md-3">
          <div class="card mb-4 book-dody-inside">
            <img v-if="book.volumeInfo.imageLinks" style="height: 280px;" :src="book.volumeInfo.imageLinks.thumbnail"
              class="border border-secondary m-5" alt="Book Cover">
            <img v-if="!book.volumeInfo.imageLinks" style="height: 280px;" src="../assets/book.jpg"
              class="border border-secondary m-5" alt="Book Cover">
            <div class="card-body">
              <h5 class="card-title">{{ truncateString(book.volumeInfo.title) }}</h5>
              <p class="card-text">{{ book.volumeInfo.authors ? truncateString(book.volumeInfo.authors[0]) : 'Неизвестный автор' }}</p>
              <p class="card-text">{{ book.saleInfo.listPrice ? (book.saleInfo.listPrice.amount + ' ' +
                book.saleInfo.listPrice.currencyCode) : 'НЕ ПРОДАЕТСЯ' }}.</p>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="setCurrentId(book.id)">Удалить</button>⠀ 
              <button @click="detailedInfo(book.id)" class="btn btn-info">Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-content modal-dialog book-dody">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="exampleModalLabel">Уверены что хотите удалить книгу из избранного?</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="removeBook(currentId)">Удалить</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Выход</button>
      </div>
    </div>
</div>

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/services/fireBase.js';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, } from 'firebase/auth';
import { useRouter } from 'vue-router'
import { useAlertsStore } from '@/store/Store.js';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const group = ref([]);
const currentId = ref(null);

const router = useRouter()
const { clearFavorCoun } = useAlertsStore();

const setCurrentId = (myId) => {
  currentId.value = myId;
}
const detailedInfo = (id) => {
  router.push({ name: 'aboutBook', params: { id } });
}
const truncateString = (str) => {
  if (str.length > 20) {
    return str.substring(0, 20).trim() + '...';
  } else {
    return str;
  }
}
const getFavoritesBooks = () => {
  onAuthStateChanged(getAuth(), async (user) => {
    if (!user) {
      return;
    }
    const userCollectionRef = collection(db, `users/${user.uid}/favoritesBooks`);
    const GroupDoc = await getDocs(userCollectionRef);
    GroupDoc.forEach((item) => {
      group.value.push({ ...item.data() });
    });
    return group.value;
  });
}
const removeBook = (id) => {
  const user = getAuth().currentUser;
  if (!user) {
    return;
  }
  deleteDoc(doc(db, `users/${user.uid}/favoritesBooks`, id));
  const deletedBook = group.value.find((book) => book.id == id);
  group.value.splice(group.value.indexOf(deletedBook), 1);
}

onMounted(() => {
  getFavoritesBooks();
  clearFavorCoun()
})

</script>

<style></style>