<template>
  <h1 class="text-[40px] ml[200px]">Account Details</h1>
  <div class="h-[100%] w-[100%] p-[30px]">
    <div class="h-[85%] bg-white rounded-xl flex flex-col">
      <div
        class="border-black border-2 m-[30px] h-[25%] rounded-xl flex flex-row justify-start content-center"
      >
        <!-- Fix responsiveness of picture -->
        <img
          class="object-cover object-top w-[120px] aspect-square rounded-full ml-[20px] self-center"
          src="~/assets/bridgestars/images/castor.jpg"
        />
        <div class="mt-[50px] ml-[20px]">
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

      <div class="accountBox h-[30%] w-[45%] rounded-xl">
        <span class="ml-[5px]">Personal information</span>
        <div class="flex flex-row justify-between h-[100%]">
          <div class="ml-[10px] h-[100%] flex flex-col">
            <span class="">First Name</span>
            <span class="">Castor</span>
            <span class="mt-[10px]">Email address</span>
            <span class="">Something here</span>
          </div>
          <div class="flex flex-col">
            <span>Last Name</span>
            <span>Mann</span>
          </div>
          <button class="self-start">Edit</button>
        </div>
      </div>
      <div
        class="accountBox rounded-xl flex flex-row justify-start content-center"
      ></div>
    </div>
  </div>
</template>
