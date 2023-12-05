<template>
  <div class="container mt-5">
    <h1>Holidays</h1>
    <div v-if="holidayStore.loading" class="mb-3">Loading...</div>
    <div v-if="!holidayStore.loading">
      <div
        v-for="holiday in holidayStore.holidays"
        :key="holiday.id"
        class="card mb-3"
      >
        <div
          class="card-body d-flex justify-content-between align-items-center"
        >
          <p class="card-text">
            <strong> {{ holiday.title }}</strong>
          </p>
          <p class="card-text">Start Date: {{ holiday.startDate }}</p>
          <p class="card-text">Duration: {{ holiday.duration }}</p>
          <p class="card-text">Price: ${{ holiday.price }}</p>
          <p class="card-text">Free slots: {{ holiday.freeSlots }}</p>
          <p class="card-text">
            Location:
            {{ holiday.location.street }}, {{ holiday.location.number }},
            {{ holiday.location.city }}, {{ holiday.location.country }}
          </p>
          <div>
            <button
              @click="deleteHoliday(holiday.id)"
              class="btn btn-danger me-2"
            >
              Delete
            </button>
            <button @click="showEditForm(holiday)" class="btn btn-primary">
              Edit
            </button>
          </div>
        </div>
        <!-- edit -->
        <div v-if="showEdit && editedHoliday === holiday.id">
          <form @submit.prevent="updateHoliday(holiday)" class="m-3">
            <div class="row g-3">
              <div class="col-md-4">
                <label for="title" class="form-label">Title</label>
                <input
                  v-model="editFormData.title"
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Title"
                />
              </div>
              <div class="col-md-2">
                <label for="startDate" class="form-label">Start Date</label>
                <input
                  v-model="editFormData.startDate"
                  type="date"
                  class="form-control"
                  id="startDate"
                />
              </div>

              <div class="col-md-3">
                <label for="duration" class="form-label">Duration (days)</label>
                <input
                  v-model="editFormData.duration"
                  type="number"
                  class="form-control"
                  id="duration"
                  placeholder="Duration"
                />
              </div>
              <div class="col-md-3">
                <label for="price" class="form-label">Price</label>
                <input
                  v-model="editFormData.price"
                  type="number"
                  class="form-control"
                  id="price"
                  placeholder="Price"
                />
              </div>

              <div class="col-md-3">
                <label for="freeSlots" class="form-label">Free Slots</label>
                <input
                  v-model="editFormData.freeSlots"
                  type="number"
                  class="form-control"
                  id="freeSlots"
                  placeholder="Free Slots"
                />
              </div>

              <div class="col-md-3">
                <label for="location" class="form-label">Location</label>
                <select
                  v-model="editFormData.location"
                  class="form-select"
                  id="location"
                >
                  <option value="" disabled>Select a location</option>
                  <option
                    v-for="location in holidayStore.locations"
                    :key="location.id"
                    :value="location.id"
                  >
                    {{ location.street }} {{ location.number }},
                    {{ location.city }},
                    {{ location.country }}
                  </option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn btn-success mt-3">
              Update Holiday
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- create location  -->
  <div class="container mt-5">
    <h1>Create Holiday</h1>
    <form @submit="createHoliday">
      <div class="mb-3">
        <label for="location" class="form-label">Location</label>
        <select v-model="formData.location" class="form-select" id="location">
          <option value="" disabled>Select a location</option>
          <option
            v-for="location in holidayStore.locations"
            :key="location.id"
            :value="location.id"
          >
            {{ location.street }} {{ location.number }}, {{ location.city }},
            {{ location.country }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          v-model="formData.title"
          type="text"
          class="form-control"
          id="title"
          placeholder="Title"
        />
      </div>
      <div class="mb-3">
        <label for="startDate" class="form-label">Start Date</label>
        <input
          v-model="formData.startDate"
          type="date"
          class="form-control"
          id="startDate"
        />
      </div>
      <div class="mb-3">
        <label for="duration" class="form-label">Duration (days)</label>
        <input
          v-model="formData.duration"
          type="number"
          class="form-control"
          id="duration"
          placeholder="Duration"
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input
          v-model="formData.price"
          type="number"
          class="form-control"
          id="price"
          placeholder="Price"
        />
      </div>
      <div class="mb-3">
        <label for="freeSlots" class="form-label">Free Slots</label>
        <input
          v-model="formData.freeSlots"
          type="number"
          class="form-control"
          id="freeSlots"
          placeholder="Free Slots"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import apiService from "@/services/apiService";
import { ref, onMounted } from "vue";
import { useHolidayStore } from "@/store/holidayStore";

const holidayStore = useHolidayStore();

const formData = ref({
  title: "",
  startDate: "",
  duration: "",
  price: "",
  freeSlots: "",
  location: "",
});

const editFormData = ref({
  title: "",
  startDate: "",
  duration: "",
  price: "",
  freeSlots: "",
  location: "",
});

const showEdit = ref(false);
const editedHoliday = ref(null);

const showEditForm = (holiday) => {
  editFormData.value = { ...holiday };
  editedHoliday.value = holiday.id;
  showEdit.value = true;

  const locationIndex = holidayStore.locations.findIndex(
    (location) => location.id === holiday.location.id
  );

  if (locationIndex !== -1) {
    editFormData.value.location = holidayStore.locations[locationIndex].id;
  }
};

const updateHoliday = async (holiday) => {
  try {
    const updateData = {
      id: holiday.id,
      title: editFormData.value.title,
      startDate: editFormData.value.startDate,
      duration: editFormData.value.duration,
      price: editFormData.value.price,
      freeSlots: editFormData.value.freeSlots,
      location: editFormData.value.location,
    };

    await apiService.updateHoliday(updateData);
    holidayStore.fetchData();
    showEdit.value = false;
    editedHoliday.value = null;
  } catch (error) {
    console.error("Error updating holiday:", error);
  }
};

const createHoliday = async () => {
  try {
    await apiService.createHoliday(formData.value);
    holidayStore.fetchData();
  } catch (error) {
    console.error("Error creating holiday:", error);
  }
};

const deleteHoliday = async (id) => {
  try {
    await apiService.deleteHoliday(id);
    holidayStore.fetchData();
  } catch (error) {
    console.error("Error deleting holiday:", error);
  }
};

onMounted(() => {
  holidayStore.fetchData();
});
</script>
