<template>
  <b-container class="px-md-5">
    <h1 class="text-center mt-3 h2">
        <i class="fas fa-paint-brush awsome-green"></i> 俳句メーカー
    </h1>
    <div 
      v-for="row in haikuData"
      v-bind:key="row.id"
      class="card mt-3">
      <div class="card-body haiku-card">
        <div class="row no-gutters">
          <div class="col-9 col-md-10 pl-md-4 font-weight-bold h3">
            {{row.data.haiku1}}
            {{row.data.read_count}}</div>
          <div class="col-3  no-gutters col-md-2 text-right">
            <a :href="'https://twitter.com/share?text=俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。&amp;hashtags=俳句メーカー&amp;url=https://www.haiku-maker.site/m/' + row.documentId" target="_blank" role="button" class="btn btn-block btn-tw p-1 p-md-2"><i class="fab fa-twitter"></i>シェア</a>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-2">
          </div>
          <div class="col-md-10 font-weight-bold h3">
            {{row.data.haiku2}}
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-0 col-md-4">
          </div>
          <div class="col-8 col-md-6 font-weight-bold h3">
            {{row.data.haiku3}}
          </div>
          <div class="col-4 col-md-2 pr-2 pt-3 text-right">
             <a :href="'/read/?d=' + row.documentId ">>>詳細</a>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right mt-3">
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
      haikuData: [],
      lastVisible: null
    };
  },
  
  created: function () {
      var date = new Date();
      var six_days_ago = new Date(date.getFullYear(), date.getMonth(), date.getDate()-6, 0, 0);
      var first = db.collection("posts")
        .where("created_date",">",six_days_ago)
        .orderBy("created_date","desc")
        .limit(10);
      return this.getNewPosts(first);
  },
  methods: {
    pageNext() {
      var next = db.collection("posts")
          .orderBy("created_date","desc")
          .startAfter(this.lastVisible)
          .limit(2);
      this.getNewPosts(next)
    },
    getNewPosts(dbCollection) {
      return dbCollection.get().then((querySnapshot) =>{
          querySnapshot.forEach((doc) =>{
              this.haikuData.push({
                  documentId: doc.id,
                  data: doc.data()
                })
          });
          // Get the last visible document
          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
      });
    }
  }
};
</script>

<style>
.haiku-card {
  /* background-color:yellowgreen; */
}
</style>

