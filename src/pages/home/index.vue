<template>
  <div class="home">is home</div>
</template>

<script setup lang="ts">
import { useBaseCodeStore } from '@/store/baseCode.ts'

const baseCodeStore = useBaseCodeStore()

onMounted(() => {
  baseCodeStore.setInitBaseCode()
})
</script>

<style lang="scss" scoped>
.home {
  font-size: $font-size-normal;
}
</style>

<route>
{
  meta: {
    layout: 'footers',
  }
}
</route>
