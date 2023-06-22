<template>
    <ion-card>
        <ion-card-header>
            <ion-item>
                <ion-card-title class="ion-text-start">{{ concert.nom }}</ion-card-title>
                <ion-card-subtitle slot="end">{{categoryLibelle}}</ion-card-subtitle>
            </ion-item>
        </ion-card-header>

        <ion-item>
            <ion-card-subtitle class="ion-text-start">Date : {{ formatDate(concert.date) }}</ion-card-subtitle>
            <ion-card-subtitle slot="end">Heure : {{ concert.heure }}</ion-card-subtitle>
        </ion-item>

        <ion-card-content>
            {{truncatedDescription}}
        </ion-card-content>

        <ion-button color="tertiary"  fill="solid" shape="round" size="small" @click="detailConcert">Voir</ion-button>
        <ion-button color="warning"  fill="solid" shape="round" size="small" @click="editConcert">Modifier</ion-button>
        <ion-button color="danger" fill="solid" shape="round" size="small" @click="deleteConcert">Corbeille</ion-button>
    </ion-card>
</template>

<script setup lang="ts">
import {IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonButton, IonItem} from "@ionic/vue";
import {computed, onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import * as buffer from "buffer";

const truncatedDescription = computed(() => {
    if (concert.description && concert.description.length > 100) {
        return concert.description.slice(0, 100) + '...';
    }
    return concert.description;
});

const imageURL = ref('');

const router = useRouter();

var category  = reactive({});
const categoryLibelle = ref("");

const { concert } = defineProps({ concert: Object });



const load = async () => {
    try{
        const response = await axios.get("http://localhost:8082/api/categories/"+concert.categorie_id);
        category = response.data;
        categoryLibelle.value = category.libelle;
        console.log(category);
    }catch (error){
        console.log(error);
    }
};

load();
const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString();
};

const deleteConcert = async () => {
    try{
        const response = await axios.delete("http://localhost:8082/api/concerts/"+concert.id);
        window.location.reload();
    }catch (error){
        console.log(error);
    }
};

const detailConcert = async () => {
        await localStorage.setItem("concertDetails", JSON.stringify(concert));
        await localStorage.setItem("category", JSON.stringify(category));
        window.location.href = "/detail_concert";
};

const editConcert = async () => {
    await localStorage.setItem("concertDetails", JSON.stringify(concert));
    await localStorage.setItem("category", JSON.stringify(category));
    window.location.href = "/edit_concert";
};


</script>



<style scoped>

</style>