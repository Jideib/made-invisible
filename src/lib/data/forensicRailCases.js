// src/lib/data/forensicRailCases.js
// Unified Forensic Rail — satellite + fact-check merged with casualties data

export const forensicRailCases = [
  // 1. ODI — archetype of reprisal
  {
    id: "odi-1999",
    title: "Odi — Bayelsa (1999)",
    location: "Odi, Bayelsa State",
    date: "November 20, 1999",
    before: "/images/forensic/odi-before.jpg",
    after: "/images/forensic/odi-after.jpg",
    casualties: 900,
    
    officialNarrative: [
      "Military operation against militants following killing of police officers",
      "Minimal civilian impact claimed",
      "Described as 'lawful engagement'"
    ],
    
    observedEvidence: [
      "Satellite imagery shows 250+ structures destroyed",
      "Human Rights Watch documents 900+ civilian deaths",
      "Mass grave identified 2km from village",
      "Journalists documented near-total destruction"
    ],
    
    sources: [
      "Satellite imagery (Maxar)",
      "Human Rights Watch Report",
      "Amnesty International investigation",
      "Local journalist accounts"
    ],
    
    analysis: "Pattern of collective punishment and reprisal"
  },

  // 2. BENUE CLUSTER — planned mass execution
  {
    id: "zakibiam-2001",
    title: "Benue Cluster — Zaki-Biam / Vaase (2001)",
    location: "Zaki-Biam, Vaase, Gbeji, Benue State",
    date: "October 2001",
    before: "/images/forensic/zakibiam-before.jpg",
    after: "/images/forensic/zakibiam-after.jpg",
    casualties: 200,
    
    officialNarrative: [
      "Lawful operation following killing of 19 soldiers",
      "Targeted 'militants' and 'troublemakers'",
      "Denied deliberate civilian targeting"
    ],
    
    observedEvidence: [
      "Villagers assembled for 'peace meetings' then executed",
      "Over 200 unarmed civilians killed",
      "Homes systematically burned across multiple communities",
      "Witness testimony of planned executions"
    ],
    
    sources: [
      "Human Rights Watch report",
      "Witness testimonies",
      "Medical records from local hospitals",
      "Photographic evidence"
    ],
    
    analysis: "Pre-planned mass execution under guise of peace meetings"
  },

  // 3. BAGA — satellite era rupture
  {
    id: "baga-2013",
    title: "Baga — Borno (2013)",
    location: "Baga, Kukawa LGA, Borno State",
    date: "April 16-17, 2013",
    before: "/images/forensic/baga-before.png",
    after: "/images/forensic/baga-after.png",
    
    casualties: 185,
    
    officialNarrative: [
      "Operation against Boko Haram militants",
      "Claimed only militants targeted",
      "Minimal civilian damage asserted"
    ],
    
    observedEvidence: [
      "Satellite imagery shows 2,300+ buildings destroyed",
      "Scorch patterns inside residential grid, not combat zones",
      "Fishermen and traders among the dead",
      "Local accounts contradict official timeline"
    ],
    
    sources: [
      "Satellite imagery (DigitalGlobe)",
      "Amnesty International report",
      "Local fisherman testimonies",
      "Medical personnel accounts"
    ],
    
    analysis: "Disproportionate response using satellite-detectable destruction"
  },

  // 4. GIWA — detention as killing site
  {
    id: "giwa-2014",
    title: "Giwa Barracks — Maiduguri (2014)",
    location: "Giwa Barracks, Maiduguri, Borno State",
    date: "March 14, 2014",
    before: "/images/facts/giwa-before.jpg",
    after: "/images/facts/giwa-after.jpg",
    casualties: 640,
    
    officialNarrative: [
      "Detainees were 'hardcore terrorists'",
      "Denied extrajudicial executions",
      "Claimed detainees died in crossfire"
    ],
    
    observedEvidence: [
      "Amnesty documented 640+ recaptured detainees executed",
      "Video evidence verified showing summary executions",
      "Bodies dumped in mass piles visible in satellite imagery",
      "Survivor testimonies of systematic killings"
    ],
    
    sources: [
      "Amnesty International 'Stars on their Shoulders' report",
      "Video evidence verified by forensic experts",
      "Satellite imagery of body disposal",
      "Survivor testimonies"
    ],
    
    analysis: "Systematic execution of detainees under custody"
  },

  // 5. BAMA — screening → execution
  {
    id: "bama-2014",
    title: "Bama — Borno (2014)",
    location: "Bama, Borno State",
    date: "March 2014",
    before: "/images/forensic/bama-before.png",
    after: "/images/forensic/bama-after.png",
    
    casualties: {
      official: "Boko Haram suspects",
      evidence: "Hundreds of men executed after screening",
      source: "Human Rights Watch investigation"
    },
    
    officialNarrative: [
      "Counter-terror screening operation",
      "No civilian casualties reported",
      "Lawful detention of suspects claimed"
    ],
    
    observedEvidence: [
      "Men rounded up during 'screening' never returned",
      "Residents executed near barracks perimeter",
      "Burn patterns visible in satellite imagery",
      "Mass graves discovered by locals"
    ],
    
    sources: [
      "Human Rights Watch investigation",
      "Satellite imagery analysis",
      "Local resident testimonies",
      "Grave site documentation"
    ],
    
    analysis: "Screening operations used as cover for mass executions"
  },

  // 6. ZARIA — denial vs mass graves
  {
    id: "zaria-imn-2015",
    title: "Zaria IMN — Kaduna (2015)",
    location: "Zaria, Kaduna State",
    date: "December 12-14, 2015",
    before: "/images/facts/zaria-before.png",
    after: "/images/facts/zaria-after.png",
    
    casualties:300,
    
    officialNarrative: [
      "Protesters resisted arrest",
      "Only 7 fatalities claimed",
      "Operation described as 'law enforcement'"
    ],
    
    observedEvidence: [
      "Judicial inquiry documented 300+ killed",
      "Mass graves discovered and verified",
      "Satellite analysis shows trench burials",
      "Hospital records show overwhelming casualties"
    ],
    
    sources: [
      "Kaduna State Judicial Commission of Inquiry",
      "Satellite imagery of burial sites",
      "Hospital mortuary records",
      "IMN documentation"
    ],
    
    analysis: "Systematic denial despite overwhelming evidence and judicial findings"
  },

  // 7. IZOMBE — reprisal invasion
  {
    id: "izombe-2021",
    title: "Izombe — Imo (2021)",
    location: "Izombe, Oguta LGA, Imo State",
    date: "May 2021",
    before: "/images/forensic/izombe-before.jpg",
    after: "/images/forensic/izombe-after.jpg",
    
    casualties: 10,
    
    officialNarrative: [
      "Lawful security response",
      "Targeted militants only",
      "Minimal property damage claimed"
    ],
    
    observedEvidence: [
      "50+ houses systematically burned",
      "Residents killed during home invasions",
      "Clear scorch grid visible in satellite imagery",
      "Pattern matches previous reprisal operations"
    ],
    
    sources: [
      "Satellite imagery (Planet Labs)",
      "Local resident testimonies",
      "Property damage assessments",
      "Human rights monitors"
    ],
    
    analysis: "Classic reprisal operation pattern repeating 1999 Odi model"
  },

  // 8. AMANGWU — search & rescue denial
  {
    id: "amangwu-2022",
    title: "Amangwu — Ohafia (2022)",
    location: "Amangwu, Ohafia LGA, Abia State",
    date: "June 2022",
    before: "/images/forensic/amangwu-before.jpg",
    after: "/images/forensic/amangwu-after.jpg",
    
    casualties: {
      official: "None reported",
      evidence: "Civilians killed, homes destroyed",
      source: "Satellite imagery analysis"
    },
    
    officialNarrative: [
      "Search-and-rescue mission for missing officer",
      "No invasion occurred",
      "Denied property destruction"
    ],
    
    observedEvidence: [
      "Homes razed across community",
      "Civilians killed during operation",
      "Satellite scorch patterns contradict denial",
      "Residents displaced without compensation"
    ],
    
    sources: [
      "Satellite imagery (Sentinel-2)",
      "Local community reports",
      "Human Rights Watch documentation",
      "Displaced persons testimonies"
    ],
    
    analysis: "Modern denial playbook despite satellite evidence"
  },

  // 9. LAMURDE — modern deniability playbook
  {
    id: "lamurde-2025",
    title: "Lamurde — Adamawa (2025)",
    location: "Lamurde, Adamawa State",
    date: "January 2025",
    before: "/images/facts/lamurde-before.jpg",
    after: "/images/facts/lamurde-after.jpg",
    
    casualties: 9,
    
    officialNarrative: [
      "Casualties caused by untrained militias",
      "Army not involved in shooting",
      "Protest turned violent"
    ],
    
    observedEvidence: [
      "Amnesty: unarmed women shot during protest",
      "Video shows uniform firing pattern contradicting militia claim",
      "Eyewitness accounts point to military involvement",
      "Medical reports show military-grade wounds"
    ],
    
    sources: [
      "Amnesty International report",
      "Video evidence analysis",
      "Eyewitness testimonies",
      "Medical examination reports"
    ],
    
    analysis: "Shifting blame to non-state actors while evidence points to military"
  }
];