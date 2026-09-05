<script lang="ts">
  let subscribed = $state(false);
  let bookmarked = $state(false);
  let image = $state(true);
  let text = $state(false);

  function toggle_subscribed() {
    subscribed = !subscribed;
  }

  function toggle_bookmarked() {
    bookmarked = !bookmarked;
  }
</script>

<section class="new-post">
  <h1 class="new-post__title">Create post</h1>
  <div class="new-post__inputs-div">
    <input
      class="new-post__long-input"
      type="url"
      placeholder="Paste your url here"
    />

    <input class="new-post__long-input" placeholder="Add your title" />

    <div class="new-post_ksks">
      <button>Use an image</button>
      <button>Use a text description</button>
    </div>
    <input class="new-post__long-input" placeholder="Add your image url" />

    <div class="new-post__tags-input-div">
      <input placeholder="Tag 1" />
      <input placeholder="Tag 2" />
      <input placeholder="Tag 3" />
    </div>
  </div>
  <div class="new-post__verify-div">
    <button class="new-post__verify-button">Verify</button>
  </div>

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
          <button class="post__hide-button">
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
            subscribe
          {/if}
        </button>
      </div>
    </div>

    <h2 class="post__title">Lorem ipsum dolor sit amet</h2>

    {#if image}
      <img
        loading="lazy"
        src="https://anthonysturmer.github.io/anthonysturmer/img.jpg"
        class="post__img"
        alt="post"
      />
    {/if}

    {#if text}
      <p class="post__description">text</p>
    {/if}

    <div class="post__bottom">
      <time class="post__data">Now</time>

      <div class="post__tag-div">
        <button class="post__tag-button">tag1</button>
        <button class="post__tag-button">tag2</button>
        <button class="post__tag-button">tag3</button>
      </div>

      <button
        class="post__bookmark-button"
        class:active={bookmarked}
        onclick={toggle_bookmarked}
        aria-label={bookmarked ? "remove from bookmarked" : "bookmark post"}
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

  <label class="new-post__label new-post__agreement" id="kkkkk">
    <input type="checkbox" value="image" /> Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </label>

  <div class="new-post__publish-div">
    <button class="new-post__publish-button">Publish your post</button>
  </div>
</section>

<style lang="scss">
  .new-post_ksks {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #0f0f15;
    padding: 8px;
    border-radius: 4px;
    gap: 8px;
  }

  .new-post_ksks > :first-child {
    background-color: rgba(53, 53, 53, 0.597);
  }
  .new-post_ksks button {
    height: 28px;
    background-color: #66666610;
    border: 0px solid black;
    flex: 1;
    border-radius: 4px;
  }
  .new-post {
    width: 92%;
    max-width: 580px;
    height: fit-content;
    background-color: #0f0f15;
    display: flex;
    gap: 40px;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: flex-start;
    padding-bottom: 100px;
    padding-top: 100px;
  }

  .new-post__inputs-div {
    border-radius: 4px;
    background-color: #181820;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .new-post__title {
    font-size: 2rem;
    font-weight: 680;
    width: 100%;
    padding-bottom: 30px;
  }

  .new-post__label {
    color: #b0b0b0;
    font-weight: 400;
    font-size: 1rem;
    width: 100%;
  }

  .new-post__tags-input-div {
    display: flex;
    flex-direction: row;
    flex: 1;
    text-align: start;
    width: 100%;
    background-color: transparent;
    border-radius: 5px;
    color: white;
    gap: 8px;
  }

  .new-post__tags-input-div input {
    flex: 1;
    text-align: start;
    font-size: 0.9rem;
    width: 30%;
    background-color: #0f0f15;
    border: 0px solid rgba(255, 255, 255, 0.208);
    color: white;
    padding: 14px;
    border-radius: 4px;
  }

  .new-post__verify-div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    color: #666666;
  }

  .new-post__verify-button {
    width: fit-content;
    padding: 14px;
    padding-left: 48px;
    padding-right: 48px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.208);
    color: white;
  }

  .new-post__publish-button {
    width: 180px;
    height: 48px;
    background-color: #ffffff;
    border-radius: 50px;
    border: 0px solid white;
    color: black;
  }

  .new-post__publish-div {
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 30px;
    color: #666666;
  }

  .new-post__agreement {
    border: 1px solid rgba(255, 255, 255, 0.208);
    padding: 10px;
    border-radius: 5px;
    line-height: 24px;
  }

  .new-post__article {
    border: 1px solid rgba(255, 255, 255, 0.208);
    width: 100%;
    gap: 10px;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .new-post__long-input {
    width: 100%;
    text-align: start;
    font-size: 1rem;
    background-color: #0f0f15;
    border-radius: 4px;
    border: 0px solid black;
    color: white;
    padding: 14px;
    height: 56px;
  }

  .new-post__long-input:focus {
    outline: 1px solid rgb(142, 142, 142);
  }

  .middle-tag-input {
    outline: 1px solid rgba(255, 255, 255, 0.201);
    border-left: 1px solid white;
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
    border: 1px solid rgba(255, 255, 255, 0.208);
    box-sizing: border-box;
    border-radius: 4px;

    &--last {
      border-bottom: 0;
    }

    &__profile {
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
      width: 34px;
      height: 34px;
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

    &__title {
      width: 100%;
      margin-bottom: 5px;
      height: fit-content;
      max-height: 80px;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.3em;
      letter-spacing: 0.02em;
    }

    &__description {
      width: 100%;
      font-size: 0.9rem;
      color: #ffffffae;
      margin-top: -5px;
      font-weight: 500;
      line-height: 1.3em;
      letter-spacing: 0.02em;
    }

    &__img {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.253);
      aspect-ratio: 16 / 12;
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
      width: 20px;
      height: 20px;
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
