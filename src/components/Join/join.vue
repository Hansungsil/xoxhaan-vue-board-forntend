<template>
  <div id="join">
    <p class="subTitle">CREATE ACCOUNT</p>
    <form method="post" @submit.prevent="signUp" class="joinForm clearfix" >
      <label for="id">
        <font-awesome-icon :icon="['far', 'envelope']" class="emailIcon"/>
        <input type="email" v-model="id" id="id" required @keyup="emailValidate">
      </label>
      <button @click.prevent="userCheck" id="idCheck" class="doubleCheck">Email Check</button>
      <output class="validateText" :class="{'outputSuccess': resultSuccess, 'outputFail': resultFail}">{{ IDvalidateText }}</output>
      <label for="pw1">
        <font-awesome-icon icon="unlock" class="pwIcon"/>
        <input type="password" v-model="pw1" id="pw1" required @keyup="pw1Validate" minlength="6" maxlength="20">
      </label>
      <output class="validateText" :class="{'outputSuccess': resultSuccess, 'outputFail': resultFail}">{{ PW1validateText }}</output>
      <label for="pw2">
        <font-awesome-icon icon="lock" class="pwIcon"/>
        <input type="password" v-model="pw2" id="pw2" required @keyup="pw2Validate" minlength="6" maxlength="20">
      </label>
      <output class="validateText" :class="{'outputSuccess': resultSuccess, 'outputFail': resultFail}">{{ PW2validateText }}</output>
      <label for="name">
        <font-awesome-icon icon="user-edit" class="userIcon"/>
        <input type="text" v-model="name" id="name" required @keyup="nameValidate" minlength="2" maxlength="10">
      </label>
      <button @click.prevent="userCheck" id="nameCheck" class="doubleCheck">Name Check</button>
      <output class="validateText" :class="{'outputSuccess': resultSuccess, 'outputFail': resultFail}">{{ NAMEvalidateText }}</output>
      <button type="submit" class="signUpBtn">
        SIGN UP
      </button>
      <div class="btnLine"></div>
      <router-link to="/login" class="cancleBtn">
        <font-awesome-icon :icon="['far', 'trash-alt']" class="cancleIcon"/>
        CANCLE
      </router-link>
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
      success: '',
      IDCheckSuccess: '',
      NAMECheckSuccess: '',
      resultSuccess: false,
      resultFail: false
    }
  },
  methods: {
    // ID 유효성 검사
    emailValidate () {
      const reg = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/
      let idText = document.getElementById('id').value

      if (reg.test(idText)) {
        this.IDvalidateText = ''
        this.success = 'success'
      } else if (idText === '') {
        this.IDvalidateText = ''
      } else if (!reg.test(idText)) {
        this.IDvalidateText = '이메일 형식이 올바르지 않습니다.'
        this.resultFail = true
        return false
      }
    },
    // 비밀번호 유효성 검사
    pw1Validate () {
      const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/
      let pw1Text = document.getElementById('pw1').value

      if (reg.test(pw1Text)) {
        this.PW1validateText = ''
        this.resultFail = false
      } else if (pw1Text === '') {
        this.PW1validateText = ''
      } else if (!reg.test(pw1Text)) {
        this.PW1validateText = '최소 8자리, 최대 20자리 숫자, 문자, 특수문자 각각 1개 이상 포함해야 합니다.'
        this.resultFail = true
        return false
      }
    },
    // 비밀번호 재 확인
    pw2Validate () {
      let pw1Text = document.getElementById('pw1').value
      let pw2Text = document.getElementById('pw2').value

      if (pw2Text === '') {
        this.PW2validateText = ''
      } else if (pw1Text === pw2Text) {
        this.PW2validateText = '비밀번호가 일치합니다.'
        this.resultSuccess = true
        this.resultFail = false
      } else if (pw1Text !== pw2Text) {
        this.PW2validateText = '비밀번호가 일치하지 않습니다.'
        this.resultFail = true
        return false
      }
    },
    nameValidate () {
      const reg = /^[A-Za-z가-힣]+$/
      let nameText = document.getElementById('name').value

      if (reg.test(nameText)) {
        this.NAMEvalidateText = ''
        this.success = 'success'
      } else if (nameText === '') {
        this.NAMEvalidateText = ''
      } else if (!reg.test(nameText)) {
        this.NAMEvalidateText = '최소 2자리, 최대 10자리 한글, 영문만 사용 가능합니다.'
        this.resultFail = true
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
    userCheck (event) {
      console.log(event)
      const userCheck = event.path['0'].id
      const userLength = event.target.previousElementSibling.control.value
      if (userCheck === 'idCheck') {
        this.userColumn = 'uid'
        this.userText = this.id
      } else {
        this.userColumn = 'name'
        this.userText = this.name
      }
      if (userLength.length !== 0 && this.success === 'success') {
        this.$http.get(`/api/login/${userCheck}`, {
          params: {
            userColumn: this.userColumn,
            userText: this.userText
          }
        })
          .then(response => {
            console.log(response)
            this.resultSuccess = true
            this.resultFail = false
            if (response.data.column === 'uid') {
              this.IDvalidateText = response.data.text
              this.IDCheckSuccess = 'idCheckOK'
            } else {
              this.NAMEvalidateText = response.data.text
              this.NAMECheckSuccess = 'nameCheckOK'
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        return false
      }
      this.success = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#join {
  text-align: center;
  padding: 9.375rem 0; /* 150px 0 */
}
.subTitle {
  font-family: gotham_Light;
  font-size: 3.75rem; /* 60px */
  color: #6a6a6a;
}
.joinForm {
  margin-top: 90px; /* 90px */
  font-size: 0;
}
.joinForm label {
  display: inline-block;
  border: 1px solid #878787;
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
.outputSuccess {
  color: #546cff;
}
.outputFail {
  color: #ff5454;
}
.joinForm label input {
  float: left;
  width: 22.5rem; /* 360px */
  margin: 2rem 0 -1.875rem 1.25rem;
}
.emailIcon {
  float: left;
  width: 1.5625rem;
  height: 1.1875rem;
  margin: 1.875rem 0 0 2.5rem;
  color: #878787;
}
.pwIcon {
  float: left;
  width: 1.1875rem;
  height: 1.4375rem;
  margin: 1.75rem 0 0 2.5rem;
  color: #878787;
}
.userIcon {
  float: left;
  width: 1.5625rem;
  height: 1.375rem;
  margin: 1.6875rem 0 0 2.5rem;
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
}
.doubleCheck:hover {
  background-color: #fff;
  color: #4db7a9;
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
}
.signUpBtn:hover {
  background-color: #fff;
  color: #4db7a9;
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
@media screen and (max-width: 414px) {
  #join {
    padding: 70px 0 100px 0; /* 70px 0 100px 0 */
  }
  .subTitle {
    font-size: 35px; /* 35px */
  }
  .joinForm {
    margin-top: 60px; /* 60px */
  }
  .joinForm label {
    display: block;
    margin: 0 auto;
    width: 350px; /* 350px */
    height: 70px; /* 70px */
  }
  .joinForm label:nth-of-type(1) {
    margin-left: auto;
  }
  .joinForm label:nth-of-type(2) {
    margin-top: 60px; /* 60px */
  }
  .joinForm label:nth-of-type(4) {
    margin: 60px auto 0 auto; /* 60px auto 0 auto */
  }
  .joinForm output {
    margin: 0 auto;
    margin-top: 0.625rem; /* 10px */
    font-size: 13px; /* 13px */
    width: 290px; /* 290px */
    height: 35px; /* 35px */
    line-height: 140%;
  }
  .joinForm output:nth-of-type(2) {
    margin-bottom: 0.625rem; /* 10px */
  }
  .joinForm label input {
    width: 220px; /* 220px */
    margin: 29px 0 0 20px; /* 29px 0 0 20px */
  }
  .emailIcon {
    margin: 27px 0 0 40px; /* 27px 0 0 40px */
  }
  .pwIcon {
    margin: 24px 0 0 40px; /* 24px 0 0 40px */
  }
  .userIcon {
    margin: 24px 0 0 40px; /* 24px 0 0 40px */
  }
  .doubleCheck {
    display: block;
    width: 130px; /* 130px */
    height: 40px; /* 40px */
    font-family: gotham_Bold;
    font-size: 14px; /* 14px */
    margin: 0 auto;
    margin-top: 10px; /* 10px */
  }
  .signUpBtn {
    width: 350px; /* 350px */
    height: 70px; /* 70px */
    font-size: 16px; /* 16px */
    margin-top: 70px; /* 100px */
    letter-spacing: 5px;
  }
  .btnLine {
    margin: 30px auto; /* 50px auto */
  }
  .cancleIcon {
    width: 14px; /* 15px */
    height: 15px; /* 16px */
  }
  .cancleBtn {
    font-size: 13px; /* 16px */
  }
}
</style>
