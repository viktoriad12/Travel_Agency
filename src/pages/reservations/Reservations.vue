<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="mb-3">
          <label for="locationId" class="form-label">Location ID:</label>
          <input
            type="text"
            class="form-control"
            id="locationId"
            v-model="locationId"
          />
        </div>
        <div class="mb-3">
          <label for="startDate" class="form-label">Start Date:</label>
          <input
            type="date"
            class="form-control"
            id="startDate"
            v-model="startDate"
          />
        </div>
        <div class="mb-3">
          <label for="duration" class="form-label">Duration:</label>
          <input
            type="number"
            class="form-control"
            id="duration"
            v-model="duration"
          />
        </div>
        <button class="btn btn-primary" @click="fetchHolidaysData">
          Find a Holiday
        </button>
      </div>
      <div class="col-md-8">
        <div v-for="holiday in holidays" :key="holiday.id" class="card mb-3">
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
              <div v-if="reservationForm.holidayId === holiday.id" class="mt-3">
                <h6>Reservation Details</h6>
                <div class="mb-3">
                  <label for="contactName" class="form-label"
                    >Contact Name:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="contactName"
                    v-model="reservationForm.contactName"
                  />
                </div>
                <div class="mb-3">
                  <label for="phoneNumber" class="form-label"
                    >Phone Number:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="phoneNumber"
                    v-model="reservationForm.phoneNumber"
                  />
                </div>
                <button
                  class="btn btn-success"
                  @click="createReservation(holiday.id)"
                >
                  Confirm Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- search, edit, delete -->
  <div class="container mt-5">
    <h1>Find Reservation</h1>
    <div class="mb-3">
      <label for="searchPhoneNumber" class="form-label"
        >Search by Phone Number:</label
      >
      <input
        type="text"
        class="form-control"
        id="searchPhoneNumber"
        v-model="searchPhoneNumber"
      />
    </div>
    <button class="btn btn-primary" @click="findReservation">Search</button>

    <div v-if="foundReservation" class="mt-4">
      <h3>Found Reservation</h3>
      <ul class="list-group">
        <li class="list-group-item">
          {{ foundReservation.contactName }} -
          {{ foundReservation.phoneNumber }}

          <p>{{ foundReservation.holiday.title }}</p>
          <p>{{ foundReservation.holiday.startDate }}</p>
          <p>
            {{ foundReservation.holiday.location.city }},
            {{ foundReservation.holiday.location.country }}
          </p>

          <div class="mt-2">
            <button class="btn btn-primary" @click="editFoundReservation">
              Edit
            </button>
            <button class="btn btn-danger" @click="deleteFoundReservation">
              Delete
            </button>
          </div>

          <!-- Edit form for the found reservation -->
          <div v-if="showEditForm" class="mt-3">
            <h6>Edit Reservation</h6>
            <div class="mb-3">
              <label for="editContactName" class="form-label"
                >Contact Name:</label
              >
              <input
                type="text"
                class="form-control"
                id="editContactName"
                v-model="editForm.contactName"
              />
            </div>
            <div class="mb-3">
              <label for="editPhoneNumber" class="form-label"
                >Phone Number:</label
              >
              <input
                type="text"
                class="form-control"
                id="editPhoneNumber"
                v-model="editForm.phoneNumber"
              />
            </div>
            <button class="btn btn-success" @click="updateFoundReservation">
              Update Reservation
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
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

// edit logic

const searchPhoneNumber = ref("");
const foundReservation = ref(null);
const showEditForm = ref(false);

const editForm = ref({
  id: null,
  contactName: "",
  phoneNumber: "",
});

const findReservation = () => {
  const reservation = holidayStore.findReservationByPhoneNumber(
    searchPhoneNumber.value
  );

  foundReservation.value = reservation ? reservation : null;
};

const editFoundReservation = () => {
  editForm.value.contactName = foundReservation.value.contactName;
  editForm.value.phoneNumber = foundReservation.value.phoneNumber;
  showEditForm.value = true;
};

const updateFoundReservation = async () => {
  try {
    const updatedReservation = {
      id: foundReservation.value.id,
      contactName: editForm.value.contactName,
      phoneNumber: editForm.value.phoneNumber,
      holiday: foundReservation.value.holiday.id,
    };

    await holidayStore.updateReservation(updatedReservation);
    showEditForm.value = false;

    const updated = await holidayStore.fetchReservationById(
      foundReservation.value.id
    );
    if (updated) {
      foundReservation.value = updated;
    }
  } catch (error) {
    console.error("Error updating reservation:", error);
  }
};

const deleteFoundReservation = async () => {
  try {
    await holidayStore.deleteReservation(foundReservation.value.id);
    foundReservation.value = null;
  } catch (error) {
    console.error("Error deleting reservation:", error);
  }
};

const fetchHolidaysData = async () => {
  try {
    holidays.value = await holidayStore.fetchHolidaysForReservation(
      locationId.value,
      startDate.value,
      duration.value
    );
  } catch (error) {
    console.error("Error fetching holidays:", error);
  }
};

onMounted(() => {
  holidayStore.fetchData();
});
</script>
