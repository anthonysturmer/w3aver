
<script lang="ts">
  
    import type { Component } from 'svelte';

    import MainFeed from "./components/feed/main-feed.svelte"
    import TagsFeed from './components/feed/tags-feed.svelte';
    import SearchFeed from './components/feed/search-feed.svelte';

    import NavSidebar from "./components/nav-sidebar/nav-sidebar.svelte";
    import UserSidebar from "./components/user-sidebar/user-sidebar.svelte";
    import LocalData from "./components/overlay/local-data.svelte";
    import Bookmarks from "./components/overlay/bookmarks.svelte"
    import CreatePost from "./components/overlay/create-post.svelte"
    import Settings from "./components/overlay/settings.svelte"
    import About from "./components/overlay/about.svelte"
    import Profile from "./components/feed/profile.svelte"

    const modal_map: Record<string, Component> = {

        LocalData: LocalData, 
        Bookmarks: Bookmarks,
        CreatePost: CreatePost,
        Settings: Settings,
        About: About
    };

    type feed_view_state = 
        | { type: 'main' }
        | { type: 'profile', user: string }
        | { type: 'tag', tag: string }
        | { type: 'search', query: string }


    let active_modal = $state<string | null>(null)

    let current_feed_view = $state<feed_view_state>({type: 'main'})
    
    function go_to_main_feed() {
        current_feed_view = {type: 'main'};
    }

    function open_profile(user: string) {
        current_feed_view = {type: 'profile', user};
    }

    function open_search_feed(query: string) {
        current_feed_view = { type: 'search', query };
    }

    function open_tags_feed(tag: string) {
        current_feed_view = {type: 'tag', tag};
    }

    function open_modal(name: string) {
       active_modal = name
    }

    function close_modal() {
        active_modal = null 
    }

</script>

<div class="app">

    {#if current_feed_view.type === "main"}

        <MainFeed on_profile_click={(autor) => open_profile(autor)}/>

    {:else if current_feed_view.type === "tag"}

        <TagsFeed 
        tag={current_feed_view.tag} 
        close_tags_feed={go_to_main_feed}
        on_profile_click={open_profile}/>

    {:else if current_feed_view.type === "profile"}

        <Profile user={current_feed_view.user}  close_profile={go_to_main_feed}/>

    {:else if current_feed_view.type === "search"}

        <SearchFeed query={current_feed_view.query} close_search_feed={go_to_main_feed}/>

    {/if}

    <div id="container">

        <NavSidebar on_open_overlay={(name) => open_modal(name)} on_tag_selected={open_tags_feed}/>
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