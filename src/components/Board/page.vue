<template>
  <div id="listPage">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'listPage'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#listPage {
  margin-top: 7.5rem; /* 120px */
  color: #878787;
  font-size: 1rem; /* 16px */
}
#listPage ul {
  display: table;
  margin: 0 auto;
}
#listPage ul li:first-child{
  margin-right: 0;
}
#listPage ul li:last-child{
  margin-right: 0;
}
#listPage .anglePrev {
  margin: 0 3.75rem 0 0.9375rem; /* 0 60px 0 15px */
}
#listPage .angleNext {
  margin: 0 0.9375rem 0 2.1875rem; /* 0 60px 0 15px */
}
.clickPageNumColor {
  color: #4db7a9;
  font-family: YDIYGO140;
  font-weight: 900;
  font-size: 1.125rem; /* 18px */
  margin-top: -0.16875rem; /* -2.7px */
}
.pageNumList {
  display: block;
  float: left;
  margin-right: 1.5625rem; /* 25px */
}
.angleIcon {
  color: #4db7a9;
}
@media screen and (max-width: 414px) {
  #listPage {
    margin-top: 60px; /* 120px */
    font-size: 15px; /* 16px */
  }
  .clickPageNumColor {
    font-size: 17px; /* 18px */
    margin-top: -3px; /* -2.7px */
  }
}
</style>
