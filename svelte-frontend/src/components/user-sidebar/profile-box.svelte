<script lang="ts">

    import { user, log_in, log_out } from "../global/auth.svelte";
</script>

{#if user.is_logged_in}
<section class="user-sidebar__profile_2">
  <button class="open-profile-button" onclick={() => log_out()}>

        <p>cebolitos.com.br</p>

        

  </button>

  <button class="donate-button"><svg xmlns="http://www.w3.org/2000/svg"  width="16"  height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
</svg></button>

  <button class="notifications-button"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg></button>
</section>

<!--<section class="user-sidebar__profile">
    <div></div>

    <div class="user-sidebar__profile-img-div">    
        <img class="user-sidebar__profile-img" src="https://anthonysturmer.github.io/anthonysturmer/1.jpg"/>
    </div>

    <p>cebolitos.com.br</p>

    <button class="user-sidebar__exit-button" id="exit-button" onclick={() => log_out()}>Exit</button>

    <div></div>
</section>-->

{:else}

<section class="user-sidebar__profile_2">
  <button class="become-a-creator-button" onclick={() => log_in()}>Become a Creator</button>

  <button class="donate-button"><svg xmlns="http://www.w3.org/2000/svg"  width="16"  height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
</svg></button>

  <button class="notifications-button"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg></button>
</section>
 {/if}

<style>

  .user-sidebar__profile {
    width: 100%;
    box-sizing: border-box;
    min-height: 68px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 20px;
    position: relative;
    background-color: #181820;
    border-radius: 10px;
  }

  .user-sidebar__profile_2 {
    display: flex;
    flex-direction: row;
    gap: 10px;
    
  }

  .donate-button {
    background-color: #242432;
    border: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    gap: 14px;
    border-radius: 10px;

    font-size: 14px;
  }

  .become-a-creator-button, .open-profile-button {
    height: 48px;
    flex: 1;
    border-radius: 8px;
    border: 0px;
    padding-left: 8px;
    padding-right: 8px;
    background-color: transparent;
    outline: 1px solid rgba(255, 255, 255, 0.208);
    font-size: 14px;
  }

  .open-profile-button {
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }

  .donate-button:hover {
    background-color: #c4347c;
  }

  .donate-button:hover svg path {
    color: white;
  }

  .donate-button svg path {
    color: rgba(255, 255, 255, 0.597);
  }

  .user-sidebar__profile-img-div {
    border-radius: 50%;
    overflow: hidden;
    min-width: 38px !important;
    height: 38px;
    border: 1px solid rgba(255, 255, 255, 0.201);
    background-color: aliceblue;
  }

  .user-sidebar__profile-img {
    min-width: 38px !important;
    height: 38px;
    border-radius: 50%;
  }

  .user-sidebar__exit-button {
    background-color: #2b2b38;
    border-radius: 14px;
    padding: 14px;
    padding-bottom: 3px;
    padding-top: 3px;
    color: rgb(255, 255, 255);
    border: 0px;
  }
  .user-sidebar__exit-button:hover {
    background-color: rgb(210, 9, 53);
  }

   .become-a-creator-button:hover {
    background-color: rgb(30, 70, 164);
    outline: 0px; 
  }

  .open-profile-button:hover {
    background-color: rgba(255, 255, 255, 0.042);
  }

  .notifications-button {
    aspect-ratio: 1/1;
    background-color: transparent;
    border: 0px;
    outline: 1px solid rgba(255, 255, 255, 0.208);
    border-radius: 11px;
   
  }

  .notifications-button:hover {
    background-color: rgb(5, 88, 123);
    outline: 0px;
  }
  .notifications-button svg {
    margin-top: 2px;
  }

</style>