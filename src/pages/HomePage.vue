<template>
  <div class="container mt-5">
    <h1 class="mb-4">Home Page</h1>
    <div v-if="holidayStore.loading" class="text-muted">Loading...</div>
    <div v-else>
      <!-- Holidays -->
      <div class="mb-4">
        <h3>Holidays</h3>
        <div class="list-group">
          <div v-for="holiday in holidayStore.holidays" :key="holiday.id" class="list-group-item">
            <p class="mb-0">{{ holiday }}</p>
          </div>
        </div>
      </div>
      
      <!-- Locations -->
      <div>
        <h3>Locations</h3>
        <div class="list-group">
          <div v-for="location in holidayStore.locations" :key="location.id" class="list-group-item">
            <p class="mb-0">{{ location }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHolidayStore } from "@/store/holidayStore";
import { onMounted } from "vue";

const holidayStore = useHolidayStore();

onMounted(() => {
  holidayStore.fetchData();
});
</script>
