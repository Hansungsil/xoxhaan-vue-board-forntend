<template>
  <div id="allHeader">
    <transition name="subLogoShow" appear>
      <p>BOARD&nbsp;<span>PROJECT</span></p>
    </transition>
    <div v-if="loggedIn" class="loginWrap">
      <span class="userName">{{ userName }}</span>
      <button @click.prevent="logout" class="loginBtn"><router-link to="/logout">LOGOUT</router-link></button>
    </div>
    <div v-if="!loggedIn" v-show="loginNull" class="loginWrap">
      <button class="loginBtn"><router-link to='/login'>LOGIN</router-link></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'allHeader',
  data () {
    return {
      loggedIn: false,
      loginNull: false,
      userName: ''
    }
  },
  created () {
    // login.vue
    this.$eventBus.$on('userNameEventBus', userNameLoginCheck => {
      this.userName = userNameLoginCheck
      this.loggedIn = !this.loggedIn
    })
    let boardLoginBtn = this.$router.history.current.path
    if (boardLoginBtn === '/board/list') {
      this.loginNull = true
    }
  },
  watch: {
    '$route': 'loginBtnShow'
  },
  mounted () {
    let userName = this.$cookie.get('userName')
    if (userName !== null) {
      this.loggedIn = !this.loggedIn
      this.userName = userName
    }
  },
  methods: {
    logout () {
      let uid = this.$cookie.get('uid')
      let userName = this.$cookie.get('userName')
      if (uid && userName) {
        this.$cookie.delete('id')
        this.$cookie.delete('uid')
        this.$cookie.delete('userName')
      }
    },
    loginBtnShow () {
      let boardLoginBtn = this.$router.history.current.path
      console.log(boardLoginBtn)
      if (boardLoginBtn === '/board/list') {
        this.loginNull = true
      } else {
        this.loginNull = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#allHeader {
  width: 100%;
  /* 총 height: 150px */
  padding: 3.3125rem 0; /* 53px 0 (p태그에 상, 하 2px 씩 추가됨)*/
  border-bottom: 0.0625rem solid #e5e5e5; /* 1px */
}
#allHeader p {
  text-align: center;
  font-family: gotham_Bold;
  font-size: 2.5rem; /* 40px */
  color: #e75735;
  letter-spacing: 0.3125rem /* 5px */
}
.subLogoShow-enter-active {
  transition: all 1s;
}
.subLogoShow-enter {
  opacity: 0;
  transform: translateY(0.625rem) /* 10px */
}
.loginWrap {
  margin: -2.5625rem 3.125rem 0 auto; /* -41px 50px 0 auto */
  min-width: 56.25rem; /* 900px */
  text-align: right;
  font-size: 0;
}
.userName {
  font-size: 1.125rem; /* 18px */
  color: #878787;
  margin-right: 1.875rem; /* 30px */
}
.loginBtn {
  width: 6.25rem; /* 100px */
  height: 2.5rem; /* 40px */
  border: 0.0625rem solid #4db7a9; /* 1px */
  border-radius: 3.125rem; /* 50px */
  background-color: #fff;
  color: #4db7a9;
  font-family: gotham_Medium;
  font-size: 0.875rem; /* 14px */
  cursor: pointer;
  transition: all .3s ease-out;
}
.loginBtn:hover {
  background-color: #4db7a9;
  color: #fff;
  transition: all .3s ease-out;
}
/* iphone 6/7/8 Plus */
@media screen and (max-width: 414px) {
  #allHeader {
    /* 총 height: 85px */
    padding: 0.3125rem 0 1.5625rem 0; /* 5px 0 20px 0 (p태그에 상, 하 2px 씩 추가됨)*/
  }
  #allHeader p {
    width: 6.9375rem; /* 111px */
    margin: 0.9375rem 0 0 1.25rem; /* 10px 0 0 20px */
    text-align: left;
    overflow: visible;
    font-size: 1.4375rem; /* 23px */
    letter-spacing: 0;
  }
  #allHeader p span{
    display: block;
  }
  .loginWrap {
    margin: -65px 0 1.875rem auto; /* -60px 0 30px auto */
    min-width: 25.875rem; /* 414px */
  }
  .userName {
    font-size: 0.9375rem; /* 15px */
    margin-right: 0.625rem; /* 10px */
  }
  .loginBtn {
    width: 5rem; /* 80px */
    height: 1.875rem; /* 30px */
    font-family: gotham_Bold;
    font-size: 0.75rem; /* 12px */
    margin-right: 0.3125rem; /* 5px */
  }
}
/* iphone 6/7/8 */
@media screen and (max-width: 375px) {
  .loginWrap {
    min-width: 23.4375rem; /* 375px */
  }
}
/* iphone 5/SE */
@media screen and (max-width: 320px) {
  .loginWrap {
    min-width: 20rem; /* 320px */
  }
}
</style>
