<template>
  <b-container class="px-md-5">
    <h1 class="text-center mt-3 h2">
        <i class="fas fa-pray awesome-darkgoldenrod"></i> {{$route.query.t}} Special Thanks
    </h1>
    <div 
      class="card mt-3">
      <div class="card-body">
        <div 
        v-for="row in thankData"
        v-bind:key="row.id"
        class="row">
          <div class="col-12">
            <a 
            :href="'https://twitter.com/' + row.user_link"
            target="_blank" 
            rel="noopener">{{row.user}}さん</a></div>
          <div class="col-12  mb-2">
            {{row.thank_text}}
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            個人開発ギルドの皆さん</div>
          <div class="col-12  mb-2">
            いつもモチベーションもらってます！ほんとありがとうございます！おかげでリリースできました！！😭これからもよろしくお願いします！！
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            フォロワーの皆さん</div>
          <div class="col-12  mb-2">
            俳句メーカーに関わらず、いつもイイねやコメントありがとうございます！開発の力💪になってます！これからもよろしくぅ！！
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

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
      thankData: [],
    };
  },
  
  created: function () {
      return this.getthanks();
  },
  methods: {
    getthanks() {
      var dbCollection = db.collection("thank")

      dbCollection = dbCollection
        .orderBy("sort","asc")

      console.log(dbCollection)

      return dbCollection.get().then((querySnapshot) =>{
          querySnapshot.forEach((doc) =>{
              this.thankData.push(doc.data())
          });
      });
    }
  }
};
</script>

<style>
</style>

