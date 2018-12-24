<template>
  <div id="boardSearch">
    <form @submit.prevent="search">
      <select class="searchOption">
        <option value="제목">제&nbsp;&nbsp;&nbsp;&nbsp;목</option>
        <option value="글쓴이">글&nbsp;쓴&nbsp;이</option>
      </select>
      <input type="text" v-model="searchText" class="searchText">
      <button type="submit" class="searchBtn">
        <font-awesome-icon icon="search" class="searchIcon"/>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'boardSearch',
  data () {
    return {
      searchOption: '',
      searchText: ''
    }
  },
  methods: {
    search (event) {
      this.searchOption = event.target[0].value
      this.$eventBus.$emit('searchBtn', this.searchText, this.searchOption)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#boardSearch {
  margin: 0 auto;
  width: 68.75rem; /* 1100px */
  min-width: 68.75rem; /* 1100px */
  max-width: 68.75rem; /* 1100px */
  margin-top: 6.25rem; /* 100px */
}
.searchOption {
  width: 15.625rem; /* 250px */
  height: 5rem; /* 80px */
  border-top-left-radius: 3.125rem; /* 50px */
  border-bottom-left-radius: 3.125rem; /* 50px */
  border: 0.125rem solid #4db7a9; /* 2px */
  background-color: #4db7a9;
  color: #fff;
  font-family: YDIYGO140;
  font-size: 1rem; /* 16px */
  text-align-last:right;
  padding-right: 5.9375rem; /* 95px */
  direction: rtl;
  cursor: pointer;
}
.searchOption option {
  background-color: #fff;
  color: #4db7a9;
}
.searchOption option:checked,
.searchOption option:hover {
  background-color: #4db7a9;
  color: #fff;
}
.searchText {
  width: 46.8125rem; /* 749px */
  height: 4.75rem; /* 76px */
  padding-left: 1.25rem; /* 20px */
  border-top: 0.125rem solid #4db7a9; /* 2px */
  border-bottom: 0.125rem solid #4db7a9; /* 2px */
}
.searchBtn {
  vertical-align: -0.5rem; /* -8px */
  width: 5.0625rem; /* 81px */
  height: 5rem; /* 80px */
  border-top: 0.125rem solid #4db7a9; /* 2px */
  border-right: 0.125rem solid #4db7a9; /* 2px */
  border-bottom: 0.125rem solid #4db7a9; /* 2px */
  border-top-right-radius: 3.125rem; /* 50px */
  border-bottom-right-radius: 3.125rem; /* 50px */
  background-color: #fff;
  color: #4db7a9;
}
.searchIcon {
  width: 1.9375rem; /* 31px */
  height: 1.875rem; /* 30px */
  cursor: pointer;
}
/* iphone 6/7/8 Plus */
@media screen and (max-width: 414px) {
  #boardSearch {
    margin: 0 auto;
    width: 21.875rem; /* 350px */
    min-width: 21.875rem; /* 350px */
    max-width: 21.875rem; /* 350px */
    margin-top: 2.5rem; /* 40px */
  }
  .searchOption {
    width: 5.625rem; /* 90px */
    height: 2.625rem; /* 42px */
    border-top-left-radius: 1.25rem; /* 20px */
    border-top-right-radius: 1.25rem; /* 20px */
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    font-size: 0.875rem; /* 14px */
    padding-right: 1.0625rem; /* 17px */
    font-family: YDIYGO120;
  }
  .searchText {
    width: 13.125rem; /* 210px */
    height: 2.375rem; /* 38px */
    padding: 0 0.625rem; /* 0 10px */
    border-top: 0;
    border-bottom: 0.125rem solid #4db7a9; /* 2px */
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .searchBtn {
    vertical-align: -0.5rem; /* -8px */
    width: 1.875rem; /* 30px */
    height: 2rem; /* 32px */
    border-top: 0;
    border-right: 0;
    border-bottom: 0.125rem solid #4db7a9; /* 2px */
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #fff;
    color: #4db7a9;
  }
  .searchIcon {
    width: 1.25rem; /* 20px */
    height: 1.25rem; /* 20px */
  }
}
/* iphone 5/SE */
@media screen and (max-width: 320px) {
  #boardSearch {
    width: 19.375rem; /* 310px */
    min-width: 19.375rem; /* 310px */
    max-width: 19.375rem; /* 310px */
  }
  .searchText {
    width: 10.625rem; /* 170px */
  }
}
</style>
