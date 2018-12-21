<template>
  <div id="indexForm">
    <all-header></all-header>
    <router-view class="contentWrap"></router-view>
    <all-footer></all-footer>
  </div>
</template>

<script>
import header from '@/components/Header/header.vue'
import footer from '@/components/Footer/footer.vue'

export default {
  name: 'indexForm',
  components: {
    'allHeader': header,
    'allFooter': footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.contentWrap {
  /* 바닥글의 높이에 -값은 컨텐츠 마진을 더한 값을 지정 */
  min-height: calc(100vh - 6.25rem);
  /* vh : 요소는 높이값의 100분의 1의 단위입니다.
          예를 들어 브라우저 높이값이 900px일때 1vh는 9px이라는 뜻
          요소의 높이값 - 100px */
}
@media screen and (max-width: 414px) {
  .contentWrap {
    min-height: calc(100vh - 3.75rem);
  }
}
</style>
