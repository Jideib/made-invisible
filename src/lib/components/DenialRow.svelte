<script>
  export let active = false;
  export let faded = false;
  export let official;
  export let evidence;
</script>

<div class="row {active ? 'active' : ''} {faded ? 'faded' : ''}">
  <div class="official">
    <p class="label">Official statement</p>
    <blockquote>{official.text}</blockquote>
    <span class="source">{official.source}</span>
  </div>

  <div class="divider"></div>

  <div class="evidence">
    <p class="label">Ground evidence</p>
    <blockquote>{evidence.text}</blockquote>
    <span class="source">
      {evidence.source} · {evidence.meta}
    </span>
  </div>
</div>

<style>
.row {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 2rem;
  margin: 25vh 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.row.active {
  opacity: 1;
}

.row.faded {
  opacity: 0.25;
}

.official blockquote {
  font-family: monospace;
  font-size: 0.95rem;
}

.evidence blockquote {
  font-size: 1rem;
}

.label {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  opacity: 0.6;
  text-transform: uppercase;
}

.divider {
  background: rgba(255,255,255,0.15);
}

.source {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.6;
}
</style>
