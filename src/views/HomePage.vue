<template>
    <div id="home-page">
      <h1>Welcome to Our E-Commerce Platform</h1>
      <p>
        Explore our wide range of products, handpicked just for you! From the latest
        gadgets to stylish apparel, we've got everything you need to make your life easier and more enjoyable.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
  };
  </script>
  
  <style scoped>
  #home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
    background: linear-gradient(120deg, #f6d365, #fda085);
    color: #fff;
    padding: 20px;
  }
  
  #home-page h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  #home-page p {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  }
  </style>
  