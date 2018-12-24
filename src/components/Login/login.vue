<template>
  <div id="login">
    <transition name="subTitleShow" appear>
      <p class="subTitle">SIGN IN</p>
    </transition>
    <form @submit.prevent="login" action="post" class="loginForm">
      <transition name="keyupShow" appear>
        <label for="id">
          <font-awesome-icon :icon="['far', 'envelope']" class="loginIcon"/>
          <input type="text" v-model="id" id="id">
        </label>
      </transition>
      <transition name="keyupShow" appear>
        <label for="pw">
          <font-awesome-icon icon="lock" class="pwIcon"/>
          <input type="password" v-model="pw" id="pw">
        </label>
      </transition>
      <transition name="btnShow" appear>
        <button type="submit" class="loginBtn">LOGIN</button>
      </transition>
      <transition name="btnShow" appear>
        <router-link to='/join' class="joinBtn">JOIN</router-link>
      </transition>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      id: '',
      pw: '',
      userName: ''
    }
  },
  methods: {
    login () {
      let id = document.getElementById('id').value
      let pw = document.getElementById('pw').value
      if (id === '') {
        alert('아이디를 입력해 주세요.')
        return false
      } else if (pw === '') {
        alert('비밀번호를 입력해 주세요.')
        return false
      }
      this.$http.post('/api/login/loginCheck', {
        userid: id,
        userpw: pw
      })
        .then(response => {
          alert(response.data.text)
          let id = response.data.rows.id
          let uid = response.data.rows.uid
          this.userName = response.data.rows.name
          if (this.userName.length >= 1) {
            this.$eventBus.$emit('userNameEventBus', this.userName) // header.vue
            this.id = ''
            this.pw = ''
            // 이렇게하면 이름이 'id'이고 값이 'id'인 쿠키 설정죔. 하루 만료 됨
            this.$cookie.set('id', id, 1)
            this.$cookie.set('uid', uid, 1)
            this.$cookie.set('userName', this.userName, 1)
            this.$router.replace(this.$route.query.redirect || '/board/list')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  text-align: center;
  padding: 9.375rem 0; /* 150px 0 */
}
.subTitle {
  font-family: gotham_Light;
  font-size: 3.75rem; /* 60px */
  color: #6a6a6a;
}
.loginForm {
  margin-top: 5.625rem; /* 90px */
}
.loginForm label {
  margin: 0 auto;
  display: block;
  border: 0.0625rem solid #878787; /* 1px */
  border-radius: 3.125rem; /* 50px */
  width: 31.125rem; /* 498px */
  height: 4.875rem; /* 78px */
}
.loginForm label:nth-child(2) {
  margin-top: 0.625rem; /* 10px */
}
.loginForm label input {
  float: left;
  width: 22.5rem; /* 360px */
  margin: 2rem 0 0 1.25rem; /* 32px 0 0 20px */
}
.loginIcon {
  float: left;
  width: 1.5625rem; /* 25px */
  height: 1.1875rem; /* 19px */
  margin: 1.875rem 0 0 2.5rem; /* 30px 0 0 40px */
  color: #878787;
}
.pwIcon {
  float: left;
  width: 1.1875rem; /* 19px */
  height: 1.4375rem; /* 23px */
  margin: 1.75rem 0 0 2.5rem; /* 28px 0 0 40px */
  color: #878787;
}
.loginBtn {
  margin: 0 auto;
  margin-top: 3.125rem; /* 50px */
  display: block;
  border: 0.125rem solid #4db7a9; /* 2px */
  border-radius: 3.125rem; /* 50px */
  width: 31.25rem; /* 500px */
  height: 5rem; /* 80px */
  background-color: #4db7a9;
  color: #fff;
  font-family: gotham_Bold;
  font-size: 1.25rem; /* 20px */
  cursor: pointer;
  letter-spacing: 0.3125rem; /* 5px */
  transition: all .3s ease-out;
}
.loginBtn:hover {
  background-color: #fff;
  color: #4db7a9;
  transition: all .3s ease-out;
}
.joinBtn {
  margin: 0 auto;
  margin-top: 0.625rem; /* 10px */
  width: 31rem; /* 496px */
  padding: 1.6875rem 0; /* 27px 0 */
  display: block;
  border: 0.125rem solid #4db7a9; /* 2px */
  border-radius: 3.125rem; /* 50px */
  background-color: #4db7a9;
  color: #fff;
  font-family: gotham_Bold;
  font-size: 1.25rem; /* 20px */
  cursor: pointer;
  letter-spacing: 0.3125rem; /* 5px */
  transition: all .3s ease-out;
}
.joinBtn:hover {
  background-color: #fff;
  color: #4db7a9;
  transition: all .3s ease-out;
}
/* transitions */
.subTitleShow-enter-active {
  transition: all 1s;
}
.subTitleShow-enter {
  opacity: 0;
  transform: translateY(0.625rem) /* 10px */
}
.keyupShow-enter-active {
  transition: all 1s linear .5s;
}
.keyupShow-enter {
  opacity: 0;
  transform: translateY(0.625rem) /* 10px */
}
.btnShow-enter-active {
  transition: all 1s linear 1s;
}
.btnShow-enter {
  opacity: 0;
  transform: translateY(1.25rem) /* 20px */
}
/* iphone 6/7/8 Plus */
@media screen and (max-width: 414px) {
  #login {
    padding: 2.5rem 0 0 0; /* 40px 0 0 0 */
  }
  .subTitle {
    font-size: 2.1875rem; /* 35px */
  }
  .loginForm {
    margin-top: 1.25rem; /* 20px */
  }
  .loginForm label {
    width: 21.875rem; /* 350px */
    height: 4.375rem; /* 70px */
  }
  .loginForm label input {
    width: 13.75rem; /* 220px */
    margin: 1.8125rem 0 0 1.25rem; /* 29px 0 0 20px */
  }
  .loginIcon {
    margin: 1.6875rem 0 0 2.5rem; /* 27px 0 0 40px */
  }
  .pwIcon {
    margin: 1.5rem 0 0 2.5rem; /* 24px 0 0 40px */
  }
  .loginBtn {
    margin-top: 2.5rem; /* 40px */
    width: 21.875rem; /* 350px */
    height: 4.375rem; /* 70px */
    font-size: 1rem; /* 16px */
  }
  .joinBtn {
    width: 21.625rem; /* 346px */
    padding: 1.5rem 0; /* 24px 0 */
    font-size: 1rem; /* 16px */
  }
}
/* iphone 5/SE */
@media screen and (max-width: 320px) {
  .loginForm label {
    width: 18.75rem; /* 300px */
  }
  .loginForm label input {
    width: 10.625rem; /* 170px */
  }
  .loginBtn {
    width: 18.75rem; /* 300px */
  }
  .joinBtn {
    width: 18.5rem; /* 296px */
  }
}
</style>
