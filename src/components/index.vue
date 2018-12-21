<template>
  <div id="firstMain">
    <h1 class="logo"><p>VUE</p><div class="logoCenterLine"></div><p>BOARD PROJECT</p></h1>
    <nav class="nav">
      <ul>
        <li v-if="loggedIn"><router-link to='/login'>LOGIN</router-link></li>
        <li><router-link to='/board/list'>BOARD</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'firstMain',
  data () {
    return {
      loggedIn: true
    }
  },
  created () {
    let uidCookie = this.$cookie.get('uid')
    if (uidCookie) {
      this.loggedIn = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#firstMain {
  text-align: center;
}

/* logo */
/* 싸이즈 기준: 32px (h1이 2em임. 그래서 32px)*/
.logo{
  padding: 6.25rem 0; /* 200px  0 */
  font-family: gotham_Black;
  font-size: 3.125rem;
  color: #e75735;
}
.logo p:first-child {
  font-family: gotham_Book;
  font-size: 1.875rem; /* 60px */
  margin-bottom: 1.875rem; /* 60px */
}
.logoCenterLine {
  margin: 0 auto;
  width: 0.9375rem; /* 30px */
  height: 0.3125rem; /* 10px */
  background-color: #e75735;
}
.logo p:last-child {
  margin-top: 1.875rem; /* 60px */
}

/* nav */
/* 싸이즈 기준: 32px */
.nav ul li {
  margin-bottom: 0.625rem; /* 20px */
  font-family: gotham_Medium;
  color: #fff;
  letter-spacing: 0.25rem; /* 8px */
}
.nav ul li a {
  margin: 0 auto;
  display: block;
  width: 16.0625rem; /* 257px  border: 2px */
  padding: 1.1875rem 0; /* 38px 0  border: 2px */
  border: 0.125rem solid #4db7a9; /* 2px */
  border-radius: 3.125rem; /* 싸이즈 기준: 16px */
  background-color: #4db7a9;
  box-shadow: 0 0.21875rem #1b9682; /* 7px */
}
.nav ul li a:hover {
  color: #4db7a9;
  background-color: #fff;
  box-shadow: 0 0.21875rem #4db7a9; /* 7px */
}
@media screen and (max-width: 414px) {
  /* 싸이즈 기준: 16px */
  .logo{
    padding: 6.875rem 0 5.3125rem 0; /* 110px 0 85px 0 */
    font-size: 3.75rem; /* 60px */
  }
  .logo p:first-child {
    font-size: 2.5rem; /* 40px */
    margin-bottom: 2.8125rem; /* 45px */
  }
  .logoCenterLine {
    width: 1.375rem; /* 22px */
    height: 0.4375rem; /* 7px */
  }
  .logo p:last-child {
    margin-top: 3.1875rem; /* 51px */
  }
  /* 싸이즈 기준: 16px */
  .nav {
    padding-bottom: 6.875rem; /* 110px */
  }
  .nav ul li {
    margin-bottom: 0.625rem; /* 10px */
  }
  .nav ul li a {
    margin: 0 auto;
    display: block;
    width: 16.8125rem; /* 296px  border: 2px */
    padding: 1.59375rem 0; /* 25.5px 0  border: 2px */
    font-size: 1.4375rem; /* 23px */
  }
}
</style>
