<template>
  <div id="boardList">
    <table class="boardListWrap">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Writer</th>
          <th>Date</th>
          <th>Views</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, index) in lists" :key="index">
          <td>{{ (totalCount - index) - ((page - 1) * listCount) }}</td>
          <td>
            <router-link
              :to="{ name: 'boardPost', params: { id: list.id } }"
              @click.native="countUp"
            >
              {{ list.title }}
            </router-link>
          </td>
          <td>{{ list.name }}</td>
          <td>{{ list.count }}</td>
          <td>{{ list.date.substr(0, 10) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagingWrap">
      <v-runtime-template :template="template"></v-runtime-template>
    </div>
  </div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
import listPage from '@/components/Board/page.vue'

export default {
  name: 'boardList',
  props: ['lists', 'template', 'totalCount', 'page', 'listCount'],
  components: {
    VRuntimeTemplate,
    listPage
  },
  methods: {
    // 페이지 이동
    movePage (pageNum) {
      this.$eventBus.$emit('movePage', pageNum)
    },
    // 조회수 증가
    countUp () {
      this.$http.put('/api/board/countUp', {
        id: this.$route.params.id
      })
        .then(response => {
          console.log(response.data)
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
#boardList {
  padding-bottom: 9.375rem; /* 150px */
}
.boardListWrap {
  margin: 0 auto;
  width: 68.75rem; /* 1100px */
  min-width: 68.75rem; /* 1100px */
  max-width: 68.75rem; /* 1100px */
  text-align: left;
}
.boardListWrap th {
  font-family: gotham_Light;
  font-weight: 100;
  font-size: 1rem; /* 16px */
  color: #b5b5b5;
  border-bottom: 0.0625rem solid #e5e5e5; /* 1px */
  padding: 1.25rem 0 1.25rem 0.625rem; /* 20px 0 20px 10px */
}
.boardListWrap th:nth-of-type(1) {
  width: 5.625rem; /* 90px */
}
.boardListWrap th:nth-of-type(2) {
  width: 38.75rem; /* 620px */
}
.boardListWrap th:nth-of-type(3) {
  width: 9.375rem; /* 150px */
}
.boardListWrap th:nth-of-type(4) {
  width: 5.625rem; /* 90px */
}
.boardListWrap th:nth-of-type(5) {
  width: 9.375rem; /* 150px */
}
.boardListWrap td {
  padding: 1.875rem 0 1.875rem 0.625rem; /* 30px 0 30px 10px */
  font-size: 1rem; /* 16px */
  color: #4f4f4f;
  border-bottom: 0.0625rem solid #e5e5e5; /* 1px */
}
@media screen and (max-width: 414px) {
  #boardList {
    padding-bottom: 80px; /* 90px */
  }
  .boardListWrap {
    width: 350px; /* 1100px */
    min-width: 350px; /* 1100px */
    max-width: 350px; /* 1100px */
  }
  .boardListWrap th {
    font-size: 10px; /* 16px */
    padding: 30px 0 10px 0.625rem; /* 20px 0 20px 10px */
  }
  .boardListWrap td {
    padding: 20px 0 20px 0.625rem; /* 30px 0 30px 10px */
    font-size: 12px; /* 16px */
    line-height: 150%;
  }
}
</style>
