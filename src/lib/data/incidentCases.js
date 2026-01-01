// src/lib/data/incidentCases.js
export const incidentCases = [
  {
    id: "odi-1999",
    year: 1999,
    location: "Odi, Bayelsa",
    coords: [6.2717, 4.7969],
    victims: "Hundreds to 900+ civilians",
    short: "A full-scale military reprisal flattened an Ijaw community.",
    narrative: "Reprisal for killing of police officers",
    category: "reprisal"
  },

  // --- BENUE CLUSTER (3 dots, one scroll step) ---
  {
    id: "benue-zakibiam-2001",
    year: 2001,
    location: "Zaki-Biam, Benue",
    coords: [7.5167, 9.6167],
    victims: "200+ unarmed Tiv civilians",
    short: "Villagers assembled for a 'peace meeting' were executed.",
    narrative: "Reprisal after soldiers killed",
    cluster: "benue-2001"
  },
  {
    id: "benue-gbeji-2001",
    year: 2001,
    location: "Gbeji, Benue",
    coords: [7.4500, 9.6333],
    victims: "Part of same sweep",
    short: "One of multiple Tiv villages raided",
    narrative: "Same reprisal sweep",
    cluster: "benue-2001"
  },
  {
    id: "benue-vase-2001",
    year: 2001,
    location: "Vase, Benue",
    coords: [7.3333, 9.5667],
    victims: "Part of same sweep",
    short: "Village invaded, homes burned",
    narrative: "Same reprisal operation",
    cluster: "benue-2001"
  },

  {
    id: "jos-2008",
    year: 2008,
    location: "Jos, Plateau",
    coords: [9.8965, 8.8583],
    victims: "47 young unarmed Muslim men",
    short: "Arbitrary killings during unrest",
    narrative: "Internal security response",
    category: "security-force-killing"
  },

  {
    id: "baga-2013",
    year: 2013,
    location: "Baga, Borno",
    coords: [13.1200, 13.8500],
    victims: "185+; 2,000+ homes burned",
    short: "Mass destruction after Boko Haram attack",
    narrative: "Reprisal 'mop-up'",
    category: "reprisal"
  },

  // Detention deaths NOT mapped → removed per rule D

  {
    id: "bama-2013",
    year: 2013,
    location: "Bama, Borno",
    coords: [11.8704, 13.6900],
    victims: "35 men shot after screening",
    short: "Mass shooting of detainees",
    narrative: "Screening execution",
    category: "screening"
  },

  {
    id: "shia-zaria-2014",
    year: 2014,
    location: "Zaria, Kaduna",
    coords: [11.0667, 7.7000],
    victims: "33 killed",
    short: "IMN protesters shot; detainees killed",
    narrative: "Suppression of protest",
    category: "protest"
  },

  {
    id: "nkpor-2016",
    year: 2016,
    location: "Nkpor, Onitsha, Anambra",
    coords: [6.1500, 6.8000],
    victims: "40–150 civilians",
    short: "Pro-Biafran commemoration massacre",
    narrative: "Suppression of IPOB rally",
    category: "protest"
  },

  {
    id: "okporo-2021",
    year: 2021,
    location: "Okporo, Orlu, Imo",
    coords: [5.7860, 7.0288],
    victims: "5 killed",
    short: "Military raid in ESN zone",
    narrative: "Operation vs IPOB/ESN",
    category: "raid"
  },

  {
    id: "izombe-2021",
    year: 2021,
    location: "Izombe, Oguta LGA, Imo",
    coords: [5.6950, 6.9660],
    victims: "3 killed; 50+ houses burned",
    short: "Reprisal after soldiers killed",
    narrative: "Collective punishment",
    category: "reprisal"
  },

  {
    id: "amangu-ohafia-2022",
    year: 2022,
    location: "Amangwu, Ohafia, Abia",
    coords: [5.6125, 7.8200],
    victims: "10 killed",
    short: "Homes razed; missing soldier trigger",
    narrative: "Search & rescue claim",
    category: "reprisal"
  },

  {
    id: "lamurde-2025",
    year: 2025,
    location: "Lamurde, Adamawa",
    coords: [9.2833, 11.4833],
    victims: "9 women protesters",
    short: "The newest entry in a 25-year ledger- Army denies responsibility",
    narrative: "Denial — militia blamed",
    category: "protest"
  }
];
