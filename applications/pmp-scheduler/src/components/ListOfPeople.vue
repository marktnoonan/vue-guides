<template>
<Div>
    <div class="people-list">
        <span v-for="person in value" class="person person-individual">{{person}}</span>
    </div>

<!--Add: <select name="" id="">
        <option v-for="person in availablePeople">{{person}}</option>
    </select> 
    <button class="btn btn-default btn-xs">Confirm</button>
    <div class="employees v-select">
        Employees: <span class="employee" v-for="employee in baselines[currentDayType][requestedTimepoint][location].employees">{{employee}}</span>
      </div>
    -->
</Div>
</template>

<<script>
export default {
 data(){
     return {
         thing: "thing!!"
     }
 },
 props:[ "availablePeople", "value"]
  
}
</script>

<style scoped>
.person{
    background-color: #fff;
    margin: 2px;
    padding: 2px;
    font-size: 12px;
    border: 1px solid #888;
    border-radius: 4px;
}

.people-list {
    margin-bottom: 1px;
    min-height: 26px;
    background-color: #cfcfcf;
    padding: 2px 2px 4px 2px;
    border-radius: 4px;
}
</style>

