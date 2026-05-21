// --- Updated Travel Timeline Data ---
const trips = [
  {
    date: "5/22–5/25",
    location: "OFF DUTY",
    blurb:
      "Elana has temporarily logged off. If found answering emails, please report immediately.",
  },
  // Bonus honeymoon entry
  {
    date: "5/22–6/3",
    location: "Jas & Ben Honeymoon",
    blurb:
      "Somewhere romantic while the rest of us are answering emails and paying bills like peasants.",
  },
  {
    date: "5/26–5/27",
    location: "WFH",
    blurb:
      "Working from home: professionally multitasking between Slack notifications and snacks.",
  },
  {
    date: "5/28–6/1",
    location: "Las Vegas, NV",
    blurb:
      "The city where sleep is optional and every decision starts with 'well... one more drink.'",
  },
  {
    date: "6/1–6/3",
    location: "Nashville, TN",
    blurb:
      "Cowboy boots, hot chicken, and at least one person crying in a pedal tavern.",
  },
  {
    date: "6/3–6/4",
    location: "DC / Maryland Area",
    blurb:
      "Politics, traffic circles, and people aggressively networking over $19 salads.",
  },
  {
    date: "6/4–6/6",
    location: "Home",
    blurb:
      "A rare and majestic sighting: Elana briefly returning to her natural habitat.",
  },
  {
    date: "6/7–6/10",
    location: "Raleigh, NC",
    blurb:
      "Sweet tea, startup bros, and enough pollen to legally qualify as weather.",
  },
  {
    date: "6/10–6/12",
    location: "Virginia / DC Area",
    blurb:
      "Somewhere between government buildings and an overpriced airport cocktail.",
  },
  {
    date: "6/16–6/18",
    location: "NJ / NY Area",
    blurb:
      "Bagels, attitude, and at least three people saying 'lemme tell you something.'",
  },
  {
    date: "6/23–6/25",
    location: "NC / SC Area",
    blurb: "Humidity so disrespectful it feels personal.",
  },
  {
    date: "6/28–7/2",
    location: "Atlanta, GA",
    blurb: "Traffic moving at the speed of emotional healing.",
  },
  {
    date: "7/3–7/12",
    location: "VACATION MODE",
    blurb:
      "Officially off work. Unofficially being recruited into Tali’s moving operation and neighborhood side quests like a reluctant supporting character.",
  },
];

const tripList = document.getElementById("trip-list");

trips.forEach((trip) => {
  const li = document.createElement("li");

  li.innerHTML = `
    <strong>${trip.date}:</strong> ${trip.location}
    <br>
    <em>${trip.blurb}</em>
  `;

  // Optional honeymoon styling
  if (trip.location.includes("Honeymoon")) {
    li.classList.add("honeymoon-trip");
  }

  tripList.appendChild(li);
});

// --- Guessing Game Logic ---
const cities = trips.map((t) => t.location); // list of all cities
const correctCity = cities[Math.floor(Math.random() * cities.length)];

const wrongResponses = [
  "Nope. You really think she’d be caught dead THERE right now?",
  "Incorrect. She’s somewhere hotter, weirder, or with better coffee.",
  "Nice try, but Elana’s not about that life today.",
  "Nope. She’s currently ghosting everyone in another timezone.",
];

const rightResponses = [
  "Correct! You’re obviously stalking her… respect.",
  "Ding ding! You win a fake prize and Elana's mild amusement.",
  "You got it! She’s probably sipping cold brew and ignoring Slack notifications there.",
];

const gameContainer = document.getElementById("choices-container");
const responseText = document.getElementById("game-response");

// Helper to get 2 wrong guesses + 1 correct, shuffled
function getCityChoices(correct) {
  const shuffled = cities
    .filter((city) => city !== correct)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  shuffled.push(correct);
  return shuffled.sort(() => 0.5 - Math.random());
}

// Render buttons
const choices = getCityChoices(correctCity);
choices.forEach((city) => {
  const btn = document.createElement("button");
  btn.textContent = city;
  btn.classList.add("choice-btn");
  btn.addEventListener("click", () => {
    if (city === correctCity) {
      const msg =
        rightResponses[Math.floor(Math.random() * rightResponses.length)];
      responseText.textContent = msg;
    } else {
      const msg =
        wrongResponses[Math.floor(Math.random() * wrongResponses.length)];
      responseText.textContent = msg;
    }
    responseText.classList.remove("hidden");
  });
  gameContainer.appendChild(btn);
});

// --- Client Spotting Logic (NEW) ---
const sightings = [
  {
    badge: "🎸 Musical Instruments",
    fact: "Spotted near suspicious levels of guitar riffs.",
  },
  {
    badge: "💎 Jewelry Vendor",
    fact: "Caught admiring sparkle with “professional focus.”",
  },
  {
    badge: "🏀 Sporting Goods",
    fact: "Seen around athletic people… clearly undercover.",
  },
];

let sightingIndex = 0;

function setSighting(i) {
  const badgeEl = document.getElementById("industryBadge");
  const factEl = document.getElementById("industryFact");
  if (!badgeEl || !factEl) return;

  badgeEl.textContent = sightings[i].badge;
  factEl.textContent = sightings[i].fact;
}

const newClientBtn = document.getElementById("newClientBtn");
if (newClientBtn) {
  newClientBtn.addEventListener("click", () => {
    sightingIndex = (sightingIndex + 1) % sightings.length;
    setSighting(sightingIndex);
  });
}

setSighting(sightingIndex);

// --- Chat Bot Logic ---
const chatInput = document.getElementById("user-input");
const chatSubmit = document.getElementById("chat-submit");
const chatResponse = document.getElementById("chat-response");

const elanaSnapsBack = [
  "Oh honey, even Google Maps can’t help you.",
  "Bold of you to assume I have time for this.",
  "I'm in a different time zone and an entirely different mood.",
  "Currently unavailable: mentally, emotionally, spiritually.",
  "Try again later. I'm busy ignoring group texts.",
  "Yes, I *do* travel with emotional baggage. And it's oversized.",
];

chatSubmit.addEventListener("click", () => {
  const input = chatInput.value.trim();
  if (input.length > 0) {
    const sass =
      elanaSnapsBack[Math.floor(Math.random() * elanaSnapsBack.length)];
    chatResponse.textContent = `"${sass}" – Elana, probably.`;
    chatInput.value = "";
  }
});
