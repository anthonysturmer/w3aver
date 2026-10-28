<script lang="ts">

    import { user, log_in, log_out } from "../global/auth.svelte";
   

  interface user_sidebar_props {
  
    on_close_modal: () => void;

  }

  let { on_close_modal }: user_sidebar_props = $props();



</script>

<div class="mobile-top-bar">


        <img
          loading="lazy"
          class="nav-sidebar__title"
          src="https://anthonysturmer.github.io/anthonysturmer/w3aver.png"
          alt="w3aver"
        />



      <button onclick={on_close_modal}>
       <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
        </svg>
      </button>

  
    <!--
    <button class="more-options-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
    </button>
    -->
</div>


<style lang="scss">
    
  .mobile-top-bar {
    width: 100%;
    height: 54px;
    flex: 0 0 54px;
    box-sizing: border-box;

    padding-right: 14px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    position: relative;

    background-color: #0f0f15;
    border-bottom: 1px solid rgba(255, 255, 255, 0.208);

    z-index: 2;

    & button {
      background-color: transparent;
      width: 26px;

      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0;
      margin: 0;
      border: 0;
    }
  }

  .nav-sidebar__title {
    font-size: 2rem;
    text-align: start;
    width: 120px;

    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 14px;
  }

  .user-sidebar__button {
    height: 52px;
    width: 100%;
    background-color: transparent;
    color: #ffffffb2;
    border: 0;
    font-size: 0.95rem;

    display: flex;
    flex-direction: row;

    padding-left: 12px;
    align-items: center;
    box-sizing: border-box;
  }

  .user-sidebar__button-svg {
    width: 18px;
    height: 18px;
  }
    
</style>