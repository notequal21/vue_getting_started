<template>
  <div v-if="posts.length > 0">
    <h3>
      Список пользователей
    </h3>
    <transition-group name="post-list">
      <post-item v-for="post in posts" :key="post.id" :post='post' @remove="$emit('remove', post)" />
    </transition-group>
  </div>
  <h2 v-else>Постов нет</h2>
</template>

<script>
import PostItem from "./PostItem.vue"
export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.2s ease-in-out;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translate(100%, 0);
}
.post-list-move {
  transition: all 0.2s ease-in-out;
}

</style>