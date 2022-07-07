<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/mb-logo.png">       
  </div>
  <div>
     <TravelRoute />
  </div>
</template>

<script>
// @ is an alias to /src
import TravelRoute from '@/components/TravelRouteView.vue'

export default {
  name: 'HomeView',
  components: {
    TravelRoute,
  }
}
</script>
