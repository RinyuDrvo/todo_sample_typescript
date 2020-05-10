<template>
  <div>
    <input
      type="checkbox"
      :checked="hasDone"
      @click="hasDone ? undone() : done()"
    >
    {{ todo.body }}
    <button @click="remove">削除</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ITodoState, ITodoGetters } from '@/store/TodoStore';
import { createNamespacedFnHelpers } from '@/vuexz/mapper';

@Component
export default class Todo extends Vue {
  @Prop() private id!: string;
  public beforeCreate() {
    // todo.idを元に名前空間を作り、各map~~~を作る
    const { mapState, mapGetters, mapActions } = createNamespacedFnHelpers(() => `todos/${this.id}`);
    // todo内容と実行済み状態を取得
    this.$options.computed = {
      ...mapState(['todo']),
      ...mapGetters(['hasDone']),
    };
    // ストアのactionsメソッドを取得
    this.$options.methods = {
      ...mapActions(['done', 'undone', 'remove']),
    };
  }
}
</script>