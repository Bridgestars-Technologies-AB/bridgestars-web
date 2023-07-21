<script setup>
const boxDisabled1 = ref(false);
const boxDisabled2 = ref(false);
</script>

<template>
  <h1 class="text-[40px] ml[200px]">Account Details</h1>
  <div class="h-[100%] w-[100%] p-[30px]">
    <div class="h-[85%] bg-white rounded-xl flex flex-col">
      <div
        class="rounded-2xl shadow-xl bg-[#FFFFFF] m-[30px] h-[25%] flex flex-row"
      >
        <!-- Fix responsiveness of picture -->
        <img
          class="object-cover object-top w-[120px] aspect-square rounded-full ml-[20px] self-center"
          src="~/assets/bridgestars/images/castor.jpg"
        />
        <div class="self-center ml-[10px]">
          <h1 class="text-[20px] leading-[22px] tracking-tighter">
            Castor Mann
          </h1>
          <h6
            class="mt-[12px] text-[#14C6A4] dark:text-[#14C6a4] font-light tracking-normal"
          >
            Bridgestars Premium
          </h6>
          <span class="text2">Stockholm, Sweden</span>
        </div>
      </div>

      <div class="flex flex-row w-[100%] h-[40%]">
        <div class="accountBox h-[100%] w-[50%] rounded-xl ml-[30px] mr-[30px]">
          <div
            class="flex flex-row w-[100%] justify-between mb-[10px] p-[10px]"
          >
            <span class="ml-[5px]">Personal information</span>
            <button
              class="editButton btn bg-white scale-75 hover:bg-white"
              id="editBtn1"
              @click="boxDisabled1 = !boxDisabled1"
            >
              Edit
            </button>
          </div>

          <div class="flex flex-row justify-start mb-[20px]">
            <div
              class="ml-[10px] flex flex-col sm:space-y-4 xs:space-y-3 w-[50%] max-w-[400px]"
            >
              <base-input-field
                wrapperClass="w-[80%]"
                placeholder="First name"
                class="accountBox1"
                id="username-email"
                :color="boxDisabled1 ? '#344767' : '#FFFFFF'"
                :enabled="boxDisabled1"
              />
              <base-input-field
                wrapperClass="w-[80%]"
                placeholder="Location"
                class="accountBox1"
                id="username-email"
                :color="boxDisabled1 ? '#344767' : '#FFFFFF'"
                :enabled="boxDisabled1"
              />
            </div>
            <div
              class="flex flex-col sm:space-y-4 xs:space-y-3 w-[50%] max-w-[400px]"
            >
              <base-input-field
                wrapperClass="w-[80%]"
                placeholder="Last name"
                class="accountBox1"
                id="username-email"
                :color="boxDisabled1 ? '#344767' : '#FFFFFF'"
                :enabled="boxDisabled1"
              />
            </div>
          </div>
        </div>
        <div class="accountBox h-[100%] w-[50%] rounded-xl mr-[30px]">
          <div
            class="flex flex-row w-[100%] justify-between mb-[10px] p-[10px]"
          >
            <span class="ml-[5px]">Login Credentials</span>
            <button
              class="editButton btn bg-white scale-75 hover:bg-white"
              id="editBtn2"
              @click="boxDisabled2 = !boxDisabled2"
            >
              Edit
            </button>
          </div>
          <div class="flex flex-row justify-start">
            <div
              class="ml-[10px] flex flex-col sm:space-y-4 xs:space-y-3 w-[50%] max-w-[400px]"
            >
              <base-input-field
                wrapperClass="w-[80%]"
                placeholder="Username"
                class="accountBox2"
                id="username-email"
                :color="boxDisabled2 ? '#344767' : '#FFFFFF'"
                :enabled="boxDisabled2"
              />
              <base-input-field
                wrapperClass="w-[80%]"
                placeholder="Email"
                class="accountBox2"
                id="username-email"
                :color="boxDisabled2 ? '#344767' : '#FFFFFF'"
                :enabled="boxDisabled2"
              />
            </div>
            <div
              class="flex flex-col sm:space-y-4 xs:space-y-3 w-[50%] max-w-[400px]"
            >
              <base-input-field
                wrapperClass="w-[80%]"
                placeholder="Password"
                class="accountBox2"
                id="username-email"
                :color="boxDisabled2 ? '#344767' : '#FFFFFF'"
                :enabled="boxDisabled2"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="accountBox h-[40%] rounded-xl flex flex-row justify-start content-center m-[30px]"
      >
        <h1>Subscribtion</h1>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
