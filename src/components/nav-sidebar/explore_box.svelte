<script lang="ts">
  let search_query = $state("");
  let { is_visible, tag_selected } = $props();

  const tags = [
    "games",
    "filmes",
    "series",
    "animes",
    "mangas",
    "quadrinhos",
    "musica",
    "k-pop",
    "jogos-de-tabuleiro",
    "rpg",
    "streaming",
    "cinema",
    "teatro",
    "cosplay",
    "e-sports",
    "games-retro",
    "tecnologia",
    "inteligencia-artificial",
    "programacao",
    "ciberseguranca",
    "software",
    "hardware",
    "espaco",
    "astronomia",
    "fisica",
    "biologia",
    "gadgets",
    "desenvolvimento-web",
    "cripto",
    "robotica",
    "ciencia-de-dados",
    "matematica",
    "estilo-de-vida",
    "fitness",
    "yoga",
    "saude-mental",
    "culinaria",
    "veganismo",
    "viagens",
    "moda",
    "beleza",
    "cuidados-com-a-pele",
    "design-de-interiores",
    "maternidade-e-paternidade",
    "pets",
    "jardinagem",
    "atividades-ao-ar-livre",
    "minimalismo",
    "arte",
    "arte-digital",
    "fotografia",
    "design-grafico",
    "ui-ux",
    "arquitetura",
    "escrita",
    "poesia",
    "literatura",
    "faca-voce-mesmo",
    "artesanato",
    "ilustracao",
    "modelagem-3d",
    "animacao",
    "negocios",
    "empreendedorismo",
    "marketing",
    "financas",
    "investimentos",
    "economia",
    "politica",
    "historia",
    "filosofia",
    "educacao",
    "meio-ambiente",
    "direitos-humanos",
    "noticias",
    "vida-profissional",
    "esportes",
    "futebol",
    "basquete",
    "tenis",
    "surf",
    "skate",
    "ciclismo",
    "automobilismo",
    "esporte-a-motor",
    "pesca",
    "xadrez",
    "magica-e-ilusionismo",
    "colecionaveis",
    "antiguidades",
  ];

  let filtered_tags = $derived(
    tags.filter((tag) =>
      tag.toLowerCase().includes(search_query.trim().toLowerCase()),
    ),
  );
</script>

<div class="explore-box" style:display={!is_visible ? "none" : undefined}>
  <input
    placeholder="pesquise por tags"
    class="explore-box__explore-input"
    type="search"
    bind:value={search_query}
  />

  {#each filtered_tags as tag}
    <button onclick={() => tag_selected(tag)}>{tag}</button>
  {/each}
</div>

<style lang="scss">
  .explore-box {
    width: 100%;
    flex: 1;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
    position: relative;

    & button {
      margin-bottom: 8px;
      background-color: #181820;
      padding: 6px;
      border-radius: 6px;
      margin-right: 4px;
      border: 0px solid rgb(98, 98, 98);
      color: rgb(255, 255, 255);

      &:hover {
        scale: 1.02;
      }
    }

    &__explore-input {
      background-color: #181820;
      width: 100%;
      height: 32px;
      margin-bottom: 8px;
      border: 0px solid gray;
      padding-left: 8px;
      color: rgb(255, 255, 255);
      font-weight: 200;

      &:focus {
        border: 0px solid white;
        outline: 0px solid white;
      }
    }
  }
</style>
