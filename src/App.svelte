<script lang="ts">
  import type { Component } from "svelte";
  import { onMount } from "svelte";

  import MainFeed from "./components/feed/main-feed.svelte";
  import TagsFeed from "./components/feed/tags-feed.svelte";
  import SearchFeed from "./components/feed/search-feed.svelte";
  import NavSidebar from "./components/nav-sidebar/nav-sidebar.svelte";
  import UserSidebar from "./components/user-sidebar/user-sidebar.svelte";
  import LocalData from "./components/overlay/local-data.svelte";
  import Bookmarks from "./components/overlay/bookmarks/bookmarks.svelte";
  import CreatePost from "./components/overlay/create-post.svelte";
  import Settings from "./components/overlay/settings.svelte";
  import About from "./components/overlay/about.svelte";
  import Profile from "./components/feed/profile.svelte";
  import PlansOptions from "./components/overlay/plans-options.svelte";
  import MobileTopBar from "./components/mobile-top-bar.svelte";

  import { iframe_url } from "./global/iframe.svelte";

  const modal_map: Record<string, Component> = {
    LocalData,
    Bookmarks,
    CreatePost,
    PlansOptions,
    Settings,
    About,
  };

  type feed_view_input =
    | { type: "main" }
    | { type: "profile"; user: string }
    | { type: "tag"; tag: string }
    | { type: "search"; query: string };

  type feed_view_state = feed_view_input & {
    id: number;
    scroll_y: number;
  };

  let active_modal = $state<string | null>(null);
  let next_feed_id = 1;
  let feed_stack = $state<feed_view_state[]>([
    { id: 0, type: "main", scroll_y: 0 },
  ]);

  let scroll_lock_active = false;
  let scroll_lock_x = 0;
  let scroll_lock_y = 0;
  let scroll_lock_body_styles = "";
  let scroll_lock_html_overflow = "";
  let scroll_lock_scrollbar_width = 0;

  const active_feed_index = $derived(feed_stack.length - 1);
  const feed_overlay_open = $derived(feed_stack.length > 1);

  function save_scroll_position() {
    const active_feed = feed_stack[active_feed_index];
    if (!active_feed) return;

    active_feed.scroll_y = window.scrollY;
  }

  function push_feed(view: feed_view_input) {
    save_scroll_position();

    const entry = {
      ...view,
      id: next_feed_id++,
      scroll_y: 0,
    } as feed_view_state;

    feed_stack = [...feed_stack, entry];

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    });
  }

  function pop_feed() {
    if (feed_stack.length <= 1) return;

    save_scroll_position();
    const previous_view = feed_stack[feed_stack.length - 2];
    feed_stack = feed_stack.slice(0, -1);

    requestAnimationFrame(() => {
      if (feed_stack.length === 1) {
        window.scrollTo({
          top: previous_view.scroll_y,
          left: 0,
          behavior: "instant" as ScrollBehavior,
        });
        return;
      }

      window.scrollTo({
        top: previous_view.scroll_y,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
    });
  }

  function open_profile(user: string) {
    push_feed({ type: "profile", user });
  }

  function open_search_feed(query: string) {
    const normalized_query = query.trim();
    if (!normalized_query) return;
    push_feed({ type: "search", query: normalized_query });
  }

  function open_tags_feed(tag: string) {
    push_feed({ type: "tag", tag });
  }

  function open_modal(name: string) {
    active_modal = name;
  }

  function close_modal() {
    active_modal = null;
  }

  function sync_scroll_lock(should_lock: boolean) {
    if (typeof document === "undefined") return;

    if (should_lock && !scroll_lock_active) {
      scroll_lock_active = true;
      scroll_lock_x = window.scrollX;
      scroll_lock_y = window.scrollY;
      scroll_lock_body_styles = document.body.getAttribute("style") ?? "";
      scroll_lock_html_overflow = document.documentElement.style.overflow;
      scroll_lock_scrollbar_width =
        window.innerWidth - document.documentElement.clientWidth;

      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scroll_lock_y}px`;
      document.body.style.left = `-${scroll_lock_x}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      if (scroll_lock_scrollbar_width > 0) {
        document.body.style.paddingRight = `${scroll_lock_scrollbar_width}px`;
      }

      return;
    }

    if (!should_lock && scroll_lock_active) {

      scroll_lock_active = false;
      document.body.setAttribute("style", scroll_lock_body_styles);
      document.documentElement.style.overflow = scroll_lock_html_overflow;
      window.scrollTo({
        top: scroll_lock_y,
        left: scroll_lock_x,
        behavior: "instant" as ScrollBehavior,

      });
    }
  }

  $effect(() => {
    sync_scroll_lock(active_modal !== null || Boolean(iframe_url.url));
  });

  onMount(() => {
    const ja_visitou = localStorage.getItem("ja_visitou");

    if (!ja_visitou) {
      alert(
        "Para a equipe do Sebrae Supernova:\n\n" +
          "O site aqui disponível busca exemplificar como seria a dinâmica dos posts armazenados localmente. " +
          "Esta não é a versão final e ainda não está conectada a um servidor. " +
          "Por isso, alguns recursos ainda não estão implementados ou podem funcionar de forma inesperada.\n\n" +
          "A responsividade para dispositivos móveis ainda está sendo desenvolvida, portanto, utilize um computador para testar o site.",
      );

      localStorage.setItem("ja_visitou", "true");
    }
  });
</script>

<div class="app" class:app--feed-overlay={feed_overlay_open}>
  {#if iframe_url.url}
    <div class="iframe__container">
      <section class="iframe__top-bar" aria-label="Controles do visualizador">
        <img
          loading="lazy"
          class="iframe__icon"
          src="https://anthonysturmer.github.io/anthonysturmer/w3aver.png"
          alt="w3aver"
        />

        <a
          class="iframe__external-link"
          href={iframe_url.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir site em uma nova aba"
        >
          abrir site
        </a>

        <button
          class="iframe__button"
          onclick={() => (iframe_url.url = "")}
          aria-label="Fechar visualizador"
          title="Fechar visualizador"
        >
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
            <path
              d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"
            />
          </svg>
        </button>
      </section>

      <iframe src={iframe_url.url} title="Site aberto pelo W3aver"></iframe>
    </div>
  {/if}



  <div class="false-sidebar">

  </div>

  <MobileTopBar on_open_overlay={open_modal}/>

  <main
    class="feed-stack"
    class:feed-stack--overlay={feed_overlay_open}
    aria-live="polite"
  >
    {#each feed_stack as view, index (view.id)}
      <div
        class="feed-layer"
        class:feed-layer--active={index === active_feed_index}
        class:feed-layer--background={index !== active_feed_index}
        inert={index !== active_feed_index}
        aria-hidden={index !== active_feed_index}
      >




        {#if view.type === "main"}
          <MainFeed on_profile_click={open_profile} />
        {:else if view.type === "tag"}
          <TagsFeed
            tag={view.tag}
            close_tags_feed={pop_feed}
            on_profile_click={open_profile}
          />
        {:else if view.type === "profile"}
          <Profile
            user={view.user}
            close_profile={pop_feed}
            on_profile_click={open_profile}
          />
        {:else if view.type === "search"}
          <SearchFeed
            query={view.query}
            close_search_feed={pop_feed}
            on_profile_click={open_profile}
          />
        {/if}
      </div>
    {/each}
  </main>


  <div class="false-sidebar false-sidebar-right">

  </div>

  <div
    id="container"
    class:container--hidden={Boolean(active_modal) || Boolean(iframe_url.url)}
    
  >
    <NavSidebar on_open_overlay={open_modal} on_tag_selected={open_tags_feed} />
    <UserSidebar on_open_overlay={open_modal} />
  </div>

  {#if active_modal && modal_map[active_modal]}
    {@const Active_component = modal_map[active_modal]}

    <div id="overlay">
      <button
        class="go-back-button"
        onclick={close_modal}
        aria-label="Fechar janela"
        title="Fechar janela"
      >
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
      <Active_component />
    </div>
  {/if}
</div>

<style lang="scss">
  #container {
    width: 100%;
    max-width: 1260px;
    background-color: rgba(0, 0, 0, 0);
    height: 100vh;
    padding: 10px;
    display: flex;
    flex-direction: row;
    top: 0;
    left: 50%;
    z-index: 100;
    transform: translateX(-50%);
    position: fixed;
    justify-content: space-between;
    box-sizing: border-box;
    pointer-events: none;
    transition:
      opacity 160ms ease,
      visibility 160ms ease;

    & > :global(*) {
      pointer-events: auto;
    }

    &.container--hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
  }


  .feed-stack {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;

    &--overlay {
      width: 100%;
    }
  }

  .feed-layer {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    transition:
      opacity 180ms ease,
      transform 180ms ease,
      filter 180ms ease;

    &--active {
      position: relative;
      z-index: 2;
    }

    &--background {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 58px;
      height: 58px;
      overflow: hidden;
      transform: scale(0.96);
      transform-origin: top center;
      opacity: 0.38;
      filter: brightness(0.8);
      pointer-events: none;
      border-radius: 6px;
    }

    &--active:not(:first-child) {
      position: relative;
      width: 100%;
      min-height: 100vh;
      padding-bottom: 16px;
      z-index: 2;
    }
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
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable both-edges;
  }

  .go-back-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    margin: 20px 22px 20px 20px;
    background-color: transparent;
    width: 26px;
    cursor: pointer;
    outline: 0;
    border: 0;
    z-index: 4;
  }

  .iframe__container {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000000000;
    display: flex;
    flex-direction: column;
    background-color: #0f0f15;
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
    gap: 12px;
    z-index: 2;
  }

  iframe {
    display: block;
    width: 100%;
    flex: 1;
    min-height: 0;
    border: 0;
    z-index: 1;
    background-color: white;
  }

  .iframe__icon {
    font-size: 2rem;
    text-align: start;
    width: 100px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 14px;
  }

  .iframe__external-link {
    margin-left: auto;
    color: #b8b8b8;
    font-size: 0.85rem;
    text-decoration: none;
    padding: 7px 10px;
    border-radius: 7px;

    &:hover {
      color: white;
      background-color: #ffffff0b;
    }
  }

  .iframe__button {
    width: fit-content;
    height: 30px;
    border-radius: 8px;
    background: none;
    outline: 0;
    border: 0;
    margin-right: 4px;
  }

  .iframe__button svg {
    width: 26px;
  }

  .false-sidebar {
    min-width: 300px;
    height: 100vh;
    margin: 10px;
    height: 100vh;
    gap: 8px;
  
  }

  @media (min-width: 1240px) {
    .false-sidebar {
      display: none;
    }

    .feed-layer {
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
    }
  }

  
   @media (max-width: 1100px) {

    .false-sidebar-right {
      display: none;
    }

  }

    @media (max-width: 1285px) {
    .false-sidebar {
      min-width: 260px;
      width: 260px;
    }
  }
    @media (max-width: 1100px) {
    .false-sidebar {
      min-width: 300px;
      width: 300px;
    }
  }
  @media (max-width: 900px) {
    .false-sidebar {
      min-width: 260px;
      width: 260px;
    }
  }


  @media (max-width: 760px) {
    .false-sidebar {
      display: none;
    }
  }

  .app {
    
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

  }



</style>
