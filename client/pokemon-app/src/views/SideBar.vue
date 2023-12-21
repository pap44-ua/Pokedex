<!-- Sidebar.vue -->
<template>
    <div class="sidebar">
      <router-link to="/">Home</router-link>
      <router-link to="/pokemon">Pokemons</router-link>

    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #666464;
    padding: 20px;
    color: white;
  }
  
  .sidebar a {
    display: block;
    margin-bottom: 10px;
    color: white;
    text-decoration: none;
  }
  
  .sidebar a:hover {
    text-decoration: underline;
  }
  </style>
  