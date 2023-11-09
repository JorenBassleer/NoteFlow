<template>
  <div class="text-xl my-4 font-gray-800 font-semibold">
    {{ isRegister ? 'Register': 'Sign in' }}
  </div>
  <form
    class="p-4 border-2 rounded-xl shadow-xl w-1/2"
    @submit.prevent="handleAuthSubmit"
  >
    <div class="flex justify-end">
      <fwb-button
        color="dark"
        type="button"
        @click="isRegister = !isRegister"
      >
        {{ isRegister ? 'Already have an account? Login': 'New user? Register' }}
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
        type="button"
        class="transition-all duration-150"
        @click="handleSignInWithGoogle"
      >
        Sign in with Google
      </fwb-button>
      <fwb-button
        color="dark"
        class="transition-all duration-150"
        :loading="isSubmitting"
      >
        {{ isRegister ? 'Register' : 'Login' }}
      </fwb-button>
    </div>
  </form>
</template>
<script setup>
import { reactive, defineEmits, ref } from 'vue';
import { FwbInput, FwbButton } from 'flowbite-vue';
import {
  getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword,
} from 'firebase/auth';
import * as Yup from 'yup';
import { useNotification } from '@kyvg/vue3-notification';
import { useUsersStore } from '@store/users';

defineEmits(['clickedRegister']);

const { notify } = useNotification();

const store = useUsersStore();
const newUser = reactive({
  email: '',
  password: '',
});
const isRegister = ref(false);
const isSubmitting = ref(false);

const userSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const handleNotifyError = (error) => {
  notify({
    title: isRegister.value ? 'Error registering' : 'Error logging in',
    text: error.message,
    type: 'danger',
  });
};

const handleAuthSubmit = async () => {
  try {
    isSubmitting.value = true;
    userSchema.validateSync(newUser);
    const authMethod = isRegister.value ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
    authMethod(getAuth(), newUser.email, newUser.password)
      .then(() => {
        store.isLoggedIn = true;
        notify({
          title: 'Success',
          text: 'Registration complete',
          type: 'success',
        });
      }).catch((error) => {
        handleNotifyError(error);
      });
  } catch (error) {
    handleNotifyError(error);
  } finally {
    isSubmitting.value = false;
  }
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
      handleNotifyError(error);
    });
};
</script>
