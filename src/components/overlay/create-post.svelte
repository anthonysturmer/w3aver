<script lang="ts">
  let subscribed = $state(false);
  let bookmarked = $state(false);
  let image = $state(true);
  let text = $state(false);
  import { fade, slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let url_input = $state("");
  let title_input = $state("");
  let image_input = $state("");
  let video_input = $state("");
  let text_input = $state("");
  let tag_1_input = $state("");
  let tag_2_input = $state("");
  let tag_3_input = $state("");

  function toggle_subscribed() {
    subscribed = !subscribed;
  }

  function toggle_bookmarked() {
    bookmarked = !bookmarked;
  }

  let image_text_or_video = $state("image");

  function use_image() {
    image_text_or_video = "image";
  }
  function use_text() {
    image_text_or_video = "text";
  }

  function use_video() {
    image_text_or_video = "video";
  }

let can_publish = $derived(
    url_input.trim() !== "" &&
      title_input.trim() !== "" &&
      (image_text_or_video === "image"
        ? image_input.trim() !== ""
        : image_text_or_video === "text"
        ? text_input.trim() !== ""
        : video_input.trim() !== "")
  );


</script>

<section class="new-post">
  <div class="new-post__inputs-div">
    <h2 class="title">Criar uma nova publicação</h2>
    <input
      bind:value={url_input}
      class="new-post__long-input"
      type="url"
      placeholder="Cole sua URL aqui"
    />

    <input
      class="new-post__long-input"
      bind:value={title_input}
      placeholder="Adicione o seu título"
    />

    <div class="new-post__image-or-description-div">
      <button
        onclick={use_image}
        style:color={image_text_or_video === "text" ? "gray" : undefined}
        style:background-color={image_text_or_video === "image"
          ? "rgb(30, 70, 164)"
          : undefined}
        style:border={image_text_or_video === "image"
          ? "1px solid rgb(30, 70, 164)"
          : undefined}
      >
        Imagem
      </button>

      <button
        onclick={use_text}
        style:color={image_text_or_video === "image" ? "gray" : undefined}
        style:background-color={image_text_or_video === "text"
          ? "rgb(30, 70, 164)"
          : undefined}
        style:border={image_text_or_video === "text"
          ? "1px solid rgb(30, 70, 164)"
          : undefined}
      >
        Descrição
      </button>

         

      <button 
        onclick={use_video}
        style:color={image_text_or_video !== "video" ? "gray" : undefined}
        style:background-color={image_text_or_video === "video"
          ? "rgb(30, 70, 164)"
          : undefined}
        style:border={image_text_or_video === "video"
          ? "1px solid rgb(30, 70, 164)"
          : undefined}
      >
        Vídeo
      </button>




    </div>

    {#if image_text_or_video === "image"}
      <input
        bind:value={image_input}
        class="new-post__long-input"
        placeholder="Adicione a URL da sua imagem"
      />
    {/if}

    
    {#if image_text_or_video === "text"}
      <textarea
        bind:value={text_input}
        placeholder="Adicione uma descrição para a sua publicação"
        spellcheck="false"
        autocapitalize="none"
        autocomplete="off"></textarea>
    {/if}

     {#if image_text_or_video === "video"}
        <input
        bind:value={video_input}
        class="new-post__long-input"
        placeholder="Adicione a URL do seu video"
      />
    {/if}

    <div class="new-post__tags-input-div">
      <input placeholder="Tag 1" bind:value={tag_1_input} />
      <input placeholder="Tag 2" bind:value={tag_2_input} />
      <input placeholder="Tag 3" bind:value={tag_3_input} />
    </div>

    <!--
<label class="new-post__agreement">
  <input type="checkbox" />

  <span>
    Marque essa opção se seu post aborda um tema que pode gerar ansiedade nos usuários.
  
  <button type="button">
    Saiba se seu post se enquadra aqui
  </button>
  </span>

</label>
-->

    <div class="new-post__publish-div">
      <button
        class="new-post__publish-button"
        style:background-color={can_publish ? "white" : undefined}
        >Publicar sua postagem</button
      >
    </div>
  </div>

  <div class="new-post__right">
    <article class="post">
      <div class="post__profile">
        <button class="post__profile-left">
          <img
            loading="lazy"
            src="https://anthonysturmer.github.io/anthonysturmer/1.jpg"
            class="post__favicon"
            alt="favicon"
          />
          <p class="post__profile-name">userexample.com</p>
        </button>

        <div class="post__profile-right">
          {#if !subscribed}
            <button
              type="button"
              class="post__hide-button"
              aria-label="Ocultar exemplo"
              title="Ocultar exemplo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><circle cx="12" cy="12" r="10"></circle><path
                  d="M4.929 4.929 19.07 19.071"
                ></path></svg
              >
            </button>
          {/if}

          <button
            class="post__subscribe {subscribed ? 'active' : ''}"
            onclick={toggle_subscribed}
          >
            {#if subscribed}
              <svg
                class="post__subscribe-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            {:else}
              inscrever-se
            {/if}
          </button>
        </div>
      </div>

      <h2 class="post__title">
        {title_input || "Título da sua publicação aqui"}
      </h2>

      {#if image_text_or_video === "image"}
        
          <img
            loading="lazy"
            
            src={image_input ||
              "https://anthonysturmer.github.io/anthonysturmer/img.jpg"}
            class="post__img"
            alt=""
          />
        
      {/if}

      {#if image_text_or_video === "text"}
        
          <p class="post__description">
            {text_input ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
          </p>
       
      {/if}

      {#if image_text_or_video === "video"}

      <video 
          controls 
          src={video_input || "https://placeholdervideo.dev/640x360"}>
          Seu navegador não suporta a tag de vídeo.
        </video>

      {/if}

      <div class="post__bottom">
        <time class="post__data">Agora</time>

        <div class="post__tag-div">
          <button class="post__tag-button">{tag_1_input || "tag1"}</button>
          <button class="post__tag-button">{tag_2_input || "tag2"}</button>
          <button class="post__tag-button">{tag_3_input || "tag3"}</button>
        </div>

        <button
          class="post__bookmark-button"
          class:active={bookmarked}
          onclick={toggle_bookmarked}
          aria-label={bookmarked ? "remover dos salvos" : "salvar publicação"}
        >
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
            <path
              d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
            ></path>
          </svg>
        </button>
      </div>
    </article>
  </div>
</section>

<style lang="scss">

  video {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
      object-position: center;
      padding: 0px;
  }

  .title {
    font-size: 2rem;
    padding-bottom: 20px;
    padding-left: 5px;
  }

  .new-post {
    width: fit-content;
    height: fit-content;
    background-color: #0f0f15;
    display: flex;
    gap: 48px;
    flex-direction: row;
    box-sizing: border-box;
    justify-content: flex-start;
    padding-bottom: 100px;
    padding-top: 100px;
    color: rgb(35, 60, 206);

    @media (max-width: 1200px) {
      flex-direction: column;
    }

    & input:not([type="checkbox"]),
  & textarea {
    text-align: start;
    font-size: 0.9rem;
    min-height: 60px;
    background-color: #13131a;
    border: 1px solid rgba(255, 255, 255, 0.135);
    color: white;
    padding: 0 14px;
    border-radius: 24px;
    box-sizing: border-box;

    &:focus {
      outline: 0;
    }
  }

    &__image-or-description-div {
      display: flex;
      flex-direction: row;
      width: 100%;
      background-color: #0f0f15;
      gap: 10px;

      button {
        height: 58px;
        flex: 1;
        border-radius: 20px;
        background-color: #13131a;
        font-size: 0.9rem;
        z-index: 2;
        border: 1px solid rgba(255, 255, 255, 0.135);
      }
    }

    &__right {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    &__inputs-div {
      height: fit-content;
      max-width: 540px;
      border-radius: 4px;
      padding-left: 14px;
      padding-right: 14px;
      display: flex;
      flex-direction: column;
      gap: 24px;

      @media (max-width: 1200px) {
        max-width: 580px;
      }
    }

    &__tags-input-div {
      display: flex;
      flex-direction: row;
      flex: 1;
      text-align: start;
      width: 100%;
      background-color: transparent;
      border-radius: 5px;
      color: white;
      gap: 10px;

      input {
        flex: 1;
        width: 30%;
      }
    }

    &__publish-button {
      width: 200px;
      height: 58px;
      background-color: transparent;
      border: 1px solid rgb(95, 95, 95);
      border-radius: 50px;
      color: rgb(168, 168, 168);
      margin-top: 20px;
    }

    &__publish-div {
      width: 100%;
      display: flex;
      justify-content: end;
      gap: 30px;
      color: #666666;
    }


    &__long-input {
      width: 100%;

      &:focus {
        outline: 0px solid rgba(255, 255, 255, 0.208);
      }
    }
  }

  textarea {
    resize: none;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    height: 140px !important;

    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .post {
    width: 580px;
    min-height: 200px;
    gap: 10px;
    height: fit-content;
    border-bottom: 1px solid gray;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid rgba(255, 255, 255, 0.208);
    box-sizing: border-box;
    border-radius: 4px;
    max-width: 580px;

    &__profile {
      border: 1px solid rgba(255, 255, 255, 0.201);
      border-radius: 40px;
      padding: 5px;
      box-sizing: border-box;
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
    }

    &__profile-left {
      height: 100%;
      width: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      background-color: transparent;
      border: transparent;
    }

    &__profile-name {
      cursor: pointer;
    }

    &__profile-right {
      display: flex;
      flex-direction: row;
      gap: 12px;
    }

    &__favicon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: rgb(119, 127, 135);
      border: 1px solid rgba(255, 255, 255, 0.201);
    }

    &__subscribe {
      height: 20px;
      background-color: transparent;
      color: rgb(255, 255, 255);
      border: 0;
      margin-right: 7px;
      display: flex;
      justify-content: center;
      align-items: center;

      &-svg {
        width: 16px;
        margin-right: 2px;
        stroke-width: 2.5px;
      }
    }

    &__description,
    &__description-div {
      width: 100%;
      font-size: 0.9rem;
      color: #ffffffae;
      margin-top: -5px;
      font-weight: 500;
      line-height: 1.3em;
      letter-spacing: 0.02em;
      flex: 1;
    }

    &__img {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.253);
      max-height: 500px;
      object-fit: cover;
      object-position: center;
    }

    &__bottom {
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

    &__data {
      font-size: 0.8rem;
      color: rgb(177, 177, 177);
      letter-spacing: 1px;
      padding-left: 4px;
    }

    &__tag-div {
      display: flex;
      flex-direction: row;
      gap: 12px;
      flex: 1;
      margin-left: 18px;
    }

    &__tag-button {
      background-color: rgba(252, 252, 252, 0);
      padding: 3px 10px;
      border: 0;
      border-radius: 4px;
      color: rgba(255, 255, 255, 0.825);
      outline: 1px solid rgba(255, 255, 255, 0.16);

      &:hover {
        background-color: rgba(252, 252, 252, 0.122);
        color: rgba(255, 255, 255, 0.932);
      }
    }

    &__bookmark-button {
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

      &.active path {
        fill: rgb(255, 255, 255);
        stroke: currentColor;
      }

      &:hover {
        transform: scale(1.1);
      }
    }

    &__bookmark-svg {
      color: #ffffff;
      width: 24px;
      height: 24px;
      stroke-width: 1.4px;
      stroke: currentColor;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    &__hide-button {
      background-color: transparent;
      border: 0;
      color: gray;

      > svg {
        margin-top: 2px;
        margin-bottom: -3px;
        width: 15px;
        height: 15px;

        path,
        circle {
          color: rgb(87, 87, 87);
        }
      }
    }
  }
</style>
