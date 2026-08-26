<script lang="ts">

  import { hidden_state } from "../global/hidden.svelte";
  import { subscriptions_state } from "../global/subscriptions.svelte";
  import { bookmarks_state } from "../global/bookmarks.svelte";

  let json = $state(

  JSON.stringify(
    {
      subscriptions: JSON.parse(localStorage.getItem('subscriptions') || '[]'),
      bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
      hidden_profiles: JSON.parse(localStorage.getItem('hidden') || '[]'),
    }, 
    null, 
    2
  )
  )

  let error_message = $state('');

  function save_config() {

    error_message = ''

    try {
    const parsed = JSON.parse(json)

    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('O JSON DEVE SER UM OBJETO VÁLIDO')
    }

    if (Array.isArray(parsed.hidden_profiles)) {
      hidden_state.items = parsed.hidden_profiles;
      localStorage.setItem('hidden', JSON.stringify(parsed.hidden_profiles))
    }

    if (Array.isArray(parsed.subscriptions)) {
      
      localStorage.setItem('subscriptions', JSON.stringify(parsed.subscriptions))
      subscriptions_state.items = parsed.subscriptions
    }

    if (Array.isArray(parsed.bookmarks)) {
     
      localStorage.setItem('bookmarks', JSON.stringify(parsed.bookmarks))
      bookmarks_state.items = parsed.bookmarks
    }
    
    } catch (error: any) {
      error_message = 'erro de sintaxe do JSON: ' + error.message;
    }


  }



</script>  
  
  <section class="bookmarks" id="bookmarks">
      <h1 class="bookmarks__title">Local data</h1>

      <div class="local-data__management">
        <div class="local-data__management-menu">
          <div>
            <button>copy</button>
            <button>paste</button>
            <button>merge</button>
          </div>

          <button onclick={save_config}>update</button>
        </div>
        <textarea
          spellCheck="false"
          id="local-data-textarea"
          class="local-data__textarea"
          bind:value={json}
        ></textarea>

        {#if error_message}
          <p>{error_message}</p>
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

  gap: 40px;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  padding-bottom: 100px;
  padding-top: 100px;
  color: white;
}

  .local-data__div {
    width: 100%;
    background-color: #181820;
    position: relative;
  }

  .local-data__textarea {
    width: 100%;
    min-height: 400px;
    margin: 0;
    box-sizing: border-box;
    background-color: transparent;
    color: white;
    resize: none;
    overflow-y: hidden;
    outline: none;
    width: 100%;
    background-color: #181820;
    border: 0px;
    padding: 22px;

    field-sizing: content;
  }

  .local-data__textarea:focus {
    outline: none;
  }

  .local-data__management {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .local-data__management-menu {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .local-data__management-menu button {
    width: 80px;
    height: 34px;
    background-color: #1e1e26;
    border: 0px solid black;
    border-radius: 7px;
    color: rgb(255, 255, 255);
  }
  .local-data__management-menu button:hover {
    background-color: #2b2b38;
  }

  .local-data__management-menu > div {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .local-data__management-menu > button {
    background-color: #2a2c78;
  }

  .local-data__management-menu > button:hover {
    background-color: #3a3d93;
  }

</style>