<template>
  <b-container class="px-md-5">
    <h1 class="text-center mt-3 h2">
        <i class="fas fa-paint-brush awesome-green"></i> 俳句メーカー
    </h1>
    <div class="text-center">
      <img src="~/assets/img/top_image.png" class="top"/>
    </div>

    <h2 class="text-center mt-4 h3">
        <i class="fas fa-newspaper awesome-blue"></i>お知らせ
    </h2>
    <div class="card mt-3">
      <div class="card-body">
        <div class="row">
          <!-- <div class="col-md-2">
            2019/03/18
          </div> -->
          <div class="col-md-12 h5 text-center">
             <a href="/create?t=ブラック企業川柳">ブラック企業での悲しい体験や辛い経験を大募集！！！ </a>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-md-2">
            2019/02/28
          </div>
          <div class="col-md-10 h5">
            俳句メーカーをリリースしました！
          </div>
        </div> -->
      </div>
    </div>
    
    <h2 class="text-center mt-5 h3">
        <i class="fas fa-crown awesome-darkgoldenrod"></i>ランキング
    </h2>
    <div 
      v-for="row in haikuData"
      v-bind:key="row.id"
      class="card mt-3">
      <div class="card-body haiku-card">
        <div class="row no-gutters">
          <div class="col-9 col-md-10 pl-md-4 font-weight-bold h3">
            {{row.data.haiku1}}</div>
          <div class="col-3  no-gutters col-md-2 text-right">
            <a :href="'https://twitter.com/share?text=俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。&amp;hashtags=俳句メーカー,' + (row.data.tags).join(',') + '&amp;url=https://www.haiku-maker.site/m/' + row.documentId" target="_blank" rel="noopener" role="button" class="btn btn-block btn-tw p-1 p-md-2"><i class="fab fa-twitter"></i>シェア</a>
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
          <div class="col-9 col-md-6 font-weight-bold h3">
            {{row.data.haiku3}}
          </div>
          <div class="col-3 col-md-2 pr-2 pt-3 text-right">
             <a :href="'/read/?d=' + row.documentId ">>>詳細</a>
          </div>
        </div>
        <div 
        v-if="row.data.tags"
        class="row no-gutters">
          <div class="col-9 pl-md-4">
            <a 
            v-if="row.data.tags[0]"
            :href="'/ranking/?t=' + row.data.tags[0]">#{{row.data.tags[0]}}</a>
            <a 
            v-if="row.data.tags[1]"
            :href="'/ranking/?t=' + row.data.tags[1]">#{{row.data.tags[1]}}</a>
            <a 
            v-if="row.data.tags[2]"
            :href="'/ranking/?t=' + row.data.tags[2]">#{{row.data.tags[2]}}</a>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-center mt-4 h3">
        <i class="fas fa-users awesome-yellow"></i>人気のタグ一覧
    </h2>
    <div class="card p-3 mt-3">
      <div class="tag-container">
        <a 
          class="tag-content"
          :href="'/ranking/?t=IT川柳'">
          IT川柳
        </a>
        <a class="tag-content"
          :href="'/ranking/?t=ブラック企業川柳'">
          ブラック企業川柳
        </a>
      </div>
    </div>
  </b-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import canvg from 'canvg';

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
      return this.getRankPosts(true);
  },
  methods: {
    pageNext() {
      this.getRankPosts(false)
    },
    getRankPosts(firstFlg) {
      var dbCollection = db.collection("posts")
      // tag 有りの場合
      if(this.$route.query.t != null){
        dbCollection = dbCollection.where("tags","array-contains",this.$route.query.t)
      }

      dbCollection = dbCollection
        .orderBy("read_count","desc")
        .limit(10);

      // もっと詠む 時
      if(!firstFlg){
        dbCollection = dbCollection.startAfter(this.lastVisible);
      }

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

img.top {
width: 100%;
height: 100%;
}

.tag-container {
    display: inline-flex;
    flex-wrap: wrap;
}
.tag-container .tag-content {
    background-color: #eee;
    border: 1px solid #999;
    border-radius: 4px;
    color: #444;
    font-size: 18px;
    margin: 4px;
    padding: 4px 10px;
}
</style>

