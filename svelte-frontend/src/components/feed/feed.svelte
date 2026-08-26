<script lang="ts">

  import { onMount } from "svelte";
  import Post from "./post.svelte";

  interface post_data {
    id: string;
    favicon: string;
    autor: string;
    title: string;
    img?: string;
    text?: string;
    data: string;
    
  }

  
  interface feed_props {
    style?: string;
    on_profile_click: (autor: string) => void;
  }

  let { style, on_profile_click}: feed_props = $props();

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



<section id="feed" class="feed" {style}>
  {#each posts as post, index (post.id ?? index)}
    <Post
      post={post}
      is_last={index === posts.length - 1}
      on_profile_click={() => on_profile_click(post.autor)}
    />
  {/each}
</section>


<style>

  .feed {

    width: 580px;
    margin-top: 11px;
    margin-bottom: 11px;
    display: flex;
    flex-direction: column;
    z-index: 101;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.208);
    border-radius: 5px;    

  }

</style>



