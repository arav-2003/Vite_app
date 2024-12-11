<template>
  <div id="app">
    <header>
      <h1>Vite-commerce Site</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/product">Products</router-link>
        <router-link to="/cart">Cart</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #f8f8f8;
}
nav a {
  margin: 0 1em;
}
</style>
