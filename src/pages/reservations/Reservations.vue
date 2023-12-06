<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="card pe-4" style="height: 500px; overflow-y: scroll">
          <div class="card-body">
            <h2 class="mb-4 mt-3">Find A Holiday</h2>
            <div class="mb-4">
              <label for="locationId">Location ID:</label>
              <input
                type="text"
                class="form-control"
                id="locationId"
                v-model="locationId"
              />
            </div>
            <div class="mb-4">
              <label for="startDate">Start Date:</label>
              <input
                type="date"
                class="form-control"
                id="startDate"
                v-model="startDate"
              />
            </div>
            <div class="mb-4">
              <label for="duration">Duration:</label>
              <input
                type="number"
                class="form-control"
                id="duration"
                v-model="duration"
              />
            </div>
            <button class="btn btn-primary mt-4" @click="fetchHolidaysData">
              Find a Holiday
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card pe-4" style="height: 500px; overflow-y: scroll">
          <div class="card-body">
            <div
              v-for="holiday in holidays"
              :key="holiday.id"
              class="card mb-3"
            >
              <div class="card-body">
                <h5 class="card-title">{{ holiday.title }}</h5>
                <p class="card-text">
                  {{ holiday.startDate }} - Duration: {{ holiday.duration }}
                </p>
                <div class="mb-3">
                  <button
                    class="btn btn-primary"
                    @click="openReservationForm(holiday.id)"
                  >
                    Reserve
                  </button>
                  <div
                    v-if="reservationForm.holidayId === holiday.id"
                    class="mt-3"
                  >
                    <h5 class="form-label mb-3">Reservation Details</h5>
                    <div class="mb-3">
                      <label for="contactName">Contact Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="contactName"
                        v-model="reservationForm.contactName"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="phoneNumber">Phone Number:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="phoneNumber"
                        v-model="reservationForm.phoneNumber"
                      />
                    </div>
                    <button
                      class="btn btn-success mt-4"
                      @click="createReservation(holiday.id)"
                    >
                      Confirm Reservation
                    </button>
                    <button
                      @click="cancelReservation"
                      class="btn btn-secondary mt-4 btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useHolidayStore } from "@/store/holidayStore";

const holidayStore = useHolidayStore();

const locationId = ref(null);
const startDate = ref(null);
const duration = ref(null);
const holidays = ref([]);

const reservationForm = ref({
  holidayId: null,
  contactName: "",
  phoneNumber: "",
});

const openReservationForm = (holidayId) => {
  reservationForm.value = {
    holidayId,
    contactName: "",
    phoneNumber: "",
  };
};

const createReservation = async (holidayId) => {
  try {
    const reservationData = {
      contactName: reservationForm.value.contactName,
      phoneNumber: reservationForm.value.phoneNumber,
      holiday: holidayId,
    };

    await holidayStore.createReservation(reservationData);

    reservationForm.value = {
      holidayId: null,
      contactName: "",
      phoneNumber: "",
    };
  } catch (error) {
    console.error("Error creating reservation:", error);
  }
};

const cancelReservation = () => {
  reservationForm.value = {
    holidayId: null,
    contactName: "",
    phoneNumber: "",
  };
};

const fetchHolidaysData = async () => {
  try {
    if (
      locationId.value === null &&
      startDate.value === null &&
      duration.value === null
    ) {
      await holidayStore.fetchData();
      holidays.value = holidayStore.holidays;
    } else {
      holidays.value = await holidayStore.fetchHolidaysForReservation(
        locationId.value,
        startDate.value,
        duration.value
      );
    }
  } catch (error) {
    console.error("Error fetching holidays:", error);
  }
};

onMounted(() => {
  holidayStore.fetchData();
  fetchHolidaysData();
});
</script>

<style scoped>
.card {
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  padding-bottom: 15px;
}

.form-label {
  font-weight: bold;
}

.btn-cancel {
  margin-left: 10px;
}
</style>
