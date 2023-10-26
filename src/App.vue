<template>
  <section>
    <header />
    <main>
      <TheNavBar />
      <router-view />
    </main>
  </section>
</template>
<script setup>
import TheNavBar from '@components/TheNavBar.vue';

</script>
<style>
html {
  overflow: hidden;
}
</style>
