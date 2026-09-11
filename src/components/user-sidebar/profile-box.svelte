<script lang="ts">
  import { user, log_in, log_out } from "../global/auth.svelte";

  interface profile_box_props {
    open_create_post: (args: string) => void;
  }

  let { open_create_post }: profile_box_props = $props();
</script>

<section class="profile-box">
  {#if user.is_logged_in}
    <button class="profile-box__open-profile-button" onclick={() => log_out()}>
      <p>cebolitos.com.br</p>
    </button>

    <button
      class="profile-box__create-post-button"
      onclick={() => open_create_post("")}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-plus"
        ><path d="M5 12h14"></path><path d="M12 5v14"></path></svg
      ></button
    >
  {:else}
    <button class="profile-box_become-creator-button" onclick={() => log_in()}
      >Become a Creator</button
    >
  {/if}

  <button class="profile-box__notifications-button"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path
        d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
      ></path></svg
    ></button
  >
</section>

<style lang="scss">
  .profile-box {
    display: flex;
    flex-direction: row;
    gap: 10px;
    &__create-post-button {
      aspect-ratio: 1/1;
      background-color: transparent;
      border: 0px;
      outline: 1px solid rgba(255, 255, 255, 0.208);
      border-radius: 11px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__create-post-button svg {
      width: 20px;
      height: 20px;
    }

    &__create-post-button svg path {
      color: rgb(170, 169, 169);
    }

    &__open-profile-button {
      height: 48px;
      flex: 1;
      border-radius: 8px;
      border: 0px;
      padding-left: 8px;
      padding-right: 8px;
      background-color: transparent;
      outline: 1px solid rgba(255, 255, 255, 0.208);
      font-size: 14px;

      display: flex;
      flex-direction: row;
      gap: 8px;
      justify-content: center;
      align-items: center;
    }

    &__become-creator-button {
      height: 48px;
      width: 184px;
      border-radius: 8px;
      border: 0px;
      padding-left: 8px;
      padding-right: 8px;
      background-color: transparent;
      outline: 1px solid rgba(255, 255, 255, 0.208);
      font-size: 14px;
    }

    &__reator-button:hover {
      background-color: rgb(30, 70, 164);
      outline: 0px;
    }
    &__notifications-button:hover,
    &__create-post-button:hover,
    &__open-profile-button:hover {
      background-color: rgba(255, 255, 255, 0.042);
    }

    &__notifications-button {
      aspect-ratio: 1/1;
      background-color: transparent;
      border: 0px;
      outline: 1px solid rgba(255, 255, 255, 0.208);
      border-radius: 11px;
      justify-content: center;
      align-items: center;
    }
    &__notifications-button svg {
      margin-top: 2px;
    }
  }
</style>
