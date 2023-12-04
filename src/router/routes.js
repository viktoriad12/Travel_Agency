export const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/pages/Home.vue"),
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
    {
        path:"/reservations",
        name:"Reservations",
        component: () => import("@/pages/reservations/Reservations.vue"),
    }
    // {
    //     path: "/:catchAll(.*)",
    //     name: "NotFound",
    //     component: () => import("@/pages/NotFound.vue"),
    // }
];
