<template>
  <div id="join">
    <transition name="subTitleShow" appear>
      <p class="subTitle">CREATE ACCOUNT</p>
    </transition>
    <form method="post" @submit.prevent="signUp" class="joinForm clearfix" >
      <transition name="idKeyupShow" appear>
        <label for="id">
          <font-awesome-icon :icon="['far', 'envelope']" class="emailIcon"/>
          <input type="email" v-model="id" id="id" required @keyup="emailValidate">
        </label>
      </transition>
      <transition name="idKeyupShow" appear>
        <button @click.prevent="userDuplicateCheck" id="idCheck" class="doubleCheck">Email Check</button>
      </transition>
      <output class="validateText" :class="{'idOutputSuccess': idResultSuccess, 'idOutputFail': idResultFail}">
        {{ IDvalidateText }}
      </output>
      <transition name="pwKeyupShow" appear>
        <label for="pw1">
          <font-awesome-icon icon="unlock" class="pwIcon"/>
          <input type="password" v-model="pw1" id="pw1" required @keyup="pw1Validate" minlength="6" maxlength="20">
        </label>
      </transition>
      <output class="validateText" :class="{'pwOutputSuccess': pwResultSuccess, 'pwOutputFail': pwResultFail}">
        {{ PW1validateText }}
      </output>
      <transition name="pwKeyupShow" appear>
        <label for="pw2">
          <font-awesome-icon icon="lock" class="pwIcon"/>
          <input type="password" v-model="pw2" id="pw2" required @keyup="pw2Validate" minlength="6" maxlength="20">
        </label>
      </transition>
      <output class="validateText" :class="{'pwchOutputSuccess': pwchResultSuccess, 'pwchOutputFail': pwchResultFail}">
        {{ PW2validateText }}
      </output>
      <transition name="nameKeyupShow" appear>
        <label for="name">
          <font-awesome-icon icon="user-edit" class="userIcon"/>
          <input type="text" v-model="name" id="name" required @keyup="nameValidate" minlength="2" maxlength="10">
        </label>
      </transition>
      <transition name="nameKeyupShow" appear>
        <button @click.prevent="userDuplicateCheck" id="nameCheck" class="doubleCheck">Name Check</button>
      </transition>
      <output class="validateText" :class="{'nameOutputSuccess': nameResultSuccess, 'nameOutputFail': nameResultFail}">
        {{ NAMEvalidateText }}
      </output>
      <transition name="btnShow" appear>
        <button type="submit" class="signUpBtn">
          SIGN UP
        </button>
      </transition>
      <transition name="btnShow" appear>
        <div class="btnLine"></div>
      </transition>
      <transition name="btnShow" appear>
        <router-link to="/login" class="cancleBtn">
          <font-awesome-icon :icon="['far', 'trash-alt']" class="cancleIcon"/>
          CANCLE
        </router-link>
      </transition>
    </form>
  </div>
</template>

<script>
export default {
  name: 'join',
  data () {
    return {
      id: '',
      pw1: '',
      pw2: '',
      name: '',
      userText: '',
      userColumn: '',
      IDvalidateText: '',
      PW1validateText: '',
      PW2validateText: '',
      NAMEvalidateText: '',
      success: 0,
      IDCheckSuccess: '',
      NAMECheckSuccess: '',
      // output class start
      idResultSuccess: false,
      idResultFail: false,
      pwResultSuccess: false,
      pwResultFail: false,
      pwchResultSuccess: false,
      pwchResultFail: false,
      nameResultSuccess: false,
      nameResultFail: false
      // ===================
    }
  },
  methods: {
    // ID 유효성 검사
    emailValidate () {
      const reg = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/
      let idText = document.getElementById('id').value

      if (reg.test(idText)) {
        this.IDvalidateText = ''
        this.success = 1
      } else if (idText === '') {
        this.IDvalidateText = ''
      } else if (!reg.test(idText)) {
        this.IDvalidateText = '이메일 형식이 올바르지 않습니다.'
        this.idResultFail = true
        return false
      }
    },
    // 비밀번호 유효성 검사
    pw1Validate () {
      const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/
      let pw1Text = document.getElementById('pw1').value

      if (reg.test(pw1Text)) {
        this.PW1validateText = ''
        this.pwResultSuccess = true
        this.pwResultFail = false
      } else if (pw1Text === '') {
        this.PW1validateText = ''
        this.PW2validateText = '비밀번호를 입력해 주세요.'
        this.pwchResultFail = true
      } else if (!reg.test(pw1Text)) {
        this.PW1validateText = '최소 8자리, 최대 20자리 숫자, 문자, 특수문자 각각 1개 이상 포함해야 합니다.'
        this.pwResultFail = true
        return false
      }
    },
    // 비밀번호 재 확인
    pw2Validate () {
      let pw1Text = document.getElementById('pw1').value
      let pw2Text = document.getElementById('pw2').value

      if (pw1Text === '') {
        document.getElementById('pw1').focus()
      } else if (pw2Text === '') {
        this.PW2validateText = ''
      } else if (pw1Text === pw2Text) {
        this.PW2validateText = '비밀번호가 일치합니다.'
        this.pwchResultSuccess = true
        this.pwchResultFail = false
      } else if (pw1Text !== pw2Text) {
        this.PW2validateText = '비밀번호가 일치하지 않습니다.'
        this.pwchResultFail = true
        return false
      }
    },
    nameValidate () {
      const reg = /^[A-Za-z가-힣]+$/
      let nameText = document.getElementById('name').value

      if (reg.test(nameText)) {
        this.NAMEvalidateText = ''
        this.success = 1
      } else if (nameText === '') {
        this.NAMEvalidateText = ''
      } else if (!reg.test(nameText)) {
        this.NAMEvalidateText = '최소 2자리, 최대 10자리 한글, 영문만 사용 가능합니다.'
        this.nameResultFail = true
        return false
      }
    },
    // 가입하기 submit
    signUp () {
      let idText = document.getElementById('id').value
      let pw1Text = document.getElementById('pw1').value
      let pw2Text = document.getElementById('pw2').value
      let nameText = document.getElementById('name').value
      if (idText === null) {
        document.getElementById('id').focus()
        return false
      }
      if (pw1Text === null) {
        document.getElementById('pw1').focus()
        return false
      }
      if (pw2Text === null) {
        document.getElementById('pw2').focus()
        return false
      }
      if (nameText === null) {
        document.getElementById('name').focus()
        return false
      }
      if (this.IDCheckSuccess === '') {
        alert('아이디 중복체크 해주세요.')
        return false
      }
      if (this.NAMECheckSuccess === '') {
        alert('이름 중복체크 해주세요.')
        return false
      }
      if (this.pw1 === this.pw2 && this.IDCheckSuccess === 'idCheckOK' && this.NAMECheckSuccess === 'nameCheckOK') {
        this.$http.post('/api/login/signUp', {
          userid: this.id,
          userpw1: this.pw1,
          userpw2: this.pw2,
          username: this.name
        })
          .then(response => {
            console.log(response)
            alert(response.data)
            this.$router.replace('/login')
            // this.$router.replace(this.$route.query.redirect || '/login')
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        alert('가입이 실패 했습니다.')
        return false
      }
      this.userCheckSuccess = ''
    },
    // ID, NAME 중복 체크
    userDuplicateCheck (e) {
      var userCheck = e.target.id
      var userLength = e.target.previousElementSibling.children[1].value
      if (userCheck === 'idCheck') {
        this.userColumn = 'uid'
        this.userText = this.id
      } else {
        this.userColumn = 'name'
        this.userText = this.name
      }
      if (userLength.length === 0) {
        alert('입력 하세요.')
      } else if (userLength.length !== 0 && this.success === 1) {
        this.$http.get(`/api/login/${userCheck}`, {
          params: {
            userColumn: this.userColumn,
            userText: this.userText
          }
        })
          .then(response => {
            // console.log(response)
            if (response.data.column === 'uid') {
              if (response.data.resultLength >= 1) {
                this.idResultSuccess = false
                this.idResultFail = true
                this.IDvalidateText = response.data.text
              } else {
                this.idResultSuccess = true
                this.idResultFail = false
                this.IDvalidateText = response.data.text
                this.IDCheckSuccess = 'idCheckOK'
              }
            } else {
              if (response.data.resultLength >= 1) {
                this.nameResultSuccess = false
                this.nameResultFail = true
                this.NAMEvalidateText = response.data.text
              } else {
                this.nameResultSuccess = true
                this.nameResultFail = false
                this.NAMEvalidateText = response.data.text
                this.NAMECheckSuccess = 'nameCheckOK'
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        return false
      }
      this.success = 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#join {
  width: 100%;
  text-align: center;
  padding: 9.375rem 0; /* 150px 0 */
}
.subTitle {
  font-family: gotham_Light;
  font-size: 3.75rem; /* 60px */
  color: #6a6a6a;
}
.joinForm {
  margin-top: 5.625rem; /* 90px */
  font-size: 0;
}
.joinForm label {
  display: inline-block;
  border: 0.0625rem solid #878787; /* 1px */
  border-radius: 3.125rem; /* 50px */
  width: 31.125rem; /* 498px */
  height: 4.875rem; /* 78px */
}
.joinForm label:nth-of-type(1) {
  margin-left: 11.25rem; /* 180px */
}
.joinForm label:nth-of-type(2) {
  margin-top: 3.125rem; /* 50px */
}
.joinForm label:nth-of-type(4) {
  margin: 3.125rem 0 0 11.25rem; /* 50px 0 0 180px */
}
.joinForm output {
  margin-top: 0.625rem; /* 10px */
  height: 0.9375rem; /* 15px */
}
.joinForm output:nth-of-type(2) {
  margin-bottom: 0.625rem; /* 10px */
}
.joinForm .idOutputSuccess {
  color: #546cff;
}
.joinForm .idOutputFail {
  color: #ff5454;
}
.joinForm .pwOutputSuccess {
  color: #546cff;
}
.joinForm .pwOutputFail {
  color: #ff5454;
}
.joinForm .pwchOutputSuccess {
  color: #546cff;
}
.joinForm .pwchOutputFail {
  color: #ff5454;
}
.joinForm .nameOutputSuccess {
  color: #546cff;
}
.joinForm .nameOutputFail {
  color: #ff5454;
}
.joinForm label input {
  float: left;
  width: 22.5rem; /* 360px */
  margin: 2rem 0 -1.875rem 1.25rem; /* 32px 0 -29px 20px */
}
.emailIcon {
  float: left;
  width: 1.5625rem; /* 25px */
  height: 1.1875rem; /* 19px */
  margin: 1.875rem 0 0 2.5rem; /* 29px 0 0 40px */
  color: #878787;
}
.pwIcon {
  float: left;
  width: 1.1875rem; /* 19px */
  height: 1.4375rem; /* 23px */
  margin: 1.75rem 0 0 2.5rem; /* 28px 0 0 40px */
  color: #878787;
}
.userIcon {
  float: left;
  width: 1.5625rem; /* 25px */
  height: 1.375rem; /* 22px */
  margin: 1.6875rem 0 0 2.5rem; /* 27px 0 0 40px */
  color: #878787;
}
.doubleCheck {
  display: inline-block;
  border: 0.125rem solid #4db7a9; /* 2px */
  border-radius: 3.125rem; /* 50px */
  width: 9.375rem; /* 150px */
  height: 3.125rem; /* 50px */
  background-color: #4db7a9;
  color: #fff;
  cursor: pointer;
  font-family: gotham_Medium;
  font-size: 0.9375rem; /* 15px */
  vertical-align: 2.0625rem; /* 33px */
  margin: -2.0625rem 0 0 1.875rem; /* 33px 0 0 30px */
  transition: all .3s ease-out;
}
.doubleCheck:hover {
  background-color: #fff;
  color: #4db7a9;
  transition: all .3s ease-out;
  transition: all .3s ease-out;
}
.validateText {
  display: block;
  font-size: 0.9375rem; /* 15px */
}
.signUpBtn {
  border: 0.125rem solid #4db7a9; /* 2px */
  border-radius: 3.125rem; /* 50px */
  width: 31.25rem; /* 500px */
  height: 5rem; /* 80px */
  margin-top: 6.25rem; /* 100px */
  background-color: #4db7a9;
  color: #fff;
  cursor: pointer;
  font-family: gotham_Bold;
  font-size: 1.25rem; /* 20px */
  transition: all .3s ease-out;
}
.signUpBtn:hover {
  background-color: #fff;
  color: #4db7a9;
  transition: all .3s ease-out;
}
.btnLine {
  margin: 3.125rem auto; /* 50px auto */
  width: 1.875rem; /* 30px */
  height: 0.0625rem; /* 1px */
  background-color: #e5e5e5;
}
.cancleIcon {
  width: 0.9375rem; /* 15px */
  height: 1rem; /* 16px */
  color: #878787;
}
.cancleBtn {
  font-size: 1rem; /* 16px */
  font-family: gotham_Light;
  color: #e75735;
  letter-spacing: 0.25rem; /* 4px */
}
/* transitions */
.subTitleShow-enter-active {
  transition: all 1s;
}
.subTitleShow-enter {
  opacity: 0;
  transform: translateY(10px)
}
.idKeyupShow-enter-active {
  transition: all 1s ease .5s;
}
.idKeyupShow-enter {
  opacity: 0;
  transform: translateX(30px)
}
.pwKeyupShow-enter-active {
  transition: all 1s ease 1s;
}
.pwKeyupShow-enter {
  opacity: 0;
  transform: translateX(30px)
}
.nameKeyupShow-enter-active {
  transition: all 1s ease 1.5s;
}
.nameKeyupShow-enter {
  opacity: 0;
  transform: translateX(30px)
}
.btnShow-enter-active {
  transition: all 1s ease 2s;
}
.btnShow-enter {
  opacity: 0;
  transform: translateX(30px)
}
/* iphone 6/7/8 Plus */
@media screen and (max-width: 414px) {
  #join {
    padding: 2.5rem 0 6.25rem 0; /* 40px 0 100px 0 */
  }
  .subTitle {
    font-size: 2.1875rem; /* 35px */
  }
  .joinForm {
    margin-top: 2.5rem; /* 40px */
  }
  .joinForm label {
    display: block;
    margin: 0 auto;
    width: 21.875rem; /* 350px */
    height: 4.375rem; /* 70px */
  }
  .joinForm label:nth-of-type(1) {
    margin-left: auto;
  }
  .joinForm label:nth-of-type(2) {
    margin-top: 3.75rem; /* 60px */
  }
  .joinForm label:nth-of-type(4) {
    margin: 3.75rem auto 0 auto; /* 60px auto 0 auto */
  }
  .joinForm output {
    margin: 0 auto;
    margin-top: 0.625rem; /* 10px */
    font-size: 0.8125rem; /* 13px */
    width: 18.125rem; /* 290px */
    height: 0;
    line-height: 140%;
  }
  .joinForm .idOutputSuccess {
    height: 2.1875rem; /* 35px */
  }
  .joinForm .idOutputFail {
    height: 2.1875rem; /* 35px */
  }
  .joinForm .pwOutputSuccess {
    height: 0; /* 35px */
  }
  .joinForm .pwOutputFail {
    height: 2.1875rem; /* 35px */
  }
  .joinForm .pwchOutputSuccess {
    height: 2.1875rem; /* 35px */
  }
  .joinForm .pwchOutputFail {
    height: 2.1875rem; /* 35px */
  }
  .joinForm .nameOutputSuccess {
    height: 2.1875rem; /* 35px */
  }
  .joinForm .nameOutputFail {
    height: 2.1875rem; /* 35px */
  }
  .joinForm output:nth-of-type(2) {
    margin-bottom: 0.625rem; /* 10px */
  }
  .joinForm label input {
    width: 13.75rem; /* 220px */
    margin: 1.8125rem 0 0 1.25rem; /* 29px 0 0 20px */
  }
  .emailIcon {
    margin: 1.6875rem 0 0 2.5rem; /* 27px 0 0 40px */
  }
  .pwIcon {
    margin: 1.5rem 0 0 2.5rem; /* 24px 0 0 40px */
  }
  .userIcon {
    margin: 1.5rem 0 0 2.5rem; /* 24px 0 0 40px */
  }
  .doubleCheck {
    display: block;
    width: 8.125rem; /* 130px */
    height: 2.5rem; /* 40px */
    font-family: gotham_Bold;
    font-size: 0.875rem; /* 14px */
    margin: 0 auto;
    margin-top: 0.625rem; /* 10px */
  }
  .signUpBtn {
    width: 21.875rem; /* 350px */
    height: 4.375rem; /* 70px */
    font-size: 1rem; /* 16px */
    margin-top: 4.375rem; /* 70px */
    letter-spacing: 0.3125rem; /* 5px */
  }
  .btnLine {
    margin: 1.875rem auto; /* 30px auto */
  }
  .cancleIcon {
    width: 0.875rem; /* 14px */
    height: 0.9375rem; /* 15px */
  }
  .cancleBtn {
    font-size: 0.8125rem; /* 13px */
  }
}
/* iphone 5/SE */
@media screen and (max-width: 320px) {
  .joinForm label {
    width: 19.375rem; /* 310px */
  }
  .signUpBtn {
    width: 19.375rem; /* 310px */
  }
  .joinForm label input {
    width: 11.25rem; /* 180px */
  }
  .doubleCheck {
    width: 9.375rem; /* 150px */
    font-family: gotham_Medium;
    letter-spacing: 0.125rem; /* 2px */
  }
}
</style>
