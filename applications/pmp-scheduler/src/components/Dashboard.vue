<template>
<div class="">
  <h3>View/Add Work Periods</h3>
  <button class="btn btn-danger btn-sm signout-btn" @click="signOut">Sign Out</button>
  <hr>
  <AddWorkPeriod />
  <hr>
  <div class="col-md-12">
    <EventItem
      v-for="(work_period, index) in this.$store.state.workPeriods"
      :workPeriod="work_period"
      key="index"
    />
  </div>
</div>
</template>

<script>
import { firebaseApp, workPeriodsRef } from '../firebaseApp'
import AddWorkPeriod from './AddWorkPeriod.vue'
import EventItem from './EventItem.vue'

export default {
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
      firebaseApp.auth().signOut()
    }
  },
  components: {
    AddWorkPeriod,
    EventItem
  },
  mounted() {
    workPeriodsRef.on('value', snap => {
      let workPeriods = []
      snap.forEach(workPeriod => {
        workPeriods.push(workPeriod.val())
      })
      this.$store.dispatch('setWorkPeriods', workPeriods)
      console.log("dispatched action setWorkPeriods with " + workPeriods.toString());
    })
  }
}
</script>
