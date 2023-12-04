import axios from "axios";

const BASE_URL = "http://localhost:5173/travel-agency";

const instance = axios.create({
  baseURL: BASE_URL,
});

const api = {
  async fetchHolidays() {
    try {
      const response = await instance.get("/holidays");
      return response.data;
    } catch (error) {
      console.error("Error fetching journeys:", error);
      throw error;
    }
  },

  async fetchHolidayById(id) {
    try {
      const response = await instance.get(`/holidays/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching journey:", error);
      throw error;
    }
  },

  async createHoliday(holiday) {
    try {
      const response = await instance.post("/holidays", holiday);
      return response.data;
    } catch (error) {
      console.error("Error creating journey:", error);
      throw error;
    }
  },

  async updateHoliday(holiday) {
    try {
      await instance.put(`/holidays`, holiday);
    } catch (error) {
      console.error("Error updating journey:", error);
      throw error;
    }
  },

  async deleteHoliday(id) {
    try {
      await instance.delete(`/holidays/${id}`);
    } catch (error) {
      console.error("Error deleting journey:", error);
      throw error;
    }
  },

  async fetchLocations() {
    try {
      const response = await instance.get("/locations");
      return response.data;
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  },

  async fetchLocationById(id) {
    try {
      await instance.get(`/locations/${id}`);
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  },

  async createLocation(locationData) {
    try {
      await instance.post("/locations", locationData);
    } catch (error) {
      console.error("Error creating location:", error);
      throw error;
    }
  },

  async updateLocation(updateDTO) {
    try {
      console.log(updateDTO);
      await instance.put(`/locations`, updateDTO);
    } catch (error) {
      console.error("Error updating location:", error);
      throw error;
    }
  },

  async deleteLocation(id) {
    try {
      await instance.delete(`/locations/${id}`);
    } catch (error) {
      console.error("Error deleting location:", error);
      throw error;
    }
  },
};

export default api;
