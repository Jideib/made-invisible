// src/lib/data/factCheckCases.js
// Fact-checking section — 5 strongest "claim vs evidence" cases only

export const factCheckCases = [
  {
    id: "giwa-2014",
    title: "Giwa Barracks – Maiduguri (2014)",
    official: [
      "Nigerian Army: detainees were 'terror suspects' — no extrajudicial killings",
      "Claim: all force used was 'within military rules of engagement'"
    ],
    evidence: [
      "Amnesty: 640+ recaptured detainees executed — video verified",
      "Witnesses: Throats slit — bodies dumped in mass piles"
    ],
    before: "/images/facts/giwa-before.jpg",
    after: "/images/facts/giwa-after.jpg",
    links: [
      "https://www.amnesty.org/en/latest/news/2014/08/nigeria-mass-killings/",
      "https://www.bbc.com/news/world-africa-26829457"
    ]
  },

  {
    id: "zaria-imn-2015",
    title: "Zaria IMN – Kaduna (2015)",
    official: [
      "Federal Government: Only 7 protesters died while resisting arrest"
    ],
    evidence: [
      "Judicial inquiry: 300+ unarmed IMN members killed, many dumped in mass graves",
      "Satellite analysis of trench burials"
    ],
    before: "/images/facts/zaria-before.png",
    after: "/images/facts/zaria-after.png",
    links: [
      "https://www.amnesty.org/en/documents/afr44/2749/2015/en/",
      "https://www.bbc.com/news/world-africa-35339109"
    ]
  },

  {
    id: "bama-2013",
    title: "Bama – Borno (2013)",
    official: [
      "Army: 'Terrorist hideout destroyed – zero civilian loss'",
      "Claim: operations targeted only militants"
    ],
    evidence: [
      "Satellite: scorch pattern inside residential grid",
      "Residents: dozens executed after detention screening"
    ],
    before: "/images/facts/bama-before.png",
    after: "/images/facts/bama-after.png"
  },

  {
    id: "ihioma-2022",
    title: "Ihioma – Imo (2022)",
    official: [
      "Army: 'Firefight with IPOB members — no civilian targeting'"
    ],
    evidence: [
      "Residents: 4 people killed as soldiers opened fire indiscriminately",
      "Spatio-temporal OSINT confirms sporadic firing zone"
    ],
    before: "/images/facts/ihioma-before.jpg",
    after: "/images/facts/ihioma-after.jpg"
  },

  {
    id: "lamurde-2025",
    title: "Lamurde – Adamawa (2025)",
    official: [
      "Army: 'Casualties were caused by untrained militias mishandling weapons'",
      "Claim: Army did not fire on protesters"
    ],
    evidence: [
      "Amnesty AI: unarmed women shot during protest",
      "Video surface shows uniform firing pattern"
    ],
    before: "/images/facts/lamurde-before.jpg",
    after: "/images/facts/lamurde-after.jpg"
  }
];
