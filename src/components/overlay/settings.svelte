<script lang="ts">
  import { hidden_state, show_profile } from "../../global/hidden.svelte";
</script>

<section class="settings">
  <h1 class="settings__title">Configurações</h1>

  <section class="settings__group">
    <h2 class="settings__group-title">Básico</h2>

    <div class="settings__panel">
      <label class="settings__row">
        <p class="settings__label-title">Modo escuro</p>
        <input class="settings__radio" type="radio" name="modo" checked />
      </label>

      <label class="settings__row">
        <p class="settings__label-title">Modo claro</p>
        <input class="settings__radio" type="radio" name="modo" />
      </label>

      <label class="settings__row">
        <p class="settings__label-title">Tamanho da fonte</p>
        <input
          class="settings__number-input"
          type="number"
          min="10"
          max="30"
          value="16"
        />
      </label>

      <label class="settings__row">
        <p class="settings__label-title">Idioma</p>

        <select class="settings__select">
          <option>inglês</option>
          <option>francês</option>
          <option>português</option>
        </select>
      </label>
    </div>
  </section>

  <section class="settings__group">
    <h2 class="settings__group-title">Conta</h2>

    <div class="settings__panel">
      <button class="settings__row settings__row-button" type="button">
        <p class="settings__label-title">Trocar senha</p>
        <p class="settings__arrow">→</p>
      </button>

      <button class="settings__row settings__row-button" type="button">
        <p class="settings__label-title">Trocar domínio</p>
        <p class="settings__arrow">→</p>
      </button>

      <button class="settings__row settings__row-button" type="button">
        <p class="settings__label-title">Excluir conta</p>
        <p class="settings__arrow">→</p>
      </button>
    </div>
  </section>

  <section class="settings__group">
    <h2 class="settings__group-title">Ocultos</h2>

    <div class="settings__panel settings__hidden-panel">
      {#each hidden_state.items as author_name}
        <div class="settings__hidden-row">
          <button
            class="settings__hidden-name"
            type="button"
            onclick={() => show_profile(author_name)}
          >
            {author_name}
          </button>

          <button
            class="settings__hidden-remove"
            type="button"
            onclick={() => show_profile(author_name)}
            
          >
            ×
          </button>
        </div>
      {:else}
        <div class="settings__empty">
          
          Nenhum perfil oculto
        </div>
      {/each}
    </div>
  </section>
</section>

<style lang="scss">
  .settings {
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

  .settings__title {
      font-size: 2rem;
      font-weight: 680;
      width: 100%;
      padding-bottom: 30px;
    

  }

  .settings__group {
    width: 100%;
  }

  .settings__group + .settings__group {
    margin-top: 2px;
  }

  .settings__group-title {
    margin: 0 0 20px;

    font-size: 1.1rem;
    font-weight: 620;

    color: rgba(255, 255, 255, 0.9);
  }

  .settings__panel {
    width: 100%;

    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 11px;

    background: rgba(255, 255, 255, 0.025);

    box-sizing: border-box;
  }

  .settings__row {
    width: 100%;
    min-height: 68px;

    padding: 14px 17px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    box-sizing: border-box;

    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.065);

    background: transparent;
    color: white;

    text-align: left;

    &:last-child {
      border-bottom: 0;
    }
  }

  .settings__label-title {
    font-size: 1rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.88);
  }

  .settings__row-button {
    cursor: pointer;

    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.035);
      color: white;
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.06);
    }
  }

  .settings__arrow {
    flex-shrink: 0;

    font-size: 1rem;
    color: rgba(255, 255, 255, 0.26);

    transition:
      transform 0.15s ease,
      color 0.15s ease;
  }

  .settings__row-button:hover .settings__arrow {
    transform: translateX(3px);
    color: rgba(255, 255, 255, 0.55);
  }

  .settings__radio {
    width: 18px;
    height: 18px;

    flex-shrink: 0;
    margin: 0;

    accent-color: white;
    cursor: pointer;
  }

  .settings__number-input {
    width: 58px;
    height: 34px;

    flex-shrink: 0;

    padding: 0 9px;

    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 7px;

    background: rgba(255, 255, 255, 0.035);
    color: white;

    font-size: 1rem;
    text-align: center;

    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.32);
      background: rgba(255, 255, 255, 0.055);
    }
  }

  .settings__select {
    width: 120px;
    height: 34px;

    flex-shrink: 0;

    padding: 0 9px;

    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 7px;

    background: rgba(255, 255, 255, 0.035);
    color: rgba(255, 255, 255, 0.82);

    font-size: 1rem;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.32);
    }

    option {
      background: #15151d;
      color: white;
    }
  }

  .settings__hidden-panel {
    background: rgba(255, 255, 255, 0.018);
  }

  .settings__hidden-row {
    min-height: 53px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 6px 0 17px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.055);

    &:last-child {
      border-bottom: 0;
    }
  }

  .settings__hidden-name {
    padding: 0;

    border: 0;
    background: transparent;

    color: rgb(169, 169, 169);

    font-size: 0.9rem;
    text-align: left;

    cursor: pointer;

    &:hover {
      color: white;
      text-decoration: underline;
    }
  }

  .settings__hidden-remove {
    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;

    border: 0;
    border-radius: 7px;

    background: transparent;
    color: rgba(255, 255, 255, 0.3);

    font-size: 1.2rem;
    line-height: 1;

    cursor: pointer;

  }

  .settings__empty {
    min-height: 53px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;

    font-size: 1rem;
    color: rgba(255, 255, 255, 0.28);
  }



  @media (max-width: 600px) {

    .settings__title {
      margin-bottom: 0px;
      padding-bottom: 12px;
    }

    .settings__row {
      min-height: 66px;
      padding: 13px;
      
    }

    .settings {
       padding-bottom: 20px;
    }

  }


</style>