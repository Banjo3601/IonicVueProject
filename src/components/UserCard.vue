<template>
    <ion-card>
        <ion-card-header>
            <ion-item>
                <ion-card-title class="">{{ user.login }}</ion-card-title>
            </ion-item>
        </ion-card-header>

        <ion-button color="danger" fill="solid" shape="round" size="small" @click="deleteUser">Corbeille</ion-button>
    </ion-card>
</template>

<script setup lang="ts">
import {IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonButton, IonItem} from "@ionic/vue";
import {reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();

const { user } = defineProps({ user: Object });

const load = async () => {
};

load();


const deleteUser = async () => {
    try{
        const response = await axios.delete("http://localhost:8082/api/user/"+user.id);
        window.location.reload();
    }catch (error){
        console.log(error);
    }
};






</script>



<style scoped>

</style>