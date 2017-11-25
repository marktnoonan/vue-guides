<template>
<div class="col-md-4">
  <div class="event-card">
    <h4 class="card-title">{{workPeriod.date}}</h4>
    <p class="card-text">{{workPeriod.shortDescription}}</p>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Individuals: {{workPeriod.individuals}}</li>
      <li class="list-group-item">Location: {{workPeriod.location}}</li>
      <li class="list-group-item">Employee: {{workPeriod.employee}}</li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  props: ['workPeriod'],
  mounted() {
    console.log("mounted event-card")
  }
}
</script>
