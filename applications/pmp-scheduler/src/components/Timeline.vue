<template>
<div class="">
  <nav class="time">
    <input class="" type="date" v-model="activeDate"></input> ({{currentDayType}}) Time
    <select class="timepoints" v-model:value="requestedTimepoint" id="timepoint-selector">
     <option v-for="timepoint in todaysTimepoints" :value="timepoint">{{timepoint}}</option>
 </select><button type="button" class="btn btn-primary btn-xs" @click="playThroughDay" name="button">Play this day</button><button class="btn btn-default btn-xs">Add a timepoint</button>
  </nav>
  <h3>Timeline</h3>
  <hr>
  <div class="form locations">
    <div class="location-wrapper" v-for="location in locations">
      <div class="form-group location">
        <span class="location-label">{{location}}</span>
        <v-select multiple v-model="baselines[currentDayType][requestedTimepoint][location].individuals" :options="individuals"></v-select>
      </div>
      <div class="employees">
        Employees: <span class="employee" v-for="employee in baselines[currentDayType][requestedTimepoint][location].employees">{{employee}}</span>
      </div>
      <hr>
    </div>
  </div>
</div>
</template>

<script>
import {
  firebaseApp,
  workPeriodsRef
} from '../firebaseApp'
import AddWorkPeriod from './AddWorkPeriod.vue'
import EventItem from './EventItem.vue'
const moment = require('moment')

export default {
  data() {
    return {
      baselines: this.$store.state.baselines,
      activeDate: "2017-10-23",
      requestedTimepoint: "00:00",
      individuals: this.$store.state.individuals,
      dayTypes: Object.keys(this.$store.state.baselines),
      locations: ["center", "work", "galangale", "ncrestBachelors", "ncrestGentlemen", "ncrestLadies", "romelie", "hathaway", "eds", "family", "exception", "wolverines", "activity"],
      withFamilyDays: this.$store.state.withFamilyDays
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
      firebaseApp.auth().signOut()
    },
    playThroughDay() {
      let delay = 0;
      this.todaysTimepoints.forEach((el) => {
        setTimeout(() => {
          this.requestedTimepoint = el
          console.log(delay);
        }, delay)
        delay += 2000
      })
    }
  },
  components: {

  },
  filters: {

  },
  computed: {
    todaysTimepoints() {
      return Object.keys(this.$store.state.baselines[this.currentDayType])
    },
    currentDayType: { // this syntax works. Need to research details about getters and setters
      get: function() {

        // reset to midnight for the newly requested day
        this.requestedTimepoint = "00:00"

        function getDayOfWeek(date) {
          return moment(date).format('dddd')
        }
        let activeDate = this.activeDate
        let activeDayOfWeek = getDayOfWeek(activeDate)

        if (this.withFamilyDays.includes(activeDate)) {
          return "family" + activeDayOfWeek
        } else if (activeDayOfWeek === "Friday") {
          return "condoFriday"
        } else {
          let typeOfDay = "";
          // 5 is Friday
          let daysToNextFriday = 5 - moment(activeDate, "YYYY-MM-DD").weekday();
          let nextFridayDateString = moment(activeDate, "YYYY-MM-DD").add(daysToNextFriday, "days").format("YYYY-MM-DD");

          // "PreFamily Sundays" are really just "Condo Sundays"
          if (this.withFamilyDays.includes(nextFridayDateString) && activeDayOfWeek !== "Sunday") {
            console.log("condition met");
            typeOfDay = "preFamily";
          } else {
            typeOfDay = "condo";
          }
          return typeOfDay + activeDayOfWeek;
        }
      }
    }
  },
  updated() {
    console.log(this);
  }
}
</script>
