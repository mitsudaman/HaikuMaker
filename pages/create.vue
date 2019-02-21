<template>
  <b-container class="px-md-5">
    <div class="pt-1">
      <p class="mt-3 font-weight-bold">ここで一句・・・</p>
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
            <tspan x="120" y="150" stroke-width="2.8">{{haiku1}}</tspan>
            <tspan x="400" y="280" stroke-width="2.8">{{haiku2}}</tspan>
            <tspan x="850" y="410" stroke-width="2.8">{{haiku3}}</tspan>
          </text>
        </svg>
      </div>
    </div>
    <div class="mt-4 font-weight-bold">
      <b-form-group label="上の句:">
        <b-form-input v-model="haiku1" required></b-form-input>
      </b-form-group>
    </div>
    <div class="mt-2 font-weight-bold">
      <b-form-group label="中の句:">
        <b-form-input v-model="haiku2" required></b-form-input>
      </b-form-group>
    </div>
    <div class="mt-2 font-weight-bold">
      <b-form-group label="下の句:">
        <b-form-input v-model="haiku3" required></b-form-input>
      </b-form-group>
    </div>
    <div class="text-right">
      <b-button 
        @click="create()" 
        class="btn-haiku-create">
        <i 
        v-if="!createLoadFlg"
        class="fas fa-paint-brush"></i> 
        <span
          v-if="createLoadFlg" 
          class="spinner-border spinner-border-sm" 
          role="status" 
          aria-hidden="true"></span>俳句つくる</b-button>
    </div>
    <div 
    v-if="createdFlg"
    class="mt-3">
      <a 
        class="btn btn-block animationBtn btn-tw p-2" 
        v-bind:href="'https://twitter.com/share?text=俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。&hashtags=俳句メーカー&url=https://haikumaker-5d430.firebaseapp.com/m/'+ firebaseFunctionLink"
        target="_blank"
        role="button">
        <i class="fab fa-twitter"></i>詠み届ける</a>
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
      uuid: uuid.v1(),
      firebaseFunctionLink: "",
      createLoadFlg: false,
      createdFlg: false
    };
  },
  methods: {
    create() {
      var storageRef = firebase.storage().ref();
      var createRef = storageRef.child(this.uuid + '.jpg');
      var canvas = document.createElement('canvas')
      var svg = this.$refs.svgCard
      this.createLoadFlg = true;

      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;
      
      const data = new XMLSerializer().serializeToString(this.$refs.svgCard);
      canvg(canvas, data)
      let image = canvas.toDataURL('image/jpeg').split(',')[1]
      createRef.putString(image, 'base64').then((snapshot) =>{
      console.log('Uploaded a blob or file!');
        
        db.collection("posts").add({
          haiku1: this.haiku1,
          haiku2: this.haiku2,
          haiku3: this.haiku3,
          ogp_full_path: this.uuid,
          read_count: 0,
          tag: 1,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.firebaseFunctionLink = docRef.id
            this.createdFlg = true;
            this.createLoadFlg = false;
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            this.createLoadFlg = false;
        });
      });
    }
  }
};
</script>

<style>
.btn-haiku-create {
  color: white;
  background-color: green
}
.btn-tw {
  color: white;
  background-color: #00aced;
}
.animationBtn {
  animation: animScale 4s infinite ease-out;
  transform-origin: 50% 50%;
  animation-play-state:running;
}
@keyframes animScale {
  0% { transform: scale(0.8, 0.8); }
  10% { transform: scale(1.1, 1.1); }
  20% { transform: scale(1, 1); }
  30% { transform: scale(1.1, 1.1); }
  40% { transform: scale(1, 1); }
}
</style>

