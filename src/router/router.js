import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const routes = [
  {
    path: "/book",
    name: "book",
    component: () => import('@/components/bookComponent.vue'),
  },
  {
    path: "/regist",
    name: "regist",
    component: () => import('@/components/registComponent.vue'),
  },
  {
    path: "/authorization",
    name: "authorization",
    component: () => import('@/components/authorizationComponent.vue'),
  },
  {
    path: "/aboutBook/:id",
    name: "aboutBook",
    component: () => import('@/components/aboutBook.vue'),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import('@/components/favoritesComponent.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/notFound",
    name: "404",
    component: () => import('@/components/NotFoundView.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    }
    else {
      next({ name: "book" });
    }
  }
  else{
    next();
  }
})

function getCurrentUser() {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}
export default router;