<template>
    <ion-header>
        <ion-toolbar class="headerApp">
            <ion-title class="ion-text-start">Détail du concert</ion-title>
            <ion-buttons slot="end">
                <ion-button  @click="retour" color="tertiary"  fill="solid" shape="round" size="small">Retour</ion-button>
                <ion-button @click="deconnexion"  color="danger" fill="outline" shape="round" size="small">Déconnexion</ion-button>
            </ion-buttons>

        </ion-toolbar>
    </ion-header>
    <IonContent>
        <ion-item class="label-container">
            <div class="label-top">
                <ion-label >{{ concert.nom }}</ion-label>
            </div>
            <div class="label-bottom">
                <ion-label >{{ category.libelle }}</ion-label>
            </div>
        </ion-item>
        <ion-item>
        <ion-label class="labelDescription">Description</ion-label>
        </ion-item>
        <ion-item>
            {{ concert.description }}
        </ion-item>
        <ion-item>
            <ion-label class="ion-text-start">Jour : {{ formatDate(concert.date) }}</ion-label>
            <ion-label slot="end">Heure : {{ concert.heure }}</ion-label>
        </ion-item>

        <ion-item>
            <ion-button expand="full" color="warning"  fill="solid" shape="round" size="small" @click="editConcert">Modifier</ion-button>
            <ion-button expand="full" color="danger" fill="solid" shape="round" size="small" @click="deleteConcert">Supprimer</ion-button>
        </ion-item>

    </IonContent>
</template>

<script setup lang="ts">

import {IonButton, IonButtons, IonHeader, IonTitle,
    IonToolbar, IonList, IonItem, IonContent, IonLabel} from "@ionic/vue";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import axios from "axios";

const router = useRouter();
const userDetails = JSON.parse(localStorage.getItem("userDetails")!);
const concert = JSON.parse(localStorage.getItem("concertDetails")!);
var category = reactive({});
category =  JSON.parse(localStorage.getItem("category")!);

console.log(category);

const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString();
};

const deleteConcert = async () => {
    try{
        const response = await axios.delete("http://localhost:8082/api/concerts/"+concert.id);
        localStorage.removeItem("concertDetails");
        localStorage.removeItem("category");
        window.location.href = "/list_concert";
    }catch (error){
        console.log(error);
    }
};

const retour = () => {
    localStorage.removeItem("concertDetails");
    localStorage.removeItem("category");
    window.location.href = "/list_concert";
};

const editConcert = async () => {
    await localStorage.setItem("concertDetails", JSON.stringify(concert));
    await localStorage.setItem("category", JSON.stringify(category));
    window.location.href = "/edit_concert";
};

const deconnexion = async () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("concertDetails");
    localStorage.removeItem("category");
    window.location.href = "/login_page";
};

</script>



<style scoped>
.labelDescription {
    margin-top: 20px;
    padding-bottom: 10px;
}

.label-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.label-top {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
}

.label-bottom {
    position: relative;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 50px;
    margin-bottom: 20px;
}

</style>