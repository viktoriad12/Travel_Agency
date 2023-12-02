export const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/pages/HomePage.vue"),
    },
    {
        path: "/locations",
        name: "Locations",
        component: () => import("@/pages/locations/Locations.vue"),
    },
    {
        path: "/locations/:id",
        name: "LocationDetails",
        component: () => import("@/pages/locations/LocationDetails.vue"),
    },
    {
        path: "/locations/:id/edit",
        name: "LocationEdit",
        component: () => import("@/pages/locations/LocationEdit.vue"),
    },
    {
        path: "/holidays",
        name: "Holidays",
        component: () => import("@/pages/holidays/Holidays.vue"),
    },
    {
        path: "/holidays/:id",
        name: "HolidayDetails",
        component: () => import("@/pages/holidays/HolidayDetails.vue"),
    },
    {
        path: "/holidays/:id/edit",
        name: "HolidayEdit",
        component: () => import("@/pages/holidays/HolidayEdit.vue"),
    },
    // {
    //     path: "/:catchAll(.*)",
    //     name: "NotFound",
    //     component: () => import("@/pages/NotFound.vue"),
    // }
];
