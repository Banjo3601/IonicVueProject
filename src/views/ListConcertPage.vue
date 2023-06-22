<template>
    <ion-header>
        <ion-toolbar class="headerApp">
            <ion-title class="ion-text-start">Liste des concerts</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="deconnexion" color="danger" fill="outline" shape="round" size="small">Déconnexion</ion-button>
                <ion-button @click="addConcert" color="success" fill="solid" shape="round" size="small">+</ion-button>
            </ion-buttons>

        </ion-toolbar>
    </ion-header>
    <IonContent>
        <ConcertCard v-if="concertsLoaded == true" v-for="concert in concerts" :key="concert.id" :concert="concert" />
    </IonContent>

</template>

<script setup lang="ts">
import ConcertCard from "@/components/ConcertCard.vue";
import {IonButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonContent} from "@ionic/vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";

var concerts = reactive([]);
const concertsLoaded = ref(false);
const router = useRouter();
const userDetails = JSON.parse(localStorage.getItem("userDetails")!);
const Concert = JSON.parse(localStorage.getItem("concertDetails")!);
const category = JSON.parse(localStorage.getItem("category")!);

const load = async () => {
    if (!userDetails || !userDetails.token) {
        localStorage.removeItem("concertDetails");
        localStorage.removeItem("category");
        router.push("/login_page");
    }else{
        try{
            localStorage.removeItem("concertDetails");
            localStorage.removeItem("category");
            console.log(userDetails.id);
            const response = await axios.get("http://localhost:8082/api/concerts",{
                params: {
                    user_id: userDetails.id,
                },
            });
            concerts = response.data;
            console.log(concerts);
            concertsLoaded.value = true;
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
const addConcert = () => {
    window.location.href = "/add_concert";
};
</script>

<style scoped>

</style>