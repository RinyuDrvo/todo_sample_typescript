<template>
  <div>
    <input
      type="text"
      :value="body"
      @input="update"
      @keyup.enter="submit"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { createNamespacedHelpers } from 'vuex';

@Component
export default class NewTodo extends Vue {
  public beforeCreate() {
    const { mapState, mapActions } = createNamespacedHelpers('todos/new');
    this.$options.computed = {
      ...mapState(['body']),
    };
    // 更新
    this.$options.methods = {
      ...mapActions(['submit', 'update']),
    };
  }
}
</script>