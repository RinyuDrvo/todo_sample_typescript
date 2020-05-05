import * as Vuex from 'vuex';
import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper';
import { Todo } from '@/models/Todo';

// インターフェース宣言
export interface ITodoState {
  todo: Todo;
}

export interface ITodoGetters {
  hasDone: boolean;
}

export interface ITodoMutations {
  done: {};
  undone: {};
}

export interface ITodoActions {
  done: {};
  undone: {};
  remove: {};
}

class TodoState implements ITodoState {
  public todo: Todo;
  constructor(todo: Todo) {
    this.todo = todo;
  }
}

const getters: DefineGetters<ITodoGetters, ITodoState> = {
  // 実行済み
  hasDone(state) {
    return state.todo.hasDone;
  },
};

const mutations: DefineMutations<ITodoMutations, ITodoState> = {
  // 実行
  done(state, _) {
    state.todo.hasDone = true;
  },
  // 元に戻す
  undone(state, _) {
    state.todo.hasDone = false;
  },
};

const actions: DefineActions<ITodoActions, ITodoState, ITodoMutations, ITodoGetters> = {
  // 実行
  done(context, payload) {
    context.commit('done', payload);
  },
  // 元に戻す
  undone(context, payload) {
    context.commit('undone', payload);
  },
  // 削除
  remove(context, _) {
    context.commit('todos/remove', { todo: context.state.todo }, { root: true });
  },
};

export class TodoModule implements Vuex.Module<ITodoState, any> {
  public state: ITodoState;
  public namespaced = true;
  public getters = getters;
  public mutations = mutations;
  public actions = actions;
  constructor(todo: Todo) {
    this.state = new TodoState(todo);
  }
}

export const createTodoModule = (todo: Todo) => {
  return new TodoModule(todo);
};
