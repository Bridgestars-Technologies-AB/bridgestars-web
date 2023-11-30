<script setup>
await loadTranslations("temp"); // load translation
const open = ref(false); //signoutmodal
</script>

<template>

    <div
      class="absolute top-0 flex justify-start whitespace-nowrap pt-[30px] pl-[30px]"
    >
      <button
        @click="useRouter().push({ path: '/' })"
        class="normal-case text-blue authHeader"
      >
        {{ $t("temp:home") }}
      </button>
      <span class="authHeader text-grey opacity-80 mx-2"> / </span>
      <span class="authHeader text-grey opacity-80">{{ $t("temp:path") }}</span>
    </div>

  <div class="flex flex-col justify-center items-center h-full space-y-4  text-center">
    <h3 class="max-w-[400px] px-3">{{$t("temp:hi", {name: useAuth().username})}}</h3>
    <h3 class="max-w-[500px] px-3">{{$t("temp:welcome")}}</h3>
    <span class="text1 max-w-[500px] px-3">{{$t("temp:info")}}</span>
    <base-submit-button
      @click="open = true" :text="$t('temp:signout')"></base-submit-button>
    <base-modal-signout v-model:open="open"/>
  </div>
</template>

<style scoped>
#content{
  transition: margin-left 0.3s ease-in-out, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.authHeader {
  @apply font-family2 text-[3vh] hsm:text-[30px]  leading-[1.5] font-bold;
}
</style>
