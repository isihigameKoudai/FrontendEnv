# FrontEndEnv vue-starter

## 概要

FrontEndEnv の master の内容をベースに Vue+Vuex+Vue-router が動くスターターキットになります。
ディレクトリ構成は Atomic Design を参考に作っています。

## 使用方法

git clone したらディレクトリ内で以下のコマンドを打つと使えます。

```
yarn install
yarn start
```

## 環境構築

### FrontEndEnv のクローン

FrontEndEnv を元にして Vue.js の環境を作って行きます。
git clone した直後は作業ディレクトリ名が「FrontEndEnv」になっていますので、任意で名前を変更して構いません。

```
git clone git@github.com:isihigameKoudai/FrontEndEnv.git
cd FrontEndEnv
```

### パッケージの準備

vue と vuex を動かす為にパッケージを導入します。

```
yarn add vue vuex vue-router
```

### webpack/base.config.js の編集

vue-loader の v15 から plugins の設定が必要になります。  
`const VueLoaderPlugin = require('vue-loader/lib/plugin')`
で取り込み、  
`plugins: [new VueLoaderPlugin()]`を追加します。

modules の rules に以下の内容を記述

```
{
  test: /\.vue$/,
  loader: 'vue-loader',
},
{
  test: /\.(css)$/,
  use: ['vue-style-loader', 'css-loader']
},
{
  test: /\.(scss|sass)$/,
  use: ['vue-style-loader', 'css-loader', 'sass-loader']
},
```

拡張子の名前解決するため、resolve の extensions に vue を追加する

```
[".js", ".vue"]
```

### 各ファイルの準備

FrontEndEnv/src/index.js と FrontEndEnv/src/App.vue を準備します。
もともとある foo.js は使わないので削除して構いません。

App.vue

```
<template>
  <div class="g-content">
    <h1>{{title}}</h1>
    <input
      type="text"
      v-model="message"
    />
    <p>input message=> {{message}}</p>
    <input
      type="button"
      value="DEVELOP"
      @click="commitModeToDev"
    />
    <input
      type="button"
      value="PRODUCT"
      @click="commitModeToPro"
    />
    <p>mode=>{{mode}}</p>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  data() {
    return {
      title: 'Welcome to Vue world',
      message:''
    }
  },
  computed: mapState(["mode"]),
  methods: mapMutations(["commitModeToDev","commitModeToPro"])
}
</script>
<style lang="scss" scoped>
.g-content {
  background-color: #eee;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
```

vue ファイルの中は template,script,style の三部構成になており template 内では html や css がそのまま記述できます。
style は lang を指定することで sass/scss,less などを使うことも出来ます。また、scoped を指定するとグローバル汚染しない css を書くことも可能です。

index.js

```
import 'babel-polyfill';

import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';
import store from './store';
import route from './route';

Vue.use(Vuex);

new Vue({
  el:'#app',
  store: store,
  router: route,
  render: h => h(App)
});

```

vue コンポーネントの取り込みと vuex との結合を行います。

store/index.js の追加
vuex の中核となる store のファイルを記述します。

```
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  mode: ''
};

//Mutaions is synchronous only methods to change state values.
const mutations = {
  commitModeToDev(state,payload) {
    state.mode = 'devlopment';
  },
  commitModeToPro(state,payload) {
    state.mode = 'production';
  }
};

//Actions is methods includes asynchronous processes.
//and commit mutations.
const actions = {
  getSomething({commit},payload) {
    const num1 = 1;
    const num = 2;
  },
  updateModeDev({commit},payload) {
    commit('commitModeToDev',payload);
  },
  updateModePro({commit},payload) {
    commit('commitModeToPro',payload);
  }
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
});
```

### 起動

次のコマンドでブラウザ上でhttp://localhost:8080/ にアクセスしてみて、「Welcome to Vue world」などが出れば OK。

```
yarn start
```

### おまけ(Vue-Router)

vue 内で様々なリソースに URL を割り当てることで、直接そのリソースにアクセス出来るよう Vue-Router を設定します。  
あらかじめ pages ディレクトリに各ページのコンポーネントファイルを置いておきます。今回の場合だと「../pages/top」「../pages/about」が該当します。

route/index.js

```
import VueRouter from 'vue-router';
import Top from '../pages/top';
import About from '../pages/about';

const routes = [
  {
    path: '/',
    component: Top
  },
  {
    path: '/about',
    component: About
  },
];

export default new VueRouter({
  routes,
});
```

App.js
ルートの template でルーティングのアクセスとそれに伴うビューの表示を行います。  
router-link がアクセスする部分で、router-view が route/index.js に紐づけられたコンポーネントを表示する部分です。

```
<template>
  <div class="g-content">
    <h2 class="title">Welcome to Vue world</h2>
    <router-link to="/">Top</router-link>
    <router-link to="/about">About</router-link>
    <p>RouterView↓↓↓</p>
    <router-view></router-view>
  </div>
</template>
```

index.js
インデックスファイルに以下の記述を追記します。

```
import VueRouter from 'vue-router';
import route from './route';

Vue.use(VueRouter);
### 参考 URL

https://github.com/masakitm/vue-nocli
https://github.com/nabepon/frontend/tree/env-setup-tutorial
https://ics.media/entry/12140
https://www.kken.io/posts/prettier-eslint/

new Vue({
  el:'#app',
  store: store,
  router: route,
  render: h => h(App)
});

```

### 起動

この状態で、「yarn start」で起動すると「/」に該当するコンポーネントが表示されます。
