<script lang="ts">
   import Widget from "./widget.svelte";
   import ProfileBox from "./profile-box.svelte";
    import { user } from "../global/auth.svelte";

    interface user_sidebar_props {
        on_open_overlay: (overlay_name: string) => void;
    }
    
    let { on_open_overlay }: user_sidebar_props = $props()
    

</script>


<div class="user-sidebar">

    <ProfileBox/>

    <div>
    {#if user.is_logged_in}
    <button
        onclick={() => on_open_overlay("CreatePost")}
        id="create-post-button"
        class="user-sidebar__button"
    >
        <svg
        class="user-sidebar__button-svg"
        id="plus-bt"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
        </svg>
        <p class="user-sidebar__button-p">Create post</p>
    </button>
    {/if}
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
        <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
        </svg>
        <p class="user-sidebar__button-p">Bookmarks</p>
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
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
        <p class="user-sidebar__button-p">Local data</p>
    </button>
    <button
        onclick={() => on_open_overlay("Settings")}
        id="settings-button"
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
        <path d="M14 17H5" />
        <path d="M19 7h-9" />
        <circle cx="17" cy="17" r="3" />
        <circle cx="7" cy="7" r="3" />
        </svg>
        <p class="user-sidebar__button-p">Settings</p>
    </button>
    </div>
    <Widget />
</div>

<style>
    
.user-sidebar {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
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

 .user-sidebar__button:hover {
    background-color: #ffffff0f;
  }

 .user-sidebar__button-svg {
    width: 18px;
    height: 18px;
    color: #ffffffb2;
  }

  .user-sidebar__button-p {
    text-align: left;
    color: #ffffffb2;
    padding-left: 12px;
    font-size: 0.9rem;
  }

</style>