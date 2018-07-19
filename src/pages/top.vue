<template>
  <div>
    <h2>Top page</h2>
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
};
</script>
<style scoped>

</style>
