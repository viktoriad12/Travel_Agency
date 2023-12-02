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

  async updateHoliday(id, holiday) {
    try {
      const response = await instance.put(`/holidays/${id}`, holiday);
      return response.data;
    } catch (error) {
      console.error("Error updating journey:", error);
      throw error;
    }
  },

  async deleteHoliday(id) {
    try {
      const response = await instance.delete(`/holidays/${id}`);
      return response.data;
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
      const response = await instance.get(`/locations/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  },

  async createLocation(locationData) {
    try {
      const response = await instance.post('/locations', locationData);
      return response.data;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  },

  async updateLocation(id, location) {
    try {
      const response = await instance.put(`/locations/${id}`, location);
      return response.data;
    } catch (error) {
      console.error("Error updating location:", error);
      throw error;
    }
  },

  async deleteLocation(id) {
    try {
      const response = await instance.delete(`/locations/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting location:", error);
      throw error;
    }
  },


};

export default api;
