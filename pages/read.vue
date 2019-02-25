<template>
  <b-container class="px-md-5">
    <h2 class="text-center mt-3 h2">
        <i class="fas fa-star awsome-blue"></i> tag
    </h2>
    <div 
      id="svg_demo" 
      class="text-center border rounded border-dark mt-3 ">
      <svg
        version="1.1"
        viewBox="0 0 1200 630"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        ref="svgCard"
      >
        <metadata>
          <rdf:RDF>
            <cc:Work rdf:about>
              <dc:format>image/svg+xml</dc:format>
              <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type>
              <dc:title></dc:title>
            </cc:Work>
          </rdf:RDF>
        </metadata>
        <g transform="matrix(1.0065 0 0 1.0174 -2.1136 332.78)">
          <rect
            x="24.335"
            y="-306.15"
            width="1157.5"
            height="582.69"
            fill="#fff"
            stroke="#72cd0f"
            stroke-width="44.234"
          ></rect>
        </g>
        <text
          transform="scale(.74407 1.344)"
          x="124"
          y="128"
          fill="#000000"
          font-family="HiraginoSans-W5, Hiragino Sans"
          font-size="100px"
          letter-spacing="0px"
          stroke-width="2.8"
          word-spacing="0px"
          style="line-height:1.25"
          xml:space="preserve"
        >
          <tspan x="120" y="150" stroke-width="2.8">{{post.haiku1}}</tspan>
          <tspan x="400" y="280" stroke-width="2.8">{{post.haiku2}}</tspan>
          <tspan x="850" y="410" stroke-width="2.8">{{post.haiku3}}</tspan>
        </text>
      </svg>
    </div>
    <div 
    class="mt-5">
      <a 
        class="btn btn-block animationBtn btn-tw p-2" 
        v-bind:href="'https://twitter.com/share?text=俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。&hashtags=俳句メーカー&url=https://www.haiku-maker.site/m/'+ documentId"
        target="_blank"
        role="button">
        <i class="fab fa-twitter"></i>詠み届ける</a>
    </div>
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
      post: {},
      haikuData: [],
      documentId: '',
      lastVisible: null
    };
  },
  
  created: function () {
    var docRef = db.collection("posts").doc(this.$route.query.d);

    // ドキュメント取得
    docRef.get().then(doc => {
        if (doc.exists) {
          this.post = doc.data();
          // ドキュメント更新
          docRef.update({
              "read_count": this.post.read_count+1,
          })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

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

