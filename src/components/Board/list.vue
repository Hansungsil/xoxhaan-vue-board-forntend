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
/* iphone 6/7/8 Plus */
@media screen and (max-width: 414px) {
  #boardList {
    padding-bottom: 5rem; /* 80px */
  }
  .boardListWrap {
    width: 21.875rem; /* 350px */
    min-width: 21.875rem; /* 350px */
    max-width: 21.875rem; /* 350px */
  }
  .boardListWrap th {
    font-size: 0.625rem; /* 10px */
    padding: 1.875rem 0 0.625rem 0.625rem; /* 30px 0 10px 10px */
  }
  .boardListWrap td {
    padding: 1.25rem 0 1.25rem 0.625rem; /* 20px 0 20px 10px */
    font-size: 0.75rem; /* 12px */
    line-height: 150%;
  }
}
/* iphone 5/SE */
@media screen and (max-width: 320px) {
  .boardListWrap {
    width: 19.375rem; /* 310px */
    min-width: 19.375rem; /* 310px */
    max-width: 19.375rem; /* 310px */
  }
}
</style>
