<template>
  <div id="baordUpdate">
    <form @submit.prevent="updatePost">
      <table class="updateWrap">
        <tr class="updateTitle">
          <th>TITLE</th>
          <td colspan='5'>
            <input type="text" v-model="title" id="title">
          </td>
        </tr>
        <tr class="updateInfo">
          <th>WRITER</th>
          <td>{{ writer }}</td>
          <th>VIEWS</th>
          <td>{{ count }}</td>
          <th>DATE</th>
          <td>{{ date.substr(0, 10) }}</td>
        </tr>
        <tr class="updateText">
          <td colspan='6'>
            <textarea v-model="content" rows="10" id="content"
              @keyup="contentAutoHeight"
              @keydown="contentAutoHeight"
            ></textarea>
          </td>
        </tr>
      </table>
      <button type="submit" class="saveBtn">
        SAVE
      </button>
      <div class="btnLine"></div>
      <router-link to="/board/list" class="cancleBtn">
        <font-awesome-icon :icon="['far', 'trash-alt']" class="cancleIcon"/>
        CANCLE
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: 'baordUpdate',
  data () {
    return {
      title: '',
      writer: '',
      date: '',
      count: '',
      content: '',
      myPost: false,
      listId: this.$route.params
    }
  },
  created () {
    this.$http.get('/api/board/list', {
      params: {
        id: this.listId.id
      }
    })
      .then(response => {
        this.title = response.data[0].title
        this.writer = response.data[0].name
        this.date = response.data[0].date
        this.count = response.data[0].count
        this.content = response.data[0].content.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    updatePost () {
      let titleText = document.getElementById('title').value
      let contentText = document.getElementById('content').value
      if (titleText === '' && contentText === '') {
        alert('글이 작성 되지 않았습니다.')
        return false
      } else if (titleText === '') {
        alert('제목이 작성 되지 않았습니다.')
        titleText.focus()
        return false
      } else if (contentText === '') {
        alert('내용이 작성 되지 않았습니다.')
        contentText.focus()
        return false
      } else {
        this.$http.put('/api/board/update', {
          id: this.listId.id,
          title: this.title,
          content: this.content.replace(/(\n|\r\n)/g, '<br />')
        })
          .then(response => {
            alert('글이 수정 되었습니다.')
            console.log(response.data)
            this.$router.push('/board/list')
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    contentAutoHeight () {
      let contentValue = document.querySelector('#content')
      console.log(contentValue)
      contentValue.style.height = '1px'
      contentValue.style.height = (16 + contentValue.scrollHeight) + 'px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#baordUpdate {
  margin: 0 auto;
  width: 68.75rem; /* 1100px */
  min-width: 68.75rem; /* 1100px */
  max-width: 68.75rem; /* 1100px */
  padding: 6.875rem 0 9.375rem 0; /* 110px 0 150px 0 */
  text-align: center;
}
.updateWrap {
  text-align: left;
  display:block;
  width: 100%;
}
.updateWrap tr {
  display:block;
  width: 100%;
  border-bottom: 0.0625rem solid #e5e5e5; /* 1px */
}
.updateWrap th {
  font-family: gotham_Light;
  font-weight: 100;
  font-size: 1rem; /* 16px */
  color: #b5b5b5;
  padding: 2.5rem 0; /* 40px 0 */
  width: 5rem; /* 80px */
  padding-left: 0.625rem; /* 10px */
}
.updateWrap td {
  padding: 2.5rem 0; /* 40px 0 */
}
.updateWrap .updateTitle td {
  width: 60.625rem; /* 970px */
  padding-left: 2.5rem; /* 40px */
  font-family: YDIYGO140;
  color: #4f4f4f;
}
.updateWrap .updateTitle td input{
  border: 0.0625rem solid #e5e5e5; /* 1px */
  width: 95%;
  padding: 0.625rem 0 0.625rem 0.625rem; /* 10px 0 10px 10px */
  color: #887788;
  font-family: YDIYGO120;
}
.updateWrap .updateInfo td {
  width: 8.75rem; /* 140px */
  padding-left: 0.625rem; /* 10px */
  color: #4f4f4f;
}
.updateWrap .updateInfo td:nth-of-type(1) {
  width: 30.625rem; /* 490px */
  padding-left: 2.5rem; /* 40px */
}
.updateWrap .updateText td {
  padding: 2.5rem 2.5rem; /* 40px 40px */
  text-align: left;
  color: #4f4f4f;
}
.updateWrap .updateText textarea{
  resize: none;
  width: 60.5rem; /* 968px */
  height: auto;
  min-height: 18.75rem; /* 300px */
  border: 0.0625rem solid #e5e5e5; /* 1px */
  line-height: 200%;
  padding: 0.625rem 0.9375rem; /* 10px 15px */
  color: #887788;
  font-family: YDIYGO120;
}
.saveBtn {
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
.saveBtn:hover {
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
/* iphone 6/7/8 Plus */
@media screen and (max-width: 414px) {
  #baordUpdate {
    width: 21.875rem; /* 350px */
    min-width: 21.875rem; /* 350px */
    max-width: 21.875rem; /* 350px */
    padding: 3.125rem 0 3.75rem 0; /* 50px 0 60px 0 */
  }
  .updateWrap th {
    padding: 1.25rem 0 1.25rem 0; /* 20px 0 20px 0 */
    width: 2.5rem; /* 40px */
    font-size: 0.75rem; /* 12px */
  }
  .updateWrap td {
    padding: 1.25rem 0 1.25rem 0; /* 20px 0 20px 0 */
    font-size: 0.8125rem; /* 13px */
  }
  .updateWrap .updateTitle th {
    width: 2.5rem; /* 40px */
  }
  .updateWrap .updateTitle td {
    width: 18.125rem; /* 290px */
    padding-left: 0.625rem; /* 10px */
  }
  .updateWrap .updateTitle td input{
    width: 100%;
    padding: 0.625rem 0 0.625rem 0.625rem; /* 10px 0 10px 10px */
  }
  .updateWrap .updateInfo th {
    width: 2.5rem; /* 40px */
    padding-left: 0;
  }
  .updateWrap .updateInfo td {
    width: 4.6875rem; /* 75px */
  }
  .updateWrap .updateInfo td:nth-of-type(1) {
    width: 4.6875rem; /* 75px */
    padding-left: 0.625rem; /* 10px */
  }
  .updateWrap .updateInfo td:nth-of-type(2) {
    width: 3.125rem; /* 50px */
    padding-left: 0.625rem; /* 10px */
  }
  .updateWrap .updateText td{
    width: 20.625rem; /* 330px */
    padding: 0.625rem 0; /* 10px 0 */
  }
  .updateWrap .updateText textarea{
    width: 19.875rem; /* 318px */
    line-height: 150%;
  }
  .saveBtn {
    width: 21.875rem; /* 350px */
    height: 4.375rem; /* 70px */
    font-size: 1rem; /* 16px */
    margin-top: 3.125rem; /* 50px */
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
  #baordUpdate {
    width: 19.375rem; /* 310px */
    min-width: 19.375rem; /* 310px */
    max-width: 19.375rem; /* 310px */
  }
  .updateWrap .updateTitle td input{
    width: 95%;
  }
  .updateWrap .updateText td{
    width: 19.375rem; /* 310px */
  }
  .updateWrap .updateText textarea{
    width: 17.5rem; /* 280px */
  }
  .saveBtn {
    width: 19.375rem; /* 310px */
  }
}
</style>
