<template>
  <div id="firstMain">
    <transition name="logoShow" appear>
      <h1 class="logo"><p>VUE</p><div class="logoCenterLine"></div><p>BOARD PROJECT</p></h1>
    </transition>
    <nav class="nav">
      <ul>
        <transition name="loginBtnShow" appear>
          <li v-if="loggedIn">
            <router-link to='/login' @mouseover="loginBtnOver">LOGIN</router-link>
          </li>
        </transition>
        <transition name="boardBtnShow" appear>
          <li>
            <router-link to='/board/list'>BOARD</router-link>
          </li>
        </transition>
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
  },
  methods: {
    loginBtnOver () {
      this.loginBtnToggle = 'loginBtnToggle'
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
  padding: 8% 0 7% 0;
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
  letter-spacing: 0.25rem; /* 8px */
}
.nav ul li a {
  margin: 0 auto;
  display: block;
  width: 16.0625rem; /* 257px  border: 2px */
  padding: 1.1875rem 0; /* 38px 0  border: 2px */
  border: 0.125rem solid #4db7a9; /* 2px */
  border-radius: 3.125rem; /* 싸이즈 기준: 16px */
  color: #fff;
  background-color: #4db7a9;
  box-shadow: 0 0.21875rem #1b9682; /* 7px */
  transition: all .3s ease-out;
}
.nav ul li a:hover {
  color: #4db7a9;
  background-color: #fff;
  box-shadow: 0 0.21875rem #4db7a9; /* 7px */
  transition: all .3s ease-out;
}
/* transitions */
.logoShow-enter-active {
  transition: all 1s;
}
.logoShow-enter {
  opacity: 0;
  transform: translateY(1.875rem); /* 30px */
}
.loginBtnShow-enter-active {
  transition: all 1s ease 1s;
}
.loginBtnShow-enter {
  opacity: 0;
  transform: translateY(1.875rem); /* 30px */
}
.boardBtnShow-enter-active {
  transition: all 1s ease 1.5s;
}
.boardBtnShow-enter {
  opacity: 0;
  transform: translateY(1.875rem); /* 30px */
}
/* iphone 6/7/8 Plus */
@media screen and (max-width: 414px) {
  #firstMain {
    padding-bottom: 3.125rem; /* 50px*/
  }
  /* 싸이즈 기준: 16px */
  .logo{
    padding: 3.125rem 0 4.375rem 0; /* 50px 0 70px 0 */
    font-size: 3.125rem; /* 50px */
  }
  .logo p:first-child {
    font-size: 1.875rem; /* 30px */
    margin-bottom: 1.875rem; /* 30px */
  }
  .logoCenterLine {
    width: 1.375rem; /* 22px */
    height: 0.4375rem; /* 7px */
  }
  .logo p:last-child {
    margin-top: 1.875rem; /* 30px */
  }
  /* 싸이즈 기준: 16px */
  .nav {
    padding-bottom: 0;
  }
  .nav ul li a {
    margin: 0 auto;
    display: block;
    width: 16.8125rem; /* 296px  border: 2px */
    padding: 1.59375rem 0; /* 25.5px 0  border: 2px */
    font-size: 1.4375rem; /* 23px */
  }
}
/* iphone 6/7/8 */
@media screen and (max-width: 375px) {
  #firstMain {
    padding-bottom: 3.125rem; /* 50px */
  }
  .logo{
    padding: 4.0625rem 0 4.375rem 0; /* 65px 0 70px 0 */
    font-size: 3.125rem; /* 50px */
  }
  .logo p:first-child {
    font-size: 1.875rem; /* 30px */
  }
  .logoCenterLine {
    height: 0.3125rem; /* 5px */
  }
  .nav ul li a {
    width: 15.375rem; /* 246px  border: 2px */
    padding: 1.25rem 0; /* 20px 0  border: 2px */
    font-size: 1.25rem; /* 20px */
  }
}
/* iphone 5/SE */
@media screen and (max-width: 320px) {
  #firstMain {
    padding-bottom: 3.125rem; /* 50px*/
  }
  .logo{
    padding: 4.375rem 0 3.75rem 0; /* 70px 0 60px 0 */
    font-size: 2.8125rem; /* 45px */
  }
  .logo p:first-child {
    font-size: 1.875rem; /* 30px */
    margin-bottom: 2.1875rem; /* 35px */
  }
  .logoCenterLine {
    height: 0.25rem; /* 4px */
  }
  .logo p:last-child {
    margin-top: 2.1875rem; /* 35px */
  }
  .nav ul li a {
    width: 12.25rem; /* 196px  border: 2px */
    padding: 1.125rem 0; /* 18px 0  border: 2px */
    font-size: 1.125rem; /* 18px */
  }
}
</style>
