import { defineStore } from "pinia";
import api from "@/services/apiService";

export const useHolidayStore = defineStore({
  id: "holidayStore",
  state: () => ({
    holidays: [],
    locations: [],
    reservations: [],
    loading: true,
  }),
  actions: {
    async fetchHolidays() {
      try {
        this.loading = true;
        const response = await api.fetchHolidays();
        this.holidays = response;
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchHolidaysForReservation(locationId, startDate, duration) {
      try {
        this.loading = true;
        const response = await api.fetchHolidaysForReservation(
          locationId,
          startDate,
          duration
        );
        return response;
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        this.loading = false;
      }
    },
    async createHoliday(newHoliday) {
      try {
        const response = await api.createHoliday(newHoliday);
        this.fetchHolidays();
      } catch (error) {
        console.error("Error creating holiday:", error);
      }
    },

    async updateHoliday(updatedHoliday) {
      try {
        await api.updateHoliday(updatedHoliday);
        this.fetchHolidays();
      } catch (error) {
        console.error("Error updating holiday:", error);
      }
    },

    async deleteHoliday(holidayId) {
      try {
        await api.deleteHoliday(holidayId);
        this.holidays = this.holidays.filter((h) => h.id !== holidayId);
      } catch (error) {
        console.error("Error deleting holiday:", error);
      }
    },

    async fetchLocations() {
      try {
        this.loading = true;
        const response = await api.fetchLocations();
        this.locations = response;
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        this.loading = false;
      }
    },

    async createLocation(newLocation) {
      try {
        const response = await api.createHoliday(newLocation);
        console.log(response);
        this.fetchHolidays();
      } catch (error) {
        console.error("Error creating holiday:", error);
      }
    },

    async updateLocation(updatedLocation) {
      try {
        await api.updateLocations(updatedLocation);
        this.fetchLocations();
      } catch (error) {
        console.error("Error updating holiday:", error);
      }
    },

    async deleteLocation(locationId) {
      try {
        await api.deleteHoliday(locationId);
        this.locations = this.locations.filter((h) => h.id !== locationId);
      } catch (error) {
        console.error("Error deleting holiday:", error);
      }
    },

    async fetchReservations() {
      try {
        const response = await api.fetchReservations();
        this.reservations = response;
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchReservationById(id) {
      try {
        const response = await api.fetchReservationById(id);
        return response;
      } catch (error) {
        console.error("Error fetching reservation:", error);
      }
    },

    async createReservation(newReservation) {
      try {
        await api.createReservation(newReservation);
        this.fetchReservations();
      } catch (error) {
        console.error("Error creating reservation:", error);
      }
    },

    async updateReservation(updatedReservation) {
      try {
        await api.updateReservation(updatedReservation);
        this.fetchReservations();
      } catch (error) {
        console.error("Error updating reservation:", error);
      }
    },

    async deleteReservation(reservationId) {
      try {
        await api.deleteReservation(reservationId);
        this.fetchReservations();
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    },

    async fetchData() {
      await Promise.all([this.fetchHolidays(), this.fetchLocations(), this.fetchReservations()]);
    },
  },
});
