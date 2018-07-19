<template>
  <div class="g-content">
    <h2 class="title">Welcome to Vue world</h2>
    <router-link to="/">Top</router-link>
    <router-link to="/about">About</router-link>
    <p>RouterView↓↓↓</p>
    <router-view></router-view>
  </div>
</template>
<script>

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
