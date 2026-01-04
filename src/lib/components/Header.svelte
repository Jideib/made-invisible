<script>
  import { onMount, onDestroy } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  export let title = "MADE INVISIBLE: For 25 years, Extra-Judicial Killings by Nigeria's Army Went Unpunished";
  export let author = "Ibraheem Alawode";
  export let date = "January 1, 2026";

  import businessDay from "$lib/assets/BD.svg";
  import twitter from "$lib/assets/icons/X.svg";
  import whatsapp from "$lib/assets/icons/whatsapp.svg";
  import facebook from "$lib/assets/icons/facebook.svg";
  import linkedin from "$lib/assets/icons/Linkedin.svg";

  let collapsed = false;
  let currentUrl = "";
  let encodedTitle = "";
  let headerRef;
  let centerRef;
  let shareRef;

  onMount(() => {
    if (typeof window === "undefined") return;
    
    currentUrl = encodeURIComponent(window.location.href);
    encodedTitle = encodeURIComponent(title);
    
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Create scroll trigger for header collapse
    ScrollTrigger.create({
      trigger: ".lede", // Collapse when lede leaves viewport
      start: "bottom top", // When bottom of lede hits top of viewport
      end: "top top", // Complete collapse when lede is at top
      scrub: 0.5, // Smooth scrubbing
      onUpdate: (self) => {
        collapsed = self.progress > 0.3; // Collapse after 30% progress
        
        // Animate center content
        if (centerRef) {
          gsap.to(centerRef, {
            opacity: 1 - self.progress,
            y: -12 * self.progress,
            duration: 0,
            ease: "none"
          });
        }
        
        // Animate share buttons with delay
        if (shareRef) {
          gsap.to(shareRef, {
            opacity: 1 - (self.progress * 1.2), // Faster fade
            y: -8 * self.progress,
            duration: 0,
            ease: "none",
            delay: 0.1
          });
        }
        
        // Animate header padding
        gsap.to(headerRef, {
          paddingTop: 1.2 - (0.6 * self.progress),
          paddingBottom: 1.2 - (0.6 * self.progress),
          paddingLeft: 1.6 - (0.2 * self.progress),
          paddingRight: 1.6 - (0.2 * self.progress),
          duration: 0,
          ease: "none"
        });
      },
      onEnterBack: () => {
        // Reset when scrolling back up
        collapsed = false;
        if (centerRef) {
          gsap.to(centerRef, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        if (shareRef) {
          gsap.to(shareRef, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            delay: 0.1
          });
        }
      }
    });
    
    // Also collapse on general scroll (fallback)
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 150 && !collapsed) {
        collapsed = true;
      } else if (y <= 50 && collapsed) {
        collapsed = false;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener("scroll", handleScroll);
    };
  });

  function shareOnX() {
    const url = `https://x.com/intent/post?url=${currentUrl}&text=${encodedTitle}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function shareOnWhatsApp() {
    const url = `https://wa.me/?text=${encodedTitle}%20${currentUrl}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function shareOnLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
</script>

<header bind:this={headerRef} class:collapsed>
  <!-- Logo always visible -->
  <img src={businessDay} alt="BusinessDay" class="brand" />

  <!-- Center fades on scroll -->
  <div class="center" bind:this={centerRef}>
    <h1>{title}</h1>
    <p class="meta">By <strong>{author}</strong> — {date}</p>

    <!-- Share buttons UNDER byline -->
    <div class="share" bind:this={shareRef}>
      <button on:click={shareOnX} aria-label="Share on X">
        <img src={twitter} alt="Share on X" />
      </button>
      <button on:click={shareOnWhatsApp} aria-label="Share on WhatsApp">
        <img src={whatsapp} alt="Share on WhatsApp" />
      </button>
      <button on:click={shareOnFacebook} aria-label="Share on Facebook">
        <img src={facebook} alt="Share on Facebook" />
      </button>
      <button on:click={shareOnLinkedIn} aria-label="Share on LinkedIn">
        <img src={linkedin} alt="Share on LinkedIn" />
      </button>
    </div>
  </div>
</header>

<style>
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  background: #111;
  border-bottom: 2px solid #e10600;
  will-change: padding, transform;
}

/* BUSINESSDAY LOGO */
.brand {
  height: 52px;
  width: auto;
  transition: transform 0.4s ease;
}

/* CENTER BLOCK */
.center {
  text-align: center;
  color: #fff;
  will-change: opacity, transform;
}

.center h1 {
  font-size: clamp(2rem, 3vw, 3rem);
  margin: 0;
  line-height: 1.1;
}

.meta {
  font-size: 0.9rem;
  opacity: 0.75;
  margin-top: 0.3rem;
}

/* SHARE ICONS — UNDER BYLINE */
.share {
  margin-top: 0.7rem;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  will-change: opacity, transform;
}

.share button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.share button:hover {
  transform: translateY(-2px);
}

.share img {
  width: 20px;
  height: 20px;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.share button:hover img,
.share button:focus img {
  opacity: 1;
}

/* 🔥 COLLAPSED STATE */
header.collapsed .brand {
  transform: translateX(-10px); /* Logo shifts left when collapsed */
}

/* Add to Header.svelte style section */
.collapsed {
  min-height: 50px !important;
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

/* MOBILE */
@media (max-width: 740px) {
  header {
    grid-template-columns: 1fr;
    gap: 0.6rem;
    padding: 1rem !important;
  }

  .brand {
    height: 46px;
    margin: 0 auto;
  }
  
  .center {
    order: -1;
  }
}
</style>