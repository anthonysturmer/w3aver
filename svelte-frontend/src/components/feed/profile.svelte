<script lang="ts">
  import { onMount } from "svelte";

interface profile_info {
  favicon: string;
  description: string;
  tags: string[];
}

interface post_data {
  id: string;
  favicon: string;
  autor: string;
  title: string;
  img?: string;
  text?: string;
  data: string;
}

interface profile_response_data {
  profile: profile_info;
  posts: post_data[];
}

let {close_profile}: {close_profile: () => void} = $props();

let profile_data = $state<profile_response_data | null>(null)

    onMount(async () => {
      try {

        const response = await fetch("/api/profile.json");
        const data = (await response.json()) as profile_response_data;
        profile_data = data;

      } catch (error) {

        console.log(error);

      }
    })

</script>

{#if !profile_data}
    <p>carregando...</p>

{:else}

    {@const {profile, posts } = profile_data}

<button
      class="profile__top"
      id="profile-top-return"
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
      <h2 style="font-size: 16px;">doritos.com</h2>
    </button>

<div class="feed">
<div class="profile">
    <div class="profile__middle">
    <div class="profile__favicon-buttons">
        <img src={profile.favicon} class="profile__favicon" />
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
   
    {#each posts as post (post.id)}
        

    <article class="post">
        <div class="post__profile">
        <div class="post__profile-left">
            <img src={post.favicon} class="post__favicon" />
            <a>{post.autor}</a>
        </div>
        <button class="post__subscribe">subscribe</button>
        </div>
        <h2 class="post__title">{post.title}</h2>

        {#if post.img}
             <img src={post.img} class="post__img" alt="Post Content" />
        {/if}

       {#if post.text}
             <p class="post__description">{post.text}</p>
        {/if}


        <div class="post__bottom">
        <time class="post__data">{post.data}</time>
        <button class="post__bookmark-button">
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

    {/each}
    <div class="profile__top-background" id="profile-top-background"></div>
      
</div>

</div>

{/if}


<style>

.feed {
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
}

.profile {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /*border-bottom: 1px solid rgb(255, 0, 0);*/
  margin-top: 44px;

  anchor-name: --profile-archor;
}
  .profile > article {
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.208);
    border-bottom: 0px solid rgba(255, 255, 255, 0.208);
  }

  .profile__top:hover {
    background-color: #181820;
  }

  .profile__description {
    max-width: 580px;
    width: 86%;
    color: #b1b1b1;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.6em;
    word-spacing: 1px;
  }

  .profile__top-background {
    width: 580px;
    position: fixed;
    height: 44px;
    background-color: #0f0f15;
    z-index: 102;
    position-anchor: --profile-archor;
    top: 0;

  }

  .profile__middle {
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 34px;
  }

  .profile__favicon-buttons {
    max-width: 580px;
    width: 92%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    gap: 16px;
    align-items: center;
    justify-content: center;
  }

  .profile__favicon-buttons button {
    border: 1px solid rgba(255, 255, 255, 0.208);
    border-radius: 40px;
    color: white;
    background-color: transparent;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .profile__favicon-buttons button:hover {
    scale: 1.02;
  }

  .profile__favicon-buttons button svg {
    width: 18px;
    color: #c4c4c4;
    margin-top: 4px;
  }

  .profile__favicon-buttons #subscribe {
    width: 140px;
    height: 40px;
    background-color: #2a2c78;
    border: 0px solid black;
  }

  .profile__favicon-buttons #block {
    width: 100px;
    height: 40px;
  }

  .profile__favicon-buttons #block {
    width: 100px;
    height: 40px;
  }

  .profile__favicon-buttons #flag {
    width: 44px;
    height: 40px;
  }

  .profile__favicon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .profile__tags {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 10px;
    column-gap: 8px;
  }

  .profile__tags > button {
    background-color: transparent !important;
    color: rgb(255, 255, 255);
    padding: 4px;
    padding-left: 12px;
    padding-right: 12px;
    border: 1px solid rgba(255, 255, 255, 0.171);
    border-radius: 8px;
  }


.post {
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
  }

  .post__profile-name {
    cursor: pointer;
  }




    .profile__top {
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

</style>