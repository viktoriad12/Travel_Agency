import { defineStore } from "pinia";

export const useHolidayStore = defineStore("holidayStore", {
  state: () => ({
    holidays: [],
  }),
});
