<script lang="ts">

  import { onMount } from "svelte";
  import Post from "./post.svelte";
  import { type post_data } from "../global/bookmarks.svelte";

  
  interface feed_props {
    close_search_feed: () => void;
    style?: string;
    on_profile_click: (autor: string) => void;
  }

  let { style, on_profile_click, close_search_feed}: feed_props = $props();

  let posts = $state<post_data[]>([]);

  onMount(async () => {
    try {
        const response = await fetch("/api/posts.json");
        posts = await response.json();
         
    } catch (error) {
      console.log(error)
    }
  })

</script>



<button
      class="profile-top"
      onclick={close_search_feed}>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <h2 style="font-size: 16px;">userexample.com</h2>
</button>

<div class="profile-top-background"></div>


<section class="search-feed" {style}>
  {#each posts as post, index (index)}
    <Post
      post={post}
      is_last={index === posts.length - 1}
      on_profile_click={() => on_profile_click(post[0])}
    />
  {/each}
</section>


<style>

.search-feed {

    width: 580px;
    margin-top: 11px;
    padding-top: 40px;
    margin-bottom: 11px;
    display: flex;
    flex-direction: column;
    z-index: 101;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.208);
    border-radius: 5px;  
    anchor-name: --profile-archor;  

  }
.profile-top {
    width: 580px;
    top: 10px;
    position-anchor: --profile-archor;
    height: 46px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 4px;
    background-color: #0f0f15;
    padding-left: 10px;
    padding-right: 14px;
    border: 1px solid rgba(255, 255, 255, 0.208);
    color: white;
    font-size: 1rem;
    cursor: pointer;
    position: fixed;

    z-index: 103;
  }

.profile-top-background {
    width: 588px;
    position: fixed;
    height: 44px;
    margin-left: -4px;
    background-color: #0f0f15;
    z-index: 102;
    position-anchor: --profile-archor;
    top: 0;

  }

</style>



