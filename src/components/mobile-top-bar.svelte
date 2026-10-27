<script lang="ts">

    import { user, log_in, log_out } from "../global/auth.svelte";
   

  interface user_sidebar_props {
    on_open_overlay: (overlay_name: string) => void;

  }

  let { on_open_overlay }: user_sidebar_props = $props();
</script>

<div class="mobile-top-bar">


        <img
          loading="lazy"
          class="nav-sidebar__title"
          src="https://anthonysturmer.github.io/anthonysturmer/w3aver.png"
          alt="w3aver"
        />


        <div class="mobile-top-bar__buttons">


    <button
      onclick={() => on_open_overlay("PlansOptions")}
      id="bookmarks-button"
      class="user-sidebar__button"
    >
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M 11.562 3.266 A0.5 0.5 0 0 1 12.438 3.266" />
      <path d="M 12.438 3.266 L 15.39 8.87" />
      <path d="M 15.39 8.87 A1 1 0 0 0 16.906 9.164" />
      <path d="M 16.906 9.164 L 21.183 5.5" />
      <path d="M 2.02 6.02 A0.5 0.5 0 0 1 2.818 5.501" />
      <path d="M 2.818 5.501 L 7.094 9.165" />
      <path d="M 21.183 5.5 A0.5 0.5 0 0 1 21.981 6.019" />
      <path d="M 7.094 9.165 A1 1 0 0 0 8.61 8.871" />
      <path d="M 8.61 8.871 L 11.562 3.266" />
      <path d="M18 19 L5.619 19" />
      <path d="M21.981 6.019 L18 19" />
      <path d="M5.619 19 A1.42 1.42 0 0 1 5.619 19" />
      <path d="M5.619 19 L2.02 6.02" />
    </svg>
      
    </button>

  
    <button
      onclick={() => on_open_overlay("Bookmarks")}
      id="bookmarks-button"
      class="user-sidebar__button"
    >
      <svg
        class="user-sidebar__button-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
        ></path>
      </svg>
      
    </button>

    
    <button
      id="local-data-button"
      onclick={() => on_open_overlay("LocalData")}
      class="user-sidebar__button"
    >
      <svg
        class="user-sidebar__button-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
        ></path>
      </svg>
     
    </button>

    <button
      onclick={() => on_open_overlay("Settings")}
      id="settings-button"
      class="user-sidebar__button"
    >
      <svg
        class="user-sidebar__button-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M14 17H5"></path>
        <path d="M19 7h-9"></path>
        <circle cx="17" cy="17" r="3"></circle>
        <circle cx="7" cy="7" r="3"></circle>
      </svg>
      
    </button>


    <button
      onclick={() => log_in()}
      id="settings-button"
      class="user-sidebar__button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-plus"
        aria-hidden="true"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
      
    </button>    

    {#if user.is_logged_in}
    <button
      onclick={() => log_out()}
      id="settings-button"
      class="user-sidebar__button"
    >
    
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
    </svg>
      
    </button>
    {/if}

    </div>

    <!--
    <button class="more-options-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
    </button>
    -->
</div>


<style lang="scss">
    
    .mobile-top-bar {

        width: 100%;
        padding-right: 14px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        position: fixed;
        top: 0px;
        right: 0px;
        background-color: #0f0f15;
        z-index: 10000;
        height: 54px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.208);

        &__buttons {

            display: flex;
            flex-direction: row;
            height: 100%;
            align-items: center;
            gap: 10px;


            & button {
                width: 34px;
                
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0px;
                margin: 0px;

            }
        }
    }
 
    /*@media (max-width: 760px) {

        .mobile-top-bar__buttons {
            display: none;
        }

    }

    @media (min-width: 760px) {

        .more-options-button {
            display: none;
        }

    }*/
    
  @media (min-width: 1100px) {

    .mobile-top-bar {
      display: none;
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
    border: 0px solid black;
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