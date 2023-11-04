<template>
  <form
    class="p-4 border-2 rounded-xl shadow-xl w-1/2"
    @submit.prevent="handleRegister"
  >
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
import { reactive } from 'vue';
import { FwbInput, FwbButton } from 'flowbite-vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNotification } from '@kyvg/vue3-notification';
import { useUsersStore } from '@store/users';

const { notify } = useNotification();

const store = useUsersStore();
const newUser = reactive({
  email: '',
  password: '',
});

const handleRegister = () => {
  createUserWithEmailAndPassword(getAuth(), newUser.email, newUser.password)
    .then((data) => {
      store.isLoggedIn = true;
      console.log('Successfully registered', data);
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

};
</script>
