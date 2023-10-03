<script setup>
import d from "~/assets/dev/docs-db-schema.json";
let data = d;
// const commonProps = ["_id", "objectId", "updatedAt", "createdAt"];
// const public_fields = ["img", "dispName"];
// const protected_fields = [
//   "email",
//   "authData",
//   "first",
//   "last",
//   "nationality",
//   "birth",
//   "profileAccess",
//   "friends",
//   "ifr",
//   "ofr",
//   "migratedFromFirebase",
//   "gameSignIn",
// ];

// used this to iterate over all fields and add necessary attributes to fill in later
// data.forEach(table => {
//   // console.log(table)
//   Object.keys(table).forEach(key => {
//
//   })
// })

data = [
  ...data
    .filter((x) => x["_id"][0] === "_")
    .sort((a, b) => (a["_id"] < b["_id"] ? 1 : -1)), //default classes, starts with _, sorted
  ...data
    .filter((x) => x["_id"][0] !== "_")
    .sort((a, b) => (a["_id"] < b["_id"] ? -1 : 1)),
]; //other, sorted

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
</script>
<template>
  <div>
    <div class="flex flex-col items-center text-center mt-5">
      <h1 class="text-3xl font-bold">Database Classes and Fields</h1>
      <p class="text1 font-family2 text-2xl">
        This is a list of all the classes available in the database API.
      </p>
    </div>

    <!--  all classes links -->

    <div class="mx-9 my-9 flex flex-wrap flex-col">
      <div v-for="table in data" :key="table['_id']" class="flex items-center text-center" >
        <div class="w-full">
          <a
            :href="`#${table['_id']}`"
            class="xs:text-[14px] md:text-[20px] text-blue font-family2 mr-1"
            >{{ table["_id"] }}</a
          >
          <span
            class="i-material-symbols-find-in-page-outline-rounded text-blue text-[14px]"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center w-full flex-grow">
      <div
        v-for="item in data"
        :key="item['_id']"
        class="flex flex-col px-3 items-start mt-5 w-full max-w-[1700px]"
      >
        <div
          class="flex items-center cursor-pointer"
          @click="copyUrl(item['_id'])"
        >
          <h2
            :id="item['_id']"
            class="xl:text-[30px] sm:text-[25px] xs:text-[16px] font-bold"
          >
            {{ item["_id"] }}
          </h2>
          <span
            class="i-material-symbols-link-rounded text-dark text-2xl ml-2"
          />
        </div>
        <div class="w-full mt-1 h-[1.5px] opacity-60 bg-dark rounded-full" />
        <!-- foreach key in item, print nicely -->
        <table class="w-full">
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Description</th>
            <th>Who can view</th>
            <th>Shorthand for</th>
          </tr>
          <tr
            v-for="key in Object.keys(item).filter((x) => x != '_id')"
            :key="key"
            class=""
          >
            <td class="!font-normal max-w-[120px]">{{ key }}</td>
            <td>{{ item[key].type }}</td>
            <td>
              <template v-if="item[key].description">
                <div v-for="dx in (item[key].description + ';').split(';')" :key="dx">
                  {{ dx }}
                </div>
              </template>
            </td>
            <td>{{ item[key].who_can_view }}</td>
            <td>{{ item[key].shorthand_for }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
th {
  text-align: left;
  @apply font-family2 text-dark xs:text-[8px] sm:text-[16px] xl:text-[20px];
}
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
