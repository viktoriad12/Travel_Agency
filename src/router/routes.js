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
        path: "/holidays",
        name: "Holidays",
        component: () => import("@/pages/holidays/Holidays.vue"),
    },
    // {
    //     path: "/:catchAll(.*)",
    //     name: "NotFound",
    //     component: () => import("@/pages/NotFound.vue"),
    // }
];
