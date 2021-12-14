<!--搜索与重置-->
<template>
  <span>
    <el-button v-if="optShow.search" class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <el-button v-if="optShow.reset" class="filter-item" size="mini" type="warning" icon="el-icon-refresh-left" @click="resetQuery">重置</el-button>
    <slot name="right"></slot>
  </span>
</template>
<script>
export default {
  props: {
    optShow: {
      type: Object,
      required: true
    }
  },
  methods: {
    toQuery() {
      this.$emit('query')
    },
    resetQuery() {
      this.$emit('reset')
    }
  }
}
</script>
