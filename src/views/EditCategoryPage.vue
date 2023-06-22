<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Modification d'un concert</ion-title>
                <ion-buttons slot="end">
                    <ion-button  @click="retour" color="tertiary"  fill="solid" shape="round" size="small">Retour</ion-button>
                    <ion-button  @click="deconnexion" color="danger" fill="outline" shape="round" size="small">Déconnexion</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label position="floating">Nom de la catégorie</ion-label>
                    <ion-input v-model="category.libelle" type="text"></ion-input>
                </ion-item>
            </ion-list>

            <ion-button expand="full" @click="editCategory" :disabled="!isFormValid">Modifier</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToolbar,
    IonSelectOption,
    IonSelect, IonButton
} from "@ionic/vue";
import {reactive, ref, watchEffect} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter();

const userDetails = JSON.parse(localStorage.getItem("userDetails")!);
const categoryDetails = JSON.parse(localStorage.getItem("category")!);

const category = reactive({
    libelle: categoryDetails.libelle
});




const isFormValid = ref(false);

const checkFormValidity = () => {
    isFormValid.value = (
        category.libelle !== ''
    );
};

watchEffect(checkFormValidity);


const load = async () => {
}
const editCategory = async () => {

    console.log('Nom de la catégorie : ' + category.libelle);

    try{
        await axios.put("http://localhost:8082/api/categories/"+categoryDetails.id, {
            libelle : category.libelle,
        });

        await router.push({ path: "/list_categories"});
    }catch(error){
        console.log(error);
    }
}

const deconnexion = async () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("category");
    await router.push({ path: "/login_page" });
};

const retour = () => {
    router.back();
};

load();



</script>

<style scoped>
.labelDateHeure {
    margin-bottom: 2%;
}

.labelCategory {
    margin-bottom: 2%;
}
</style>