<template>
  <div class="container mt-5">
    <h1>Locations</h1>
    <div v-if="holidayStore.loading" class="mb-3">Loading...</div>
    <div v-if="!holidayStore.loading">
      <div
        v-for="location in holidayStore.locations"
        :key="location.id"
        class="card mb-3"
      >
        <div
          class="card-body d-flex justify-content-between align-items-center"
        >
          <p class="card-text">
            {{ location.street }} {{ location.number }}, {{ location.city }},
            {{ location.country }}
          </p>
          <div>
            <button
              @click="deleteLocation(location.id)"
              class="btn btn-danger me-2"
            >
              Delete
            </button>
            <button @click="showEditForm(location)" class="btn btn-primary">
              Edit
            </button>
          </div>
        </div>
        <!-- Edit location form -->
        <div v-if="showEdit && editedLocation === location.id">
          <form @submit.prevent="updateLocation(location)" class="m-3">
            <div class="row g-3">
              <div class="col-md-4">
                <label for="editStreet" class="form-label">Street</label>
                <input
                  v-model="editFormData.street"
                  type="text"
                  class="form-control"
                  id="editStreet"
                  placeholder="Street"
                />
              </div>
              <div class="col-md-2">
                <label for="editNumber" class="form-label">Number</label>
                <input
                  v-model="editFormData.number"
                  type="text"
                  class="form-control"
                  id="editNumber"
                  placeholder="Number"
                />
              </div>
              <div class="col-md-3">
                <label for="editCity" class="form-label">City</label>
                <input
                  v-model="editFormData.city"
                  type="text"
                  class="form-control"
                  id="editCity"
                  placeholder="City"
                />
              </div>
              <div class="col-md-3">
                <label for="editCountry" class="form-label">Country</label>
                <input
                  v-model="editFormData.country"
                  type="text"
                  class="form-control"
                  id="editCountry"
                  placeholder="Country"
                />
              </div>
            </div>
            <button type="submit" class="btn btn-success mt-3">
              Update Location
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- create location form -->
    <h1>Create Location</h1>
    <form @submit="createLocation" class="mt-4">
      <div class="row g-3">
        <div class="col-md-4">
          <label for="street" class="form-label">Street</label>
          <input
            v-model="formData.street"
            type="text"
            class="form-control"
            id="street"
            placeholder="Street"
          />
        </div>
        <div class="col-md-2">
          <label for="number" class="form-label">Number</label>
          <input
            v-model="formData.number"
            type="text"
            class="form-control"
            id="number"
            placeholder="Number"
          />
        </div>
        <div class="col-md-3">
          <label for="city" class="form-label">City</label>
          <input
            v-model="formData.city"
            type="text"
            class="form-control"
            id="city"
            placeholder="City"
          />
        </div>
        <div class="col-md-3">
          <label for="country" class="form-label">Country</label>
          <input
            v-model="formData.country"
            type="text"
            class="form-control"
            id="country"
            placeholder="Country"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-success mt-3">
        Create Location
      </button>
    </form>
  </div>
</template>

<script setup>
import apiService from "@/services/apiService";
import { ref, onMounted } from "vue";
import { useHolidayStore } from "@/store/holidayStore";

const holidayStore = useHolidayStore();

const formData = ref({
  street: "",
  number: "",
  city: "",
  country: "",
});

const editFormData = ref({
  street: "",
  number: "",
  city: "",
  country: "",
});

const showEdit = ref(false);
const editedLocation = ref(null);

const showEditForm = (location) => {
  editFormData.value = { ...location };
  editedLocation.value = location.id;
  showEdit.value = true;
};

const updateLocation = async (location) => {
  try {
    const updateDTO = {
      id: location.id,
      street: editFormData.value.street,
      number: editFormData.value.number,
      city: editFormData.value.city,
      country: editFormData.value.country,
    };

    console.log("updateDTO:", updateDTO);

    await apiService.updateLocation(updateDTO);
    holidayStore.fetchData();
    showEdit.value = false;
    editedLocation.value = null;
  } catch (error) {
    console.error("Error updating location:", error);
  }
};
const createLocation = async () => {
  try {
    await apiService.createLocation(formData.value);
    holidayStore.fetchData();
  } catch (error) {
    console.error("Error creating location:", error);
  }
};

const deleteLocation = async (id) => {
  try {
    await apiService.deleteLocation(id);
    holidayStore.fetchData();
  } catch (error) {
    console.error("Error deleting location:", error);
  }
};


onMounted(() => {
  holidayStore.fetchData();
});
</script>
