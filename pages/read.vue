<template>
  <b-container class="px-md-5">
    <h2 class="text-center mt-3 h2">
        <i class="fas fa-book awesome-green"></i> 俳句を詠む
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
            font-size="90px"
            letter-spacing="0px"
            stroke-width="2.8"
            word-spacing="0px"
            style="line-height:1.25"
            xml:space="preserve"
          >
            <tspan x="120" y="140" stroke-width="2.8">{{post.haiku1}}</tspan>
            <tspan x="400" y="250" stroke-width="2.8">{{post.haiku2}}</tspan>
            <tspan x="800" y="360" stroke-width="2.8">{{post.haiku3}}</tspan>
          </text>
          <text
            v-if="post.tags"
            transform="scale(.74407 1.344)"
            x="0"
            y="0"
            fill="#2b7bb9"
            font-family="HiraginoSans-W5, Hiragino Sans"
            font-size="40px"
            letter-spacing="0px"
            stroke-width="2.8"
            word-spacing="0px"
            style="line-height:1.25"
            xml:space="preserve"
          >
            <tspan 
            v-if="post.tags[0]"
            x="120" y="420" stroke-width="2.8">
            #{{post.tags[0]}}
            <template
            v-if="post.tags[1]">#{{post.tags[1]}}</template>
            <template
            v-if="post.tags[2]">#{{post.tags[2]}}</template>
            </tspan>
          </text>
          <text
            transform="scale(.74407 1.344)"
            x="1520"
            y="420"
            fill="#000000"
            font-family="HiraginoSans-W5, Hiragino Sans"
            font-size="40px"
            letter-spacing="0px"
            stroke-width="2.8"
            word-spacing="0px"
            style="line-height:1.25"
            xml:space="preserve"
            text-anchor="end"
          >
            <tspan stroke-width="2.8">{{post.name}}</tspan>
          </text>
        </svg>
      </div>
    <div 
    class="mt-5">
      <a 
        class="btn btn-block animationBtn btn-tw p-2" 
        :href="'https://twitter.com/share?text=俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。&hashtags=俳句メーカー,' + tags.join(',') + '&url=https://www.haiku-maker.site/m/'+ this.$route.query.d"
        target="_blank" rel="noopener"
        role="button">
        <i class="fab fa-twitter"></i>詠み届ける</a>
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
      post: {},
      tags: [],
      haikuList: [],
      lastVisible: null
    };
  },
  
  created: function () {
    var docRef = db.collection("posts").doc(this.$route.query.d);

    // ドキュメント取得
    docRef.get().then(doc => {
        if (doc.exists) {
          this.post = doc.data();
          this.tags = this.post.tags
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
  },
  methods: {
  }
};
</script>

<style>
</style>

