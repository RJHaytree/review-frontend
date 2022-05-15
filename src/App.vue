<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&family=Roboto+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');

html, body, .v-main, .v-main__wrap {
  min-height: 100vh !important;
  background-color: #f0f0f0;
  padding: 0;
  margin: 0;
}

.v-main {
  padding: 0px 0px 0px !important;
}
</style>
