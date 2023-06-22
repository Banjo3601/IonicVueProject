<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title  class="ion-text-start">Bienvenue {{userDetails.username}} !</ion-title>
                <ion-button slot="end" @click="deconnexion" color="danger" fill="outline" shape="round" size="small">Déconnexion</ion-button>
            </ion-toolbar>
        </ion-header>



        <ion-content class="ion-padding">
            <ion-list class="ion-justify-content-center">
                <ion-item>
                    <router-link to="/add_concert">
                        <ion-button expand="full" @click="" color="success" fill="solid" shape="round" size="small">Créer un concert</ion-button>
                    </router-link>
                </ion-item>
                <ion-item>
                    <ion-button expand="full" @click="forceListConcert" color="tertiary"  fill="solid" shape="round" size="small">Gérer mes concerts</ion-button>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">

import {IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonButton} from "@ionic/vue";
import {useRouter} from "vue-router";


const router = useRouter();
const userDetails = JSON.parse(localStorage.getItem("userDetails")!);

const load = async () => {
    if (!userDetails || !userDetails.token) {
        router.push("/login_page");
    }
};
const deconnexion = async () => {
    localStorage.removeItem("userDetails");
    await router.push({ path: "/login_page" });
};

const forceListConcert = () => {
    window.location.href = "/list_concert";
};

load();

</script>

<style scoped>

</style>