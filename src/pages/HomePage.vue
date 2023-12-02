<template>
  <h1>Home</h1>
  {{ locations[0] }}
</template>

<script setup>
import api from "@/services/apiService";
import { onMounted, ref } from "vue";
let locations = ref([]);

const fetchHolidays = async () => {
  try {
    locations = await api.fetchHolidays();
    console.log("total:" + locations.length), console.log(locations);
  } catch (error) {
    console.error("Error fetching journeys:", error);
  }
};

onMounted(() => {
  fetchHolidays();
});
</script>
