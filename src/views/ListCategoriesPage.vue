<template>
    <ion-header>
        <ion-toolbar class="headerApp">
            <ion-title class="ion-text-start">Liste des catégories</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="deconnexion" color="danger" fill="outline" shape="round" size="small">Déconnexion</ion-button>
                <ion-button @click="addCategory" color="success" fill="solid" shape="round" size="small">+</ion-button>
            </ion-buttons>

        </ion-toolbar>
    </ion-header>
    <IonContent>
        <CategoryCard v-if="categoriesLoaded == true" v-for="category in categories" :key="category.id" :category="category" />
    </IonContent>

</template>

<script setup lang="ts">
import ConcertCard from "@/components/ConcertCard.vue";
import {IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonContent} from "@ionic/vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import CategoryCard from "@/components/CategoryCard.vue";

var categories = reactive([]);
const categoriesLoaded = ref(false);
const router = useRouter();
const userDetails = JSON.parse(localStorage.getItem("userDetails")!);

const load = async () => {
    if (!userDetails || !userDetails.token) {
        router.push("/login_page");
    }else{
        try{
            localStorage.removeItem("concertDetails");
            localStorage.removeItem("category");
            const response = await axios.get("http://localhost:8082/api/categories");
            categories = response.data;
            console.log(categories);
            categoriesLoaded.value = true;
        }catch(error){
            console.log(error);
        }
    }
};

const deconnexion = async () => {
    localStorage.removeItem("userDetails");
    window.location.href = "/login_page";
};

load();
const addCategory = () => {
    window.location.href = "/add_category";
};
</script>

<style scoped>

</style>