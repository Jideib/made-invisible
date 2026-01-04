<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { scrollManager } from "$lib/utils/scrollManager.js";
  
  // Content chunks for narrative flow
  const contentFlow = [
    {
      type: "intro",
      content: "Despite decades of documented civilian deaths, meaningful accountability for military violence in Nigeria remains elusive."
    },
    {
      type: "expert-voice",
      quote: "“What we see across these incidents is not accidental. It is a repeated pattern of collective punishment, which is prohibited under international humanitarian law.”",
      source: "— Amnesty International, Nigeria Research Team"
    },
    {
      type: "legal-status",
      title: "Legal Status",
      items: [
        "No senior military official convicted for mass civilian killings",
        "ICC preliminary examination opened — no charges filed",
        "Most cases remain legally unresolved after years or decades",
        "Military justice system rarely addresses command responsibility"
      ]
    },
    {
      type: "expert-voice",
      quote: "“The absence of prosecutions sends a signal to field commanders that civilian harm will carry no consequences.”",
      source: "— International Humanitarian Law Expert"
    },
    {
      type: "official-response",
      title: "Military Position",
      note: "Official military response as stated in press releases",
      items: [
        "Incidents framed as 'legitimate operations' against militants",
        "Victims posthumously labeled as terrorists or armed combatants",
        "Statements issued before independent investigations",
        "Maintains all operations follow rules of engagement"
      ]
    },
    {
      type: "expert-voice",
      quote: "“Reprisal tactics may offer short-term control, but they systematically undermine counterinsurgency objectives.”",
      source: "— West Africa Security Analyst"
    },
    {
      type: "conclusion",
      content: "This investigation has traced a quarter-century pattern of military violence against civilians in Nigeria. From Odi in 1999 to Lamurde in 2025, the evidence shows not isolated incidents but recurring operational behaviors."
    },
    {
      type: "conclusion",
      content: "Through satellite imagery, eyewitness accounts, and forensic analysis, we have reconstructed what happened in communities where official narratives diverged from documented evidence."
    },
    {
      type: "conclusion",
      content: "The patterns are consistent: reprisal logic, collective punishment, narrative reframing, and systemic impunity. What remains unanswered is whether Nigeria will break this cycle."
    },
    {
      type: "conclusion",
      content: "Twenty-five years on, the fundamental question persists: when will command responsibility be meaningfully enforced, and when will civilian lives be valued above operational expediency?"
    }
  ];

  let activeStep = 0;
  let stepsContainer;
  
  // Handle scroll steps
  function handleStepEnter(response) {
    const stepId = parseInt(response.element.dataset.stepId);
    if (!isNaN(stepId)) {
      activeStep = stepId;
    }
  }

  onMount(() => {
    if (!browser) return;
    
    // Setup scrollama for accountability flow
    const { cleanup, stepsContainer: steps } = scrollManager.quickSetup(
      'accountability',
      contentFlow,
      {
        onEnter: (item, index, response) => handleStepEnter(response)
      },
      {
        stepHeight: '70vh', // Shorter steps for this section
        offset: 0.5,
        container: document.querySelector('.accountability-flow')
      }
    );
    
    stepsContainer = steps;
    
    return cleanup;
  });
</script>

<section class="accountability-section" id="accountability">
  <!-- Hidden scroll triggers -->
  <div class="scroll-triggers" data-scroll-section="accountability"></div>
  
  <!-- Narrative flow container -->
  <div class="accountability-flow">
    <!-- Fixed width container for content -->
    <div class="flow-container">
      {#each contentFlow as item, index}
        <div 
          class="flow-item"
          class:active={index === activeStep}
          class:faded={index < activeStep}
          class:upcoming={index > activeStep}
          data-item-index={index}
        >
          <!-- Intro -->
          {#if item.type === 'intro'}
            <div class="intro-content">
              <p class="intro-text">{item.content}</p>
            </div>
          
          <!-- Expert voices -->
          {:else if item.type === 'expert-voice'}
            <div class="expert-content">
              <blockquote>
                <p>{item.quote}</p>
                <cite>{item.source}</cite>
              </blockquote>
            </div>
          
          <!-- Legal status -->
          {:else if item.type === 'legal-status'}
            <div class="legal-content">
              <ul class="legal-list">
                {#each item.items as point}
                  <li>{point}</li>
                {/each}
              </ul>
            </div>
          
          <!-- Official response -->
          {:else if item.type === 'official-response'}
            <div class="official-content">
              <div class="official-label">Official Response</div>
              <ul class="official-list">
                {#each item.items as point}
                  <li>{point}</li>
                {/each}
              </ul>
              <div class="official-note">
                <p>{item.note}</p>
              </div>
            </div>
          
          <!-- Conclusion -->
          {:else if item.type === 'conclusion'}
            <div class="conclusion-content">
              <p>{item.content}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Final publication note -->
  <div class="publication-note">
    <p class="note-text">Published: January 1, 2026</p>
  </div>
</section>

<style>
/* Main section */
.accountability-section {
  background: #ffffff;
  color: #111;
  position: relative;
  min-height: 100vh;
  padding: 6vh 0 12vh;
}

/* Hide scroll triggers */
.scroll-triggers {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
}

/* Flow container */
.accountability-flow {
  position: relative;
  width: 100%;
}

.flow-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 6vw;
  position: relative;
}

/* Flow items */
.flow-item {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  padding: 4rem 0;
  position: relative;
}

.flow-item.active {
  opacity: 1;
  transform: translateY(0);
}

.flow-item.faded {
  opacity: 0.3;
  transform: translateY(-10px);
}

.flow-item.upcoming {
  opacity: 0;
  transform: translateY(40px);
}

/* Content styling */
.intro-content {
  width: 100%;
}

.intro-text {
  font-size: 1.3rem;
  line-height: 1.7;
  color: #222;
  margin: 0;
  font-family: serif;
  font-weight: 400;
}

/* Expert voices */
.expert-content {
  width: 100%;
}

blockquote {
  margin: 0;
  padding: 0;
  border-left: none;
  background: transparent;
}

blockquote p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #222;
  margin: 0 0 1.5rem 0;
  font-style: italic;
  font-family: serif;
  font-weight: 500;
  position: relative;
  padding-left: 2rem;
}

blockquote p:before {
  content: "“";
  position: absolute;
  left: 0;
  top: 0;
  font-size: 2.5rem;
  color: #e10600;
  opacity: 0.6;
  line-height: 1;
  font-family: Georgia, serif;
}

blockquote cite {
  font-size: 0.95rem;
  color: #666;
  font-style: normal;
  font-weight: 500;
  display: block;
  padding-left: 2rem;
  font-family: sans-serif;
}

/* Legal status */
.legal-content {
  width: 100%;
}

.legal-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.legal-list li {
  padding: 0.8rem 0;
  line-height: 1.6;
  font-size: 1.05rem;
  color: #222;
  position: relative;
  padding-left: 2rem;
  font-family: serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.legal-list li:last-child {
  border-bottom: none;
}

.legal-list li:before {
  content: "•";
  color: #e10600;
  position: absolute;
  left: 0.5rem;
  font-size: 1.5rem;
  line-height: 1;
  opacity: 0.8;
}

/* Official response */
.official-content {
  width: 100%;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2.5rem;
  border: 1px solid rgba(225, 6, 0, 0.2);
  position: relative;
}

.official-label {
  display: inline-block;
  background: #e10600;
  color: white;
  padding: 0.4rem 1.2rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  font-family: sans-serif;
}

.official-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.official-list li {
  padding: 0.7rem 0;
  line-height: 1.6;
  font-size: 1.05rem;
  color: #333;
  position: relative;
  padding-left: 1.8rem;
  font-family: serif;
}

.official-list li:before {
  content: "▸";
  color: #e10600;
  position: absolute;
  left: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.official-note {
  padding-top: 1rem;
  border-top: 1px solid rgba(225, 6, 0, 0.2);
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.official-note p {
  margin: 0;
  font-family: serif;
}

/* Conclusion */
.conclusion-content {
  width: 100%;
}

.conclusion-content p {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #222;
  margin: 0 0 2rem 0;
  font-family: serif;
}

.conclusion-content p:last-child {
  margin-bottom: 0;
}

/* Publication note */
.publication-note {
  max-width: 680px;
  margin: 8vh auto 0;
  padding: 0 6vw;
  text-align: center;
}

.note-text {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
  margin: 0;
  font-family: serif;
}

/* Responsive design */
@media (max-width: 768px) {
  .accountability-section {
    padding: 4vh 0 8vh;
  }
  
  .flow-container {
    padding: 0 5vw;
  }
  
  .flow-item {
    min-height: 60vh;
    padding: 2rem 0;
  }
  
  .intro-text {
    font-size: 1.15rem;
  }
  
  blockquote p {
    font-size: 1.1rem;
    padding-left: 1.5rem;
  }
  
  blockquote p:before {
    font-size: 2rem;
  }
  
  blockquote cite {
    padding-left: 1.5rem;
    font-size: 0.9rem;
  }
  
  .legal-list li,
  .official-list li {
    font-size: 1rem;
    padding-left: 1.5rem;
  }
  
  .official-content {
    padding: 1.5rem;
  }
  
  .conclusion-content p {
    font-size: 1.05rem;
  }
  
  .flow-item.faded {
    opacity: 0.2;
  }
}

/* Print styles */
@media print {
  .accountability-section {
    break-inside: avoid;
    padding: 2cm 0;
  }
  
  .flow-item {
    min-height: auto;
    padding: 1.5cm 0;
    break-inside: avoid;
  }
  
  .official-content {
    border: 1px solid #ccc;
    background: #f5f5f5;
  }
}
</style>