export const seedPredictions = [
  {
    id: "p1",
    type: "free",
    match: "Arsenal vs Chelsea",
    league: "Premier League",
    kickoff: "17:30",
    prediction: "Arsenal to Win",
    odds: "1.55",
    analysis:
      "Arsenal unbeaten at home in 11; Chelsea missing two starting centre-backs.",
    result: "PENDING",
    published: true,
  },
  {
    id: "p2",
    type: "2odds",
    match: "Arsenal vs Chelsea",
    league: "Premier League",
    kickoff: "17:30",
    prediction: "Over 2.5 Goals",
    odds: "1.42",
    analysis:
      "Both sides have gone over 2.5 in 7 of their last 8 combined meetings.",
    result: "PENDING",
    published: true,
  },
  {
    id: "p3",
    type: "2odds",
    match: "Barcelona vs Sevilla",
    league: "La Liga",
    kickoff: "20:00",
    prediction: "Barcelona -1 Handicap",
    odds: "1.68",
    analysis:
      "Sevilla have lost 5 straight away league fixtures without scoring twice.",
    result: "PENDING",
    published: true,
  },
  {
    id: "p4",
    type: "5odds",
    match: "Bayern vs Dortmund",
    league: "Bundesliga",
    kickoff: "19:30",
    prediction: "Bayern to Win & BTTS",
    odds: "2.10",
    analysis:
      "Der Klassiker has produced goals at both ends in 6 of the last 7 meetings.",
    result: "PENDING",
    published: true,
  },
  {
    id: "p5",
    type: "5odds",
    match: "Inter vs Roma",
    league: "Serie A",
    kickoff: "19:45",
    prediction: "Inter Win to Nil",
    odds: "2.35",
    analysis:
      "Roma have failed to score in 4 of their last 5 away from home.",
    result: "PENDING",
    published: true,
  },
  {
    id: "p6",
    type: "5odds",
    match: "PSG vs Marseille",
    league: "Ligue 1",
    kickoff: "20:45",
    prediction: "PSG -1.5 Handicap",
    odds: "2.05",
    analysis:
      "Le Classique has been a rout in Paris in 3 of the last 4 editions.",
    result: "PENDING",
    published: true,
  },
];

export const seedResults = [
  {
    id: "r1",
    match: "Arsenal vs Chelsea",
    league: "Premier League",
    prediction: "Arsenal to Win",
    result: "WON",
  },
  {
    id: "r2",
    match: "Barcelona vs Sevilla",
    league: "La Liga",
    prediction: "Over 2.5 Goals",
    result: "WON",
  },
  {
    id: "r3",
    match: "Liverpool vs Newcastle",
    league: "Premier League",
    prediction: "BTTS",
    result: "LOST",
  },
  {
    id: "r4",
    match: "Napoli vs Milan",
    league: "Serie A",
    prediction: "Draw",
    result: "VOID",
  },
  {
    id: "r5",
    match: "Man City vs Spurs",
    league: "Premier League",
    prediction: "Over 2.5 Goals",
    result: "WON",
  },
];

export const seedSubscribers = [
  {
    id: "u1",
    name: "Chidi Okafor",
    email: "chidi@example.com",
    status: "active",
    expiry: "2026-09-25",
  },
  {
    id: "u2",
    name: "Amaka Bello",
    email: "amaka@example.com",
    status: "expired",
    expiry: "2026-07-02",
  },
  {
    id: "u3",
    name: "Tunde Alabi",
    email: "tunde@example.com",
    status: "active",
    expiry: "2026-09-10",
  },
];