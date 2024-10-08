<script setup>
/* eslint-disable vue/require-v-for-key  */
const toast = useToast();

function copyUrl(id) {
  let url = window.location.href;
  if (url.includes("#")) {
    url = url.split("#")[0];
  }
  navigator.clipboard.writeText(url + "#" + id).then(function () {
    toast.success(`Copied url to ${id}`);
  });
}
const data = ref(null);
const order = [
  "signIn",
  "searchUsers",
  "getUserInfo",
  "sendFriendRequest",
  "acceptFriendRequest",
  "denyFriendRequest",
  "removeFriend",
  "redeemVoucher",
  "generateSubscriptionDashboardLink",
  "archivePost",
  "fetchIfUpdated",
  "signOutFromAllDevices",
  "assignRole",
  "assignRoomMod",
];
onMounted(() => {
  //reload data() {
  import("~/assets/dev/docs-db-functions.json").then((res) => {
    //reload during development

    res.default;
    data.value = [];
    order.forEach((x) => {
      data.value.push(res.default.filter((y) => y["name"] == x)[0]);
    });
    data.value.push(...res.default.filter((x) => !order.includes(x["name"])));
  });
});
</script>
<template>
  <div>
    <div class="flex flex-col items-center text-center mt-[100px]">
      <h1 class="text-3xl font-bold">Database Functions</h1>
      <p class="text1 font-family2 text-2xl">
        This is a list of all the functions available in the database API.
      </p>
    </div>

    <!--  all classes links -->

    <div v-if="data" class="mx-9 my-9 flex flex-wrap flex-col">
      <div
        v-for="table in data"
        :key="table['name']"
        class="relative flex items-center text-center"
      >
        <div class="w-full">
          <a
            :href="`#${table['name']}`"
            class="xs:text-[14px] md:text-[20px] text-blue font-family2 mr-1"
            >{{ table["name"] }}</a
          >
          <span
            class="i-material-symbols-find-in-page-outline-rounded text-blue text-[14px]"
          />
        </div>
        <div class="absolute w-full flex items-center justify-center">
          <span class="xs:text-[14px] md:text-[20px] font-family2 opacity-0">{{
            table["name"]
          }}</span>
          <div
            v-for="role in table['roles']"
            :key="role"
            class="ml-[90px] rounded-xl px-[5px] py-[0px] bg-red-400"
          >
            <span class="text1 text-white font-medium text-[12px]">{{
              role
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="data"
      class="flex flex-col items-center w-full flex-grow space-y-[80px] pb-[350px]"
    >
      <div
        v-for="item in data"
        :key="item['_id']"
        class="flex flex-col px-3 items-start mt-5 w-full max-w-[1700px]"
      >
        <div
          class="flex items-center cursor-pointer mb-0"
          @click="copyUrl(item['_id'])"
        >
          <h2
            :id="item['name']"
            class="sm:text-[25px] xs:text-[16px] font-bold"
          >
            {{ item["name"] }}
          </h2>
          <span
            class="i-material-symbols-link-rounded text-dark text-2xl ml-2"
          />
          <div
            v-for="role in item['roles']"
            :key="role"
            class="ml-3 rounded-xl px-2 py-1 bg-red-400"
          >
            <span class="text1 text-white font-medium text-[20px]">{{
              role
            }}</span>
          </div>
        </div>
        <template v-if="item.desc">
          <div
            v-for="d in item.desc.split(';')"
            :key="d"
            class="sm:h-[20px] xs:text-[11px] mt-1"
          >
            <span
              class="text2 sm:text-[20px] xs:text-[11px] sm:leading-[20px] xs:leading-[11px]"
              >{{ d }}</span
            >
          </div>
        </template>
        <div
          class="w-full mt-4 h-[1.5px] opacity-60 bg-color-dark rounded-full"
        />
        <!-- foreach key in item, print nicely -->
        <h4 class="font-bold mt-3 font-family1 sm:text-[20px] xs:text-[11px]">
          Parameters
        </h4>
        <table class="w-full">
          <tr>
            <!-- <th>Name</th> -->
            <!-- <th>Type</th> -->
            <!-- <th>Description</th> -->
          </tr>
          <tr v-for="param in item.params" :key="param.name" class="">
            <td class="!font-normal max-w-[120px]">{{ param.name }}</td>
            <td>{{ param.type }}</td>
            <td>
              <template v-if="param.desc">
                <div v-for="d in (param.desc + ';').split(';')" :key="d">
                  {{ d }}
                </div>
              </template>
            </td>
          </tr>
        </table>

        <h4 class="font-bold mt-3 font-family1 sm:text-[20px] xs:text-[11px]">
          Result
        </h4>
        <table class="w-full">
          <tr>
            <!-- <th>Type</th> -->
            <!-- <th>Description</th> -->
          </tr>
          <tr class="">
            <td class="!font-normal max-w-[220px]">
              <template v-if="item.return?.type">
                <div v-for="d in (item.return.type + ';').split(';')" :key="d">
                  {{ d }}
                </div>
              </template>
            </td>

            <td>
              <template v-if="item.return?.desc">
                <div v-for="d in (item.return.desc + ';').split(';')" :key="d">
                  {{ d }}
                </div>
              </template>
            </td>
          </tr>
        </table>

        <h4 class="font-bold mt-3 font-family1 sm:text-[20px] xs:text-[11px]">
          Errors
        </h4>
        <table class="w-full">
          <tr>
            <!-- <th>Type</th> -->
            <!-- <th>Description</th> -->
          </tr>
          <tr v-for="e in item.errors" :key="e" class="">
            <td class="!font-normal max-w-[220px]">
              <template v-if="e">
                <div v-for="d in (e + ';').split(';')" :key="d">
                  {{ d }}
                </div>
              </template>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
td {
  @apply font-family2 text-dark font-light xs:text-[6px] sm:text-[16px] xl:text-[18px] px-1;
  /* border-right: 1px solid #E5E5E5; */
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
}
table {
  /* table-layout:fixed; */
  word-wrap: break-word;
}
</style>
