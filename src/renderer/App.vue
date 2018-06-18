<template>
  <v-app id="app" dark>
    <main>
      <v-container id="wrapping" fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>

export default {
  name: "electrofile"
};
</script>

<style lang="stylus">
/* CSS */
@import './stylus/main';

body {
  font-family: 'Ubuntu', 'Source Sans Pro', sans-serif;
}
</style>
