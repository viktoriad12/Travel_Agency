export const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/pages/HomePage.vue"),
    },
    // {
    //     path: "/holidays",
    //     name: "Holidays",
    //     component: () => import("../views/Holidays.vue"),
    // },
    // {
    //     path: "/holiday/:id",
    //     name: "Holiday",
    //     component: () => import("../views/Holiday.vue"),
    // },
    // {
    //     path: "/holiday/:id/edit",
    //     name: "EditHoliday",
    //     component: () => import("../views/EditHoliday.vue"),
    // },
    // {
    //     path: "/holiday/new",
    //     name: "NewHoliday",
    //     component: () => import("../views/NewHoliday.vue"),
    // },
    // {
    //     path: "/:catchAll(.*)",
    //     name: "NotFound",
    //     component: () => import("../views/NotFound.vue"),
    // },
];
