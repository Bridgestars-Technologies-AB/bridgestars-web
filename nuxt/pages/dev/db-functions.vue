<script setup>
  
import data from '~/assets/dev/docs-db-functions.json'

const toast = useToast()

function copyUrl(id){
  let url = window.location.href;
  if(url.includes("#")){
    url = url.split("#")[0]
  }
  navigator.clipboard.writeText(url+"#"+id).then(function() {
    toast.success(`Copied url to ${id}`)
  })
}
onMounted(() => {
  //reload data() {
  import ('~/assets/dev/docs-db-functions.json').then((res) => { //reload during development
    data.value = res
  })
})
</script>
<template>
    <div>
       <div class="flex flex-col items-center text-center mt-5">
        <h1 class="text-3xl font-bold">Database Functions</h1>
        <p class="text1 font-family2 text-2xl">This is a list of all the functions available in the database API.</p> 
      </div>

  <!--  all classes links -->
      
      <div class="mx-9 my-9 flex flex-wrap flex-col">
        <div v-for="table in data" class="flex items-center text-center">
          <div class="w-full">
            <a :href="`#${table['name']}`" class="xs:text-[14px] md:text-[20px] text-blue font-family2 mr-1">{{table['name']}}</a>
            <span class="i-material-symbols-find-in-page-outline-rounded text-blue text-[14px]"/>
          </div>
        </div>
      </div>

    <div class="flex flex-col items-center w-full flex-grow space-y-[50px]">
      <div v-for="item in data" class="flex flex-col px-3 items-start mt-5 w-full max-w-[1700px]">
        <div class="flex items-center cursor-pointer mb-1" @click="copyUrl(item['_id'])">
          <h2 class="xl:text-[30px] sm:text-[25px] xs:text-[16px] font-bold" :id="item['_id']">{{item['name']}}</h2>
          <span class="i-material-symbols-link-rounded text-dark text-2xl ml-2"/>
        </div>
        <template v-if="item.desc">
          <div v-for="d in (item.desc+';').split(';')">
            <span class="text2 xl:text-[25px] sm:text-[20px] xs:text-[11px]">{{d}}</span>
          </div>
        </template>
        <div class="w-full mt-1 h-[1.5px] opacity-60 bg-dark rounded-full"/>
        <!-- foreach key in item, print nicely -->
        <h4 class="font-bold mt-3 font-family1 xl:text-[25px] sm:text-[20px] xs:text-[11px]">Parameters</h4>
        <table class="w-full">
          <tr>
            <!-- <th>Name</th> -->
            <!-- <th>Type</th> -->
            <!-- <th>Description</th> -->
          </tr>
          <tr v-for="param in item.params" class="">
            <td class="!font-normal max-w-[120px]">{{param.name}}</td>
            <td>{{param.type}}</td>
            <td>
            <template v-if="param.desc">
              <div v-for="d in (param.desc+';').split(';')">
                {{d}}
              </div>
            </template>
          </td>
          </tr>
        </table>

        <h4 class="font-bold mt-3 font-family1 xl:text-[25px] sm:text-[20px] xs:text-[11px]">Result</h4>
        <table class="w-full">
          <tr>
            <!-- <th>Type</th> -->
            <!-- <th>Description</th> -->
          </tr>
          <tr class="">

            <td class="!font-normal max-w-[220px]">
              <template v-if="item.return.type">
                <div v-for="d in (item.return.type+';').split(';')">
                  {{d}}
                </div>
              </template>
            </td>

            <td>
              <template v-if="item.return.desc">
                <div v-for="d in (item.return.desc+';').split(';')">
                  {{d}}
                </div>
              </template>
            </td>
          </tr>
        </table>


        <h4 class="font-bold mt-3 font-family1 xl:text-[25px] sm:text-[20px] xs:text-[11px]">Errors</h4>
        <table class="w-full">
          <tr>
            <!-- <th>Type</th> -->
            <!-- <th>Description</th> -->
          </tr>
          <tr class="" v-for="e in item.errors">
            <td class="!font-normal max-w-[220px]">
              <template v-if="e">
                <div v-for="d in (e+';').split(';')">
                  {{d}}
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
th{
  text-align:left;
  @apply font-family2 text-dark xs:text-[8px] sm:text-[16px] xl:text-[20px];
}  
td{
  @apply font-family2 text-dark font-light xs:text-[6px] sm:text-[16px] xl:text-[18px] px-1;
  /* border-right: 1px solid #E5E5E5; */
  border-bottom: 1px solid #E5E5E5;
  border-top: 1px solid #E5E5E5;

}
table{
  /* table-layout:fixed; */
  word-wrap:break-word;
}

</style>
