import Vue from 'vue';
import Vuex from 'vuex';
import { createTodoListModule } from '@/store/TodoListStore';

Vue.use(Vuex);

const store = new Vuex.Store({});

// todoリストモジュールを動的に登録する
store.registerModule('todos', createTodoListModule(store));

export default store;
