<script setup lang="js">
const props = defineProps([
  "placeholder",
  "id",
  "wrapperClass",
  "modelValue",
]);
defineEmits(["update:modelValue"]);

// const type = ref(props.type);
const showEye = ref(false);
const showPass = ref(false);
const input = ref(null);

const value = ref("");

function update(event){
  const val = event.target.value;
  if(props.modelValue)
    emit('update:modelValue', val);
  else value.value = val;
  showEye.value = val.length > 0;
}

function toggleShowPass() {
  showPass.value = !showPass.value;
  if(props.id.includes("password")) {
    input.value.type = showPass.value ? "text" : "password";
  }
}
</script>

<template>
  <div :class="'input-block ' + wrapperClass">
    <input
      class="py-2.5 px-3.5 bg-white"
      v-bind="$attrs"
      placeholder=" "
      ref="input"
      :id="id"
      :value="modelValue || value"
      @input="update"
    />
    <!--  above is solution for using v-model on this custom inputfield -->
    <span class="placeholder text2 !font-light !text-[14px] !tracking-[1.2px]">
      {{ placeholder }}
    </span>
    <small class="info"></small>
    <!-- <div -->
    <!--   v-if="props.id === 'password-signin' && showPass" -->
    <!--   class="absolute top-[35%] right-[5px] i-basil-eye-outline" -->
    <!--   @click="toggleShowPass" -->
    <!-- ></div> -->
    <!-- v-if="props.id === 'password-signin' && !showPass" -->
    <ClientOnly>
      <div v-if="(showEye || showPass) && props.id.includes('password')"
        class="absolute top-[14px] right-[14px]">
          <!-- 14px since input field is 48px, so position should be 48/2-20/2=14px from top -->
        <div
          :class="`opacity-80 ${
            showPass ? 'i-basil-eye-closed-outline' : 'i-basil-eye-outline'
          }`"
          style="height:20px; width:20px;"
          @click="toggleShowPass"
        ></div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
div.input-block {
  position: relative;
}
div.input-block input {
  color: #495055;
  width: 100%;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  outline: none;
}

div.input-block.error input:focus,
div.input-block.error input {
  border: 2px solid red;
}

div.input-block.error small.info {
  color: red;
}

div.input-block.error input:focus + span.placeholder,
div.input-block.error span.placeholder {
  color: red;
}

div.input-block.success input:focus,
div.input-block.success input {
  border: 2px solid green;
}

div.input-block.success small.info {
  color: green;
}

div.input-block.success input:focus + span.placeholder,
div.input-block.success span.placeholder {
  color: green;
}

div.input-block span.placeholder {
  position: absolute;
  margin: 11px 0px;
  padding: 0px 5px;
  color: "rgb(0,0,0,0.87)";
  letter-spacing: 1px;
  display: block;
  align-items: center;
  top: 0;
  left: 15px;
  transition: all 0.2s;
  transform-origin: 0% 0%;
  background: none;
  pointer-events: none;
}
div.input-block input:not(:placeholder-shown) + span.placeholder,
div.input-block input:focus + span.placeholder {
  transform: scale(0.85) translateY(-23px);
  background: #fefefe;
}
div.input-block input:focus {
  @apply border-[#2590ee];
}
div.input-block{
  @apply border-none;
}
div.input-block input:focus + span.placeholder {
  @apply text-blue !font-medium;
}
</style>
