// LensList MVP application.
// Data is stored in localStorage to simulate a small backend while staying runnable as static files.
const STORAGE_KEYS = {
  photographers: "lenslist_photographers",
  leads: "lenslist_leads"
};

// Shared visual pool used by default data and newly added admin records.
const imagePool = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=900&q=80"
];

const defaultPhotographers = [
  {
    id: "aarav-framehouse",
    name: "Aarav Framehouse",
    location: "Mumbai",
    minPrice: 55000,
    maxPrice: 145000,
    rating: 4.9,
    specializations: ["Wedding", "Corporate"],
    description: "A compact camera team known for candid wedding films, clean event coverage, and polished next-day teasers.",
    images: [imagePool[0], imagePool[1], imagePool[4], imagePool[10]],
    packages: [
      { name: "Essential", price: 55000, detail: "1 photographer, 6 hours, edited gallery" },
      { name: "Signature", price: 95000, detail: "Photo and video team, 10 hours, teaser film" },
      { name: "Premium", price: 145000, detail: "Two-day coverage, drone add-on, album" }
    ]
  },
  {
    id: "meera-visual-co",
    name: "Meera Visual Co.",
    location: "Delhi",
    minPrice: 40000,
    maxPrice: 120000,
    rating: 4.8,
    specializations: ["Wedding", "Birthday"],
    description: "Warm documentary-style photography for intimate celebrations, family events, and pre-wedding stories.",
    images: [imagePool[1], imagePool[2], imagePool[0], imagePool[9]],
    packages: [
      { name: "Family", price: 40000, detail: "Event stills, 250 edited images" },
      { name: "Celebration", price: 78000, detail: "Two photographers, short reel, gallery" },
      { name: "Wedding Day", price: 120000, detail: "Full-day photo team and album" }
    ]
  },
  {
    id: "kabir-lensworks",
    name: "Kabir Lensworks",
    location: "Bengaluru",
    minPrice: 30000,
    maxPrice: 90000,
    rating: 4.7,
    specializations: ["Corporate", "Product shoot"],
    description: "Sharp brand, founder, workplace, and product photography for startups, D2C brands, and conferences.",
    images: [imagePool[6], imagePool[11], imagePool[5], imagePool[7]],
    packages: [
      { name: "Founder", price: 30000, detail: "Portraits and team headshots" },
      { name: "Launch", price: 58000, detail: "Product set, lifestyle shots, social crops" },
      { name: "Conference", price: 90000, detail: "Full-day event documentation" }
    ]
  },
  {
    id: "riya-still-stories",
    name: "Riya Still Stories",
    location: "Pune",
    minPrice: 22000,
    maxPrice: 76000,
    rating: 4.6,
    specializations: ["Birthday", "Wedding"],
    description: "Natural-light portraits and tasteful event coverage for birthdays, roka ceremonies, and home gatherings.",
    images: [imagePool[9], imagePool[2], imagePool[10], imagePool[3]],
    packages: [
      { name: "Mini Event", price: 22000, detail: "3 hours, 120 edited photos" },
      { name: "Half Day", price: 46000, detail: "6 hours, highlight reel" },
      { name: "Full Story", price: 76000, detail: "Photo team, album-ready edits" }
    ]
  },
  {
    id: "devika-product-lab",
    name: "Devika Product Lab",
    location: "Chennai",
    minPrice: 26000,
    maxPrice: 110000,
    rating: 4.9,
    specializations: ["Product shoot", "Corporate"],
    description: "Studio-led product images for fashion, food, jewelry, and catalog launches with quick retouching cycles.",
    images: [imagePool[11], imagePool[6], imagePool[8], imagePool[5]],
    packages: [
      { name: "Catalog", price: 26000, detail: "Up to 20 SKUs on white" },
      { name: "Campaign", price: 70000, detail: "Styled product and lifestyle images" },
      { name: "Brand Day", price: 110000, detail: "Models, studio lighting, art direction" }
    ]
  },
  {
    id: "ishaan-collective",
    name: "Ishaan Collective",
    location: "Hyderabad",
    minPrice: 50000,
    maxPrice: 160000,
    rating: 4.8,
    specializations: ["Wedding", "Corporate"],
    description: "A scalable camera crew for weddings, sangeets, conferences, and large-format live events.",
    images: [imagePool[4], imagePool[10], imagePool[0], imagePool[5]],
    packages: [
      { name: "Core", price: 50000, detail: "Single camera photo coverage" },
      { name: "Crew", price: 105000, detail: "Photo, video, assistant, same-day edit" },
      { name: "Broadcast", price: 160000, detail: "Multi-camera team and live highlights" }
    ]
  },
  {
    id: "ananya-lightroom",
    name: "Ananya Lightroom",
    location: "Kolkata",
    minPrice: 18000,
    maxPrice: 68000,
    rating: 4.7,
    specializations: ["Birthday", "Product shoot"],
    description: "Bright, editorial-style images for small events, boutique brands, food menus, and creator shoots.",
    images: [imagePool[8], imagePool[7], imagePool[9], imagePool[11]],
    packages: [
      { name: "Starter", price: 18000, detail: "2 hours, 80 edited images" },
      { name: "Social Pack", price: 42000, detail: "Short-form reel and image crops" },
      { name: "Editorial", price: 68000, detail: "Styled set and detailed retouching" }
    ]
  },
  {
    id: "naman-wedfilms",
    name: "Naman Wedfilms",
    location: "Jaipur",
    minPrice: 65000,
    maxPrice: 190000,
    rating: 5.0,
    specializations: ["Wedding"],
    description: "Destination wedding photography with cinematic films, heritage venue experience, and album production.",
    images: [imagePool[3], imagePool[0], imagePool[1], imagePool[10]],
    packages: [
      { name: "Palace Day", price: 65000, detail: "One-day photography coverage" },
      { name: "Cinematic", price: 125000, detail: "Photo and film team, teaser cut" },
      { name: "Destination", price: 190000, detail: "Three-day crew and premium album" }
    ]
  },
  {
    id: "sana-brand-camera",
    name: "Sana Brand Camera",
    location: "Ahmedabad",
    minPrice: 24000,
    maxPrice: 85000,
    rating: 4.6,
    specializations: ["Corporate", "Product shoot"],
    description: "Efficient commercial photography for manufacturers, founders, retail teams, and brand launches.",
    images: [imagePool[5], imagePool[6], imagePool[11], imagePool[8]],
    packages: [
      { name: "Headshots", price: 24000, detail: "Up to 12 team portraits" },
      { name: "Office Story", price: 52000, detail: "Workplace, team, and detail shots" },
      { name: "Launch Kit", price: 85000, detail: "Product, people, and press images" }
    ]
  },
  {
    id: "vivaan-memoryworks",
    name: "Vivaan Memoryworks",
    location: "Goa",
    minPrice: 38000,
    maxPrice: 135000,
    rating: 4.8,
    specializations: ["Wedding", "Birthday", "Corporate"],
    description: "Beach weddings, private parties, and offsite coverage with relaxed portraits and vibrant event edits.",
    images: [imagePool[7], imagePool[4], imagePool[2], imagePool[1]],
    packages: [
      { name: "Party", price: 38000, detail: "4 hours, edited gallery" },
      { name: "Offsite", price: 76000, detail: "Team events and short recap video" },
      { name: "Beach Wedding", price: 135000, detail: "Full-day photo and film coverage" }
    ]
  }
];

let state = {
  photographers: [],
  filters: {
    location: "",
    budget: "",
    eventType: ""
  }
};

const formatter = new Intl.NumberFormat("en-IN");

document.addEventListener("DOMContentLoaded", () => {
  state.photographers = loadPhotographers();
  initializeDateInput();
  bindNavigation();
  bindForms();
  populateCityFilters();
  renderFeatured();
  renderListings();
  renderLeads();
  renderAdminSummary();
  route();
});

window.addEventListener("hashchange", route);

function loadPhotographers() {
  const saved = localStorage.getItem(STORAGE_KEYS.photographers);
  if (!saved) {
    localStorage.setItem(STORAGE_KEYS.photographers, JSON.stringify(defaultPhotographers));
    return defaultPhotographers;
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(STORAGE_KEYS.photographers, JSON.stringify(defaultPhotographers));
    return defaultPhotographers;
  }
}

function savePhotographers() {
  localStorage.setItem(STORAGE_KEYS.photographers, JSON.stringify(state.photographers));
}

function bindNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
}

// Form handlers keep UI state in sync with hash routes and localStorage-backed data.
function bindForms() {
  document.getElementById("home-search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.filters.location = document.getElementById("home-location").value;
    state.filters.budget = document.getElementById("home-budget").value;
    state.filters.eventType = document.getElementById("home-event-type").value;
    syncFilterControls();
    location.hash = "#discover";
    renderListings();
  });

  document.getElementById("listing-filter-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.filters.location = document.getElementById("filter-location").value;
    state.filters.budget = document.getElementById("filter-budget").value;
    state.filters.eventType = document.getElementById("filter-event-type").value;
    syncHomeControls();
    renderListings();
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    state.filters = { location: "", budget: "", eventType: "" };
    syncFilterControls();
    syncHomeControls();
    renderListings();
  });

  document.getElementById("lead-form").addEventListener("submit", handleLeadSubmit);
  document.getElementById("admin-form").addEventListener("submit", handleAdminSubmit);
}

function initializeDateInput() {
  const dateInput = document.getElementById("lead-date");
  dateInput.min = new Date().toISOString().split("T")[0];
}

function route() {
  const rawHash = location.hash || "#home";
  const [viewName, profileId] = rawHash.replace("#", "").split("/");
  const viewId = viewName === "profile" ? "profile" : viewName;

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${viewId}`);
  });

  if (viewName === "profile") {
    renderProfile(profileId);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function populateCityFilters() {
  const cities = [...new Set(state.photographers.map((item) => item.location))].sort();
  const selects = [document.getElementById("home-location"), document.getElementById("filter-location")];

  selects.forEach((select) => {
    const currentValue = select.value;
    select.querySelectorAll("option:not(:first-child)").forEach((option) => option.remove());

    cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      select.appendChild(option);
    });

    select.value = currentValue;
  });
}

function renderFeatured() {
  const featured = state.photographers.slice(0, 3);
  document.getElementById("featured-grid").innerHTML = featured.map(createPhotographerCard).join("");
}

function renderListings() {
  const matches = getFilteredPhotographers();
  const grid = document.getElementById("listing-grid");
  const emptyState = document.getElementById("empty-state");
  const resultCount = document.getElementById("result-count");

  grid.innerHTML = matches.map(createPhotographerCard).join("");
  resultCount.textContent = `${matches.length} photographer${matches.length === 1 ? "" : "s"} found`;
  grid.classList.toggle("hidden", matches.length === 0);
  emptyState.classList.toggle("hidden", matches.length > 0);
}

function getFilteredPhotographers() {
  const { location: city, budget, eventType } = state.filters;
  const [minBudget, maxBudget] = budget ? budget.split("-").map(Number) : [0, Number.MAX_SAFE_INTEGER];

  return state.photographers.filter((photographer) => {
    const matchesCity = !city || photographer.location === city;
    const matchesEvent = !eventType || photographer.specializations.some((item) => item.toLowerCase() === eventType);
    const overlapsBudget = !budget || (photographer.minPrice <= maxBudget && photographer.maxPrice >= minBudget);
    return matchesCity && matchesEvent && overlapsBudget;
  });
}

function createPhotographerCard(photographer) {
  const [primary, secondary, tertiary] = photographer.images;

  return `
    <article class="photographer-card">
      <a href="#profile/${photographer.id}" aria-label="View ${photographer.name}">
        <div class="preview-strip">
          <img src="${primary}" alt="${photographer.name} portfolio sample" loading="lazy">
          <div class="preview-stack">
            <img src="${secondary}" alt="${photographer.name} portfolio sample" loading="lazy">
            <img src="${tertiary}" alt="${photographer.name} portfolio sample" loading="lazy">
          </div>
        </div>
        <div class="card-body">
          <div class="card-top">
            <div class="card-title">
              <h3>${photographer.name}</h3>
              <p>${photographer.location}</p>
            </div>
            <span class="rating">${photographer.rating.toFixed(1)}</span>
          </div>
          <div class="chips">${photographer.specializations.slice(0, 3).map((item) => `<span class="chip">${item}</span>`).join("")}</div>
          <div class="price-row">
            <span class="price">${formatPriceRange(photographer)}</span>
            <span class="link-button">View profile</span>
          </div>
        </div>
      </a>
    </article>
  `;
}

function renderProfile(id) {
  const photographer = state.photographers.find((item) => item.id === id) || state.photographers[0];
  const profile = document.getElementById("profile");

  profile.innerHTML = `
    <div class="page-shell">
      <div class="profile-hero">
        <div class="profile-gallery">
          <img src="${photographer.images[0]}" alt="${photographer.name} portfolio feature">
          <div class="profile-gallery-side">
            ${photographer.images.slice(1, 4).map((image, index) => `
              <img src="${image}" alt="${photographer.name} portfolio image ${index + 2}">
            `).join("")}
          </div>
        </div>

        <div class="profile-details">
          <p class="eyebrow">${photographer.location}</p>
          <h1>${photographer.name}</h1>
          <div class="profile-facts">
            <span>${photographer.rating.toFixed(1)} rating</span>
            <span>${formatPriceRange(photographer)}</span>
          </div>
          <p class="muted">${photographer.description}</p>
          <div class="chips">${photographer.specializations.map((item) => `<span class="chip">${item}</span>`).join("")}</div>
          <a class="btn btn-primary" href="#lead" data-request="${photographer.name}">Request booking</a>
        </div>
      </div>

      <div class="package-grid">
        ${photographer.packages.map((item) => `
          <article class="package">
            <h3>${item.name}</h3>
            <strong>Rs. ${formatter.format(item.price)}</strong>
            <p>${item.detail}</p>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function handleLeadSubmit(event) {
  event.preventDefault();

  const lead = {
    id: createId(),
    eventType: document.getElementById("lead-event-type").value,
    budget: Number(document.getElementById("lead-budget").value),
    date: document.getElementById("lead-date").value,
    location: document.getElementById("lead-location").value.trim(),
    name: document.getElementById("lead-name").value.trim(),
    phone: document.getElementById("lead-phone").value.trim(),
    createdAt: new Date().toISOString()
  };

  const leads = loadLeads();
  leads.unshift(lead);
  localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leads));

  event.target.reset();
  initializeDateInput();
  document.getElementById("lead-message").textContent = "Booking request saved locally.";
  renderLeads();
}

function loadLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.leads)) || [];
  } catch {
    return [];
  }
}

function renderLeads() {
  const list = document.getElementById("lead-list");
  const leads = loadLeads().slice(0, 3);

  if (leads.length === 0) {
    list.innerHTML = "";
    return;
  }

  list.innerHTML = leads.map((lead) => `
    <article class="lead-item">
      <strong>${lead.eventType} in ${lead.location}</strong>
      <span>Rs. ${formatter.format(lead.budget)} on ${formatDate(lead.date)}</span>
    </article>
  `).join("");
}

function handleAdminSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("admin-name").value.trim();
  const locationValue = document.getElementById("admin-location").value.trim();
  const minPrice = Number(document.getElementById("admin-min-price").value);
  const maxPrice = Number(document.getElementById("admin-max-price").value);
  const specializations = document.getElementById("admin-specializations").value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const description = document.getElementById("admin-description").value.trim();

  if (minPrice > maxPrice) {
    document.getElementById("admin-message").textContent = "Min price should be lower than max price.";
    return;
  }

  const offset = state.photographers.length % imagePool.length;
  const photographer = {
    id: slugify(`${name}-${Date.now()}`),
    name,
    location: locationValue,
    minPrice,
    maxPrice,
    rating: 4.5,
    specializations,
    description,
    images: [
      imagePool[offset],
      imagePool[(offset + 1) % imagePool.length],
      imagePool[(offset + 2) % imagePool.length],
      imagePool[(offset + 3) % imagePool.length]
    ],
    packages: [
      { name: "Starter", price: minPrice, detail: "Entry package for focused coverage" },
      { name: "Standard", price: Math.round((minPrice + maxPrice) / 2), detail: "Balanced package for most event needs" },
      { name: "Complete", price: maxPrice, detail: "Expanded coverage with premium deliverables" }
    ]
  };

  state.photographers.unshift(photographer);
  savePhotographers();
  populateCityFilters();
  renderFeatured();
  renderListings();
  renderAdminSummary();

  event.target.reset();
  document.getElementById("admin-message").textContent = `${name} added to LensList.`;
}

function renderAdminSummary() {
  document.getElementById("photographer-total").textContent = state.photographers.length;
}

function syncFilterControls() {
  document.getElementById("filter-location").value = state.filters.location;
  document.getElementById("filter-budget").value = state.filters.budget;
  document.getElementById("filter-event-type").value = state.filters.eventType;
}

function syncHomeControls() {
  document.getElementById("home-location").value = state.filters.location;
  document.getElementById("home-budget").value = state.filters.budget;
  document.getElementById("home-event-type").value = state.filters.eventType;
}

function formatPriceRange(photographer) {
  return `Rs. ${formatter.format(photographer.minPrice)} - ${formatter.format(photographer.maxPrice)}`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
