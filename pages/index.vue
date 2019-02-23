<template>
  <b-container class="px-md-5">
    <h1 class="text-center mt-3 h2">
        <i class="fas fa-star awsome-blue"></i> 新着の一句
    </h1>
    <div 
      v-for="row in haikuData"
      v-bind:key="row.id"
      class="card text-center font-weight-bold h3 mt-3">
      <div class="card-body">
        <p class="">{{row.haiku1}}</p>
        <p>{{row.haiku2}}</p>
        <p>{{row.haiku3}}</p>
      </div>
    </div>
    <div class="text-right">
      <b-button 
        @click="pageNext()" 
        class="btn-haiku-create">もっとみる</b-button>
    </div>
  </b-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
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
      haikuData: [],
      lastVisible: null
    };
  },
  
  created: function () {
      var first = db.collection("posts")
        .orderBy("created_date")
        .limit(2);
      return this.getNewPosts(first);
  },
  methods: {
    pageNext() {
      var next = db.collection("posts")
          .orderBy("created_date")
          .startAfter(this.lastVisible)
          .limit(2);
      this.getNewPosts(next)
    },
    getNewPosts(dbCollection) {
      return dbCollection.get().then((querySnapshot) =>{
          querySnapshot.forEach((doc) =>{
              this.haikuData.push(doc.data())
          });
          // Get the last visible document
          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
      });
    }
  }
};
</script>

<style>
</style>

