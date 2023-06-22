<template>
    <ion-card>
        <ion-card-header>
            <ion-item>
                <ion-card-title class="">{{ category.libelle }}</ion-card-title>
            </ion-item>
        </ion-card-header>

        <ion-button color="warning"  fill="solid" shape="round" size="small" @click="editCategory">Modifier</ion-button>
        <ion-button @click="deleteCategory" color="danger" fill="solid" shape="round" size="small">Corbeille</ion-button>
    </ion-card>
</template>

<script setup lang="ts">
import {IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonButton, IonItem} from "@ionic/vue";
import {reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();

const { category } = defineProps({ category: Object });

const load = async () => {
};

load();


const deleteCategory = async () => {
    try{
        const response = await axios.delete("http://localhost:8082/api/categories/"+category.id);
        window.location.reload();
    }catch (error){
        console.log(error);
    }
};



const editCategory = async () => {
    await localStorage.setItem("category", JSON.stringify(category));
    window.location.href = "/edit_category";
};


</script>



<style scoped>

</style>