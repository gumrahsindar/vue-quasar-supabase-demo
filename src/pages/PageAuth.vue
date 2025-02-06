<script setup>
import { useQuasar } from "quasar";
import ToolbarTitle from "src/components/Layout/ToolbarTitle.vue";
import { useLightOrDark } from "src/use/useLightOrDark";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const tab = ref("register");

const router = useRouter();

const submitButtonTitle = computed(() => {
  return tab.value === "login" ? "Login" : "Register";
});

const credentials = reactive({
  email: "",
  password: "",
});

const $q = useQuasar();

function formSubmit() {
  if (!credentials.email || !credentials.password) {
    $q.dialog({
      title: "Error",
      message: "Please fill in all fields",
    });
  } else {
    formSubmitSuccess();
  }
}

function formSubmitSuccess() {
  if (tab.value === "login") {
    console.log("Login user with these credentials:", credentials);
  } else {
    console.log("Register user with these credentials:", credentials);
  }

  router.push("/");
}
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="auth bg-primary text-white q-pa-lg">
      <q-card-section>
        <ToolbarTitle />
      </q-card-section>

      <q-card-section>
        <q-tabs v-model="tab" no-caps>
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>
      </q-card-section>

      <q-card-section>
        <q-form @submit="formSubmit">
          <q-input
            v-model="credentials.email"
            class="q-mb-md"
            :bg-color="useLightOrDark('white', 'black')"
            label="Email"
            type="email"
            autocomplete="email"
            filled
          />
          <q-input
            v-model="credentials.password"
            class="q-mb-md"
            :bg-color="useLightOrDark('white', 'black')"
            label="Password"
            type="password"
            autocomplete="password"
            filled
          />

          <q-btn
            class="full-width"
            color="white"
            type="submit"
            :label="submitButtonTitle"
            outline
            no-caps
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
