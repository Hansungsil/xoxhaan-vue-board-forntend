<template>
  <div id="boardWrap">
    <div>
      <search></search>
      <button type="button" class="writeBtn"><router-link to='/board/write'>WRITE</router-link></button>
      <list :lists="lists"
            :template="template"
            :totalCount="totalCount"
            :page="page"
            :listCount="listCount"
            v-if="searchResult"
      ></list>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Board/search.vue'
import List from '@/components/Board/list.vue'
import NProgress from '../../../node_modules/nprogress/nprogress.js'

export default {
  name: 'boardList',
  components: {
    'search': Search,
    'list': List
  },
  data () {
    return {
      lists: [],
      page: 1,
      totalCount: null, // 총 게시물 수
      totalPages: null, // 총 페이지 수
      listCount: 5, // 한 페이지 게시물 수
      pageCount: 5, // 한 화면 페이지 수
      groupNum: null, // 전체 페이지 수 블럭
      startPage: null, // 시작 페이지
      endPage: null, // 끝 페이지
      template: '', // page.vue <template>
      templateInnerHtml: '', // page.vue <template> 페이지 html
      searchOptionParam: '', // 검색 옵션
      searchTextParam: '', // 검색 텍스트
      searchResult: true
    }
  },
  beforeCreate () {
    NProgress.start()
    NProgress.set(0.4)
  },
  created () {
    this.getPageCount()
    this.getList()
    this.$eventBus.$on('movePage', pageNum => {
      this.movePage(pageNum)
    })
    this.getSearchList()
  },
  methods: {
    // 리스트 가져오기
    getList () {
      this.$http.get('/api/board/lists', {
        params: {
          pageNum: this.page,
          listCount: this.listCount,
          searchText: this.searchTextParam,
          searchOption: this.searchOptionParam
        }
      })
        .then(response => {
          this.lists = response.data.result
          if (this.lists === 0) {
            alert('검색 결과가 없습니다.')
            this.searchResult = false
            NProgress.done()
          } else {
            this.searchResult = true
            this.paging()
            this.template = `
              <list-page><ul class="clearfix">
              ${this.templateInnerHtml}
              </ul></list-page>
            `
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 총 리스트 수 가져오기
    getPageCount () {
      this.$http.get('/api/board/listTotalCount', {
        params: {
          searchText: this.searchTextParam,
          searchOption: this.searchOptionParam
        }
      })
        .then(response => {
          this.totalCount = response.data.totalCount
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 페이지 클릭
    movePage (pageNum) {
      NProgress.start()
      NProgress.set(0.4)
      this.page = pageNum
      this.receivePageNum = pageNum
      this.getList()
    },
    // 페이징 처리
    paging () {
      // 총 페이지 수
      this.totalPages = Math.ceil(this.totalCount / this.listCount)

      // 만약 현재 페이지 번호가 총 페이지 번호보다 크다면 현재페이지를 강제로 총 페이지 번호로 치환
      if (this.totalPages < this.page) {
        this.page = this.totalPages
      }

      // 전체 페이지 수 블럭
      this.groupNum = Math.floor(this.page / this.pageCount + (this.page % this.pageCount > 0 ? 1 : 0))

      // 끝 페이지 번호 알아내기
      this.endPage = this.groupNum * this.pageCount

      // 시작 페이지 번호 알아내기
      this.startPage = this.endPage - (this.pageCount - 1)

      // 총 페이지 수 가 끝 페이지 수 보다 크다면 총 페이지수를 끝 페이지 수로 강제 치환
      if (this.endPage > this.totalPages) {
        this.endPage = this.totalPages
      }

      // 페이지 출력
      this.templateInnerHtml = ''
      // 첫 페이지 이동
      if (this.page === 1) {
        // 첫 페이지 때 클릭 불가능
        this.templateInnerHtml += `
        <li class="pageNumList">
          <span>
            <font-awesome-icon icon="angle-double-left"/>
          </span>
        </li>`
      } else if (this.page > 1) {
        // 페이지 1이상일 때 클릭 가능
        this.templateInnerHtml += `
        <li class="pageNumList">
          <a href='#' @click.prevent=movePage(${this.startPage})>
            <font-awesome-icon icon="angle-double-left" class="angleIcon"/>
          </a>
        </li>`
      } else if (this.startPage > 1) {
        // 페이지 블럭 넘어갔을 때 클릭 가능
        this.templateInnerHtml += `
        <li class="pageNumList">
          <a href='#' @click.prevent=movePage(${this.startPage})>
            <font-awesome-icon icon="angle-double-left" class="angleIcon"/>
          </a>
        </li>`
      }
      // 이전 페이지 이동
      if (this.page === 1) {
        // 첫 페이지 때 클릭 불가능
        this.templateInnerHtml += `
        <li class="pageNumList anglePrev">
          <span>
            <font-awesome-icon icon="angle-left"/>
          </span>
        </li>`
      } else if (this.page > 1) {
        // 페이지 1 이상일 때 클릭 가능
        this.templateInnerHtml += `
        <li class="pageNumList anglePrev">
          <a href='#' @click.prevent=movePage(${this.page - 1})>
            <font-awesome-icon icon="angle-left" class="angleIcon"/>
          </a>
        </li>`
      }
      // 페이지 번호 출력
      for (let i = this.startPage; i <= this.endPage; i++) {
        if (i === this.page) {
          this.templateInnerHtml += `
          <li class="pageNumList clickPageNumColor">
            ${i}
          </li>`
        } else {
          this.templateInnerHtml += `
          <li class="pageNumList">
            <a href='/${i}' @click.prevent=movePage(${i})>${i}</a>
          </li>`
        }
      }
      // 다음 페이지
      if (this.page < this.totalPages) {
        // 첫 페이지 때 부터 클릭 가능
        this.templateInnerHtml += `
        <li class="pageNumList angleNext">
          <a href='#' @click.prevent=movePage(${this.page + 1})>
            <font-awesome-icon icon="angle-right" class="angleIcon"/>
          </a>
        </li>`
      } else if (this.page === this.totalPages) {
        // 총 페이지에서 마지막 페이지일 때 클릭 불가능
        this.templateInnerHtml += `
        <li class="pageNumList angleNext">
          <span>
            <font-awesome-icon icon="angle-right"/>
          </span>
        </li>`
      }
      // 마지막 페이지 이동
      if (this.page < this.totalPages) {
        // 첫 페이지 때 부터 클릭 가능 (해당 블럭 끝으로 이동 됨)
        this.templateInnerHtml += `
        <li class="pageNumList">
          <a href='#' @click.prevent=movePage(${this.endPage})>
            <font-awesome-icon icon="angle-double-right" class="angleIcon"/>
          </a>
        </li>`
      } else if (this.endPage === this.totalPages) {
        // 총 페이지에서 마지막 페이지일 때 클릭 불가능
        this.templateInnerHtml += `
        <li class="pageNumList">
          <span>
            <font-awesome-icon icon="angle-double-right"/>
          </span>
        </li>`
      }
      NProgress.done()
    },
    // 리스트 검색 정보
    getSearchList () {
      this.$eventBus.$on('searchBtn', (searchText, searchOption) => {
        NProgress.start()
        NProgress.set(0.4)
        this.searchTextParam = searchText
        if (searchOption === '제목') {
          this.searchOptionParam = 'title'
        } else {
          this.searchOptionParam = 'name'
        }
        this.getPageCount()
        this.getList()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#boardWrap {
  text-align: center;
  font-size:0;
}
.writeBtn {
  margin: 1.25rem 0 3.125rem 61.875rem; /* 20px 0 50px 990px */
  width: 6.25rem; /* 100px */
  height: 2.5rem; /* 40px */
  border: 0.0625rem solid #4db7a9; /* 1px */
  border-radius: 3.125rem; /* 50px */
  background-color: #fff;
  color: #4db7a9;
  font-family: gotham_Medium;
  font-size: 0.875rem; /* 14px */
  cursor: pointer;
}
.writeBtn:hover {
  background-color: #4db7a9;
  color: #fff;
}
@media screen and (max-width: 414px) {
  .writeBtn {
    margin: 10px 0 10px 270px; /* 10px 0 10px 270px */
    width: 80px; /* 80px */
    height: 30px; /* 30px */
    font-family: gotham_Bold;
    font-size: 12px; /* 12px */
  }
}
</style>
