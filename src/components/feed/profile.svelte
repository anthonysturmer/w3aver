<script lang="ts">
  import { onMount } from "svelte";
  import Post from "./post.svelte";
  import type { post_data } from "../../global/bookmarks.svelte";

  import {
    is_subscribed,
    toggle_subscriptions,
  } from "../../global/subscriptions.svelte";

  import {
    is_hidden,
    hide_profile,
    show_profile,
  } from "../../global/hidden.svelte";

  interface profile_info {
    name: string;
    favicon: string;
    description: string;
    tags: string[];
  }

  interface feed_props {
    user: string;
    close_profile: () => void;
    on_profile_click?: (autor: string) => void;
    style?: string;
  }

  let {
    user,
    style,
    close_profile,
    on_profile_click = () => {},
  }: feed_props = $props();

  let profile = $state<profile_info | null>(null);
  let posts = $state<post_data[]>([]);

  type raw_profile = [string, string, string, string[]];

  function get_hostname(value: string): string {
    try {
      return new URL(value).hostname;
    } catch {
      return value;
    }
  }

  function parse_profile(data: unknown, hostname: string): profile_info | null {
    const profiles = data as raw_profile[];

    const raw = profiles.find((profile) => profile[0] === hostname);

    if (!raw) {
      return null;
    }

    return {
      name: raw[0],
      favicon: raw[1],
      description: raw[2],
      tags: raw[3],
    };
  }

  onMount(async () => {
    try {
      const hostname = get_hostname(user);

      const [response_profile, response_posts] = await Promise.all([
        fetch("/api/profile.json"),
        fetch("/api/posts.json"),
      ]);

      if (!response_profile.ok || !response_posts.ok) {
        throw new Error("Erro ao carregar os dados do perfil.");
      }

      const profile_data = await response_profile.json();
      const posts_data = await response_posts.json();

      profile = parse_profile(profile_data, hostname);

      posts = (posts_data as post_data[]).filter((post) => {
        if (!post[0]) return false;

        return get_hostname(post[0]) === hostname;
      });
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  });

  /*
   * URL base do perfil.
   *
   * O profile.json guarda apenas:
   *
   * summer-josu.github.io
   *
   * enquanto algumas funções trabalham com URL.
   */
  let profile_url = $derived(profile ? `https://${profile.name}` : "");

  /*
   * Mesmo estado reativo usado nos posts.
   */
  let subscribed = $derived(profile ? is_subscribed(profile.name) : false);

  let hidden = $derived(profile ? is_hidden(profile_url) : false);

  function handle_hide_profile() {
    if (!profile) return;

    if (hidden) {
      show_profile(profile.name);
    } else {
      hide_profile(profile_url);
    }
  }
</script>

{#if !profile}
  <p>carregando...</p>
{:else}
  <button class="profile-top" onclick={close_profile}>
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

    <h2>{profile.name}</h2>
  </button>

  <div class="profile-top-background" id="profile-top-background"></div>

  <div class="profile">
    <div class="profile__middle">
      <div class="profile__favicon-and-buttons">
        <img
          loading="lazy"
          src={profile.favicon}
          class="profile__favicon"
          alt={profile.name}
        />

        <!-- SUBSCRIBE -->

        {#if !hidden}
          <button
            id="subscribe"
            class:active={subscribed}
            onclick={() => toggle_subscriptions(profile_url)}
          >
            {#if subscribed}
              inscrito
            {:else}
              inscrever-se
            {/if}
          </button>
        {/if}

        <!-- HIDE -->

        {#if !subscribed}
          <button id="block" onclick={handle_hide_profile} class:hidden>
            {#if hidden}
              desocultar
            {:else}
              ocultar
            {/if}
          </button>
        {/if}

        <!-- DONATE -->

        {#if !hidden}
          <button class="donate-button" title="Apoiar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-heart preview-icon"
              ><path
                d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
              /></svg
            >
          </button>
        {/if}

        <!-- FLAG -->

        <button
          id="flag"
          type="button"
          aria-label="Denunciar perfil"
          title="Denunciar perfil"
        >
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
            <path
              d="M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5"
            />
          </svg>
        </button>
      </div>

      <p class="profile__description">
        {profile.description}
      </p>

      <div class="profile__tags">
        {#each profile.tags as tag (tag)}
          <button>
            {tag}
          </button>
        {/each}
      </div>
    </div>

    {#each posts as post, index (index)}
      <Post
        {post}
        favicon={post[1] ?? profile.favicon}
        is_last={index === posts.length - 1}
        on_profile_click={() => on_profile_click(profile!.name)}
      />
    {/each}
  </div>
{/if}

<style lang="scss">
  .donate-button {
    height: 40px;
    width: 44px;

    & path {
      color: #adadad;
    }
  }

  .donate-button:hover svg {
    scale: 1.1;
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

    cursor: pointer;

    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;

    z-index: 103;

    & h2 {
      font-size: 0.95rem;
      font-weight: 500;

      color: rgb(145, 145, 145);
    }

    &:hover {
      background-color: #181820;
    }
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

  .profile {
    width: calc(100% - 20px);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    height: fit-content;

    background-color: rgba(0, 0, 0, 0);

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

      padding-top: 54px;
      padding-bottom: 54px;

      width: 100%;
      height: fit-content;

      display: flex;
      flex-direction: column;

      gap: 40px;

      border-bottom: 1px solid rgba(255, 255, 255, 0.208);
    }

    &__description {
      max-width: 600px;
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
      max-width: 600px;
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

    &__favicon-and-buttons button svg {
      width: 18px;

      color: #c4c4c4;

      margin-top: 4px;
    }

    &__favicon-and-buttons #subscribe {
      width: 140px;
      height: 40px;

      background-color: #2a2c78;

      border: 0 solid black;
    }

    &__favicon-and-buttons #subscribe.active {
      background-color: transparent;

      border: 1px solid rgba(255, 255, 255, 0.208);
    }

    &__favicon-and-buttons #block {
      width: 100px;
      height: 40px;
    }

    &__favicon-and-buttons #flag {
      width: 44px;
      height: 40px;

      & svg path {
        color: #888;
      }
    }
  }
  @media (max-width: 480px) {
    .profile {
      &__middle {
        padding-top: 44px;
        padding-bottom: 40px;
        gap: 28px;
      }

      &__favicon-and-buttons {
        width: 94%;
        gap: 8px;
      }

      &__favicon-and-buttons #subscribe {
        width: 120px;
      }

      &__favicon-and-buttons #block {
        width: 82px;
      }

      &__favicon-and-buttons #flag {
        width: 40px;
      }

      &__description {
        width: 90%;
      }
    }
  }
</style>
