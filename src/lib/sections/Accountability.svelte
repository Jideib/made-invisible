<script>
  export let expertQuotes = [];
  export let legalNotes = [];
  export let armyStatements = [];
</script>

<section class="account">
  <h2>Accountability — What Comes Next?</h2>
  <p class="intro">
    Despite 25+ years of documented mass atrocities, Nigeria has seen **no senior military official prosecuted**.
    Experts say this pattern of impunity enables cycles of revenge, mistrust and continued instability.
  </p>

  <!-- EXPERT COMMENTARY -->
  {#if expertQuotes.length}
  <div class="block">
    <h3>Expert Analysis</h3>
    {#each expertQuotes as q}
      <blockquote>
        <p>“{q.text}”</p>
        <span class="name">— {q.name}, {q.role}</span>
      </blockquote>
    {/each}
  </div>
  {/if}

  <!-- ARMY OFFICIAL POSITION -->
  {#if armyStatements.length}
  <div class="block">
    <h3>Official Military Position</h3>
    {#each armyStatements as s}
      <div class="statement">
        <strong>{s.date}</strong><br />
        <p>{s.text}</p>
      </div>
    {/each}
  </div>
  {/if}

  <!-- LEGAL STATUS -->
  {#if legalNotes.length}
  <div class="block">
    <h3>Legal Status</h3>
    <ul>
    {#each legalNotes as l}
      <li>{l}</li>
    {/each}
    </ul>
  </div>
  {/if}
</section>

<style>
.account { padding:14vh 6vw; background:#fff; }
h2 { font-size:2.2rem; margin-bottom:1.3rem; }
.intro { font-size:1.2rem; color:#444; margin-bottom:2rem; max-width:750px; }
.block { margin-bottom:3rem; }
blockquote {
  border-left:4px solid #e63946;
  padding-left:1rem;
  font-style:italic;
  margin-bottom:1.2rem;
}
.statement { padding:.6rem 0; }
.name { font-size:.9rem; opacity:.7; }
</style>
