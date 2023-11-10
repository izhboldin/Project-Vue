<template>
    <div>

        <div v-if="myBookNum" class="container mt-4">
            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4 book-dody pt-4">
                        <img v-if="myBookNum.volumeInfo.imageLinks"  style="height: 420px; width: 300px;"
                            :src="myBookNum.volumeInfo.imageLinks.thumbnail" class=" mx-auto border border-secondary" alt="Book Cover">
                        <img v-if="!myBookNum.volumeInfo.imageLinks"  style="height: 420px; width: 300px;"
                            src="../assets/book.jpg" class=" mx-auto border border-secondary" alt="Book Cover">
                        <div class="card-body">
                            <h4 class="card-title">{{ myBookNum.volumeInfo.title }}</h4>
                            <p
                                :innerHTML="myBookNum.volumeInfo.description ? '<strong>Кратко о книге:</strong>' + myBookNum.volumeInfo.description : '<strong>Кратко о книге:</strong>' + ' -'">
                            </p>
                            <p><strong>Автор:</strong> {{ myBookNum.volumeInfo.authors ? myBookNum.volumeInfo.authors[0] :
                                'Неизвестный автор' }}</p>
                            <p><strong>Дата публикации:</strong> {{ myBookNum.volumeInfo.publishedDate ?
                                myBookNum.volumeInfo.publishedDate : '-' }}</p>
                            <p> <strong>Цена:</strong> {{ myBookNum.saleInfo.listPrice ? (myBookNum.saleInfo.listPrice.amount +
                                ' ' + myBookNum.saleInfo.listPrice.currencyCode) : 'НЕ ПРОДАЕТСЯ' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script  setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAlertsStore } from '@/store/Store.js';

const route = useRoute();
const { getAboutBook } = useAlertsStore();
const { myBookNum } = storeToRefs(useAlertsStore());

onMounted(()=> {
    getAboutBook(route.params.id);
})

</script>
<style lang="">
    
</style>