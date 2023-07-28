<!-- sign out modal: "are you sure?" -->


<script setup>
const auth = useAuth();
const toast = useToast();
const {t} = useTranslate();
defineProps(['open'])
defineEmits(['update:open'])

async function signOut(){
  try{await auth.signOut()} //if user is not signed in, nothing happens
  catch(e){console.error(e)}
  toast.clear() //remove old toasts , ex sign in 
  toast.success(t("dashboard:sign_out_modal.signed_out"))
  navigateTo("/")
}
</script>

<template>
  <base-modal :open="open" @update:open="(b) => $emit('update:open', b)">
    <div class="p-6 text-center">
        <!-- Info icon -->
        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>

        <h3 class="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400">
          {{$t("dashboard:sign_out_modal.text")}}
        </h3>

        <button  @click="$emit('update:open', false); signOut()" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 normal-case font-medium rounded-lg text-[20px] leading-[20px] inline-flex items-center px-5 py-2.5 text-center mr-2">
          {{ $t("dashboard:sign_out_modal.yes")}}
        </button>

      <button @click="$emit('update:open', false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-[20px] leading-[20px] font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white normal-case dark:hover:bg-gray-600 dark:focus:ring-gray-600">
        {{$t("dashboard:sign_out_modal.no")}}
      </button>

    </div>
  </base-modal>
</template>
