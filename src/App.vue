<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStoreSettings } from "src/stores/storeSettings";
import { useStoreAuth } from "./stores/storeAuth";

defineOptions({
  name: "App",
});

const storeSettings = useStoreSettings(),
  $q = useQuasar(),
  router = useRouter();

const storeAuth = useStoreAuth();

onMounted(() => {
  storeAuth.init();
  storeSettings.loadSettings();

  if ($q.platform.is.electron) {
    ipcRenderer.on("show-settings", () => {
      router.push("/settings");
    });
  }
});

// window.addEventListener('contextmenu', e => {
//   e.preventDefault()
// })
</script>
