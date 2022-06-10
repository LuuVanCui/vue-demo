<script>

let id = 0;

export default {
  
  data() {
    return {
      message: "I love you",
      count: 0,
      titleClass: 'title',
      text: '',
      awesome: true,
      newTodo: '',
      todos: [
        { id: id++, text: "Learn HTML", done: true },
        { id: id++, text: "Learn JS", done: true },
        { id: id++, text: "Learn Vue", done: false }
      ],
      hideCompleted: false,
      
      // watches
      todoId: 1,
      todoData: null
    }
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted ? this.todos.filter(t => !t.done) : this.todos
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    toggle() {
      this.awesome = !this.awesome;
    },
    addTodo() {
      this.todos.push({id: id++, text: this.newTodo})
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo)
    },
    async fetchData() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${this.todoId}`);
      this.todoData = await res.json()
    }
  },
  mounted() {
    this.$refs.p.textContent = 'mounted!';
    this.fetchData();
  },
  watch: {
    todoId() {
      this.fetchData();
    }
  }
}
</script>

<template>
  <!-- Declarative Rendering -->
  <h1>{{message}}</h1>

  <!-- Event Listeners -->
  <button @click="increment">Counter is: {{count}}</button>

  <!-- Attribute Bindings -->
  <h1 :class="titleClass">Make me red</h1>

  <!-- Form Bindings -->
  <input v-model="text" placeholder="Type here">
  <p>{{text}}</p>

  <!-- Conditional Rendering -->
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>

  <!-- List Rendering -->
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{todo.text}}</span> 
      <button @click="removeTodo(todo)">x</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">{{ hideCompleted ? 'Show all' : 'Hide Completed'}}</button>

  <!-- Lifecycle and Template Refs -->
  <p ref="p">Hello</p>

  <!-- Watchers -->
  <p>Todo id: {{ todoId }}</p>
  <button @click="todoId++">Fetch next todo</button>
  <p v-if="!todoData">Loading...</p>
  <p v-else>{{todoData}}</p>
</template>

<style>
.title {
  color: red;
}

.done {
  text-decoration: line-through;
}
</style>