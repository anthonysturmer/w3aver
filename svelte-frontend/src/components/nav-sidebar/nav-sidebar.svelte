<script lang="ts">

  import Explore_box from "./explore_box.svelte";
  import Subscriptions_box from "./subscriptions_box.svelte";

    interface nav_sidebar_props {
        on_open_overlay: (arg0: string) => void;
    }

    let { on_open_overlay }: nav_sidebar_props = $props()

    let subscriptions_box_option = $state(true)

    let explore_box_option = $state(false)

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
          class="nav-sidebar__title"
          src="https://anthonysturmer.github.io/anthonysturmer/w3aver.png"
          alt="w3aver"
        />
        <button
          class="nav-sidebar__about-button"
          id="nav-sidebar-about-button"
          onclick={() => on_open_overlay("About")}
          aria-label = "about button"


        >
          <svg
            class="nav-sidebar__about-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"

          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
        </button>
      </div>

      <search class="nav-sidebar__search" id="nav-sidebar-search">
        <input
          class="nav-sidebar__search-input"
          id="nav-sidebar-search-input"
          type="search"
          placeholder="Search for websites"
        />
        <svg
          class="nav-sidebar__search-svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <button
          id="nav-sidebar-search-action-button"
          class="nav-sidebar__search-action-button"
          aria-label = "search button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-right-icon lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </search>

      <div class="nav-sidebar__buttons-box">
        <button
          id="sub-bt"
          class="nav-sidebar__button"
          onclick={handle_subscriptions_click}
          style:color={subscriptions_box_option ? "white" : undefined}
        >
          <svg
            style:color={subscriptions_box_option ? "white" : undefined}
            class="nav-sidebar__button-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <p
            class="nav-sidebar__button-p"
            style:color={subscriptions_box_option ? "white" : undefined}
          >
            Subscriptions
          </p>
        </button>
        <button
          id="exp-bt"
          class="nav-sidebar__button"
          onclick={handle_explore_click}
          style:color={explore_box_option ? "white" : undefined}
        >
          <svg
           style:color={explore_box_option ? "white" : undefined}
            class="nav-sidebar__button-svg"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
          </svg>
          <p
          style:color={explore_box_option ? "white" : undefined}
            class="nav-sidebar__button-p"
          >
            Explore
          </p>
        </button>
      </div>



      <Explore_box is_visible={explore_box_option}/>

     


      <Subscriptions_box is_visible={subscriptions_box_option}/>
   
    </div>


<style>

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
}
  .nav-sidebar__search-action-button {
    height: 54px;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 0px;
    color: white;
    width: 56px;
  }

  .nav-sidebar__search-action-button:hover {
    background-color: #ffffff07;
  }

  .nav-sidebar__about-button {
    background-color: transparent;
    border: 0px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-sidebar__header {
    width: 96%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .nav-sidebar__title {
    font-size: 2rem;
    text-align: start;
    width: 110px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 14px;
  }

  .nav-sidebar__button {
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
  }

  .nav-sidebar__button:hover {
    background-color: #ffffff18;
  }

  .nav-sidebar__button-svg {
    width: 18px;
    height: 18px;
    color: #ffffffb2;
  }

 .nav-sidebar__button-p {
    text-align: left;
    color: #ffffffb2;
    padding-left: 12px;
    font-size: 0.9rem;
  }

  .nav-sidebar__buttons-box {
    width: 100%;
  }

  .nav-sidebar__search {
    box-sizing: border-box;
    width: 100%;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 0px;
    border-radius: 10px;
    background-color: #181820;
    overflow: hidden;
  }

  .nav-sidebar__search-input {
    border: 0px solid black;
    background-color: transparent;
    color: #ffffffb2;
    padding-left: 48px;
    padding-bottom: 2px;
    width: 100%;
    height: 100%;
    font-size: 0.95rem;
  }

  .nav-sidebar__search-input:focus {
    border: 0px solid white;
    outline: 0px solid white;
  }

  .nav-sidebar__search-svg {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 16px;
    color: rgba(255, 255, 255, 0.295);
  }

  .nav-sidebar__about-svg {
    color: #666666;
  }


</style>