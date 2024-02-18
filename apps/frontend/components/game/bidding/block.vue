<!-- Currently, const pointer and const opacity has commented code which stops block from being disabled -->

<script setup lang="ts">
const { bid, leadingBid, size, clickable, inBiddingBox } = defineProps({
  bid: {
    type: Bid,
    default: new Bid(0, 0),
  },
  leadingBid: {
    type: Bid,
    default: new Bid(0, 0),
  },
  size: String,
  clickable: {
    type: Boolean,
    default: true,
  },
  inBiddingBox: {
    type: Boolean,
    default: false,
  },
});
// defineEmits<{
//   (event: "click", card: Card): void;
// }>();
const emit = defineEmits(["click"]);

//used to make the block green if the card is {suit:0, rank:0}
const isPass = computed(() => (bid.is("PASS") ? "!bg-[#0E9F6E]" : "")); // fattar inte varför den behöver "!"

const pointer = computed(
  () => (clickable && bid.isValid(leadingBid) ? "" : "pointer-events-none"),
  //"",
);

const bg = computed(() =>
  !clickable && bid.explanation !== "" ? "bg-[#e3b43e]" : "bg-light-500 dark:bg-dark-200",
);

const disabled = computed(() => inBiddingBox && !bid.isValid(leadingBid));

const hover = ref(false);
</script>

<template>
  <div
    v-if="inBiddingBox && !disabled && !bid.is('PASS')"
    :class="{
      'w-1/5 max-w-[50px] min-w-[34px] h-full top-0 translate-y-[5px] absolute z-[0]':true,
      'rounded-br-md': bid.rank === 7 && bid.suit === 0,
      'rounded-bl-md': bid.rank === 7 && bid.suit === 4,
      [`${bg}`]: true
    }"
  ></div>
  <div
    :class="{
      [`${$attrs.class} ${size} z-[2]`]: true,
      invisible: !bid.isVisible,
      'flex flex-row justify-center items-center': true,
      'opacity-70 dark:opacity-20 cursor-not-allowed': disabled,
      [`${
        hover && !disabled && !bid.is('PASS')
          ? '-translate-y-[4px] transition-transform'
          : 'translate-y-0'
      }`]: true,
    }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      :class="{
        [`${pointer} w-full h-full ${bg} ${isPass}`]: true,
        'rounded-t-lg border-t-[1px] border-light-200 dark:border-dark-500':
          inBiddingBox && !bid.is('PASS'),
        'rounded-md': !inBiddingBox || bid.is('PASS'),
      }"
      @click="emit('click', bid)"
    >
      <!-- <span class="text1 text-white">{{ brick(card.suit, card.rank) }}</span> -->
      <game-bidding-rank-suite :bid="bid"></game-bidding-rank-suite>
    </div>
    <span
      v-if="!clickable && bid.explanation !== '' && hover"
      class="z-10 text-white dark:text-white bg-black absolute text-[12px] top-[-55px] w-[200px] text-center p-2 rounded-lg opacity-80"
      >{{ bid.explanation }}</span
    >
  </div>
</template>
<style scoped>
div {
  @apply transition-colors duration-300;
}
</style>
