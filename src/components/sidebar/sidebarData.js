import {
 faHome,
 faFire,
 faVideo,
 faClock,
 faThumbsUp,
 faHistory
} from "@fortawesome/free-solid-svg-icons";

export const sidebarSectionsData = [
 {
  title: null,
  items: [
   { title: "خانه", icon: faHome, path: "/" },
   { title: "ترندها", icon: faFire, path: "/trending" },
   { title: "اشتراک‌ها", icon: faVideo, path: "/subscriptions" },
  ]
 },
 {
  title: "کتابخانه",
  items: [
   { title: "تاریخچه", icon: faHistory, path: "/history" },
   { title: "تماشاهای بعدی", icon: faClock, path: "/watch-later" },
   { title: "ویدیوهای پسندیده", icon: faThumbsUp, path: "/liked" },
  ]
 }
];
