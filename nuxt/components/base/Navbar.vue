<script setup lang="ts">
const props = defineProps(['transparent'])
//https://icones.js.org/
import MaterialSymbolsHomeRounded from '~icons/material-symbols/home-rounded'
import IcBaselineAccountCircle from '~icons/ic/baseline-account-circle'
import CiHamburgerMd from '~icons/ci/hamburger-md'
import IcBaselineClose from '~icons/ic/baseline-close'

const routes = reactive([
  {
    path: '/',
    name: 'Home',
    icon: shallowRef(MaterialSymbolsHomeRounded),
  },
  {
    key: "account",
    path: '/auth/sign-in',
    name: 'Sign In',
    icon: shallowRef(IcBaselineAccountCircle), 
  }
]) 

const success ="#59BA83"
const isOpen = ref(false)
const signedIn = ref(false)

const bgColor = props.transparent ? "bg-[#FFFFFF00]" : "bg-white";
const textColor = props.transparent ? "!text-white" : "!text-dark";
const menuIconColor = props.transparent ? "bg-white" : "bg-dark";
const iconColor = props.transparent ? "#FFFFFF" : "rgb(120,120,120)";

onMounted(() => {
  if(Parse.User.current()){
    signedIn.value = true
    const account = routes.find(route => route.key === 'account')
    account.name = Parse.User.current().get('dispName') 
    account.path = '/profile'
    account.success = true;
  }
})

</script>

<template>
  <header class="w-full">
    <nav :class="'flex xs:flex-wrap md:flex-nowrap justify-between items-center w-[100%] py-4 px-2 mb-2 rounded-2xl ' + bgColor">

<!-- Logo -->
    <div class="flex items-center md:w-auto">
      <NuxtLink to="/">
        <img src="~/assets/bridgestars/logo/logo-trans-128px.png" 
          class="h-[32px] w-[32px] mx-2">
      </NuxtLink>
      <NuxtLink to="/">
        <h3 :class="'text-[22px] ' + textColor">Bridgestars</h3>
      </NuxtLink>
    </div>

<!-- Open Menu Button -->
      <div class="flex items-center md:hidden mr-2">
        <HamburgerMenuButton  @click="isOpen = !isOpen" :isOpen="isOpen" class="!scale-[0.3]" :innerClass="menuIconColor"/>
        <IcBaselineAccountCircle v-if="signedIn" class="!scale-[1.3]" :style="'color: '+success" @click="isOpen = !isOpen"/>
      </div>

      <!-- Menu -->
      <div :class="'w-full md:w-auto md:block ' + (!isOpen ? 'xs:hidden' : '')">
        <ul class="
            md:flex
            md:justify-end
            md:p-0
            xs:p-1
            "> 
          <li v-for="route in routes" :key="route.name" class="block mx-2">
            <nuxt-link :to="route.path" class="text-[14px]">

              <div class="flex items-center space-x-2 mx-1 xs:mt-3 md:mt-0">
                <component :is="route.icon" class="scale-[1.3]"
                  :style="'color: ' + (route.success ? success : iconColor)"/>
                
                <span 
                  :class="'text2 !text-[18px] !font-medium ' + 
                    (route.success ? '!text-[#59BA83]' : textColor)"> 
                  {{ route.name }}
                </span>
              </div>

          </nuxt-link>
        </li>
      </ul>
    </div>

    </nav> 

  </header>
</template>

<style scoped>
</style>
