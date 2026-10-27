<script lang="ts">
  let selected_plan = $state<"user" | "creator" | "complete" | "">("");

  function select_plan(plan: "user" | "creator" | "complete") {
    selected_plan = plan;
  }
</script>

<section class="plans">
  <div class="plans__header">
    <h1>Opções de assinatura</h1>

    <p>Escolha os recursos que fazem sentido para você.</p>
  </div>

  <div class="plans__list">
    <!-- USUÁRIO -->
    <button
      class="plan"
      class:selected={selected_plan === "user"}
      onclick={() => select_plan("user")}
    >
      <div class="plan__top">
        <div class="plan__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>
          </svg>
        </div>

        <div class="plan__top-text">
          <h2>Armazenamento na nuvem</h2>

          <p>
            Para salvar seus dados na nuvem, e sincronizar entre diferentes
            dispositivos.
          </p>
        </div>
      </div>

      <div class="plan__price">
        <strong>$4</strong>
        <span>/ mês</span>
      </div>

      <div class="plan__divider"></div>

      <div class="plan__section">
        <h3>O que muda com a assinatura</h3>

        <ul>
          <li>
            <span>✓</span>
            Armazenamento dos seus dados na nuvem
          </li>

          <li>
            <span>✓</span>
            Sincronização entre dispositivos
          </li>

          <li>
            <span>✓</span>
            Perfis inscritos sincronizados
          </li>

          <li>
            <span>✓</span>
            Posts salvos sincronizados
          </li>

          <li>
            <span>✓</span>
            Perfis escondidos sincronizados
          </li>

          <li>
            <span>✓</span>
            Preferências sincronizadas
          </li>
        </ul>
      </div>

      <div class="plan__action">Escolher plano</div>
    </button>

    <!-- CRIADOR -->
    <button
      class="plan"
      class:selected={selected_plan === "creator"}
      onclick={() => select_plan("creator")}
    >
      <div class="plan__top">
        <div class="plan__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M12 3l2.7 5.5L21 9.4l-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.4l6.3-.9z"
            ></path>
          </svg>
        </div>

        <div class="plan__top-text">
          <h2>Criador</h2>

          <p>
            Recursos exclusivos para quem publica e mantém conteúdo
            independente.
          </p>
        </div>
      </div>

      <div class="plan__price">
        <strong>$5</strong>
        <span>/ mês</span>
      </div>

      <div class="plan__divider"></div>

      <div class="plan__section">
        <h3>O que muda com a assinatura</h3>

        <ul>
          <li>
            <span>✓</span>
            Mais posts por dia
          </li>

          <li>
            <span>✓</span>
            Descrições de posts mais longas
          </li>

          <li>
            <span>✓</span>
            Recursos de personalização de perfil
          </li>

          <li>
            <span>✓</span>
            Recursos de personalização de posts
          </li>
        </ul>
      </div>

      <div class="plan__action">Escolher plano</div>
    </button>

    <!-- COMPLETO -->
    <button
      class="plan"
      class:selected={selected_plan === "complete"}
      onclick={() => select_plan("complete")}
    >
      <div class="plan__top">
        <div class="plan__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3v18"></path>
            <path d="M3 12h18"></path>
            <circle cx="12" cy="12" r="9"></circle>
          </svg>
        </div>

        <div class="plan__top-text">
          <h2>Completo</h2>

          <p>
            Armazenamento na nuvem, sincronização e todos os recursos do plano
            "Criador".
          </p>
        </div>
      </div>

      <div class="plan__price">
        <strong>$7</strong>
        <span>/ mês</span>
      </div>

      <div class="plan__divider"></div>

      <div class="plan__section">
        <h3>O que muda com a assinatura</h3>

        <ul>
          <li>
            <span>✓</span>
            Todos os recursos do plano Usuário
          </li>

          <li>
            <span>✓</span>
            Todos os recursos do plano Criador
          </li>

          <li>
            <span>✓</span>
            Armazenamento e sincronização na nuvem
          </li>

          <li>
            <span>✓</span>
            Recursos exclusivos para criadores
          </li>
        </ul>
      </div>

      <div class="plan__action">Escolher plano</div>
    </button>
  </div>
</section>

<style lang="scss">
  .plans {
    width: 92%;
    max-width: 1050px;

    padding: 90px 0 120px;

    color: white;

    box-sizing: border-box;
  }

  .plans__header {
    margin-bottom: 32px;

    h1 {
      margin: 0 0 8px;

      font-size: 1.8rem;
      font-weight: 650;
    }

    p {
      margin: 0;

      color: rgba(255, 255, 255, 0.48);

      font-size: 0.95rem;
    }
  }

  .plans__list {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 14px;

    align-items: stretch;
  }

  .plan {
    position: relative;

    width: 100%;

    padding: 22px;

    box-sizing: border-box;

    background: #0f0f15;

    border: 1px solid rgba(255, 255, 255, 0.13);

    border-radius: 12px;

    color: white;

    text-align: left;

    cursor: pointer;

    display: flex;
    flex-direction: column;

    height: 100%;

    transition:
      border-color 160ms ease,
      background-color 160ms ease,
      transform 160ms ease;

    &:hover {
      border-color: rgba(255, 255, 255, 0.25);
    }

    &.selected {
      border-color: rgba(255, 255, 255, 0.65);
    }
  }

  .plan__top {
    display: flex;

    align-items: flex-start;

    gap: 12px;

    min-height: 58px;
  }

  .plan__icon {
    width: 42px;
    height: 42px;

    min-width: 42px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.06);

    color: rgba(255, 255, 255, 0.8);

    svg {
      width: 21px;
      height: 21px;
    }
  }

  .plan__top-text {
    min-width: 0;
  }

  .plan__top h2 {
    margin: 2px 0 4px;

    font-size: 1.05rem;

    font-weight: 600;
  }

  .plan__top p {
    margin: 0;

    color: rgba(255, 255, 255, 0.45);

    font-size: 0.78rem;

    line-height: 1.4;
  }

  .plan__price {
    display: flex;

    align-items: baseline;

    gap: 5px;

    margin-top: 25px;

    strong {
      font-size: 2rem;

      font-weight: 650;

      letter-spacing: -0.04em;
    }

    span {
      color: rgba(255, 255, 255, 0.4);

      font-size: 0.82rem;
    }
  }

  .plan__divider {
    height: 1px;

    width: 100%;

    margin: 21px 0;

    background: rgba(255, 255, 255, 0.08);

    flex-shrink: 0;
  }

  .plan__section {
    flex: 1;

    min-height: 0;

    h3 {
      margin: 0 0 14px;

      font-size: 0.78rem;

      font-weight: 600;

      color: rgba(255, 255, 255, 0.45);
    }

    ul {
      margin: 0;

      padding: 0;

      list-style: none;

      display: flex;

      flex-direction: column;

      gap: 12px;
    }

    li {
      display: flex;

      align-items: flex-start;

      gap: 9px;

      color: rgba(255, 255, 255, 0.68);

      font-size: 0.84rem;

      line-height: 1.35;
    }

    li span {
      flex-shrink: 0;

      color: rgba(255, 255, 255, 0.75);

      font-size: 0.78rem;
    }
  }

  .plan__action {
    display: flex;

    align-items: center;

    justify-content: center;

    width: 100%;

    height: 40px;

    margin-top: 24px;

    border-radius: 7px;

    background: rgba(255, 255, 255, 0.06);

    color: rgba(255, 255, 255, 0.72);

    font-size: 0.83rem;

    flex-shrink: 0;

    transition: background 160ms ease;

    .selected & {
      background: rgba(255, 255, 255, 0.1);

      color: white;
    }
  }

  @media (max-width: 850px) {
    .plans__list {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .plans {
      padding-top: 60px;
    }
  }
</style>
