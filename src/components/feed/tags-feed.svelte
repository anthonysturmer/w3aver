<script lang="ts">
  import { onMount } from "svelte";
  import Post from "./post.svelte";
  import { type post_data } from "../../global/bookmarks.svelte";

  interface feed_props {
    tag: string;
    close_tags_feed: () => void;
    style?: string;
    on_profile_click: (autor: string) => void;
  }

  let { style, on_profile_click, close_tags_feed, tag }: feed_props = $props();

  let posts = $state<post_data[]>([]);

  onMount(async () => {
    try {
      const response = await fetch("/api/posts.json");
      posts = await response.json();
    } catch (error) {
      console.log(error);
    }
  });
</script>

<button class="profile-top" onclick={close_tags_feed}>
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

  <h2 style="font-size: 16px;">{tag}</h2>
</button>

<div class="profile-top-background"></div>

<section class="search-feed" {style}>
  {#each posts as post, index (index)}
    <Post
      {post}
      is_last={index === posts.length - 1}
      on_profile_click={() => on_profile_click(post[0])}
    />
  {/each}
</section>

<style>
  .search-feed {
    width: 98%;
    max-width: 600px;

    margin-left: auto;
    margin-right: auto;

    margin-top: 5px;
    margin-bottom: 11px;

    padding-top: 50px;

    display: flex;
    flex-direction: column;

    z-index: 101;

    position: relative;

    border: 1px solid rgba(255, 255, 255, 0.208);
    border-radius: 5px;

    box-sizing: border-box;

    anchor-name: --tags-feed-anchor;
  }

  .profile-top {
    position: fixed;

    position-anchor: --tags-feed-anchor;

    left: anchor(left);
    right: anchor(right);

    top: 10px;

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

    box-sizing: border-box;

    z-index: 103;

    & h2 {
      font-size: 0.95rem;
      font-weight: 500;

      color: rgb(145, 145, 145);
    }
  }

  .profile-top-background {
    position: fixed;

    position-anchor: --tags-feed-anchor;

    left: anchor(left);
    right: anchor(right);

    top: 0;

    height: 44px;

    background-color: #0f0f15;

    box-sizing: border-box;

    z-index: 102;
  }

  @media (max-width: 1240px) {
    .search-feed {
      max-width: 1200px;
    }
  }

  @supports not (anchor-name: --tags-feed-anchor) {
    .profile-top {
      left: 50%;
      right: auto;

      width: 98%;
      max-width: 600px;

      transform: translateX(-50%);
    }

    .profile-top-background {
      left: 50%;
      right: auto;

      width: calc(98% + 8px);
      max-width: 608px;

      transform: translateX(-50%);
    }
  }

  @media (max-width: 1100px) {
    .profile-top {
      top: 52px;
    }

    .profile-top-background {
      top: 52px;
    }

    .search-feed {
      margin-top: 96px;
      padding-top: 0px;
    }
  }
</style>