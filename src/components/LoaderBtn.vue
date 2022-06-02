<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'LoaderBtn',
};
</script>

<style>
.loader {
  border: 2px solid transparent;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  margin: 0 7px 0 -20px;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
