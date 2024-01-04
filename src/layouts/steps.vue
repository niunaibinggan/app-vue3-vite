<template>
  <div class="layouts">
    <base-steps />

    <div class="layouts_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layouts {
  positon: relative;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  height: 100%;

  &_content {
    padding: 0 10px;
  }
}
</style>
