<template>
  <v-app id="app" dark>
    <main>
      <v-container id="wrapping" fluid>
        <router-view></router-view>
      </v-container>
      <v-btn fixed dark fab bottom right color='pink'> <v-icon>add</v-icon></v-btn>
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
