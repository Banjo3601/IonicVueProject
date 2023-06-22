<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                    <ion-title>My Concert App</ion-title>
            </ion-toolbar>
        </ion-header>



        <ion-content class="ion-padding">
            <ion-title class="centerTitle">Connectez-vous !</ion-title>
            <ion-list>
                <ion-item>
                    <ion-label position="floating">Nom d'utilisateur</ion-label>
                    <ion-input v-model="account.username" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Mot de passe</ion-label>
                    <ion-input v-model="account.password" type="password"></ion-input>
                </ion-item>
            </ion-list>

            <ion-button expand="full" color="tertiary"  fill="solid" shape="round" size="small" @click="connexion">Connexion</ion-button>
            <br/>
            <ion-label v-if="errorLogin == true">
                Vos identifiants de connexion sont incorrects. Veuillez réessayer.
            </ion-label>
        </ion-content>
    </ion-page>


</template>

<script setup lang="ts">

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonInput,
    IonList,
    IonItem,
    IonAlert,
    IonButton
} from '@ionic/vue';
import {useRouter} from "vue-router";
import {ref} from "vue";
import {reactive} from "vue";
import axios from "axios";

const account = reactive({
    username: "",
    password: "",
    role: "",
    id: "",
    token: "",
});

const router = useRouter();

const errorLogin = ref(false);
const afficherAlerte = () => {
    errorLogin.value = true;
}

const resetAlerte = () => {
    errorLogin.value = false;
}
const connexion = async () => {
    console.log("Nom d'utilisateur : " + account.username);
    console.log("Mot de passe : " + account.password);

    try{
        const response = await axios.post("http://localhost:8082/api/user/login", {
            login: account.username,
            password: account.password,
        });
        const token = response.data.token;



        account.username = response.data.login;
        account.role = response.data.role;
        account.id = response.data.id;
        account.password = "";
        account.token = response.data.token;

        await localStorage.setItem("userDetails", JSON.stringify(account));
        resetAlerte();

        console.log(account.role);

        if(account.role == "admin"){
            window.location.href = "/admin_page";
        }else{
            router.push("/user_page");
        }
    }catch (error){
        afficherAlerte();
    }

}
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>
