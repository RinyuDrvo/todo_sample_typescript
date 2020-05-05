import * as Vuex from 'vuex';
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper';
import { Todo } from '@/models/Todo';
import { createTodoModule } from './TodoStore';
import * as uuid from 'uuid';
import { createNewTodoModule } from './NewTodoStore';
import { PluggableModule } from '@/vuexz/PluggableModule';

// インターフェース宣言
export interface ITodoListState {
  todos: Todo[];
}

export interface ITodoListMutations {
  add: {
    todo: Todo;
  };
  remove: {
    todo: Todo;
  };
}

export interface ITodoListActions {
  add: {
    todo: Todo;
  };
  remove: {
    todo: Todo;
  };
}

const state: ITodoListState = {
  todos: [
    new Todo(
      uuid.v4(),
      'タスク1',
      false,
    ),
    new Todo(
      uuid.v4(),
      'タスク2',
      false,
    ),
    new Todo(
      uuid.v4(),
      'タスク3',
      false,
    ),
  ],
};

const getters: DefineGetters<{}, ITodoListState> = {};

const mutations: DefineMutations<ITodoListMutations, ITodoListState> = {
  // 追加
  add(state, { todo }) {
    state.todos.push(todo);
  },
  // 削除
  remove(state, { todo }) {
    state.todos = state.todos.filter((item) => item.id !== todo.id);
  },
};

const actions: DefineActions<ITodoListActions, ITodoListState, ITodoListMutations, {}> = {
  // 追加
  add(context, payload) {
    context.commit('add', payload);
  },
  // 削除
  remove(context, payload) {
    context.commit('remove', payload);
  },
};

// モジュールの動的な追加・削除
// mutationへのcommitのフック
const plugin = (store: Vuex.Store<any>) => {
  state.todos.forEach((todo) => {
    // モジュールの数だけ追加
    store.registerModule('todos/' + todo.id, createTodoModule(todo));
  });
  // ミューテーションが変化したら購読
  store.subscribe((mutation, _) => {
    if (mutation.type === 'todos/add') {
      // todo追加であれば
      // mutationの値を読み込む
      const todo = mutation.payload.todo as Todo;
      // モジュールを追加
      store.registerModule('todos/' + todo.id, createTodoModule(todo));
    } else if (mutation.type === 'todos/remove') {
      // todo削除であれば
      // mutationの値を読み込む
      const todo = mutation.payload.todo as Todo;
      // モジュールを削除
      store.unregisterModule('todos/' + todo.id);
    }
  });
};

export const createTodoListModule = (store: Vuex.Store<any>) => {
  return new PluggableModule<ITodoListState, any>({
    store,
    namespaced: true,
    state,
    actions,
    mutations,
    plugins: [plugin],
    modules: {
      new: createNewTodoModule(),
    },
  });
};
