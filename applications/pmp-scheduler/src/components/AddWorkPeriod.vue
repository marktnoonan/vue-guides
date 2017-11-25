<template>
  <div class="">
      <h4>Add Work Periods <input type="checkbox" v-model="showForm"> </h4>
      <div class="form" v-if="showForm">
        <h5>Work period for {{$store.state.activeEmployee}}</h5>
        <div class="form-group">
          <label>Date</label>
          <input type="date" class="form-control" v-model="workPeriod.date">
        </div>
        <div class="form-group">
          <label>Description</label>
          <input type="text" class="form-control" v-model="workPeriod.shortDescrption">
        </div>
        <div class="form-group">
          <label>Inidviduals</label>
          <v-select multiple v-model="workPeriod.individuals" :options="['foo','bar','baz','boop']"></v-select>
        </div>
        <div class="form-group">
          <label>Location</label>
          <input type="text" class="form-control" v-model="workPeriod.location">
        </div>
        <button class="btn-sml btn-primary" @click="addWorkPeriod">Submit</button>
      </div>
  </div>
</template>

<script>
import {workPeriodsRef} from '../firebaseApp'
export default {
  data(){
    return {
      workPeriod: {
        "dayType": "",
        "date": "",
        "start": "0000",
        "end": "2359",
        "employee": "",
        "location": "none",
        "individuals": ["some", "people", "already"],
        "shortDescrtiption": "",
        "instructionsToEmployee": "",
        "clientTransportationRequired": false,
        "vehicleAssigned": "",
        "workPeriods": []
      },
      showForm: false
    }
  },
  methods: {
    addWorkPeriod() {
      this.workPeriod.employee = this.$store.state.activeEmployee
      workPeriodsRef.push(this.workPeriod)
      console.log("added");
    }
  },
  computed: {
    getDayType(date){
      // PLACEHOLDER
      return "condoMonday";
    }
  },
  mounted(){
    console.log("mountedAddWorkPeriod component");
  }
}
</script>
