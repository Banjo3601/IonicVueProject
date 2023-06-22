import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import UserPage from '../views/UserPage.vue';
import AddConcertPage from "@/views/AddConcertPage.vue";
import EditConcertPage from "@/views/EditConcertPage.vue";
import ListConcertPage from "@/views/ListConcertPage.vue";
import DetailConcertPage from "@/views/DetailConcertPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import AdminPage from "@/views/AdminPage.vue";
import ListCategoriesPage from "@/views/ListCategoriesPage.vue";
import EditCategoryPage from "@/views/EditCategoryPage.vue";
import AddCategoryPage from "@/views/AddCategoryPage.vue";
import ListUsersPage from "@/views/ListUsersPage.vue";
import AddUserPage from "@/views/AddUserPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login_page'
  },
  {
    path: '/login_page',
    name: 'login_page',
    component: LoginPage
  },
  {
    path: '/user_page',
    name: 'user_page',
    component: UserPage
  },
  {
    path: '/admin_page',
    name: 'admin_page',
    component: AdminPage
  },
  {
    path: '/add_concert',
    name: 'add_concert',
    component: AddConcertPage
  },
  {
    path: '/edit_concert',
    name: 'edit_concert',
    component: EditConcertPage
  },
  {
    path: '/list_concert',
    name: 'list_concert',
    component: ListConcertPage
  },
  {
    path: '/detail_concert',
    name: 'detail_concert',
    component: DetailConcertPage
  },
  {
    path: '/list_categories',
    name: 'list_categories',
    component: ListCategoriesPage
  },
  {
    path: '/edit_category',
    name: 'edit_category',
    component: EditCategoryPage
  },
  {
    path: '/add_category',
    name: 'add_category',
    component: AddCategoryPage
  },
  {
    path: '/list_users',
    name: 'list_users',
    component: ListUsersPage
  },
  {
    path: '/add_user',
    name: 'add_user',
    component: AddUserPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
