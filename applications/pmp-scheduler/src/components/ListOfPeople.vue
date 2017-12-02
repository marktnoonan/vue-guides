<template>
    <div>
        <div class="people-list" :class="{'has-people':currentValue}" :id="this.id">
            <span class="individual-count">{{currentValue}}</span>
            <span v-for="(person, index) in value" class="person person-individual" :key="index">
                {{person}} <span class="delete-person-x">☓</span>
            </span>
        </div>

        <!--Add: <select name="" id="">
        <option v-for="person in availablePeople">{{person}}</option>
    </select> 
    <button class="btn btn-default btn-xs">Confirm</button>
    <div class="employees v-select">
        Employees: <span class="employee" v-for="employee in baselines[currentDayType][requestedTimepoint][location].employees">{{employee}}</span>
    </div>
    -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                thing: "thing!!"
            }
        },
        computed: {
            currentValue() {
                return this.value.length
            }
        },
        props: ["availablePeople", "value", "id"]
    }
</script>

<style scoped>
    .person {
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

    .has-people {
        background-color: #ADDBB8;
        transition: background-color 0.2s ease-out;
    }
    .individual-count {
    }
    .delete-person-x {
        cursor: pointer;
    }
</style>