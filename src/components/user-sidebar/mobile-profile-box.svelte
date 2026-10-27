<script lang="ts">
  import { user, log_in, log_out } from "../../global/auth.svelte";

  interface profile_box_props {
    open_create_post: (args: string) => void;
    open_plans_options: (args: string) => void;
  }

  let { open_create_post, open_plans_options }: profile_box_props = $props();
</script>

<section class="profile-box">
  {#if user.is_logged_in}
    <button class="profile-box__open-profile-button" onclick={() => log_out()}>
      <p>exemplo.com.br</p>
    </button>

    <button
      type="button"
      class="profile-box__create-post-button"
      onclick={() => open_create_post("")}
      aria-label="Criar post"
      title="Criar post"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-plus"
        aria-hidden="true"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
    </button>
  {:else}
    <button class="profile-box__become-creator-button" onclick={() => log_in()}
      >Torne-se um criador</button
    >
  {/if}

  <!--
  <button
    type="button"
    class="profile-box__notifications-button"
    onclick={() => open_plans_options("")}
    aria-label="Abrir planos"
    title="Abrir planos"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M 11.562 3.266 A0.5 0.5 0 0 1 12.438 3.266" />
      <path d="M 12.438 3.266 L 15.39 8.87" />
      <path d="M 15.39 8.87 A1 1 0 0 0 16.906 9.164" />
      <path d="M 16.906 9.164 L 21.183 5.5" />
      <path d="M 2.02 6.02 A0.5 0.5 0 0 1 2.818 5.501" />
      <path d="M 2.818 5.501 L 7.094 9.165" />
      <path d="M 21.183 5.5 A0.5 0.5 0 0 1 21.981 6.019" />
      <path d="M 7.094 9.165 A1 1 0 0 0 8.61 8.871" />
      <path d="M 8.61 8.871 L 11.562 3.266" />
      <path d="M18 19 L5.619 19" />
      <path d="M21.981 6.019 L18 19" />
      <path d="M5.619 19 A1.42 1.42 0 0 1 5.619 19" />
      <path d="M5.619 19 L2.02 6.02" />
    </svg>
  </button>-->
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
      height: 44px;
      width: 152px;
      border-radius: 8px;
      border: 0px;
      padding-left: 8px;
      padding-right: 8px;
      background-color: transparent;
      outline: 1px solid rgba(255, 255, 255, 0.208);
      font-size: 14px;
    }

    &__become-creator-button:hover {
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
    &__notifications-button svg path {
      color: rgb(170, 169, 169);
    }
  }
</style>
