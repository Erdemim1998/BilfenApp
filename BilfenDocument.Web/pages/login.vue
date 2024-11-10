<style>
@import url("~/assets/css/style.css");
</style>

<template>
  <div
    class="container-fluid vh-100 d-flex align-items-center justify-content-center"
    style="background-color: #02558b"
  >
    <div class="bg-white rounded shadow p-5 text-center login-box">
      <div class="alert alert-danger" role="alert" v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <img src="~/assets/img/logo.jpg" width="100%" />
      <h6>İşe Giriş Evrak Takip Sistemi</h6>

      <form @submit.prevent="LoginSubmit" method="post">
        <div class="form-group d-flex mt-5">
          <label for="email" class="w-25" style="line-height: 37.6px"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="Email"
            class="form-control w-75"
            placeholder="Email bilginizi giriniz"
            required
          />
        </div>

        <div class="form-group d-flex mt-3">
          <label for="password" class="w-25" style="line-height: 37.6px"
            >Parola</label
          >
          <input
            type="password"
            id="password"
            v-model="Password"
            class="form-control w-75"
            placeholder="Parola bilginizi giriniz"
            required
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary mt-4 w-100"
          style="background-color: #02558b"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
const router = useRouter();

const errorMessage = ref("");
const Email = ref("");
const Password = ref("");

onMounted(async () => {
  const isAuthenticated = Cookies.get("isAuthenticated");

  if (isAuthenticated) {
    router.push("/dashboard");
  }
});

const LoginSubmit = async () => {
  errorMessage.value = "";

  try {
    const res = await axios.post("http://localhost:1337/api/users/Login", {
      Email: Email.value,
      Password: Password.value,
    });

    if (res.data.message != null) {
      errorMessage.value = res.data.message;
    } else {
      Cookies.set("token", res.data.token, { expires: 1 });
      Cookies.set("isAuthenticated", res.data.isAuthenticated, {
        expires: 1,
      });
      Cookies.set("userId", res.data.userId, { expires: 1 });
      router.push("/dashboard");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
