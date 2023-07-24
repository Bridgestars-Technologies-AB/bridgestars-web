<script setup>
const toast = useToast();

const boxDisabled1 = ref(true);
const boxDisabled2 = ref(true);
const buttonText1 = ref("edit");
const buttonText2 = ref("edit");
const pencilButton = ref(false);

const auth = useAuth();
const email = ref(auth.get("email"));
const username = ref(auth.get("username"));
const nationality = ref(auth.get("nationality"));
const firstName = ref(auth.get("first"));
const lastName = ref(auth.get("last"));
const birthDate = ref(auth.get("birth"));

function saveUserData() {
  auth.user.set("email", email);
  auth.user.set("username", username);
  auth.user.set("nationality", nationality);
  auth.user.set("first", firstName);
  auth.user.set("last", lastName);
  auth.user.set("birth", birthDate);

  auth.user
    .save()
    .then(() => toast.success("successfully saved user data"))
    .catch((e) => console.log(e));
}
</script>

<template>
  <h1 class="text-[40px] ml[200px]">Account Details</h1>
  <div class="h-[100%] w-[100%] p-[30px]">
    <div class="h-[85%] bg-white rounded-xl flex flex-col">
      <div
        class="rounded-2xl shadow-xl bg-[#FFFFFF] m-[30px] h-[25%] flex flex-row"
      >
        <!-- Fix responsiveness of picture -->
        <!-- <img
          class="object-cover object-top w-[120px] aspect-square rounded-full ml-[20px] self-center"
          src="~/assets/bridgestars/images/castor.jpg"
        /> -->

        <base-image-chooser class="self-center scale-75"></base-image-chooser>
        <div class="self-center relative h-[100%]">
          <button
            :class="`btn absolute left-0 top-4 ${
              pencilButton
                ? 'i-material-symbols-edit-rounded'
                : 'i-material-symbols-edit-off-rounded'
            }`"
            id="editBtn1"
            @click="pencilButton = !pencilButton"
          ></button>
        </div>
        <div class="self-center relative">
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
              class="editButton btn"
              id="editBtn1"
              @click="
                boxDisabled1 = !boxDisabled1;
                saveUserData();
                boxDisabled1 ? (buttonText1 = 'Edit') : (buttonText1 = 'Save');
              "
            >
              {{ buttonText1 }}
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
                v-model="firstName"
              />
              <base-input-field
                wrapperClass="w-[80%]"
                placeholder="Location"
                class="accountBox1"
                id="username-email"
                :color="boxDisabled1 ? '#344767' : '#FFFFFF'"
                :enabled="boxDisabled1"
                v-model="nationality"
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
                v-model="lastName"
              />
              <base-input-field
                wrapperClass="w-[80%]"
                placeholder="Date of Birth"
                class="accountBox1 text-[#FFFFFF]"
                type="date"
                id="username-email"
                :color="boxDisabled1 ? '#344767' : '#FFFFFF'"
                :enabled="boxDisabled1"
                v-model="birthDate"
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
              class="editButton btn"
              id="editBtn2"
              @click="
                boxDisabled2 = !boxDisabled2;
                saveUserData();
                boxDisabled2 ? (buttonText2 = 'Edit') : (buttonText2 = 'Save');
              "
            >
              {{ buttonText2 }}
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
                v-model="username"
              />
              <base-input-field
                wrapperClass="w-[80%]"
                placeholder="Email"
                class="accountBox2"
                id="username-email"
                :color="boxDisabled2 ? '#344767' : '#FFFFFF'"
                :enabled="boxDisabled2"
                v-model="email"
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

<style scoped>
.editButton {
  @apply border-2 shadow-xl border-[#344767] rounded-lg p-2 bg-white scale-75 hover:bg-white;
}
</style>
