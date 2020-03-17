<template>
  <li :class="{'active': tabData.active, 'loading': tabData.loading}">{{tabData.meta.title}}<span class="btn-close" @click.stop="close" v-show="!isIndexPage">&times;</span></li>
</template>
<script>
  export default {
    data(){
      return {
        isIndexPage: false
      }
    },
    mounted(){
      this.showCloseIcon();
    },
    props: {
      tabData: Object
    },
    methods: {
      showCloseIcon(){
        if(this.tabData.name === "indexPage"){
          //首页，不可关闭，隐藏关闭图标
          this.isIndexPage = true;
        }
      },
      close () {
        this.$emit('close', this.tabData)
      }
    }
  }
</script>
