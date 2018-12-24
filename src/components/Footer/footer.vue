<template>
  <div id="allFooter">
    <footer>
      <small>
        &copy;copyright 2018 &#124; All Rights Reserved
        <address>xoxhaan &#60;xoxhaan@gmail.com&#62;</address>
      </small>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'allFooter'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#allFooter {
  width: 100%;
  height: 6.25rem; /* 100px */
  background-color: #e5e5e5;
  text-align: center;
  color: #878787;
}
footer {
  padding-top: 1.875rem; /* 30px */
}
address {
  padding-top: 0.8125rem; /* 13px */
}
@media screen and (max-width: 414px) {
  #allFooter {
    height: 3.75rem; /* 60px */
    font-size: 0.625rem; /* 10px */
  }
  footer {
    padding-top: 1.0625rem; /* 17px */
  }
  address {
    padding-top: 0.3125rem; /* 5px */
  }
}
</style>
