import { defineStore } from "pinia";
import supabase from "src/config/supabase";
import { useShowErrorMessage } from "src/use/useShowErrorMessage";

export const useStoreAuth = defineStore("auth", () => {
  const init = () => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    // call unsubscribe to remove the callback
    data.subscription.unsubscribe();
  };

  const registerUser = async ({ email, password }) => {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) useShowErrorMessage(error.message);
    if (data) console.log("data", data);
  };
  const loginUser = async ({ email, password }) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) useShowErrorMessage(error.message);
    if (data) console.log("data", data);
  };

  const logoutUser = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) useShowErrorMessage(error.message);
    else console.log("Logout successful");
  };

  return {
    registerUser,
    logoutUser,
    loginUser,
  };
});
