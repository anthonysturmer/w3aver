
<script lang="ts">
  
    import type { Component } from 'svelte';

    import MainFeed from "./components/feed/main-feed.svelte"
    import TagsFeed from './components/feed/tags-feed.svelte';
    import SearchFeed from './components/feed/search-feed.svelte';
    import NavSidebar from "./components/nav-sidebar/nav-sidebar.svelte";
    import UserSidebar from "./components/user-sidebar/user-sidebar.svelte";
    import LocalData from "./components/overlay/local-data.svelte";
    import Bookmarks from "./components/overlay/bookmarks/bookmarks.svelte"
    import CreatePost from "./components/overlay/create-post.svelte"
    import Settings from "./components/overlay/settings.svelte"
    import About from "./components/overlay/about.svelte"
    import Profile from "./components/feed/profile.svelte"
    import PlansOptions from './components/overlay/plans-options.svelte';

    import { iframe_url } from './global/iframe.svelte';


    const modal_map: Record<string, Component> = {

        LocalData: LocalData, 
        Bookmarks: Bookmarks,
        CreatePost: CreatePost,
        PlansOptions: PlansOptions,
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

    // PROVISÓRIO :

    import { onMount } from 'svelte';
    onMount(() => {
    
    const ja_visitou = localStorage.getItem('ja_visitou');

    if (!ja_visitou) {
      
        alert(
                'Para a equipe do Sebrae Supernova:\n\n' +
                'O site aqui disponível busca exemplificar como seria a dinâmica dos posts armazenados localmente. ' +
                'Esta não é a versão final e ainda não está conectada a um servidor. ' +
                'Por isso, alguns recursos ainda não estão implementados ou podem funcionar de forma inesperada.\n\n' +
                'A responsividade para dispositivos móveis ainda está sendo desenvolvida, portanto, utilize um computador para testar o site.'
        );
      
   
      localStorage.setItem('ja_visitou', 'true');
    }
  });

</script>

<div class="app">

        {#if iframe_url.url}
<div class="iframe__container">

    <section class="iframe__top-bar">
        <img
            loading="lazy"
            class="iframe__icon"
            src="https://anthonysturmer.github.io/anthonysturmer/w3aver.png"
            alt="w3aver"
        />

        <button
            class="iframe__button"
            onclick={() => iframe_url.url = ""}
            aria-label="close"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
 
        </button>
    </section>

    <iframe
        src={iframe_url.url}
        title="Visualizador"
    ></iframe>

</div>



    {:else if current_feed_view.type === "main"}

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
    width: 1260px;
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
    cursor: pointer;
    outline: 0px;
    border: 0px;
}




.iframe__container {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100000000000000000000000000000000;
    display: flex;
    flex-direction: column;
}

.iframe__top-bar {
    flex: 0 0 48px;

    width: 100%;
    height: 48px;

    background-color: #0f0f15;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0 8px;

    z-index: 2;
}

iframe {
    display: block;

    width: 100%;
    flex: 1;

    min-height: 0;
    border: 0;

    z-index: 1;
}

.iframe__icon {
    font-size: 2rem;
    text-align: start;
    width: 100px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 14px;
}

.iframe__button  {
    width: fit-content;
    height: 30px;
    border-radius: 8px;
    background: none;
    outline: 0px;
    border: 0px;
    margin-right: 4px;
}

.iframe__button svg {
    width: 26px;
}
</style>