<script lang="ts">
  import { onMount } from "svelte";
  import Post from "./post.svelte";
  import { type post_data } from "../../global/bookmarks.svelte";

  interface feed_props {
    style?: string;
    on_profile_click: (autor: string) => void;
  }

  let { style, on_profile_click }: feed_props = $props();

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

<section class="main-feed" {style}>
  {#each posts as post, index (index)}
    <Post
      {post}
      is_last={index === posts.length - 1}
      on_profile_click={() => on_profile_click(post[0])}
    />
  {/each}
</section>

<style>
  .main-feed {
   
    max-width: 600px;
    width: 98%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 11px;
    margin-bottom: 11px;
    display: flex;
    flex-direction: column;
    z-index: 101;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.208);
    border-radius: 5px;
    
  }

  @media (max-width: 1240px) {
    .main-feed {
     
      max-width: 1200px;
      flex: 1;
    }
  }
  @media (max-width: 1100px) {

    .main-feed  {
      margin-top: 52px;
    }

  }

</style>
