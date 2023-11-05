<template>
  <div class="text-xl my-4 font-gray-800 font-semibold">
    Register
  </div>
  <form
    class="p-4 border-2 rounded-xl shadow-xl w-1/2"
    @submit.prevent="handleRegister"
  >
    <div class="flex justify-end">
      <fwb-button
        color="dark"
        @click="$emit('clickedLogin')"
      >
        Already an account? Login
      </fwb-button>
    </div>
    <fwb-input
      v-model="newUser.email"
      placeholder="enter your email address"
      label="Email"
      class="mb-2"
      required
    />
    <fwb-input
      v-model="newUser.password"
      placeholder="*******"
      label="Password"
      type="password"
      required
    />
    <div class="flex justify-between mt-4">
      <fwb-button
        color="alternative"
        class="transition-all duration-150"
        @click.stop="handleSignInWithGoogle"
      >
        Sign in with Google
      </fwb-button>
      <fwb-button
        color="dark"
        class="transition-all duration-150"
      >
        Register
      </fwb-button>
    </div>
  </form>
</template>
<script setup>
import { reactive, defineEmits } from 'vue';
import { FwbInput, FwbButton } from 'flowbite-vue';
import {
  getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import { useNotification } from '@kyvg/vue3-notification';
import { useUsersStore } from '@store/users';

defineEmits(['clickedLogin']);

const { notify } = useNotification();

const store = useUsersStore();
const newUser = reactive({
  email: '',
  password: '',
});

const handleRegister = () => {
  createUserWithEmailAndPassword(getAuth(), newUser.email, newUser.password)
    .then(() => {
      store.isLoggedIn = true;
      notify({
        title: 'Success',
        text: 'Logged in successfully',
        type: 'success',
      });
    })
    .catch((error) => {
      notify({
        title: 'Error registering',
        text: error.message,
        type: 'danger',
      });
    });
};

const handleSignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      store.isLoggedIn = true;
      notify({
        title: 'Success',
        text: 'Logged in successfully',
        type: 'success',
      });
    })
    .catch((error) => {
      notify({
        title: 'Error',
        text: error.message,
        type: 'danger',
      });
    });
};
</script>
