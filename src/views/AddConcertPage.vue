<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Ajout d'un concert</ion-title>
                <ion-buttons slot="end">
                    <ion-button  @click="retour" color="tertiary"  fill="solid" shape="round" size="small">Retour</ion-button>
                    <ion-button  @click="deconnexion" color="danger" fill="outline" shape="round" size="small">Déconnexion</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label position="floating">Nom du concert</ion-label>
                    <ion-input v-model="concert.name" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Description</ion-label>
                    <ion-textarea v-model="concert.description"></ion-textarea>
                </ion-item>
                <ion-item>
                    <ion-label class="labelDateHeure" position="floating">Date et Heure du concert</ion-label>
                    <ion-datetime v-model="dateTimeVar" @ionChange="">Heure du concert</ion-datetime>
                </ion-item>
                <ion-item>
                    <ion-label position="floating" class="labelCategory">Catégorie de groupe</ion-label>
                    <ion-select v-model="concert.category" aria-label="Fruit" interface="action-sheet" placeholder="Sélectionner une catégorie">

                        <ion-select-option v-if="optionLoaded == true" v-for="category in categories" :value="category.id" :key="category.id">
                            {{category.libelle}}
                        </ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>

            <ion-button expand="full" @click="addConcert" :disabled="!isFormValid">Ajouter</ion-button>
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

const optionLoaded = ref(false);

const userDetails = JSON.parse(localStorage.getItem("userDetails")!);

const dateTimeVar = ref("");

const concert = reactive({
    name: "",
    description: "",
    date: "",
    hour: "",
    category: "",
    image: "",
});


const isFormValid = ref(false);

const checkFormValidity = () => {
    isFormValid.value = (
        concert.name !== '' &&
        concert.description !== '' &&
        dateTimeVar.value !== '' &&
        concert.category !== ''
    );
};

watchEffect(checkFormValidity);

var categories = reactive([]);

const load = async () => {
    if (!userDetails || !userDetails.token) {
        router.push("/login_page");
    }else{
        try{
            const response = await axios.get("http://localhost:8082/api/categories");
            categories = response.data;
            optionLoaded.value = true;
        }catch(error){
            console.log(error);
        }
    }
}

const addConcert = async () => {

    concert.date = dateTimeVar.value.split("T")[0];
    concert.hour = dateTimeVar.value.split("T")[1];

    try{
        await axios.post("http://localhost:8082/api/concerts", {
            nom : concert.name,
            description : concert.description,
            categorie_id : concert.category,
            image : concert.image,
            date : concert.date,
            heure : concert.hour,
            user_id : userDetails.id,
        });

        if(userDetails.role == "admin")
            await router.push({ path: "/admin_page"});
        else{
            await router.push({ path: "/user_page"});
        }
    }catch(error){
        console.log(error);
    }
}

const deconnexion = async () => {
    localStorage.removeItem("userDetails");
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