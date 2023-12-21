<!-- MainContent.vue -->
<template>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
  }
  </style>
  