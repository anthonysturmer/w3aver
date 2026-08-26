<script lang="ts">


   import { hidden_state, show_profile } from "../global/hidden.svelte";

</script>    
    
    <section id="settings" class="settings">
      <h1 class="settings__title">Settings</h1>
      <h2>Basic</h2>
      <section class="settings__section">
        <div class="settings__button" id="dark-mode-div">
          Modo escuro <input type="radio" name="modo" />
        </div>
        <div class="settings__button" id="light-mode-div">
          Modo claro <input type="radio" name="modo" />
        </div>
        <div class="settings__button" id="font-size-div">
          Font size <input class="settings__number-input" type="number" />
        </div>
        <div class="settings__button" id="language-div">
          Language
          <select class="settings__select">
            <option>english</option>
            <option>french</option>
            <option>portuguese</option>
          </select>
        </div>

        <button
          class="settings__button settings__save-button"
          type="submit"
        >
          Save Changes
        </button>
      </section>

      <h2>Account</h2>

      <section class="settings__section">
        <button class="settings__button" type="button">
          trocar senha
        </button>
        <button class="settings__button" type="button">
          trocar domínio
        </button>
        <button class="settings__button" type="button">
          Delete your account
        </button>
      </section>

      <h2>Hiden list</h2>

      <section class="settings__section settings__block-list">


      {#each hidden_state.items as author_name}

        <div class="settings__button">
          <button>{author_name}</button> <button onclick={() => show_profile(author_name)}>x</button>
        </div>
      {:else}

       <p>Nenhum perfil escondido</p>

      {/each}

      </section>
    </section>


<style>


.settings {
  width: 92%;
  max-width: 580px;
  height: fit-content;
  background-color: #0f0f15;
  align-items: center;
  display: flex;
  gap: 40px;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-start;
  padding-bottom: 100px;
  padding-top: 100px;
}
  .settings__section {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .settings__title {
    font-size: 2rem;
    font-weight: 680;
    width: 100%;
    padding-bottom: 30px;
  }

  .settings h2 {
    text-align: start;
    width: 100%;
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
  }

  .settings__button {
    height: 54px;
    border: 0;
    background-color: transparent;
    color: white;
    text-align: start;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .settings__button:hover {
    background-color: #1e1e26;
  }

  .settings__select {
    border-radius: 0;
    border: 1px solid rgb(91, 91, 91);
    height: 28px;
    width: 120px;
    padding-left: 7px;
    background-color: transparent;
    color: white;
  }

  .settings__save-button {
    background-color: rgba(250, 250, 250, 0.035) !important;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.208) !important;
    margin-top: 20px;
    height: 66px;
    width: 96%;
    box-sizing: border-box;
  }

  .settings__save-button:hover {
    scale: 1.01;
  }

  .settings__block-list {
    display: flex;
    flex-direction: column;
  }

  .settings__block-list > div > button {
    width: fit-content;
    height: fit-content;
    color: #979797;
    padding: 0;
    background-color: transparent;
    border: 0px;
    font-size: 1rem;
  }

  .settings__block-list > div > :first-child:hover {
    text-decoration: underline;
  }

  .settings__number-input {
    width: 28px;
    height: 22px;
    background-color: transparent;
    border: 1px solid rgb(91, 91, 91);
    color: white;
    padding-left: 6px;
    box-sizing: border-box;
  }

  .settings__number-input:focus {
    outline: 1px solid white;
    border: 0px solid black;
  }

</style>