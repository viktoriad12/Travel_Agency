// // apiService.js

// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: '/api',
//   // headers: {
//   //   'Content-Type': 'application/json',
//   // },
// });

// export default {
//   async getLocations() {
//     return apiClient.get('/locations');
//   },

//   async getLocation(locationId) {
//     return apiClient.get(`/locations/${locationId}`);
//   },

//   async getHolidays() {
//     return apiClient.get('/holidays');
//   },

//   async getHoliday(holidayId) {
//     return apiClient.get(`/holidays/${holidayId}`);
//   },

//   async createHoliday(newHoliday) {
//     return apiClient.post('/holidays', newHoliday);
//   },

//   async updateHoliday(holidayId, updatedHoliday) {
//     return apiClient.put(`/holidays/${holidayId}`, updatedHoliday);
//   },

//   async deleteHoliday(holidayId) {
//     return apiClient.delete(`/holidays/${holidayId}`);
//   },
// };

import axios from "axios";

const BASE_URL = "http://localhost:5173/public-transport";

const instance = axios.create({
  baseURL: BASE_URL,
});

const api = {
  async fetchHolidays() {
    try {
      const response = await instance.get("/holidays");
    //   console.log("response", Object.keys(response.data));
      // return Object.keys(response.data); 
      return response.data;
    } catch (error) {
      console.error("Error fetching journeys:", error);
      throw error;
    }

  },

  // async fetchBusStops(journeyId) {
  //   try {
  //     const response = await instance.get(`/journey/${journeyId}`);
  //     return response.data[journeyId]; 
  //   } catch (error) {
  //     console.error("Error fetching bus stops:", error);
  //     throw error;
  //   }
  // },
};

export default api;
