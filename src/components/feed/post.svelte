<script lang="ts">
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
    post: any;
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
    post_link,
    post,
    favicon,
    on_profile_click,
    is_last = false,
  }: post_props = $props();



  let bottom_space: HTMLElement;
  let bookmarks_options_div: HTMLElement; 

  function compare_widths() {
    const available_width = bottom_space.getBoundingClientRect().width;
    const bookmarks_width = bookmarks_options_div.scrollWidth;

    if (bookmarks_width <= available_width) {
      bookmarks_options_div.style.width = "fit-content";
    } else {
      bookmarks_options_div.style.width = "calc(100% - 28px)";
    }
  }


  let bookmarks_options = $state(false);
  let bookmark_color = $derived(get_bookmark_color(post));
  let subscribed = $derived(is_subscribed(post[0]));
  let bookmarked = $derived(is_bookmarked(post));
  let hidden = $derived(is_hidden(post[0]));

  let dominium = new URL(post[0]).hostname
  
</script>

<article

  onclick={() => iframe_url.url = post[0]}


  class="post {is_last ? 'post--last' : ''}"
  style:display={hidden ? "none" : undefined}
>
  <div class="post__profile">
    <button class="post__profile-left" onclick={on_profile_click}>
      <img loading="lazy" src={post[1]} class="post__favicon" alt="favicon" />
      <p class="post__profile-name">{dominium }</p>
    </button>

    <div class="post__profile-right">
      {#if !subscribed}
        <button class="post__hide-button" onclick={() => hide_profile(post[0])}>
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
          subscribe
        {/if}
      </button>
    </div>
  </div>

  <h2 class="post__title">{post[2]}</h2>

  {#if post[3]}
    <img loading="lazy" src={post[3]} class="post__img" alt="post" />
  {/if}

  {#if post[4]}
    <p class="post__description">{post[4]}</p>
  {/if}

  <div class="post__bottom">


    <time class="post__data">{post[6]}</time>

    <div class="post__tag-div">
      {#each post[5] as tags, index (index)}
        <button class="post__tag-button">{tags}</button>
      {/each}
    </div>

    <div bind:this={bottom_space} class="post__bottom-space"></div>

<div
  class="post__bookmarks_options_div"
  class:open={bookmarks_options}
  bind:this={bookmarks_options_div}
>
{#each bookmarks_colors_state.items as bookmark_color_option, index}
  <svg
    class="post__bookmark-svg"
    style={`--delay: ${index * 20}ms`}
    onclick={() => {
      toggle_bookmarks(post, bookmark_color_option.id);
    }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={
      bookmark_color === bookmark_color_option.color
        ? bookmark_color_option.color
        : "none"
    }
    stroke={bookmark_color_option.color}
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
  <path
    d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a1 1 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
  ></path>
  </svg>
{/each}
</div>

    <button

      onclick={() => {
      
      bookmarks_options = !bookmarks_options;

        requestAnimationFrame(() => {
          compare_widths();
        });
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
      gap: 12px;
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
        width: 16px;
        margin-right: 2px;
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
      align-items: center;
      justify-content: space-between;
      padding-bottom: 2px;
      padding-top: 10px;
      font-size: 0.9rem;
    }

    &__data {
      font-size: 0.8rem;
      color: rgb(177, 177, 177);
      letter-spacing: 1px;
      padding-left: 4px;
    }

    &__tag-div {
      
      display: flex;
      flex-direction: row;
      gap: 12px;
      
      margin-left: 18px;
    }

    &__tag-button {
      background-color: rgba(252, 252, 252, 0);
      padding: 3px 10px;
      border: 0;
      border-radius: 4px;
      color: rgba(255, 255, 255, 0.825);
      outline: 1px solid rgba(255, 255, 255, 0.16);
      cursor: default;
    }

    &__bottom-space {
      background-color: aqua;
      min-width: 0;
      flex: 1;
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


  .post__bookmark-svg {
    opacity: 0;
    transform: translateX(20px) scale(0.7);
    cursor: pointer;

      transition:
        opacity 180ms ease,
        transform 180ms ease,
        
    }

  &.open {
    opacity: 1;
    pointer-events: auto;

    .post__bookmark-svg {
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
        transform: scale(
          1.1
        ); 
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
      color: gray;

      > svg {
        margin-top: 2px;
        margin-bottom: -3px;
        width: 15px;
        height: 15px;

        path,
        circle {
          color: rgb(87, 87, 87);
        }
      }
    }

  .post__subscribe-svg path{
    color: rgba(255, 255, 255, 0.208);
}
  }

</style>
