<script lang="ts">

  import { bookmarks_state } from "../global/bookmarks.svelte";
  import Post from "../feed/post.svelte";


  function handle_profile_click() {
    console.log("Clicou no perfil a partir dos favoritos");
  }
</script> 
 
 <section class="bookmarks">
      <h1 class="bookmarks__title">Bookmarks</h1>

      <div class="bookmarks-feed">

        {#if bookmarks_state.items.length === 0}

        <p>nenhum bookmark</p>

        {:else}

        {#each bookmarks_state.items as post, index}
          
        <Post 
        post={post}
        on_profile_click={handle_profile_click}
        is_last = {index === bookmarks_state.items.length - 1}/>

        {/each}
        {/if}
      </div>
    </section>
<style>

.bookmarks {
  width: 92%;
  max-width: 580px;
  display: flex;
  height: fit-content;
  background-color: #0f0f15;
  align-items: center;
  gap: 40px;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  padding-bottom: 100px;
  padding-top: 100px;
  color: white;
}
  .bookmarks__title {
    font-size: 2rem;
    font-weight: 680;
    width: 100%;
    padding-bottom: 30px;
  }


.bookmarks-feed {
  width: 100%;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, 0.208);
  border-radius: 5px;
}

.bookmarks-feed > :last-child {
  border-bottom: 0px solid rgba(255, 255, 255, 0.208);
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
  background-color: transparent;
  border: transparent;
}

.post__profile-name {
  cursor: pointer;
}

</style>