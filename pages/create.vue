<template>
  <div>{{newHaiku4}}</div>
</template>

<script>
// import AppLogo from "~/components/AppLogo.vue";

export default {
  components: {
    // AppLogo
  },
  data() {
    return {
      newHaiku1: 'あいうえお',
      newHaiku2: 'かきくけこかこ',
      newHaiku3: 'さしすせそ',
      newHaiku4: 'さしすせそ',

    };
  },
  methods: {
    create() {
      console.log(this.newHaiku1)
      // var w = $('.wrapper').width();
      // var h = $('.wrapper').height();
      // $('#haikuCanvas').attr('width', w);
      // $('#haikuCanvas').attr('height', h);

      // var c = document.getElementById("haikuCanvas");
      // var ctx = c.getContext("2d");

      // ctx.font = "25px Georgia";
      // ctx.fillText(this.newHaiku1, 10, 50);
      // ctx.fillText(this.newHaiku2, 90, 90);
      // ctx.fillText(this.newHaiku3, 200, 130);

      //ふち
      // ctx.strokeRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);
    }
  }
};
</script>

<style>
</style>

