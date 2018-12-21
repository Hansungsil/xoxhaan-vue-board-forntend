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
    height: 60px; /* 60px */
    font-size: 10px;
  }
  footer {
    padding-top: 17px; /* 17px */
  }
  address {
    padding-top: 5px; /* 5px */
  }
}
</style>
