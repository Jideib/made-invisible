// src/lib/data/systemPatterns.js
// Updated to match spec visualization types exactly

export const systemPatterns = [
  {
    id: "reprisal",
    title: "Reprisal & Collective Punishment",
    viz: "bar", // Horizontal bars, color-coded severity
    
    finding: "Large-scale violence consistently follows the killing of soldiers, with civilian populations punished far beyond the original provocation.",
    
    question: "What happens after security forces suffer casualties?",
    
    data: [
      { label: "Odi (1999)", value: 900, severity: 10 },
      { label: "Benue Cluster (2001)", value: 560, severity: 8 },
      { label: "Baga (2013)", value: 185, severity: 6 },
      { label: "Izombe (2021)", value: 3, severity: 2 },
      { label: "Amangwu (2022)", value: 10, severity: 3 }
    ],
    
    implication: "Reprisal logic fuels cycles of violence and erodes the legitimacy of counter-insurgency operations."
  },
  
  {
    id: "phases",
    title: "Three Phases of Military Violence",
    viz: "timeline", // Layered horizontal bands showing geographic spread
    
    finding: "As Nigeria's primary security threats shifted, military violence evolved in form — but not in logic.",
    
    question: "How has military violence changed over time?",
    
    phases: [
      {
        label: "Niger Delta Era",
        period: "1999–2009",
        description: "Large-scale reprisals against entire communities",
        geographic: "South-South region",
        intensity: "High",
        bandWidth: 70
      },
      {
        label: "Northeast Conflict",
        period: "2009–2015",
        description: "Detention deaths and mass executions during screening",
        geographic: "North-East region",
        intensity: "Medium-High",
        bandWidth: 60
      },
      {
        label: "Southeast Operations",
        period: "2016–2025",
        description: "Targeted raids, checkpoints, and community invasions",
        geographic: "South-East region",
        intensity: "Medium",
        bandWidth: 50
      }
    ]
  },
  
  {
    id: "modality",
    title: "Modality Shift",
    viz: "stack", // Donut-like segmented circle
    
    finding: "The dominant form of killing shifted from open massacres to deaths in custody, and later to raid-based executions.",
    
    question: "How did the method of killing change?",
    
    stacks: [
      { label: "Open-air Massacres", value: 1300, color: "#e10600" },
      { label: "Custody/Detention Deaths", value: 1800, color: "#ff6b6b" },
      { label: "Raid & Checkpoint Killings", value: 400, color: "#ff8e53" }
    ]
  },
  
  {
    id: "targeting",
    title: "Target Profile Evolution",
    viz: "word", // Centered, size = frequency, color = category
    
    finding: "Victim targeting narrowed over time but remained rooted in broad profiling rather than individual culpability.",
    
    question: "Who was targeted?",
    
    terms: [
      { text: "Ijaw communities", weight: 8, category: "ethnic" },
      { text: "Tiv civilians", weight: 7, category: "ethnic" },
      { text: "Young men", weight: 9, category: "demographic" },
      { text: "Detainees", weight: 8, category: "legal-status" },
      { text: "IPOB suspects", weight: 6, category: "political" },
      { text: "Protesters", weight: 5, category: "activity" }
    ]
  },
  
  {
    id: "denial",
    title: "Official Narrative & Deniability",
    viz: "text", // Phrase matrix: Grid of text snippets
    
    finding: "Civilian deaths are routinely reframed as legitimate engagements with 'terrorists' or 'militants'.",
    
    question: "How are killings officially explained?",
    
    phrases: [
      { text: "neutralised terrorists", category: "tactical", frequency: 18 },
      { text: "armed confrontation", category: "tactical", frequency: 15 },
      { text: "within rules of engagement", category: "legal", frequency: 12 },
      { text: "unknown gunmen", category: "denial", frequency: 22 },
      { text: "no civilian casualties", category: "denial", frequency: 25 },
      { text: "security clearance operation", category: "tactical", frequency: 10 }
    ],
    
    implication: "This narrative framing obscures civilian harm and makes accountability nearly impossible."
  }
];