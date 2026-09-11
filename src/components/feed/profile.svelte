<script lang="ts">
  import { onMount } from "svelte";
  import Post from "./post.svelte";

interface profile_info {
  name: string,
  favicon: string,
  description: string,
  tags: string[]
};

  interface feed_props {
    close_profile: () => void;
    on_profile_click: (autor: string) => void;
    style?: string;
    
  }

let { style, close_profile,  on_profile_click }: feed_props = $props();



  let profile = $state<profile_info | null>(null)
  let posts = $state<(string | null)[][]>([]);
  type raw_post = (string | null)[]


  function parse_profile(data: unknown): profile_info {

    const raw = data as [string, string, string, string[]];

    return {
      name: raw[0],
      favicon: raw[1],
      description: raw[2],
      tags: raw[3]
    }
  }

    onMount(async () => {
      try {

        const [ response_profile, response_posts ] = await Promise.all([
          fetch("/api/profile.json"),
          fetch("/api/profile-posts.json")  
        ])
        
        profile = parse_profile((await response_profile.json()));
        posts = (await response_posts.json()) as (string | null)[][];
        
       

      } catch (error) {

        console.log(error);

      }
    })

</script>

{#if !profile}
    <p>carregando...</p>

{:else}

<button
      class="profile-top"
      onclick={close_profile}>
      
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

<div class="profile-top-background" id="profile-top-background"></div>
   

<div class="profile">

    <div class="profile__middle">
    <div class="profile__favicon-and-buttons">

        <img loading="lazy" src={profile.favicon} class="profile__favicon" />
        <button id="subscribe">Subscribe</button>
        <button id="block">Hide</button>
        <button id="flag">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5" />
        </svg>
        </button>
    </div>

    <p class="profile__description">{profile.description}</p>

    <div class="profile__tags">
        
        {#each profile.tags as tag (tag)}

        <button>{tag}</button>

        {/each}

    </div>
    </div>

    {#if posts}

     {#each posts as post, index (index)}
    <Post
      post={[post[0], profile.favicon, ...post.slice(1)]}
      favicon={profile.favicon}
      is_last={index === posts.length - 1}
      on_profile_click={() => on_profile_click(profile!.name)}
    />
   {/each}

   {/if}
   


</div>

{/if}


<style lang="scss">

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

    &:hover {
      background-color: #181820;
    }
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

.profile {
  width: 580px;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0);
  margin-top: 11px;
  margin-bottom: 11px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, 0.208);
  border-radius: 5px;
  anchor-name: --profile-archor;
  margin-top: 52px;

  &__middle {
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 34px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.208);
  }

  &__description {
    max-width: 580px;
    width: 86%;
    color: #b1b1b1;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.6em;
    word-spacing: 1px;
  }

  &__favicon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__tags {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 10px;
    column-gap: 8px;
  }

  &__tags > button {
    background-color: transparent !important;
    color: rgb(255, 255, 255);
    padding: 4px;
    padding-left: 12px;
    padding-right: 12px;
    border: 1px solid rgba(255, 255, 255, 0.171);
    border-radius: 8px;
  }


  &__favicon-and-buttons {
    max-width: 580px;
    width: 92%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    gap: 16px;
    align-items: center;
    justify-content: center;
  }

  &__favicon-and-buttons button {
    border: 1px solid rgba(255, 255, 255, 0.208);
    border-radius: 40px;
    color: white;
    background-color: transparent;
    font-size: 0.9rem;
    cursor: pointer;
  }

  &__favicon-and-buttons button:hover {
    scale: 1.02;
  }

  &__favicon-and-buttons button svg {
    width: 18px;
    color: #c4c4c4;
    margin-top: 4px;
  }

  &__favicon-and-buttons #subscribe {
    width: 140px;
    height: 40px;
    background-color: #2a2c78;
    border: 0px solid black;
  }

  &__favicon-and-buttons #block {
    width: 100px;
    height: 40px;
  }

 &__favicon-and-buttons #block {
    width: 100px;
    height: 40px;
  }

  &__favicon-and-buttons #flag {
    width: 44px;
    height: 40px;
  }
}

</style>