<script>
  import { browser } from "$app/environment";
  
  // Import SVG icons
  import TwitterIcon from "$lib/assets/icons/X.svg";
  import WhatsappIcon from "$lib/assets/icons/whatsapp.svg";
  import FacebookIcon from "$lib/assets/icons/facebook.svg";
  import LinkedinIcon from "$lib/assets/icons/Linkedin.svg";
  import BusinessDayLogo from "$lib/assets/BD.svg";
  
  const methodology = [
    "Map includes only incidents where latitude/longitude was confirmed from open-source records and verified through multiple sources.",
    "Forensic Analysis (formerly Fact-check) combines satellite OSINT, eyewitness accounts, and verified NGO reporting.",
    "Victim numbers sourced from Amnesty International, Human Rights Watch, or press investigations with cross-verification.",
    "Incidents before 1999 and those involving non-Army security forces (Navy, Airforce) are excluded from this investigation."
  ];

  const dataSources = [
    "Amnesty International Nigeria Reports (2000–2025)",
    "Human Rights Watch Publications and Investigations",
    "Premium Times Investigative Reports Archive",
    "The Cable Fact-Check Database",
    "International Crisis Group Nigeria Analyses",
    "UN Office for the Coordination of Humanitarian Affairs Data",
    "Satellite Imagery: Google Earth Pro, Maxar, Planet Labs"
  ];

  const limitations = [
    "This investigation focuses exclusively on Nigeria Army operations; incidents involving Navy or Airforce are excluded",
    "Victim counts represent documented cases; actual numbers may be higher due to underreporting",
    "Remote locations with limited access may have incomplete evidence",
    "Some incidents lack verifiable satellite imagery due to cloud cover or resolution constraints",
    "Military operational details are classified; analysis relies on open-source evidence"
  ];

  const credits = [
    "Data Analysis, Forensic Reporting, Visual Design & Development: Ibraheem Alawode",
    "Editing & Editorial Oversight: Lukman Abolade",
    "Methodology Review: BusinessDay Investigations Desk"
  ];
  
  // Share functionality
  const currentYear = new Date().getFullYear();
  
  let shareText = "MADE INVISIBLE: 25 Years of Nigeria Army Operations - A BusinessDay Investigation";
  let shareUrl = "";
  
  if (browser) {
    shareText = encodeURIComponent(shareText);
    shareUrl = encodeURIComponent(window.location.href);
  }
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
  };
  
  function shareToPlatform(url) {
    if (browser) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
</script>

<footer class="footer-credits" id="credits">
  <div class="footer-container">
    <!-- Title -->
    <div class="footer-title">
      <h3>Methodology & Transparency</h3>
      <p class="footer-subtitle">
        This investigation follows open-source intelligence (OSINT) protocols and 
        focuses exclusively on Nigeria Army operations from 1999–2025.
      </p>
    </div>
    
    <!-- Multi-column content -->
    <div class="footer-content">
      <!-- Column 1: Data Sources -->
      <div class="footer-column">
        <h4>Primary Data Sources</h4>
        <ul class="source-list">
          {#each dataSources as source}
            <li>{source}</li>
          {/each}
        </ul>
      </div>
      
      <!-- Column 2: Methodology -->
      <div class="footer-column">
        <h4>Investigation Methodology</h4>
        <ul class="methodology-list">
          {#each methodology as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
      
      <!-- Column 3: Limitations & Credits -->
      <div class="footer-column">
        <h4>Investigation Scope & Limitations</h4>
        <ul class="limitations-list">
          {#each limitations as limit}
            <li>{limit}</li>
          {/each}
        </ul>
        
        <h4>Credits</h4>
        <div class="credits-list">
          {#each credits as credit}
            <div class="credit-item">{credit}</div>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Share section -->
    <div class="share-section">
      <div class="share-label">Share this investigation:</div>
      <div class="share-buttons">
        <button 
          class="share-button twitter" 
          on:click={() => shareToPlatform(shareLinks.twitter)}
          aria-label="Share on Twitter"
        >
          <img src={TwitterIcon} alt="Twitter" width="18" height="18" />
          <span>Twitter</span>
        </button>
        
        <button 
          class="share-button whatsapp" 
          on:click={() => shareToPlatform(shareLinks.whatsapp)}
          aria-label="Share on WhatsApp"
        >
          <img src={WhatsappIcon} alt="WhatsApp" width="18" height="18" />
          <span>WhatsApp</span>
        </button>
        
        <button 
          class="share-button facebook" 
          on:click={() => shareToPlatform(shareLinks.facebook)}
          aria-label="Share on Facebook"
        >
          <img src={FacebookIcon} alt="Facebook" width="18" height="18" />
          <span>Facebook</span>
        </button>
        
        <button 
          class="share-button linkedin" 
          on:click={() => shareToPlatform(shareLinks.linkedin)}
          aria-label="Share on LinkedIn"
        >
          <img src={LinkedinIcon} alt="LinkedIn" width="18" height="18" />
          <span>LinkedIn</span>
        </button>
      </div>
    </div>
    
    <!-- Copyright & Brand -->
    <div class="copyright">
      <div class="copyright-content">
        <div class="brand-logo">
          <img src={BusinessDayLogo} alt="BusinessDay" class="bd-logo" />
        </div>
        <div class="copyright-text">
          <p>© {currentYear} BusinessDay Media. All rights reserved.</p>
          <p class="disclaimer">
            This investigation is based on verifiable open-source evidence focusing on Nigeria Army operations (1999–2025). 
            Forensic Analysis combines satellite imagery, eyewitness accounts, and cross-referenced documentation.
          </p>
          <p class="investigation-note">
            Investigation by BusinessDay Forensic Desk
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
/* Footer container */
.footer-credits {
  background: #050505;
  color: #f8f8f8;
  padding: 10vh 6vw;
  font-family: serif;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Title section */
.footer-title {
  margin-bottom: 6vh;
  padding-bottom: 4vh;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-title h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 1rem 0;
  font-family: serif;
}

.footer-subtitle {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  max-width: 800px;
}

/* Multi-column layout */
.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  margin-bottom: 6vh;
  padding-bottom: 5vh;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-column h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 1.2rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: sans-serif;
}

/* Lists styling */
.source-list,
.methodology-list,
.limitations-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.source-list li,
.methodology-list li,
.limitations-list li {
  padding: 0.4rem 0;
  line-height: 1.5;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  padding-left: 1rem;
}

.source-list li:before,
.methodology-list li:before,
.limitations-list li:before {
  content: "•";
  color: rgba(255, 255, 255, 0.4);
  position: absolute;
  left: 0;
  font-size: 0.8rem;
}

/* Credits list */
.credits-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.credit-item {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.3rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.credit-item:last-child {
  border-bottom: none;
}

/* Share section */
.share-section {
  margin-bottom: 5vh;
  padding-bottom: 4vh;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.share-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: sans-serif;
}

.share-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: sans-serif;
}

.share-button:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.share-button.twitter:hover {
  border-color: #1da1f2;
  color: #1da1f2;
}

.share-button.whatsapp:hover {
  border-color: #25d366;
  color: #25d366;
}

.share-button.facebook:hover {
  border-color: #1877f2;
  color: #1877f2;
}

.share-button.linkedin:hover {
  border-color: #0a66c2;
  color: #0a66c2;
}

.share-button img {
  filter: brightness(0.9);
  transition: filter 0.2s ease;
}

.share-button:hover img {
  filter: brightness(1);
}

/* Copyright */
.copyright {
  margin-top: 4vh;
}

.copyright-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.brand-logo {
  opacity: 0.8;
}

.bd-logo {
  height: 40px;
  width: auto;
}

.copyright-text {
  flex: 1;
  min-width: 300px;
}

.copyright-text p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}

.disclaimer {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
}

.investigation-note {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

/* Mobile adaptation */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  .copyright-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  
  .copyright-text {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .footer-credits {
    padding: 6vh 5vw;
  }
  
  .footer-title h3 {
    font-size: 1.5rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .footer-content h4 {
    margin-bottom: 0.8rem;
  }
  
  .share-buttons {
    justify-content: center;
  }
  
  .share-button {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}

/* Single column for mobile */
@media (max-width: 480px) {
  .share-buttons {
    flex-direction: column;
  }
  
  .share-button {
    width: 100%;
    justify-content: center;
  }
  
  .footer-title h3 {
    font-size: 1.3rem;
  }
  
  .bd-logo {
    height: 32px;
  }
}

/* Print styles */
@media print {
  .footer-credits {
    background: #fff;
    color: #000;
    border-top: 1px solid #ccc;
  }
  
  .footer-title h3 {
    color: #000;
  }
  
  .footer-subtitle,
  .source-list li,
  .methodology-list li,
  .limitations-list li,
  .credit-item {
    color: #333;
  }
  
  .share-section {
    display: none;
  }
  
  .copyright-text p {
    color: #666;
  }
  
  .bd-logo {
    filter: brightness(0);
  }
}
</style>