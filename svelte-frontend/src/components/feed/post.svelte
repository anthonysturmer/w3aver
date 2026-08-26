<script lang="ts">
  import { is_subscribed, toggle_subscriptions } from "../global/subscriptions.svelte";
  import { is_bookmarked, toggle_bookmarks, type post_data } from "../global/bookmarks.svelte";
  import { is_hidden, hide_profile } from "../global/hidden.svelte";

    interface post_props {
      post: post_data;
      on_profile_click: () => void;
      is_last: boolean;
    }

    let { post, on_profile_click, is_last = false}: post_props = $props();

    
    let subscribed = $derived(is_subscribed(post.autor))
    let bookmarked = $derived(is_bookmarked(post))
    let hidden = $derived(is_hidden(post.autor))

</script>

<article class="post {is_last ? 'post--last' : ''}" style:display={hidden ? "none" : undefined}>
    <div class="post__profile">
      <button class="post__profile-left" onclick={on_profile_click}>
        <img src={post.favicon} class="post__favicon" alt="favicon" />
        <p class="post__profile-name">{post.autor}</p>
      </button>

      <div class="post__profile-right">

        {#if !subscribed} 
        <button class="post__hide-button"
        onclick={() => hide_profile(post.autor)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="12" r="10"/><path d="M4.929 4.929 19.07 19.071"/></svg>
        </button>
        {/if}
        <button
          class="post__subscribe" 
          class:active={subscribed}
          onclick={() => toggle_subscriptions(post.autor)}
        >
          {#if subscribed} 
            <svg
              class="post__subscribe-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>

          {:else}
            subscribe
          {/if}
        </button>
      </div>
    </div>
    <h2 class="post__title">{post.title}</h2>

    {#if post.img} 
      <img src={post.img} class="post__img" alt="post" />
    {/if}

    {#if post.text}

    <p class="post__description">{post.text}</p>

    {/if}

    <div class="post__bottom">
      <time class="post__data">{post.data}</time>

      <button
        class="post__bookmark-button"
        class:active={bookmarked}
        onclick={() => toggle_bookmarks(post)}
        aria-label = {bookmarked ? "remove from bookmarked" : "bookmark post"}
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
          <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
        </svg>
      </button>
    </div>
</article>

<style>
  
.post, .post--last {
  width: 100%;
  gap: 10px;
  height: fit-content;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.208);
  border-bottom: 1px solid rgba(255, 255, 255, 0.208);
  border-top: 0;
  box-sizing: border-box;
}

.post--last {
  border-bottom: 0px solid rgba(255, 255, 255, 0.208);
}
.post__profile {
  border: 1px solid rgba(255, 255, 255, 0.201);
  border-radius: 40px;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.post__favicon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgb(119, 127, 135);
  border: 1px solid rgba(255, 255, 255, 0.201);
}

.post__subscribe {
  height: 20px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 0;
  margin-right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.post__subscribe-check {
  width: 16px;
  margin-right: 2px;
  stroke-width: 2.5px;
}

.post__subscribe-svg {
  width: 16px;
  margin-right: 2px;
  stroke-width: 2.5px;
}

.post__title {
  width: 100%;
  margin-bottom: 5px;
  height: fit-content;
  max-height: 80px;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3em;
  letter-spacing: 0.02em;
}

.post__description {
  width: 100%;
  font-size: 0.9rem;
  color: #ffffffae;
  margin-top: -5px;
  font-weight: 500;
  line-height: 1.3em;
  letter-spacing: 0.02em;
}

.post__img {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.253);
  aspect-ratio: 16 / 12;
}

.post__data {
  font-size: 0.8rem;
  color: rgb(177, 177, 177);
  letter-spacing: 1px;
  padding-left: 4px;
}

.post__bottom {
  width: 100%;
  background-color: rgba(102, 20, 157, 0);
  color: rgba(255, 255, 255, 0.484);
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2px;
  padding-top: 2px;
  font-size: 0.9rem;
}

.post__bookmark-button {
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
}

.post__bookmark-button.active path {
  fill: rgb(255, 255, 255);
  stroke: currentColor;
}

.post__bookmark-button:hover {
  scale: 1.1;
}

.post__bookmark-svg {
  color: #ffffff;
  width: 20px;
  height: 20px;
  stroke-width: 1.4px;
  stroke: currentColor;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.post__profile-left {
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: transparent;
}

.post__profile-name {
  cursor: pointer;
}

.post__hide-button {
  background-color: transparent;
  border: 0px solid black;
  color: gray;

}

.post__hide-button > svg {
   
  margin-top: 2px;
  margin-bottom: -3px;
  width: 15px;
  height: 15px;
} 

.post__hide-button > svg > path {
  color: rgb(87, 87, 87); 
}

.post__hide-button > svg > circle {
  color: rgb(87, 87, 87); 
}
.post__profile-right {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

</style>