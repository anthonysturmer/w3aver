<script lang="ts">
  import ExploreBox from "./explore_box.svelte";
  import SubscriptionsBox from "./subscriptions_box.svelte";
  import SearchBox from "./search-box.svelte";

  interface nav_sidebar_props {
    on_open_overlay: (arg0: string) => void;
    on_tag_selected: (arg0: string) => void;
  }

  let { on_open_overlay, on_tag_selected }: nav_sidebar_props = $props();

  let subscriptions_box_option = $state(true);

  let explore_box_option = $state(false);

  function handle_subscriptions_click() {
    if (subscriptions_box_option) {
      subscriptions_box_option = false;
    } else {
      subscriptions_box_option = true;
      explore_box_option = false;
    }
  }

  function handle_explore_click() {
    if (explore_box_option) {
      explore_box_option = false;
    } else {
      explore_box_option = true;
      subscriptions_box_option = false;
    }
  }
</script>

<div class="nav-sidebar">
  <div class="nav-sidebar__header">
    <img
      loading="lazy"
      class="nav-sidebar__title"
      src="https://anthonysturmer.github.io/anthonysturmer/w3aver.png"
      alt="w3aver"
    />
    <button
      class="nav-sidebar__about-button"
      
      onclick={() => on_open_overlay("About")}
      aria-label="about button"
    >
      <svg
        class="nav-sidebar__about-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
        ></path>
        <path
          d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"
        ></path>
      </svg>
    </button>
  </div>

  <SearchBox/>
<div class="nav-sidebar__buttons-box">
  <button
    class="nav-sidebar__button"
    onclick={handle_subscriptions_click}
    class:active={subscriptions_box_option}
  >
    <svg
      class="nav-sidebar__button-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
    >
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      ></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
    <p class="nav-sidebar__button-p">Subscriptions</p>
  </button>

  <button
    class="nav-sidebar__button"
    onclick={handle_explore_click}
    class:active={explore_box_option}
  >
    <svg
      class="nav-sidebar__button-svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"
      ></path>
    </svg>
    <p class="nav-sidebar__button-p">Explore</p>
  </button>
</div>

  <ExploreBox tag_selected={on_tag_selected} is_visible={explore_box_option} />

  <SubscriptionsBox is_visible={subscriptions_box_option} />
</div>

<style lang="scss">
  .nav-sidebar {
    display: flex;
    align-items: start;
    flex-direction: column;
    height: 100%;
    gap: 8px;
    width: 300px;
    position: relative;
    z-index: 100000000000000000;
    transition: width 0.2s ease;

    &__search-action-button {
      height: 54px;
      display: none;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: 0px;
      color: white;
      width: 56px;

      &:hover {
        background-color: #ffffff07;
      }
    }
    &__about-button {
      background-color: transparent;
      border: 0px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  &__header {
    width: 96%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

    &__title {
      font-size: 2rem;
      text-align: start;
      width: 120px;
      padding-left: 10px;
      padding-top: 10px;
      padding-bottom: 14px;
    }

    &__button {
    height: 52px;
    width: 100%;
    background-color: transparent;
    color: #ffffffb2; 
    border: 0px solid black;
    font-size: 0.95rem;
    display: flex;
    flex-direction: row;
    padding-left: 12px;
    align-items: center;
    box-sizing: border-box;

    & svg path {
        color: #ffffffb2;
      }

    &:hover {
      background-color: #ffffff18;
    }

    &.active {
      color: #ffffff; 

      & svg path {
        color: #ffffff;
      }
    }
  }

&__button-svg {
  width: 18px;
  height: 18px;
  color: inherit; 
}

&__button-p {
  text-align: left;
  color: inherit; 
  padding-left: 12px;
  font-size: 0.9rem;
}

    &__buttons-box {
      width: 100%;
    }

    &__about-svg path {
      color: #666666;
    }
  }
</style>
