<template lang="pug">
van-button(
  v-bind="$attrs"
)
</template>

<script>
export default {
  name: 'hk-button',
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
