<script>
  const methodology = [
    "Map only includes incidents where latitude/longitude was confirmed from open-source records.",
    "Systemic-pattern charts used victim numbers extracted strictly from Amnesty International, HRW or press investigations.",
    "Fact-check evidence is derived from external datasets + satellite OSINT + verified NGO reporting.",
    "Forensic slider grid uses geospatial before/after images sourced from Google Earth (historical layer) and external satellite providers."
  ];

  const links = {
    twitter: "https://twitter.com/intent/tweet?text=Made%20Invisible%20investigation",
    whatsapp: "https://wa.me/?text=Made%20Invisible%20Investigation",
    linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=https://example.com"
  };
</script>

<footer class="bd-footer">
  <div class="meta">
    <h3>MADE INVISIBLE — A BusinessDay Forensic Investigation</h3>

    <div class="credits">
      <p><strong>Design / Development / Reporting:</strong> Ibraheem Alawode</p>
      <p><strong>Editor:</strong> Lukman Abolade</p>
    </div>

    <h4>Data Methodology</h4>
    <ul>
      {#each methodology as m}
        <li>{m}</li>
      {/each}
    </ul>
  </div>

  <div class="share">
    <span>Share:</span>
    <a href={links.twitter} target="_blank" aria-label="Share on Twitter">🐦</a>
    <a href={links.whatsapp} target="_blank" aria-label="Share on WhatsApp">💬</a>
    <a href={links.linkedin} target="_blank" aria-label="Share on LinkedIn">💼</a>
  </div>

  <p class="bd-brand">BUSINESSDAY © {new Date().getFullYear()}</p>
</footer>

<style>
.bd-footer {
  padding: 10vh 6vw;
  background: black;
  color: white;
}
.meta {
  max-width: 900px;
}
.credits p {
  margin: .2rem 0;
}
.bd-brand {
  margin-top: 4vh;
  opacity:.6;
  font-size:.9rem;
}
.share {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 6vh;
}
.share a {
  font-size: 1.4rem;
  text-decoration: none;
  color: white;
}
ul li { margin-bottom: .5rem; }
</style>
