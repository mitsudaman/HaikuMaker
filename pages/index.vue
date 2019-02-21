<template>
  <b-container class="px-md-5">
    <div 
    class="card text-center font-weight-bold h1">
      <div class="card-body">
        <h5 class="card-title text-primary">＜今日の一句＞</h5>
        <p class="">飲み会の</p>
        <p>乾杯直後に</p>
        <p>バグで帰社</p>
      </div>
    </div>
  </b-container>
</template>

<script>
import firebase from 'firebase'
import canvg from 'canvg';
import { uuid } from 'vue-uuid';

// Webコンソールから取得したコンフィグをペースト
var config = {
    apiKey: process.env.NUXT_ENV_APIKEY,
    authDomain: process.env.NUXT_ENV_AUTH_DOMAIN,
    databaseURL: process.env.NUXT_ENV_DATABASE_URL,
    projectId: process.env.NUXT_ENV_PROJECT_ID,
    storageBucket: process.env.NUXT_ENV_STORAGE_BUCKET,
    messagingSenderId: process.env.NUXT_ENV_MEAAAGING_SENDER_ID
  };
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
var db = firebase.firestore();

export default {
  components: {
  },
  data() {
    return {
      haiku1: 'あいうえお',
      haiku2: 'かきくけこかこ',
      haiku3: 'さしすせそ',
    };
  },
  methods: {
    create() {
    }
  }
};
</script>

<style>
</style>

