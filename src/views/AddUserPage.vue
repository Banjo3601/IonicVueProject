<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Ajout d'un utilisateur</ion-title>
                <ion-buttons slot="end">
                    <ion-button  @click="retour" color="tertiary"  fill="solid" shape="round" size="small">Retour</ion-button>
                    <ion-button  @click="deconnexion" color="danger" fill="outline" shape="round" size="small">Déconnexion</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label position="floating">Nom d'utilisateur</ion-label>
                    <ion-input v-model="user.login" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Mot de passe</ion-label>
                    <ion-input v-model="user.password" type="password"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating" class="labelCategory">Type d'utilisateur</ion-label>
                    <ion-select v-model="user.role" aria-label="Fruit" interface="action-sheet" placeholder="Sélectionner un rôle">
                        <ion-select-option  value="admin" key="admin">
                            Administrateur
                        </ion-select-option>
                        <ion-select-option  value="user" key="user">
                            Simple utilisateur
                        </ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>

            <ion-button expand="full" color="tertiary"  fill="solid" shape="round" size="small" @click="addUser" :disabled="!isFormValid">Ajouter cet utilisateur</ion-button>
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

const user = reactive({
    login: "",
    password: "",
    role: "",
});




const isFormValid = ref(false);

const checkFormValidity = () => {
    isFormValid.value = (
        user.login !== '' &&
        user.password !== '' &&
        user.role !== ''
    );
};

watchEffect(checkFormValidity);


const load = async () => {
}
const addUser = async () => {

    try{
        await axios.post("http://localhost:8082/api/user/register", {
            login : user.login,
            password : user.password,
            role : user.role
        });

        await router.push({ path: "/list_users"});
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