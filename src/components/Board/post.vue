<template>
  <div id="baordPost">
    <form @submit.prevent="deletePost">
      <table class="postWrap">
        <tr class="postTitle">
          <th>TITLE</th>
          <td colspan='5'>{{ title }}</td>
        </tr>
        <tr class="postInfo">
          <th>WRITER</th>
          <td>{{ writer }}</td>
          <th>VIEWS</th>
          <td>{{ count }}</td>
          <th>DATE</th>
          <td>{{ date.substr(0, 10) }}</td>
        </tr>
        <tr class="postText">
          <td colspan='6' v-html="content">
            {{ content }}
          </td>
        </tr>
      </table>
      <div v-if="myPost" class="postBtnWrap">
        <router-link :to="{ name: 'boardUpdate', params: { id: this.$route.params.id }}">UPDATE</router-link>
        <button type="submit">DELETE</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'baordPost',
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
        this.content = response.data[0].content

        let userId = parseFloat(this.$cookie.get('id'))
        let authorId = response.data[0].author_id
        if (userId === authorId) {
          this.myPost = true
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    deletePost () {
      this.$http.delete('/api/board/delete', {
        params: {
          id: this.listId.id
        }
      })
        .then(response => {
          alert(response.data)
          this.$router.push('/board/list')
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
#baordPost {
  margin: 0 auto;
  width: 68.75rem; /* 1100px */
  min-width: 68.75rem; /* 1100px */
  max-width: 68.75rem; /* 1100px */
  padding: 6.875rem 0 9.375rem 0; /* 110px 0 150px 0 */
  text-align: left;
}
.postWrap {
  text-align: left;
  display:block;
  width: 100%;
}
.postWrap tr {
  display:block;
  width: 100%;
  border-bottom: 0.0625rem solid #e5e5e5; /* 1px */
}
.postWrap th {
  font-family: gotham_Light;
  font-weight: 100;
  font-size: 1rem; /* 16px */
  color: #b5b5b5;
  padding: 2.5rem 0; /* 40px 0 */
}
.postWrap td {
  padding: 2.5rem 0; /* 40px 0 */
}
.postWrap .postTitle th {
  width: 5rem; /* 80px */
  padding-left: 0.625rem; /* 10px */
}
.postWrap .postTitle td {
  width: 60.625rem; /* 970px */
  padding-left: 2.5rem; /* 40px */
  font-family: YDIYGO140;
  color: #4f4f4f;
}
.postWrap .postInfo th {
  width: 5rem; /* 80px */
  padding-left: 0.625rem; /* 10px */
}
.postWrap .postInfo td {
  width: 8.75rem; /* 140px */
  padding-left: 0.625rem; /* 10px */
  color: #4f4f4f;
}
.postWrap .postInfo td:nth-of-type(1) {
  width: 30.625rem; /* 490px */
  padding-left: 2.5rem; /* 40px */
}
.postWrap .postText td {
  padding: 2.5rem 2.5rem; /* 40px 40px */
  text-align: left;
  line-height: 200%;
  color: #4f4f4f;
}
.postBtnWrap {
  margin-top: 4.375rem; /* 70px */
  text-align: center;
  font-size: 0;
}
.postBtnWrap a {
  display:inline-block;
  width: 31rem; /* 496px */
  padding: 1.90625rem 0; /* 30.5px 0 */
  margin-right: 3.125rem; /* 50px */
  background-color: #4db7a9;
  border: 0.125rem solid #4db7a9; /* 2px */
  border-radius: 3.125rem; /* 50px */
  color: #fff;
  font-family: gotham_Bold;
  letter-spacing: 0.375rem; /* 6px */
  font-size: 0.875rem; /* 14px */
}
.postBtnWrap button {
  width: 31.25rem; /* 500px */
  height: 5rem; /* 80px */
  background-color: #4db7a9;
  border: 0.125rem solid #4db7a9; /* 2px */
  border-radius: 3.125rem; /* 50px */
  color: #fff;
  font-family: gotham_Bold;
  letter-spacing: 0.375rem; /* 6px */
  font-size: 0.875rem; /* 14px */
  cursor: pointer;
}
.postBtnWrap a:hover {
  background-color: #fff;
  color: #4db7a9;
}
.postBtnWrap button:hover {
  background-color: #fff;
  color: #4db7a9;
}
@media screen and (max-width: 414px) {
  #baordPost {
    width: 350px; /* 350px */
    min-width: 350px; /* 350px */
    max-width: 350px; /* 350px */
    padding: 50px 0 60px 0; /* 50px 0 60px 0 */
  }
  .postWrap th {
    font-size: 12px; /* 12px */
    padding: 20px 0 20px 0; /* 20px 0 20px 10px */
  }
  .postWrap td {
    font-size: 13px;
    padding: 20px 0 20px 0; /* 20px 0 20px 10px */
  }
  .postWrap .postTitle th {
    width: 40px; /* 40px */
    padding-left: 0;
  }
  .postWrap .postTitle td {
    width: 290px; /* 290px */
    padding-left: 0.625rem; /* 10px */
  }
  .postWrap .postInfo th {
    width: 40px; /* 40px */
    padding-left: 0;
  }
  .postWrap .postInfo td {
    width: 75px; /* 125px */
  }
  .postWrap .postInfo td:nth-of-type(1) {
    width: 75px;
    padding-left: 10px; /* 40px */
  }
  .postWrap .postInfo td:nth-of-type(2) {
    width: 50px; /* 490px */
    padding-left: 10px; /* 40px */
  }
  .postWrap .postText td {
    padding: 15px 0; /* 40px 40px */
    text-align: left;
    line-height: 150%;
    font-size: 15px;
  }
  .postBtnWrap {
    margin-top: 50px; /* 70px */
    text-align: center;
    font-size: 0;
  }
  .postBtnWrap a {
    width: 166px; /* 496px */
    padding: 19px 0; /* 30.5px 0 */
    margin-right: 10px; /* 50px */
    font-size: 16px; /* 16px */
    letter-spacing: 5px;
  }
  .postBtnWrap button {
    width: 170px; /* 500px */
    height: 60px; /* 80px */
    font-size: 16px; /* 16px */
    letter-spacing: 5px;
  }
}
</style>
