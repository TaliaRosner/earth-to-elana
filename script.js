// --- Travel Timeline Data ---
const trips = [
  {
    date: "Feb 5–8",
    location: "Dallas, TX",
    blurb: "Where BBQ is a religion and big hair is a competitive sport.",
  },
  {
    date: "Feb 12–15",
    location: "Nashville, TN",
    blurb:
      "Elana came for the hot chicken, stayed for the bachelorette chaos on pedal taverns.",
  },
  {
    date: "Feb 20–22",
    location: "Atlanta, GA",
    blurb:
      "Peach trees. Traffic. And 47 streets named 'Peachtree'. Good luck out there.",
  },
  {
    date: "Mar 5–8",
    location: "Chicago, IL",
    blurb:
      "Windy, deep-dishy, and aggressively proud of its architecture. Pack layers and a carb tolerance.",
  },
  {
    date: "Mar 18–20",
    location: "Houston, TX",
    blurb:
      "Oil, humidity, and rodeo dreams. She’s yeehawing professionally now.",
  },
  {
    date: "Apr 8–10",
    location: "Phoenix, AZ",
    blurb:
      "It's a dry heat. Like standing in a toaster while getting sunburned in 6 seconds.",
  },
  {
    date: "Apr 15–17",
    location: "Boston, MA",
    blurb:
      "Wicked smaht people yelling about Dunkin’. Also, don’t say 'cheers' here. It’s suspicious.",
  },
  {
    date: "May 1–3",
    location: "San Diego, CA",
    blurb:
      "Fish tacos, flip flops, and vibes so chill they’re borderline unconscious.",
  },
];

const tripList = document.getElementById("trip-list");
trips.forEach((trip) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${trip.date}:</strong> ${trip.location}<br><em>${trip.blurb}</em>`;
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
