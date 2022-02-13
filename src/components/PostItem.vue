<template>
  <div class="post">
    <div>
      <div class="post__title"><strong>Название:</strong> {{post.title}}</div>
      <div class="post__desc"><strong>Описание:</strong> {{post.body}}</div>
    </div>
    <div class="post-btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">Open</my-button>
      <my-button @click="$emit('remove', post)">Delete</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
  .post {
    margin: 20px 0 0 0;
    border: 1px solid black;
    &__title {

    }
    &__desc {
      margin: 5px 0 0 0;
    }
    &-btns {

    }
  }
</style>