
<script lang="ts">
  
    import type { Component } from 'svelte';
    import Feed from "./components/feed/feed.svelte"
    import NavSidebar from "./components/nav-sidebar/nav-sidebar.svelte";
    import UserSidebar from "./components/user-sidebar/user-sidebar.svelte";
    import LocalData from "./components/overlay/local-data.svelte";
    import Bookmarks from "./components/overlay/bookmarks.svelte"
    import CreatePost from "./components/overlay/create-post.svelte"
    import Settings from "./components/overlay/settings.svelte"
    import About from "./components/overlay/about.svelte"
    import Profile from "./components/feed/profile.svelte"

    const modal_map: Record<string, Component> = {

        Local_data: LocalData, 
        Bookmarks: Bookmarks,
        Create_post: CreatePost, 
        Settings: Settings,
        About: About
    };


    let active_modal = $state<string | null>(null)
    let active_profile = $state<string | null>(null)

    function open_modal(name: string) {
       active_modal = name
    }

    function open_profile(user: string) {
        active_profile = user
    }

    function close_modal() {
        active_modal = null 
        active_profile = null
    }

</script>

<div class="app">

    {#if !active_profile}
        <Feed on_profile_click={(autor) => open_profile(autor)}/>
    {/if}

    {#if active_profile} 

        <Profile close_profile={close_modal}/>

    {/if}

    <div id="container">

        <NavSidebar on_open_overlay={(name) => open_modal(name)}/>
        <UserSidebar on_open_overlay={(name) => open_modal(name)}/>
        
    </div>

    

    {#if active_modal && modal_map[active_modal]}

        {@const Active_component = modal_map[active_modal]}

    <div id="overlay">
        <button class="go-back-button" onclick={close_modal} aria-label="close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
        </button>
        <Active_component />
    </div>

    {/if}

</div>


<style>

    #container {
  width: 1240px;
  background-color: rgba(0, 0, 0, 0);
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: row;
  top: 0px;
    left: 50%;
    z-index: 100;
  transform: translateX(-50%);
  position: fixed;
  justify-content: space-between;
  box-sizing: border-box;
  pointer-events: none
}

#container > :global(*) {
    pointer-events: auto;
}

#overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: #0f0f15;
  display: flex;
  justify-content: center;
  margin: 0;
  overflow-x: hidden;
  scrollbar-gutter: stable both-edges;
}

.go-back-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  margin: 20px;
  margin-right: 22px;
  background-color: transparent;
  border: 0px solid black;
  width: 26px;
  stroke-width: 30px;
  cursor: pointer;
}
.go-back-button {
    color: rgb(255, 255, 255);
}


</style>