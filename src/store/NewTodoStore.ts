import * as Vuex from 'vuex';
import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper';
import { Todo } from '@/models/Todo';
import * as uuid from 'uuid';

// インターフェース宣言
export interface INewTodoState {
  id: string;
  body: string;
}

export interface INewTodoMutations {
  refresh: {};
  update: Event;
}

export interface INewTodoActions {
  submit: {
    body: string;
  };
  update: Event;
}

const state: INewTodoState = {
  id: uuid.v4(),
  body: '',
};

const mutations: DefineMutations<INewTodoMutations, INewTodoState> = {
  // 初期化
  refresh(state, _) {
    state.body = '';
    state.id = uuid.v4();
  },
  // 更新
  update(state, payload) {
    // inputタグ要素をpayload.targetが持っていた場合
    if (payload.target instanceof HTMLInputElement) {
      // bodyに引数の値をを代入
      state.body = payload.target.value;
    }
  },
};

const actions: DefineActions<INewTodoActions, INewTodoState, INewTodoMutations, {}> = {
  // 登録
  submit(context, _) {
    // todoインスタンス作成
    const newTodo = new Todo(
      context.state.id,
      context.state.body,
      false,
    );
    // todo内容の初期化
    context.commit('refresh', _);
    // todo内容の登録
    context.commit('todos/add', { todo: newTodo }, { root: true });
  },
  // 更新
  update(context, payload) {
    // ストアの更新
    context.commit('update', payload);
  },
};

export class NewTodoModule implements Vuex.Module<INewTodoState, any> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
}

export const createNewTodoModule = () => {
  return new NewTodoModule();
};
