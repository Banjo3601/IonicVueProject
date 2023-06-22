<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Modification d'une catégorie</ion-title>
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
                    <ion-datetime v-if="dateTimeIsNotEmpty" v-model="dateTimeVar" @ionChange="">Heure du concert</ion-datetime>
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

            <ion-button expand="full" @click="editConcert" :disabled="!isFormValid">Modifier</ion-button>
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

const dateTimeIsNotEmpty = ref(false);

const concert = reactive({
    name: "",
    description: "",
    date: "",
    hour: "",
    category: "",
});

var categoryLibelle = reactive({});
categoryLibelle =  JSON.parse(localStorage.getItem("category")!);
const concertDetails = JSON.parse(localStorage.getItem("concertDetails")!);

concert.name = concertDetails.nom;
concert.description = concertDetails.description;
concert.date = concertDetails.date;
concert.hour = concertDetails.heure;
console.log(concert.date);
console.log(concert.hour);
concert.category = categoryLibelle.id;

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
            console.log(categories);
            optionLoaded.value = true;
        }catch(error){
            console.log(error);
        }
    }
}
const editConcert = async () => {

    concert.date = dateTimeVar.value.split("T")[0];
    concert.hour = dateTimeVar.value.split("T")[1];
    console.log("Nom du concert : " + concert.name);
    console.log("Description : " + concert.description);
    console.log("Date du concert : " + concert.date);
    console.log("Heure du concert : " + concert.hour);
    console.log("Catégorie de groupe : " + concert.category);
    console.log(parseInt(concert.category) );
    try{
        await axios.put("http://localhost:8082/api/concerts/"+concertDetails.id, {
            nom : concert.name,
            description : concert.description,
            categorie_id : parseInt(concert.category),
            image : "blabla pas d'image sorry",
            date : concert.date,
            heure : concert.hour,
            user_id : userDetails.id,
        });


        await router.push({ path: "/list_concert"});
    }catch(error){
        console.log(error);
    }
}

const deconnexion = async () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("concertDetails");
    localStorage.removeItem("category");
    await router.push({ path: "/login_page" });
};

const retour = () => {
    router.back();
};

load();

const convertForDateTimeVar = async () => {
    const datetime = new Date(concert.date);
    var [hours, minutes, seconds] = concert.hour.split(':').map(Number);
    datetime.setHours(hours, minutes, seconds);
    dateTimeVar.value = datetime.toISOString()

    dateTimeIsNotEmpty.value = true;
};

convertForDateTimeVar();

</script>

<style scoped>
.labelDateHeure {
    margin-bottom: 2%;
}

.labelCategory {
    margin-bottom: 2%;
}
</style>