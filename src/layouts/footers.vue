<template>
  <div class="layouts">
    <div class="layouts_content" :class="{ 'layouts_content-padding': footerVisible }">
      <router-view></router-view>
    </div>

    <base-footer />

    <base-loading v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/store/message'

const messageStore = useMessageStore()

const { isLoading } = storeToRefs(messageStore)
</script>

<style lang="scss" scoped>
.layouts {
  positon: relative;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  height: 100%;

  &_content {
    background: #fff;
    overflow-x: hidden;
    overflow-y: scroll;

    &-padding {
      padding-bottom: 9vh;
    }
  }
}
</style>
