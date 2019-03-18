<template>
  <div>
    <header>
      <div>
        <b-navbar toggleable="sm" type="light" variant="light"  class="px-md-5 bg-white">
          <b-navbar-brand href="/">
            <i class="fas fa-paint-brush awesome-green"></i>俳句メーカー
          </b-navbar-brand>

          <b-navbar-toggle target="nav_collapse" />

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class=" text-right">
              <b-nav-item href="/new" class="mx-md-1">
                <i class="fas fa-star awesome-blue"></i> 新着
              </b-nav-item>
              <b-nav-item href="#" class="mx-md-1">
                <i class="fas fa-trophy awesome-orange"></i> コンテスト(準備中)
              </b-nav-item>
              <b-nav-item href="/ranking" class="mx-md-1">
                <i class="fas fa-crown awesome-darkgoldenrod"></i> ランキング
              </b-nav-item>
              <b-nav-item href="/create" class="mx-md-1">
                <i class="fas fa-pencil-alt awesome-green"></i> 俳句をつくる
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </header>
    <nuxt/>
    <footer class="text-center mt-5 mt-lg-4 px-5">
      <div>
        <ul class="footer">
          <li><a href="/">トップページ</a> ｜</li>
          <li><a href="/new">新着</a> ｜</li>
          <li><a href="/ranking">ランキング</a> ｜</li>
          <li><a href="/create">俳句をつくる</a> ｜</li>
          <li><a href="/thanks">Thanks</a></li>
        </ul>
      </div>
      <div>
        開発・運営
        <img 
          src="~/assets/img/mitsudama.png" 
          width="30"
          height="30"
          class="pb-1 border-4"
          alt="mitsudama">
        <a 
          href="https://twitter.com/mitudama" 
          target="_blank" rel="noopener">@mitudama</a> Copyright ©2019 All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  /* background-color:floralwhite; */
  background-color:whitesmoke;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

h1 {
  /* padding-bottom: 10px;
  border-bottom: solid 1px #000000; */
}

.container {
  max-width: 800px;
}

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
ul.footer li {
display: inline;
text-align: center;
}

.bg-white {
  background-color: white;
}

.awesome-green {color: green}
.awesome-red {color: red}
.awesome-blue {color: deepskyblue}
.awesome-yellow {color:gold}
.awesome-orange {color:orange}
.awesome-darkgoldenrod {color:darkgoldenrod}
.awesome-black {color: black}
</style>

