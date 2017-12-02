
<!--
The navigation should have play this day, pause this day, next timepoint, previous timepoint, ADD timepoint, next day, and previous day controls

That's a lot of different UI things but it is the only way, I think. 

Time point should be expressed on a line, not on the select, and implemented with radio buttons behind the scenes
since it can only be one time at a time!

"add a timepoint" can exist between any to timepoints on the line? Maybe?

-->

<template>
<div class="">
  <nav class="time">
    <form class="form-inline">
          <input class="form-control" type="date" v-model="activeDate"></input> ({{currentDayType}}) Time
    <select class="timepoints" v-model="requestedTimepoint" id="timepoint-selector">
      <option v-for="timepoint in todaysTimepoints" :value="timepoint" :key="timepoint">{{timepoint}}</option>
    </select>
    <button 
      type="button" 
      class="btn btn-primary btn-xs" 
      @click="playThroughDay" 
      name="button">
      Play this day
      </button>
      
      <button class="btn btn-default btn-xs">Add a timepoint</button>

    </form>
  </nav>
  <h3>Timeline</h3>
  <hr>
  <Transportation />
  <div class="form locations">
    <div class="location-wrapper" v-for="(location, index) in locations" :key="location">
      <div class="form-group location">
        
        <span class="location-label"><b>{{location}}</b></span>
        <list-of-people v-model="baselines[currentDayType][requestedTimepoint][location].individuals" :available-people="individuals" :id="index" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { firebaseApp, workPeriodsRef } from "../firebaseApp";
import AddWorkPeriod from "./AddWorkPeriod.vue";
import EventItem from "./EventItem.vue";
import ListOfPeople from "./ListOfPeople.vue";
import Transportation from "./Transportation.vue";

const moment = require("moment");

export default {
  data() {
    return {
      baselines: this.$store.state.baselines,
      activeDate: "2017-10-23",
      requestedTimepoint: "00:00",
      individuals: this.$store.state.individuals,
      dayTypes: Object.keys(this.$store.state.baselines),
      locations: [
        "center",
        "work",
        "galangale",
        "ncrestBachelors",
        "ncrestGentlemen",
        "ncrestLadies",
        "romelie",
        "hathaway",
        "eds",
        "family",
        "exception",
        "wolverines",
        "activity"
      ],
      withFamilyDays: this.$store.state.withFamilyDays
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      firebaseApp.auth().signOut();
    },
    playThroughDay() {
      let delay = 0;
      this.todaysTimepoints.forEach(el => {
        setTimeout(() => {
          this.requestedTimepoint = el;
          console.log(delay);
        }, delay);
        delay += 2000;
      });
    }
  },
  components: {
    ListOfPeople,
    Transportation
  },
  filters: {},
  computed: {
    todaysTimepoints() {
      return Object.keys(this.$store.state.baselines[this.currentDayType]);
    },
    currentDayType: {
      // this syntax works. Need to research details about getters and setters
      get: function() {
        // reset to midnight for the newly requested day
        this.requestedTimepoint = "00:00";

        function getDayOfWeek(date) {
          return moment(date).format("dddd");
        }
        let activeDate = this.activeDate;
        let activeDayOfWeek = getDayOfWeek(activeDate);

        if (this.withFamilyDays.includes(activeDate)) {
          return "family" + activeDayOfWeek;
        } else if (activeDayOfWeek === "Friday") {
          return "condoFriday";
        } else {
          let typeOfDay = "";
          // 5 is Friday
          let daysToNextFriday = 5 - moment(activeDate, "YYYY-MM-DD").weekday();
          let nextFridayDateString = moment(activeDate, "YYYY-MM-DD")
            .add(daysToNextFriday, "days")
            .format("YYYY-MM-DD");

          // "PreFamily Sundays" are really just "Condo Sundays"
          if (
            this.withFamilyDays.includes(nextFridayDateString) &&
            activeDayOfWeek !== "Sunday"
          ) {
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
};
</script>
