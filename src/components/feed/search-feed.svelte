<script lang="ts">
  import { onMount } from "svelte";
  import Post from "./post.svelte";
  import { type post_data } from "../../global/bookmarks.svelte";

  interface feed_props {
    close_search_feed: () => void;
    query: string;
    style?: string;
    on_profile_click: (autor: string) => void;
  }

  let { style, on_profile_click, close_search_feed, query }: feed_props =
    $props();

  let posts = $state<post_data[]>([]);

  function matches_query(post: post_data, search_query: string): boolean {
    const haystack =
      `${post[0]} ${post[2]} ${post[4] ?? ""} ${post[5].join(" ")}`.toLowerCase();
    return haystack.includes(search_query.toLowerCase());
  }

  onMount(async () => {
    try {
      const response = await fetch("/api/posts.json");
      const data: unknown = await response.json();
      if (!Array.isArray(data))
        throw new Error("Formato inválido de posts.json");
      posts = data as post_data[];
    } catch (error) {
      console.log(error);
    }
  });
</script>

<button class="profile-top" onclick={close_search_feed}>
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
  <h2 style="font-size: 16px;">{query}</h2>
</button>

<div class="profile-top-background"></div>

<section class="search-feed" {style}>
  {#each posts.filter( (post) => matches_query(post, query) ) as post, index (post[0] + index)}
    <Post
      {post}
      is_last={index === posts.length - 1}
      on_profile_click={() => on_profile_click(post[0])}
    />
  {/each}
</section>

<style>
  .search-feed {
    width: calc(100% - 20px);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
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
    width: calc(100vw - 20px);
    max-width: 600px;
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
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;

    z-index: 103;
  }

  .profile-top-background {
    width: calc(100vw - 12px);
    max-width: 608px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    height: 44px;
    background-color: #0f0f15;
    z-index: 102;
    position-anchor: --profile-archor;
    top: 0;
    box-sizing: border-box;
  }
</style>
