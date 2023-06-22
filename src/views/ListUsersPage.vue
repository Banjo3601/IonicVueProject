<template>
    <ion-header>
        <ion-toolbar class="headerApp">
            <ion-title class="ion-text-start">Liste des utilisateurs</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="deconnexion" color="danger" fill="outline" shape="round" size="small">Déconnexion</ion-button>
                <ion-button @click="addUser" color="success" fill="solid" shape="round" size="small">+</ion-button>
            </ion-buttons>

        </ion-toolbar>
    </ion-header>
    <IonContent>
        <UserCard  v-if="usersLoaded == true" v-for="user in users" :key="user.id" :user="user"/>
    </IonContent>

</template>

<script setup lang="ts">
import ConcertCard from "@/components/ConcertCard.vue";
import {IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonContent} from "@ionic/vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import CategoryCard from "@/components/CategoryCard.vue";
import UserCard from "@/components/UserCard.vue";

var users = reactive([]);
const usersLoaded = ref(false);
const router = useRouter();
const userDetails = JSON.parse(localStorage.getItem("userDetails")!);

const load = async () => {
    if (!userDetails || !userDetails.token) {
        router.push("/login_page");
    }else{
        try{
            localStorage.removeItem("concertDetails");
            localStorage.removeItem("category");
            const response = await axios.get("http://localhost:8082/api/user");
            users = response.data;
            console.log(users);
            usersLoaded.value = true;
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
const addUser = () => {
    window.location.href = "/add_user";
};
</script>

<style scoped>

</style>