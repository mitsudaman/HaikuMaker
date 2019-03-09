<template>
  <b-container class="px-md-5">
    <h1 class="text-center mt-3 h2">
        <i class="fas fa-pencil-alt awesome-green"></i> 俳句をつくる
    </h1>
    <div>
      <p class="font-weight-bold">ここで一句・・・</p>
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
            x="8%"
            y="30%"
            fill="#000000"
            font-family="HiraginoSans-W5, Hiragino Sans"
            font-size="100px"
            letter-spacing="0px"
            stroke-width="2.8"
            word-spacing="0px"
            style="line-height:1.25"
            xml:space="preserve"
          >
            <tspan>{{haiku1}}</tspan>
          </text>

          <text
            x="50%" 
            y="52%" 
            fill="#000000"
            font-family="HiraginoSans-W5, Hiragino Sans"
            font-size="100px"
            letter-spacing="0px"
            stroke-width="2.8"
            word-spacing="0px"
            style="line-height:1.25"
            xml:space="preserve"
            text-anchor="middle"
          >
            <tspan>{{haiku2}}</tspan>
          </text>
          <text
            x="90%" 
            y="74%" 
            fill="#000000"
            font-family="HiraginoSans-W5, Hiragino Sans"
            font-size="100px"
            letter-spacing="0px"
            stroke-width="2.8"
            word-spacing="0px"
            style="line-height:1.25"
            xml:space="preserve"
            text-anchor="end"
          >
            <tspan>{{haiku3}}</tspan>
          </text>
          <text
            x="5%"
            y="90%"
            fill="#2b7bb9"
            font-family="HiraginoSans-W5, Hiragino Sans"
            font-size="50px"
            letter-spacing="0px"
            stroke-width="2.8"
            word-spacing="0px"
            style="line-height:1.25"
            xml:space="preserve"
          >
            <tspan 
            v-if="tags[0]">
            #{{tags[0]}}
            <template
            v-if="tags[1]">#{{tags[1]}}</template>
            <template
            v-if="tags[2]">#{{tags[2]}}</template>
            </tspan>
          </text>
          <text
            x="95%"
            y="90%"
            fill="#000000"
            font-family="HiraginoSans-W5, Hiragino Sans"
            font-size="50px"
            letter-spacing="0px"
            stroke-width="2.8"
            word-spacing="0px"
            style="line-height:1.25"
            xml:space="preserve"
            text-anchor="end"
          >
            <tspan stroke-width="2.8">{{name}}</tspan>
          </text>
        </svg>
      </div>
    </div>
    <div class="mt-4">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="font-weight-bold">上の句</label>
            <input  
              v-model="haiku1"
              class="form-control">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="font-weight-bold">中の句</label>
            <input  
              v-model="haiku2"
              class="form-control">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="font-weight-bold">下の句</label>
            <input  
              v-model="haiku3"
              class="form-control">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="form-group">
            <label class="font-weight-bold">タグ</label>
            <span> ※3つまで</span>
            <input-tag
            v-model="tags"
            :limit=3></input-tag> 
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="font-weight-bold">名前</label>
            <input  
              v-model="name"
              class="form-control">
          </div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <b-button 
        :disabled="!createValidFlg || createdFlg"
        @click="create()" 
        class="btn-haiku-create">
        <i 
        v-if="!createLoadFlg"
        class="fas fa-pencil-alt"></i> 
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
        v-bind:href="'https://twitter.com/share?text=俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。&hashtags=俳句メーカー&url=https://www.haiku-maker.site/m/'+ documentId"
        target="_blank" rel="noopener"
        role="button">
        <i class="fab fa-twitter"></i>詠み届ける</a>
    </div>
  </b-container>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore';
import canvg from 'canvg';
import { uuid } from 'vue-uuid';
import InputTag from 'vue-input-tag'

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
    InputTag
  },
  data() {
    return {
      haiku1: '',
      haiku2: '',
      haiku3: '',
      tags:[],
      name: '名無しさん',
      uuid: uuid.v1(),
      documentId: "",
      createLoadFlg: false,
      createdFlg: false
    };
  },
  computed: {
    createValidFlg () { 
      return this.haiku1.length > 0 && this.haiku2.length > 0 && this.haiku3.length > 0
    }
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
        var date = new Date();
        
        db.collection("posts").add({
          haiku1: this.haiku1,
          haiku2: this.haiku2,
          haiku3: this.haiku3,
          name: this.name,
          ogp_full_path: this.uuid,
          read_count: 0,
          tags: this.tags,
          type: 1,
          created_date: date,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.documentId = docRef.id
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
.vue-input-tag-wrapper{
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
.vue-input-tag-wrapper .input-tag {
    background-color: #e8edf1;
    border: none;
    color: #5B87AD;
}
.vue-input-tag-wrapper .input-tag .remove {
    color: #5B87AD;
}
</style>

