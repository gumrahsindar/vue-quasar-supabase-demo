import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { Dark, LocalStorage } from "quasar";
import supabase from "src/config/supabase";
import { useStoreAuth } from "./storeAuth";
import { useShowErrorMessage } from "src/use/useShowErrorMessage";

export const useStoreSettings = defineStore("settings", () => {
  /*
    state
  */

  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: "$",
    darkMode: false, // false | true | 'auto'
  });

  // watch darkMode
  watch(
    () => settings.darkMode,
    (value) => {
      Dark.set(value);
    },
    { immediate: true }
  );

  // watch settings
  watch(settings, () => {
    saveSettings();
  });

  // profile
  const profile = reactive({
    avatarFile: null,
  });

  /*
    getters
  */

  /*
    actions
  */

  const saveSettings = () => {
    LocalStorage.set("settings", settings);
  };

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem("settings");
    if (savedSettings) Object.assign(settings, savedSettings);
  };

  const uploadAvatar = async (file) => {
    const storeAuth = useStoreAuth();
    const folderPath = storeAuth.userDetails.id;
    const fileName = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${folderPath}/${fileName}`, file);

    if (error) useShowErrorMessage(error.message);
    if (data) console.log("data", data);
  };

  /*
    return
  */

  return {
    // state
    settings,
    profile,

    // getters

    // actions
    loadSettings,
    uploadAvatar,
  };
});
