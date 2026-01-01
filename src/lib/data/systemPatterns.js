// src/lib/data/systemPatterns.js
// Systemic Behaviour of Nigeria Army — 1999–2025 (from Sheet3 + Sheet4)

export const systemPatterns = [

  {
  
    id: "pattern1",
    title: "Reprisal & Collective Punishment",
    finding: "When soldiers die → civilians are mass-punished.",
    dataPoints: [
      { incident: "Odi (1999)", deaths: 900 },
      { incident: "Benue – Zaki-Biam (2001)", deaths: 1000 },
      { incident: "Baga (2013)", deaths: 185 },
      { incident: "Amangwu (2022)", deaths: 10 }
    ],
    implication:
      "Reprisal doctrine alienates communities → increases extremist recruitment → worsens long-term national security."
  },

  {
    id: "pattern2",
    title: "Three Phases of Military Violence",
    finding: "Evolution of doctrine across eras.",
    dataPoints: [
      { incident: "Phase 1 – Niger Delta (1999-09)", deaths: 1900 }, // Odi + Benue estimated
      { incident: "Phase 2 – Boko Haram (2009-2015)", deaths: 1122 }, // custody + BH zone executions
      { incident: "Phase 3 – SE raids (2016-2025)", deaths: 200 } // Nkpor + Ogbaru + Amangwu + Lamurde
    ],
    implication: "Territorial security priorities change, but behaviour logic stays constant → reprisal remains core tactical response."
  },

  {
    id: "pattern3",
    title: "Modality Shift: Massacre → Custody Death → Raids",
    finding:
      "Large-scale killings transitioned into detention-based deaths, then surgical raids.",
    dataPoints: [
      { incident: "Massacre Era (1999-2001)", deaths: 1900 },
      { incident: "Custody Death Era (2013-14)", deaths: 400 + 47 + 35 + 640 }, // 1122
      { incident: "Raid Era (2021-25)", deaths: 9 + 10 + 50 + 40 } // 109
    ],
    strategicNote:
      "Shift suggests the Army adapted to international scrutiny and OSINT—imagery morality—reducing 'visible' massacres."
  },

  { id: "pattern4",
    title: "Target Profile Evolution",
    finding: "Victims change — logic stays.",
    dataPoints: [
      { incident: "Ijaw/Tiv Collective", deaths: 1100 },
      { incident: "BH Screening Youths", deaths: 35 + 640 + 47 }, // 722
      { incident: "IPOB Suspects", deaths: 40 + 50 + 10 + 9 } // 109
    ],
    implication: "Profiling replaces blanket ethnic punishment. - Use of broad suspicion instead of individual guilt → systematic human-rights violation."
  },

   {
    id: "pattern5",
    title: "Official Narrative Playbook",
    finding: "Every killing = 'terrorist neutralization' — even unarmed victims.",
    dataPoints: [
      { incident: "Gov claim vs HRW – Baga", deaths: 185 },
      { incident: "Gov claim 7 dead – Zaria IMN", deaths: 33 },
      { incident: "Army denial – Lamurde 2025", deaths: 9 }
    ],
    implication:
      "Narrative strategy prevents accountability → enables repeated cycles across decades."
  }
];
