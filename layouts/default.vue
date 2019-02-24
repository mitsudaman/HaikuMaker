<template>
  <div>
    <header>
      <div>
        <b-navbar toggleable="sm" type="light" variant="light"  class="px-md-5">
          <b-navbar-brand href="/">
            <i class="fas fa-paint-brush awsome-green"></i>俳句メーカー
          </b-navbar-brand>

          <b-navbar-toggle target="nav_collapse" />

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item href="#" class="mx-md-1">
                <i class="fas fa-star awsome-blue"></i> 新着の一句
              </b-nav-item>
              <b-nav-item href="#" class="mx-md-1">
                <i class="far fa-calendar-alt awsome-orange"></i> 今週の一句
              </b-nav-item>
              <b-nav-item href="#" class="mx-md-1">
                <i class="fas fa-crown awsome-darkgoldenrod"></i> 累計の一句
              </b-nav-item>
              <b-nav-item href="/create" class="mx-md-1">
                <i class="fas fa-paint-brush awsome-green"></i> 俳句をつくる
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </header>
    <nuxt/>
    <footer class="text-center mt-5 mt-lg-4 px-5">
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
          target="_blank">@mitudama</a> Copyright ©2019 All rights reserved.
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
  /* background-color:whitesmoke; */
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
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

.awsome-green {color: green}
.awsome-blue {color: deepskyblue}
.awsome-orange {color:orange}
.awsome-darkgoldenrod {color:darkgoldenrod}
.awsome-black {color: black}
</style>

