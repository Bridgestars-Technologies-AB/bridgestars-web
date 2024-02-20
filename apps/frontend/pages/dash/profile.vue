<script setup lang="ts">
// Mock up data for subscription information
const subscription = {
  title: "Prenumeration",
  text: "Bridge to Bridge erbjuder dig att testa ett visst antal övningar gratis. För att kunna träna och lära dig ännu mer behövs en prenumeration. Prenumerationer förnyas automatiskt i slutet av prenumerationsperioden. För att använda sajten behöver du godkänna användarvillkoren för Bridge to Bridge. Där finns också mer information om hur betalningar och uppgifter hanteras.",
  purchaceInfo:
    "Eventuell kampanjkod anges i kassan (på mobil eller surfplatta kan du behöva klicka på menyn Uppgifter högst upp till höger i kassan).",
  stripe:
    "Vi använder Stripe för att sköta betalningar på ett smidigt och säkert sätt.",
  buttons: [
    { title: "1 månad", price: 150 },
    { title: "3 månader", price: 400 },
    { title: "12 månader", price: 1200 },
  ],
};

// Mock up data for friends list
const friends = [
  { name: "Kalle", email: "test1@gmail.com" },
  { name: "Pelle", email: "test2@gmail.com" },
  { name: "Carin", email: "test3@gmail.com" },
];

// Mock up data for user details
const userDetails = {
  first_name: "Kalle",
  last_name: "Anka",
  email: "donald.duck@gmail.com",
  password: "password",
};

const buttonIsPressed = ref([false, false, false]);
const editProfile = ref(false);

function press(type: string) {
  switch (type) {
    case "1 månad":
      buttonIsPressed.value = [true, false, false];
      break;
    case "3 månader":
      buttonIsPressed.value = [false, true, false];
      break;
    case "12 månader":
      buttonIsPressed.value = [false, false, true];
      break;
  }
}

// Function to toggle edit profile
function edit() {
  editProfile.value = !editProfile.value;
}

// Function to submit changes to profile, needs to call api to update user details
function submit() {
  editProfile.value = !editProfile.value;
}

function subscribe() {
  const index = buttonIsPressed.value.findIndex((value) => value);
  // navigate to stripe checkout with subscription.buttons[index]
  console.log("Subscribed on " + subscription.buttons[index].title);
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center space-y-4">
    <!-- Subscription block -->
    <div
      class="flex flex-row w-3/4 max-w-[900px] h-[400px] rounded-xl bg-white dark:bg-dark-100"
    >
      <div class="w-full flex flex-col items-center">
        <span class="text-[#15b497] text-[30px] font-bold">{{
          subscription.title
        }}</span>
        <span class="text-dark dark:text-white text-[18px] px-5 text-center">{{
          subscription.text
        }}</span>
        <div
          :class="`w-[80%] flex flex-row justify-between ${
            !buttonIsPressed ? 'mt-[50px]' : 'mt-5'
          } `"
        >
          <div
            v-for="(b, index) in subscription.buttons"
            :key="b.title"
            :class="`w-[30%] flex flex-col items-center cursor-pointer -2 -dark rounded-xl ${
              buttonIsPressed[index] ? 'bg-secondary' : ''
            }`"
            @click="press(b.title)"
          >
            <span class="text-[#15b497] font-bold text-[20px]">{{
              b.title
            }}</span>
            <span
              :class="` text-[20px] ${
                buttonIsPressed[index]
                  ? 'text-white'
                  : 'text-dark dark:text-white'
              }`"
              >{{ b.price }} sek</span
            >
          </div>
        </div>
        <div
          v-if="buttonIsPressed.find((b) => b)"
          class="flex flex-col items-center"
        >
          <span
            class="text-dark dark:text-white text-[18px] px-10 text-center mt-5"
            >{{ subscription.purchaceInfo }}
          </span>
          <div class="w-full flex flex-row justify-center">
            <button
              class="w-[30%] h-[40px] mt-2 bg-secondary text-white text-[20px] font-semibold rounded-full"
              @click="subscribe"
            >
              Gå till kassan
            </button>
          </div>
          <span class="text-[12px] text-dark dark:text-white mt-2">{{
            subscription.stripe
          }}</span>
        </div>
      </div>
    </div>
    <!-- Lower two blocks -->
    <div class="flex flex-row w-3/4 max-w-[900px] justify-between">
      <!-- Friends block -->
      <div
        class="flex flex-col items-center dark:bg-dark-100 bg-white rounded-xl w-[49%] max-w-[440px] h-[450px]"
      >
        <span class="dark:text-white text-dark text-[30px] font-bold"
          >Vänner</span
        >
        <div class="w-full flex flex-col items-center mt-10">
          <div class="w-2/3 flex flex-row justify-center">
            <div class="dark:text-white text-dark w-1/2">Namn</div>
            <div class="dark:text-white text-dark w-1/2">E-post</div>
          </div>
          <div
            class="w-[90%] h-[2px] bg-dark-500 dark:bg-dark-400 self-center"
          ></div>
          <div class="flex flex-col w-2/3 space-y-[1px] mt-2">
            <div
              v-for="friend in friends"
              :key="friend.name"
              class="w-full flex flex-row"
            >
              <div class="dark:text-white text-dark w-1/2">
                {{ friend.name }}
              </div>
              <div class="dark:text-white text-dark w-1/2">
                {{ friend.email }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- User details block -->
      <div
        class="flex flex-col items-center dark:bg-dark-100 bg-white rounded-xl w-[49%] max-w-[440px] h-[450px]"
      >
        <span class="dark:text-white text-dark text-[30px] font-bold"
          >Användardetaljer</span
        >
        <div class="w-[92%] flex flex-col items-center mt-3">
          <div class="w-full flex flex-row justify-end mb-5">
            <button
              v-if="!editProfile"
              class="text-white bg-secondary text-[15px] p-2 rounded-xl"
              @click="edit"
            >
              Edit profile
            </button>
            <button
              v-else
              class="text-white bg-secondary text-[15px] p-2 rounded-xl"
              @click="submit"
            >
              Save changes
            </button>
          </div>
          <div class="flex flex-col space-y-10 w-full">
            <div
              v-for="(key, index) in Object.keys(userDetails)"
              :key="index"
              class="w-full justify-between flex flex-row text-white pl-1"
            >
              <div class="w-1/2 font-semibold h-[50px] flex items-center">
                <span class="font-semibold dark:text-white text-dark">{{
                  key
                }}</span>
              </div>
              <div v-if="!editProfile" class="w-1/2 flex items-center h-[50px]">
                <span class="dark:text-white text-dark">{{
                  userDetails[key]
                }}</span>
              </div>
              <base-input-field
                v-else
                :id="key.replace('_', '-')"
                wrapperClass="w-1/2 h-[30px] dark:bg-dark-100"
                :placeholder="key"
                bg="dark:bg-dark-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
