<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8">
        <div class="card pe-4 mb-5" style="height: 700px; overflow-y: scroll">
          <div class="card-body">
            <h1>Holidays</h1>
            <div v-if="holidayStore.loading" class="mb-3">Loading...</div>
            <div v-if="!holidayStore.loading">
              <div
                v-for="holiday in holidayStore.holidays"
                :key="holiday.id"
                class="card mb-3"
              >
                <div class="card-body">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5 class="card-title mb-2">
                        <strong>{{ holiday.title }}</strong>
                      </h5>
                      <p class="card-text mb-1">
                        Start Date: {{ holiday.startDate }}
                      </p>
                      <p class="card-text mb-1">
                        Duration: {{ holiday.duration }}
                      </p>
                      <p class="card-text mb-1">Price: ${{ holiday.price }}</p>
                      <p class="card-text mb-1">
                        Free Slots: {{ holiday.freeSlots }}
                      </p>
                    </div>
                    <div>
                      <p class="card-text mb-0">
                        <span class="fw-bold">Location:</span><br />
                        {{ holiday.location.street }},
                        {{ holiday.location.number }},<br />
                        {{ holiday.location.city }},
                        {{ holiday.location.country }}
                      </p>
                      <div>
                        <button
                          @click="deleteHoliday(holiday.id)"
                          class="btn btn-danger me-2"
                        >
                          Delete
                        </button>
                        <button
                          @click="showEditForm(holiday)"
                          class="btn btn-primary"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
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
                        <label for="startDate" class="form-label"
                          >Start Date</label
                        >
                        <input
                          v-model="editFormData.startDate"
                          type="date"
                          class="form-control"
                          id="startDate"
                        />
                      </div>

                      <div class="col-md-3">
                        <label for="duration" class="form-label"
                          >Duration (days)</label
                        >
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
                        <label for="freeSlots" class="form-label"
                          >Free Slots</label
                        >
                        <input
                          v-model="editFormData.freeSlots"
                          type="number"
                          class="form-control"
                          id="freeSlots"
                          placeholder="Free Slots"
                        />
                      </div>

                      <div class="col-md-3">
                        <label for="location" class="form-label"
                          >Location</label
                        >
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

                    <button type="submit" class="btn btn-success mt-4">
                      Update Holiday
                    </button>
                    <button
                      @click="cancelEdit"
                      class="btn btn-secondary mt-4 btn-cancel"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- create location  -->
      <div class="col-md-4">
        <div class="card pe-4" style="height: 700px">
          <div class="card-body">
            <h1>Create A New Holiday</h1>
            <form @submit="createHoliday">
              <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <select
                  v-model="formData.location"
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
              <button type="submit" class="btn btn-primary">
                Create Holiday
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
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

const cancelEdit = () => {
  showEdit.value = false;
  editedHoliday.value = null;
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

<style scoped>
.card {
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  padding-bottom: 15px;
}

.btn-cancel {
  margin-left: 10px;
}
</style>
