<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    is_subscribed,
    toggle_subscriptions,
  } from "../../global/subscriptions.svelte";

  import { bookmarks_colors_state } from "../../global/bookmarks_colors.svelte";
  import { iframe_url } from "../../global/iframe.svelte";

  import {
    is_bookmarked,
    toggle_bookmarks,
    type post_data,
    get_bookmark_color,
  } from "../../global/bookmarks.svelte";
  import { is_hidden, hide_profile } from "../../global/hidden.svelte";

  interface post_props {
    post: post_data;
    favicon?: string;
    on_profile_click: () => void;
    is_last: boolean;
  }

  $effect(() => {
    function handle_click(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) return;

      if (
        !target.closest(".post__bookmarks_options_div") &&
        !target.closest(".post__bookmark-button")
      ) {
        bookmarks_options = false;
      }
    }

    document.addEventListener("click", handle_click);

    return () => {
      document.removeEventListener("click", handle_click);
    };
  });

  let {
    post,
    favicon,
    on_profile_click,
    is_last = false,
  }: post_props = $props();


  const has_share = typeof navigator !== "undefined" && typeof navigator.share === "function";


  let dominium = $derived(new URL(post[0]).hostname);
  let bookmarks_options = $state(false);
  let bookmark_color = $derived(get_bookmark_color(post));
  let subscribed = $derived(is_subscribed(dominium));
  let bookmarked = $derived(is_bookmarked(post));
  let hidden = $derived(is_hidden(post[0]));


  let toast_message = $state("");
  let toast_visible = $state(false);
  let toast_leaving = $state(false);
  let toast_key = $state(0);
  let toast_timeout: ReturnType<typeof setTimeout> | undefined;
  let toast_remove_timeout: ReturnType<typeof setTimeout> | undefined;
  let toast_component_destroyed = false;

  function show_toast(message: string): void {
    if (toast_component_destroyed) return;

    // Cancela os dois timers para que uma chamada nova substitua a anterior.
    if (toast_timeout !== undefined) {
      clearTimeout(toast_timeout);
      toast_timeout = undefined;
    }

    if (toast_remove_timeout !== undefined) {
      clearTimeout(toast_remove_timeout);
      toast_remove_timeout = undefined;
    }

  
    toast_message = message;
    toast_leaving = false;
    toast_visible = true;
    toast_key += 1;

    toast_timeout = setTimeout(() => {
      toast_visible = false;
      toast_leaving = true;
      toast_timeout = undefined;

      // Mantém o elemento no DOM até a animação de saída terminar.
      toast_remove_timeout = setTimeout(() => {
        toast_message = "";
        toast_leaving = false;
        toast_remove_timeout = undefined;
      }, 230);
    }, 2500);
  }

  onDestroy(() => {
    toast_component_destroyed = true;

    if (toast_timeout !== undefined) {
      clearTimeout(toast_timeout);
    }

    if (toast_remove_timeout !== undefined) {
      clearTimeout(toast_remove_timeout);
    }
  });
</script>


<article
  class="post {is_last ? 'post--last' : ''}"
  style:display={hidden ? "none" : undefined}
>
  <div class="post__profile">
    <button class="post__profile-left" onclick={on_profile_click}>
      <img
        loading="lazy"
        src={post[1]}
        class="post__favicon"
        alt={`Favicon de ${dominium}`}
      />
      <p class="post__profile-name">{dominium}</p>
    </button>

    <div class="post__profile-right">
      {#if !subscribed}
        <button
          class="post__hide-button"
          onclick={() => hide_profile(post[0])}
          aria-label={`Ocultar ${dominium}`}
          title={`Ocultar ${dominium}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><circle cx="12" cy="12" r="10"></circle><path
              d="M4.929 4.929 19.07 19.071"
            ></path></svg
          >
        </button>
      {/if}

      <button
        class="post__subscribe {subscribed ? 'active' : ''}"
        onclick={() => toggle_subscriptions(post[0])}
      >
        {#if subscribed}
          <svg
            class="post__subscribe-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6 9 17l-5-5"></path>
          </svg>

        {:else}

      <svg 
        width="16" height="16" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 8v8"></path>
        <path d="M8 12h8"></path>
      </svg>
        {/if}
      </button>
    </div>
  </div>

  <a
    class="post__content-link"
    href={post[0]}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Abrir o site: ${post[2]}`}
    onclick={(event) => {
      event.preventDefault();
      iframe_url.url = post[0];
    }}
  >
    <h2 class="post__title">{post[2]}</h2>

    {#if post[3]}
      <img
        loading="lazy"
        src={post[3]}
        class="post__img"
        alt={`Imagem do post: ${post[2]}`}
      />
    {/if}

    {#if post[4]}
      <p class="post__description">{post[4]}</p>
    {/if}
  </a>


    <div class="post__tag-div mobile">
      {#each post[5] as tags, index (index)}
        <button class="post__tag-button">{tags}</button>
      {/each}
    </div>

  <div class="post__bottom">
    <time class="post__data">{post[6]}</time>




      <div class="post__tag-div desktop">
      {#each post[5] as tags, index (index)}
        <button class="post__tag-button">{tags}</button>
      {/each}
      </div>


      















  <div class="post__share-container">
    {#key toast_key}
      {#if toast_message}
        <div
          class="toast"
          class:visible={toast_visible}
          class:leaving={toast_leaving}
          
          role="status"
          aria-live="polite"
        >
          {toast_message}
        </div>
      {/if}
    {/key}

  <button 
    class="post__share-button"
    onclick={async () => {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        try {
          await navigator.share({
            title: post[2],
            text: post[4] || "Confira este post:",
            url: post[0],
          });
        } catch (error: unknown) {
          const was_cancelled =
            error instanceof DOMException && error.name === "AbortError";

          if (!was_cancelled) console.error(error);
        }
      } else {
        try {
         
          await navigator.clipboard.writeText(post[0]);
          show_toast('Link copiado!');
        } catch (err: unknown) {
          console.error('Erro ao copiar', err);
        }
      }
    }}
  >

      {#if has_share}

      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>

      {:else}

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-2 preview-icon"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
      {/if}
    
    </button>
  </div>




















    <div
      class="post__bookmarks_options_div"
      class:open={bookmarks_options}
      
    >
      {#each bookmarks_colors_state.items as bookmark_color_option, index}
        <button
          type="button"
          class="post__bookmark-option"
          style={`--delay: ${index * 20}ms`}
          onclick={() => toggle_bookmarks(post, bookmark_color_option.id)}
          aria-label={`Salvar com a cor ${bookmark_color_option.color}`}
          title={`Salvar com a cor ${bookmark_color_option.color}`}
        >
          <svg
            class="post__bookmark-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={bookmark_color === bookmark_color_option.color
              ? bookmark_color_option.color
              : "none"}
            stroke={bookmark_color_option.color}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a1 1 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
            ></path>
          </svg>
        </button>
      {/each}
    </div>

    <button
      onclick={() => {
        bookmarks_options = !bookmarks_options;


      }}
      class="post__bookmark-button"
      class:active={bookmarked && !bookmarks_options}
      style:opacity={bookmarks_options ? "0.4" : undefined}
      aria-label={bookmarked ? "remove from bookmarked" : "bookmark post"}
    >
      <svg
        class="post__bookmark-svg"
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
  </div>
</article>

<style lang="scss">
  .post {
    width: 100%;
    gap: 10px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-top: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.208);
    box-sizing: border-box;
    min-height: 200px;

    &--last {
      border-bottom: 0;
    }

    &__content-link {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      color: inherit;
      text-decoration: none;
    }

    &__profile {
      border: 1px solid rgba(255, 255, 255, 0.201);
      border-radius: 40px;
      padding: 5px;
      box-sizing: border-box;
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
    }

    &__profile-left {
      height: 100%;
      width: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      background-color: transparent;
      border: transparent;
    }

    &__profile-name {
      cursor: pointer;
    }

    &__profile-right {
      display: flex;
      flex-direction: row;
      gap: 10px;
      margin-right: 4px;

      & svg path,
        circle {
          color: rgb(82, 82, 82);
        }
    }

    &__favicon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: rgb(119, 127, 135);
    }

    &__subscribe {
      height: 20px;
      background-color: transparent;
      color: rgb(255, 255, 255);
      border: 0;
      margin-right: 7px;
      display: flex;
      justify-content: center;
      align-items: center;

      &-svg {
        width: 14px;
        margin-right: 4px;
        stroke-width: 2.5px;
      }
    }

    &__title {
      width: 100%;
      margin-top: 5px;
      margin-bottom: 5px;
      height: fit-content;
      max-height: 80px;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.3em;
      letter-spacing: 0.02em;
    }

    &__description {
      width: 100%;
      font-size: 0.9rem;
      color: #ffffffae;
      margin-top: -5px;
      font-weight: 500;
      line-height: 1.3em;
      letter-spacing: 0.02em;
      flex: 1;
    }

    &__img {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.253);
      aspect-ratio: 16 / 12;
      object-fit: cover;
      object-position: center;
    }

    &__bottom {
      width: 100%;
      position: relative;
      background-color: rgba(102, 20, 157, 0);
      color: rgba(255, 255, 255, 0.484);
      height: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      
      padding-bottom: 2px;
      font-size: 0.9rem;
    }

      @media (min-width: 600px) {

      &__bottom {

        padding-top: 10px;
        
      }

  }

    &__data {
      font-size: 0.8rem;
      color: rgb(177, 177, 177);
      letter-spacing: 1px;
      padding-left: 4px;
      white-space: nowrap;
    }

    &__tag-div {

      display: flex;
      flex-direction: row;
      gap: 12px;
      max-width: 100%;
      overflow-x: auto;
      padding: 2px;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

     &__tag-div.desktop {
      margin-left: 18px;
      flex: 1;
      
      
     }

     &__tag-div.mobile  {
      
      margin-top: 2px;
      
     }

    @media (max-width: 600px) {

      &__tag-div.desktop button{

        display: none;
        
      }

  }

     @media (min-width: 600px) {

      &__tag-div.mobile  {

        display: none;
      }

  }

    &__tag-button {
      background-color: rgba(252, 252, 252, 0);
      white-space: nowrap;
      padding: 3px 10px;
      border: 0;
      border-radius: 4px;
      color: rgba(255, 255, 255, 0.825);
      outline: 1px solid rgba(255, 255, 255, 0.16);
      cursor: default;
    }


    &__bookmarks_options_div {
      position: absolute;
      right: 28px;
      background-color: aliceblue;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-start;
      gap: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      width: fit-content;
      background-color: #0f0f15;
      opacity: 0;
      pointer-events: none;
      transition: opacity 400ms ease;

      .post__bookmark-option {
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0;
        border: 0;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateX(20px) scale(0.7);
        cursor: pointer;
        transition:
          opacity 180ms ease,
          transform 180ms ease;

        &:hover {
          transform: scale(1.1);
          transition-delay: 0ms;
        }
      }

      .post__bookmark-option .post__bookmark-svg {
        opacity: 1;
        transform: none;
      }

      &.open {
        opacity: 1;
        pointer-events: auto;

        .post__bookmark-option {
          opacity: 1;
          transform: translateX(0) scale(1);
          transition-delay: var(--delay);
        }
      }

      .post__bookmark-svg:hover {
        transition-delay: 0ms;
        transform: scale(1.1);
      }
    }

    &__bookmark-button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      color: white;
      border: 0;
      margin-right: -8px;
      cursor: pointer;
      transition: transform 0.15s ease;

      &.active path {
        fill: rgb(255, 255, 255);
        stroke: currentColor;
      }

      &:hover {
        transform: scale(1.1);
      }
    }

    &__bookmark-svg {
      width: 22px;
      height: 22px;
      stroke-width: 1.4px;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    &__hide-button {
      background-color: transparent;
      border: 0;
     

      > svg {
        margin-bottom: -2.5px;
        width: 15px;
        height: 15px;

      }
    }

    &__share-button {
      background: none;
      border: 0px;
      margin-right: 12px;


      & svg {
        width: 20px;
        height: 20px;
        margin-top: 4px;
        
        & circle, line, path, rect {
          color: rgb(82, 82, 82);
        }
      }
      
    }
  }

  .post__share-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .toast {
    position: absolute;
    right: 5px;
    bottom: calc(100% + 9px);
    padding: 9px 13px;
    background: #252532;
    color: white;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.2;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate3d(0, 8px, 0) scale(0.94);
    transform-origin: bottom right;
    filter: blur(1px);
    transition:
      opacity 190ms ease,
      transform 230ms cubic-bezier(0.4, 0, 0.2, 1),
      filter 190ms ease,
      visibility 0s linear 230ms;
    will-change: opacity, transform;
    z-index: 10;

    &::after {
      content: "";
      position: absolute;
      right: 10px;
      top: 100%;
      border: 6px solid transparent;
      border-top-color: #252532;
    }

    &.visible {
      opacity: 1;
      visibility: visible;
      transform: translate3d(0, 0, 0) scale(1);
      filter: blur(0);
      transition-delay: 0s;
      animation: toast-enter 340ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    &.leaving {
      visibility: visible;
      animation: toast-exit 220ms cubic-bezier(0.4, 0, 1, 1) both;
    }
  }

  @keyframes toast-enter {
    0% {
      opacity: 0;
      transform: translate3d(0, 12px, 0) scale(0.9);
      filter: blur(2px);
    }

    70% {
      opacity: 1;
      transform: translate3d(0, -2px, 0) scale(1.025);
      filter: blur(0);
    }

    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes toast-exit {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
      filter: blur(0);
    }

    to {
      opacity: 0;
      transform: translate3d(0, 7px, 0) scale(0.96);
      filter: blur(1px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .toast,
    .toast.visible,
    .toast.leaving {
      animation: none;
      transition: none;
      filter: none;
      transform: none;
    }
  }
</style>
