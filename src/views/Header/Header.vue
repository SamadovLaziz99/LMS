<template>
  <div class="header">
    <div class="div-1">

    </div>
    <div class="div-2">
      <Dropdown />
    </div>
  </div>
</template>

<script>
import Dropdown from './Dropdown';
export default {
  components: { Dropdown }
}


</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}
.div-1 {
  color: #ffffff;
}

@media only screen and (max-width: 768px) {
  .div-2 {
    margin-top: 8px;
  }
}


</style>