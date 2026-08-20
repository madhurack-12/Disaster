import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CloudRain,
  Flame,
  Gauge,
  Globe2,
  LocateFixed,
  MapPin,
  Menu,
  Mountain,
  Navigation,
  Search,
  ShieldAlert,
  Siren,
  Sparkles,
  Waves,
  Wind,
  X,
  Zap,
} from "lucide-react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Circle,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";


/* =========================================================
   HAZARD DATA
========================================================= */

const HAZARDS = [
  {
    id: "flood",
    name: "Flood",
    icon: "🌊",
    color: "#38bdf8",
    description:
      "Flooding occurs when water covers land that is normally dry. Heavy rainfall, overflowing rivers, poor drainage and storm surges can cause dangerous flooding.",
    before: [
      "Keep emergency numbers and important documents safely stored.",
      "Know the safest higher ground or shelter near you.",
      "Keep drinking water, food, medicines, torch and power bank ready.",
      "Avoid building or parking in known flood-prone areas.",
    ],
    during: [
      "Move to higher ground immediately if water is rising.",
      "Do not walk or drive through moving floodwater.",
      "Switch off electricity if it is safe to do so.",
      "Follow instructions from local authorities.",
    ],
    after: [
      "Do not enter damaged buildings until authorities declare them safe.",
      "Avoid contaminated water.",
      "Report damaged electrical lines and infrastructure.",
      "Continue monitoring official warnings.",
    ],
    questions: [
      {
        q: "Can I drive through floodwater?",
        a: "No. Even shallow moving water can sweep away vehicles and hide roads, drains and debris.",
      },
      {
        q: "What is the safest place during a flood?",
        a: "Move toward higher ground or an officially designated safe shelter.",
      },
      {
        q: "What should I carry?",
        a: "Water, food, medicines, identification, flashlight, phone, power bank and emergency contacts.",
      },
    ],
  },

  {
    id: "cyclone",
    name: "Cyclone",
    icon: "🌀",
    color: "#a78bfa",
    description:
      "A cyclone is a powerful rotating storm system that can bring destructive winds, heavy rain, flooding and storm surges.",
    before: [
      "Monitor official cyclone warnings.",
      "Secure loose objects around your home.",
      "Keep emergency supplies ready.",
      "Know the nearest cyclone shelter.",
    ],
    during: [
      "Stay indoors and away from windows.",
      "Do not go outside during the apparent calm of the eye.",
      "Keep phones charged and monitor official updates.",
      "Evacuate if authorities order evacuation.",
    ],
    after: [
      "Wait for official confirmation before going outside.",
      "Avoid fallen power lines.",
      "Stay away from floodwater.",
      "Check on vulnerable neighbours if it is safe.",
    ],
    questions: [
      {
        q: "Should I stay near windows?",
        a: "No. Stay away from windows and glass because strong winds can turn debris into dangerous projectiles.",
      },
      {
        q: "What if evacuation is announced?",
        a: "Leave early using the route recommended by authorities and carry your emergency kit.",
      },
      {
        q: "Can I go outside when the wind becomes calm?",
        a: "No. The calm may be temporary, especially if the eye of the cyclone is passing.",
      },
    ],
  },

  {
    id: "tsunami",
    name: "Tsunami",
    icon: "🌊",
    color: "#22d3ee",
    description:
      "A tsunami is a series of powerful ocean waves usually caused by undersea earthquakes, volcanic activity or major underwater disturbances.",
    before: [
      "Know whether your area is within a tsunami evacuation zone.",
      "Learn evacuation routes toward higher ground.",
      "Keep emergency supplies ready.",
      "Understand local warning signals.",
    ],
    during: [
      "If you feel a strong or long earthquake near the coast, move inland or to higher ground.",
      "Do not wait to watch the ocean.",
      "Follow evacuation signs and official instructions.",
      "Stay away from beaches and coastal waterways.",
    ],
    after: [
      "Do not return until authorities declare the area safe.",
      "Remember that multiple waves may arrive.",
      "Avoid damaged structures.",
      "Continue monitoring official alerts.",
    ],
    questions: [
      {
        q: "What if I feel a strong earthquake near the coast?",
        a: "Move immediately to higher ground or inland. Do not wait for an official warning if natural warning signs are obvious.",
      },
      {
        q: "Is the first tsunami wave always the biggest?",
        a: "No. Later waves can be larger and dangerous.",
      },
      {
        q: "Can I go to the beach after one wave?",
        a: "No. Multiple waves can arrive over an extended period.",
      },
    ],
  },

  {
    id: "earthquake",
    name: "Earthquake",
    icon: "🌎",
    color: "#f59e0b",
    description:
      "An earthquake is sudden ground shaking caused by movement within Earth's crust. Strong earthquakes can damage buildings, roads and infrastructure.",
    before: [
      "Identify safe areas inside buildings.",
      "Secure heavy furniture and objects.",
      "Prepare an emergency kit.",
      "Learn basic Drop, Cover and Hold On procedures.",
    ],
    during: [
      "DROP to the ground.",
      "COVER your head and neck under sturdy furniture if possible.",
      "HOLD ON until shaking stops.",
      "Stay away from windows and falling objects.",
    ],
    after: [
      "Expect aftershocks.",
      "Check yourself and others for injuries.",
      "Avoid damaged buildings.",
      "Turn off gas or electricity only if it is safe and necessary.",
    ],
    questions: [
      {
        q: "Should I run outside during shaking?",
        a: "Usually no. Falling debris near buildings can be dangerous. Drop, Cover and Hold On where you are.",
      },
      {
        q: "What are aftershocks?",
        a: "Smaller earthquakes that occur after the main earthquake.",
      },
      {
        q: "Should I use an elevator?",
        a: "Avoid elevators during and immediately after an earthquake.",
      },
    ],
  },

  {
    id: "landslide",
    name: "Landslide",
    icon: "⛰️",
    color: "#fb923c",
    description:
      "A landslide is the movement of rock, soil or debris down a slope. Heavy rain, earthquakes, construction and slope instability can contribute.",
    before: [
      "Avoid unstable slopes and known landslide zones.",
      "Monitor heavy-rain warnings.",
      "Know local evacuation routes.",
      "Watch for cracks in the ground or structures.",
    ],
    during: [
      "Move away from the path of the landslide.",
      "If outdoors, move toward stable ground away from slopes.",
      "Do not cross an active landslide area.",
      "Follow evacuation instructions.",
    ],
    after: [
      "Stay away from the slide area.",
      "Watch for additional landslides.",
      "Report damaged roads, bridges and buildings.",
      "Do not enter unstable structures.",
    ],
    questions: [
      {
        q: "What are warning signs?",
        a: "New cracks, unusual ground movement, leaning trees or poles, blocked drainage and sudden changes in water flow can be warning signs.",
      },
      {
        q: "Can heavy rain trigger landslides?",
        a: "Yes. Saturated soil can become unstable, especially on steep slopes.",
      },
      {
        q: "Should I cross a landslide area?",
        a: "No. The ground may remain unstable and additional movement can occur.",
      },
    ],
  },

  {
    id: "fire",
    name: "Fire",
    icon: "🔥",
    color: "#ef4444",
    description:
      "Fires can spread rapidly and produce heat, smoke and toxic gases. Early detection and a safe evacuation plan can save lives.",
    before: [
      "Keep fire extinguishers accessible where appropriate.",
      "Check electrical equipment and wiring.",
      "Keep exits clear.",
      "Create and practise an evacuation plan.",
    ],
    during: [
      "Raise the alarm and call emergency services.",
      "Leave immediately using a safe exit.",
      "Stay low if there is smoke.",
      "Never use an elevator during a building fire.",
    ],
    after: [
      "Do not re-enter until authorities declare the building safe.",
      "Avoid damaged electrical equipment.",
      "Report hazards.",
      "Seek medical help for smoke inhalation or injuries.",
    ],
    questions: [
      {
        q: "What should I do if there is smoke?",
        a: "Stay low, cover your nose and mouth if possible, and move toward a safe exit.",
      },
      {
        q: "Should I go back for belongings?",
        a: "No. Once you leave a burning building, do not return for belongings.",
      },
      {
        q: "Should I use an elevator?",
        a: "No. Use stairs and follow the building evacuation plan.",
      },
    ],
  },

  {
    id: "drought",
    name: "Drought",
    icon: "☀️",
    color: "#facc15",
    description:
      "Drought is a prolonged period of unusually low water availability. It can affect drinking water, agriculture, ecosystems and communities.",
    before: [
      "Use water efficiently.",
      "Fix leaks quickly.",
      "Store water according to local guidance.",
      "Use drought-resistant plants where appropriate.",
    ],
    during: [
      "Follow local water restrictions.",
      "Prioritise drinking and essential household needs.",
      "Avoid unnecessary water use.",
      "Follow public health guidance.",
    ],
    after: [
      "Continue efficient water use until supplies recover.",
      "Support sustainable water management.",
      "Monitor official water advisories.",
      "Protect local water resources.",
    ],
    questions: [
      {
        q: "Why is drought dangerous?",
        a: "Long periods of water shortage can affect drinking water, agriculture, food production, ecosystems and public health.",
      },
      {
        q: "How can households help?",
        a: "Reduce unnecessary water use, fix leaks and follow local water conservation guidance.",
      },
      {
        q: "Does drought only affect farms?",
        a: "No. It can affect drinking water, electricity generation, ecosystems, businesses and communities.",
      },
    ],
  },
];


/* =========================================================
   DEMO LOCATION DATA
========================================================= */

const LOCATION_DATA = {
  Bengaluru: {
    lat: 12.9716,
    lng: 77.5946,
    risks: {
      flood: 82,
      cyclone: 22,
      tsunami: 10,
      earthquake: 48,
      landslide: 36,
      fire: 76,
      drought: 49,
    },
  },

  Mysuru: {
    lat: 12.2958,
    lng: 76.6394,
    risks: {
      flood: 61,
      cyclone: 18,
      tsunami: 8,
      earthquake: 42,
      landslide: 29,
      fire: 58,
      drought: 55,
    },
  },

  Mumbai: {
    lat: 19.076,
    lng: 72.8777,
    risks: {
      flood: 88,
      cyclone: 71,
      tsunami: 45,
      earthquake: 55,
      landslide: 62,
      fire: 54,
      drought: 29,
    },
  },

  Chennai: {
    lat: 13.0827,
    lng: 80.2707,
    risks: {
      flood: 86,
      cyclone: 78,
      tsunami: 51,
      earthquake: 38,
      landslide: 21,
      fire: 51,
      drought: 44,
    },
  },

  Kolkata: {
    lat: 22.5726,
    lng: 88.3639,
    risks: {
      flood: 91,
      cyclone: 79,
      tsunami: 18,
      earthquake: 45,
      landslide: 16,
      fire: 58,
      drought: 34,
    },
  },

  Delhi: {
    lat: 28.6139,
    lng: 77.209,
    risks: {
      flood: 57,
      cyclone: 8,
      tsunami: 2,
      earthquake: 74,
      landslide: 18,
      fire: 67,
      drought: 52,
    },
  },

  Hyderabad: {
    lat: 17.385,
    lng: 78.4867,
    risks: {
      flood: 63,
      cyclone: 17,
      tsunami: 5,
      earthquake: 34,
      landslide: 24,
      fire: 62,
      drought: 59,
    },
  },

  Pune: {
    lat: 18.5204,
    lng: 73.8567,
    risks: {
      flood: 65,
      cyclone: 12,
      tsunami: 4,
      earthquake: 47,
      landslide: 52,
      fire: 55,
      drought: 57,
    },
  },
};


/* =========================================================
   HELPERS
========================================================= */

function getRiskLevel(score) {
  if (score >= 75) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 40) return "MODERATE";
  return "LOW";
}

function getRiskColor(score) {
  if (score >= 75) return "#ef4444";
  if (score >= 60) return "#f97316";
  if (score >= 40) return "#f59e0b";
  return "#22c55e";
}

function getHazardRisk(location, hazard) {
  return location?.risks?.[hazard.id] ?? 50;
}


/* =========================================================
   LANDING PAGE
========================================================= */

function LandingPage({ onStart }) {
  return (
    <div className="landing-page">

      <div className="landing-noise" />

      <div className="landing-glow landing-glow-red" />
      <div className="landing-glow landing-glow-blue" />

      <nav className="landing-nav">

        <div className="brand">

          <div className="brand-icon">
            <ShieldAlert size={22} />
          </div>

          <div>
            <div className="brand-name">
              DISASTER-X
            </div>

            <div className="brand-subtitle">
              EMERGENCY INTELLIGENCE
            </div>
          </div>

        </div>

        <div className="system-status">
          <span className="status-dot" />
          SYSTEM READY
        </div>

      </nav>


      <main className="landing-main">

        <div className="landing-label">
          <span />
          AUTOMATIC DISASTER NOTIFIER
        </div>

        <h1>
          Know the danger.
          <br />
          <span>Act before disaster.</span>
        </h1>

        <p className="landing-description">
          A unified disaster-awareness platform designed
          to help people understand hazards, assess
          location risk and take the right action when it matters.
        </p>


        <div className="landing-buttons">

          <button
            className="primary-landing-button"
            onClick={onStart}
          >
            LET'S GO
            <ChevronRight size={20} />
          </button>

          <div className="landing-mini-info">
            <Sparkles size={16} />
            7 HAZARDS • 1 PLATFORM
          </div>

        </div>


        <div className="landing-stat-row">

          <div className="landing-stat">
            <strong>07</strong>
            <span>HAZARDS</span>
          </div>

          <div className="landing-stat">
            <strong>24/7</strong>
            <span>AWARENESS</span>
          </div>

          <div className="landing-stat">
            <strong>01</strong>
            <span>UNIFIED MAP</span>
          </div>

        </div>

      </main>


      <div className="landing-footer">
        <span>
          FLOOD • CYCLONE • TSUNAMI • EARTHQUAKE
        </span>

        <span>
          LANDSLIDE • FIRE • DROUGHT
        </span>
      </div>

    </div>
  );
}


/* =========================================================
   MAP FLY COMPONENT
========================================================= */

function MapMover({ location }) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.flyTo(
      [location.lat, location.lng],
      10,
      {
        duration: 1.4,
      }
    );
  }, [location, map]);

  return null;
}


/* =========================================================
   MAIN APP
========================================================= */

export default function App() {

  const [started, setStarted] = useState(false);

  const [selectedHazard, setSelectedHazard] =
    useState(null);

  const [selectedLocation, setSelectedLocation] =
    useState(null);

  const [searchText, setSearchText] =
    useState("");

  const [notificationEnabled, setNotificationEnabled] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [searchMessage, setSearchMessage] =
    useState("");


  /* ==========================================
     NOTIFICATION
  ========================================== */

  async function enableNotifications() {

    if (!("Notification" in window)) {
      alert(
        "Your browser does not support notifications."
      );
      return;
    }

    try {

      const permission =
        await Notification.requestPermission();

      if (permission === "granted") {

        setNotificationEnabled(true);

        new Notification(
          "DISASTER-X — Notifications Enabled",
          {
            body:
              "You will now receive disaster awareness notifications from this demo.",
          }
        );

        playAlertSound();

      } else {

        alert(
          "Please allow notifications in your browser settings."
        );

      }

    } catch (error) {

      console.error(error);

    }
  }


  function playAlertSound() {

    const audio =
      new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      );

    audio.volume = 0.35;

    audio.play().catch(() => {});
  }


  /* ==========================================
     SEARCH LOCATION
  ========================================== */

  async function searchLocation() {

    const value =
      searchText.trim().toLowerCase();

    if (!value) {

      setSearchMessage(
        "Type a city or location first."
      );

      return;
    }


    const demoKey =
      Object.keys(LOCATION_DATA).find(
        (key) =>
          key.toLowerCase() === value ||
          key.toLowerCase().includes(value)
      );


    if (demoKey) {

      setSelectedLocation({
        name: demoKey,
        ...LOCATION_DATA[demoKey],
      });

      setSelectedHazard(null);

      setSearchMessage(
        `${demoKey} risk report loaded.`
      );

      return;
    }


    /* ==========================================
       OPENSTREETMAP SEARCH
    ========================================== */

    try {

      setSearchMessage("Searching location...");

      const response =
        await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
            searchText
          )}`
        );

      const data =
        await response.json();

      if (!data.length) {

        setSearchMessage(
          "Location not found. Try another city."
        );

        return;
      }


      const place = data[0];

      const lat =
        Number(place.lat);

      const lng =
        Number(place.lon);


      /* Generate demo risk values for
         locations outside the sample dataset.
         These are NOT real predictions. */

      const generatedRisks = {
        flood: Math.floor(35 + Math.random() * 55),
        cyclone: Math.floor(15 + Math.random() * 70),
        tsunami: Math.floor(5 + Math.random() * 60),
        earthquake: Math.floor(25 + Math.random() * 60),
        landslide: Math.floor(20 + Math.random() * 65),
        fire: Math.floor(30 + Math.random() * 60),
        drought: Math.floor(25 + Math.random() * 65),
      };


      setSelectedLocation({
        name:
          place.display_name
            .split(",")[0],

        lat,
        lng,

        risks:
          generatedRisks,
      });

      setSelectedHazard(null);

      setSearchMessage(
        "Location found. Showing demo risk profile."
      );

    } catch (error) {

      console.error(error);

      setSearchMessage(
        "Could not search the location. Check your internet connection."
      );

    }
  }


  /* ==========================================
     CURRENT LOCATION
  ========================================== */

  function useMyLocation() {

    if (!navigator.geolocation) {

      alert(
        "Location is not supported by this browser."
      );

      return;
    }


    navigator.geolocation.getCurrentPosition(
      (position) => {

        setSelectedLocation({
          name: "My Location",

          lat:
            position.coords.latitude,

          lng:
            position.coords.longitude,

          risks: {
            flood: 50,
            cyclone: 35,
            tsunami: 20,
            earthquake: 45,
            landslide: 40,
            fire: 55,
            drought: 48,
          },
        });

        setSearchMessage(
          "Your location is selected."
        );

      },

      () => {

        alert(
          "Location permission was not allowed."
        );

      }
    );
  }


  /* ==========================================
     OVERALL RISK
  ========================================== */

  const overallRisk =
    useMemo(() => {

      if (!selectedLocation)
        return 0;

      const values =
        Object.values(
          selectedLocation.risks
        );

      return Math.round(
        values.reduce(
          (a, b) => a + b,
          0
        ) / values.length
      );

    }, [selectedLocation]);


  /* ==========================================
     LANDING
  ========================================== */

  if (!started) {

    return (
      <LandingPage
        onStart={() =>
          setStarted(true)
        }
      />
    );

  }


  /* ==========================================
     DASHBOARD
  ========================================== */

  return (

    <div className="app">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={
          `sidebar ${
            mobileMenu
              ? "sidebar-open"
              : ""
          }`
        }
      >

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            <ShieldAlert size={21} />
          </div>

          <div>
            <strong>
              DISASTER-X
            </strong>

            <small>
              EMERGENCY INTELLIGENCE
            </small>
          </div>

        </div>


        <div className="sidebar-section">

          <span className="sidebar-label">
            HAZARD MONITOR
          </span>


          {HAZARDS.map((hazard) => {

            const score =
              selectedLocation
                ? getHazardRisk(
                    selectedLocation,
                    hazard
                  )
                : 50;

            return (

              <button
                className={
                  `sidebar-hazard ${
                    selectedHazard?.id === hazard.id
                      ? "active"
                      : ""
                  }`
                }
                key={hazard.id}
                onClick={() => {

                  setSelectedHazard(
                    hazard
                  );

                  setMobileMenu(false);

                }}
              >

                <span>
                  {hazard.icon}
                </span>

                <div>

                  <strong>
                    {hazard.name}
                  </strong>

                  <small>
                    {getRiskLevel(score)}
                  </small>

                </div>

                <ChevronRight
                  size={14}
                />

              </button>

            );

          })}

        </div>


        <div className="sidebar-bottom">

          <div className="sidebar-live">

            <span />

            DATA SYSTEM ONLINE

          </div>

          <small>
            Disaster awareness platform
          </small>

        </div>

      </aside>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="dashboard">

        {/* HEADER */}

        <header className="dashboard-header">

          <button
            className="mobile-menu-button"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
          >
            {mobileMenu
              ? <X />
              : <Menu />
            }
          </button>


          <div>

            <div className="dashboard-eyebrow">
              AUTOMATIC DISASTER NOTIFIER
            </div>

            <h1>
              Situation Dashboard
            </h1>

          </div>


          <button
            className={
              `notify-button ${
                notificationEnabled
                  ? "notification-on"
                  : ""
              }`
            }
            onClick={
              enableNotifications
            }
          >

            {notificationEnabled
              ? <BellRing size={17} />
              : <Bell size={17} />
            }

            {notificationEnabled
              ? "NOTIFICATIONS ON"
              : "NOTIFY ME"
            }

          </button>

        </header>


        {/* =====================================
            SEARCH
        ===================================== */}

        <section className="search-section">

          <div className="search-box">

            <Search
              size={20}
              className="search-icon"
            />

            <input
              value={searchText}
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  searchLocation();
                }

              }}
              placeholder="Search city or location..."
            />

            <button
              onClick={
                searchLocation
              }
            >
              SEARCH
            </button>

          </div>


          <button
            className="location-button"
            onClick={
              useMyLocation
            }
          >

            <LocateFixed size={17} />

            USE MY LOCATION

          </button>

        </section>


        {searchMessage && (

          <div className="search-message">

            <CheckCircle2
              size={16}
            />

            {searchMessage}

          </div>

        )}


        {/* =====================================
            LOCATION OVERVIEW
        ===================================== */}

        {selectedLocation ? (

          <section className="location-overview">

            <div className="location-title">

              <div className="location-pin">
                <MapPin size={20} />
              </div>

              <div>

                <span>
                  LOCATION RISK INTELLIGENCE
                </span>

                <h2>
                  {selectedLocation.name}
                </h2>

              </div>

            </div>


            <div
              className="overall-risk"
              style={{
                borderColor:
                  getRiskColor(
                    overallRisk
                  ),
              }}
            >

              <Gauge
                size={18}
              />

              <div>

                <small>
                  OVERALL DEMO RISK
                </small>

                <strong
                  style={{
                    color:
                      getRiskColor(
                        overallRisk
                      ),
                  }}
                >
                  {overallRisk}/100
                </strong>

              </div>

            </div>

          </section>

        ) : (

          <section className="welcome-card">

            <div className="welcome-icon">
              <Globe2 size={30} />
            </div>

            <div>

              <span>
                LOCATION INTELLIGENCE
              </span>

              <h2>
                Search a location to begin
              </h2>

              <p>
                Search Bengaluru, Mumbai,
                Chennai, Delhi, Hyderabad,
                Pune or any other location.
              </p>

            </div>

          </section>

        )}


        {/* =====================================
            7 HAZARDS
        ===================================== */}

        <section className="section-block">

          <div className="section-heading">

            <div>

              <span>
                MULTI-HAZARD ANALYSIS
              </span>

              <h2>
                Seven Hazard Overview
              </h2>

            </div>

            <span className="demo-badge">
              DEMO RISK DATA
            </span>

          </div>


          <div className="hazard-grid">

            {HAZARDS.map((hazard) => {

              const score =
                selectedLocation
                  ? getHazardRisk(
                      selectedLocation,
                      hazard
                    )
                  : 50;

              const level =
                getRiskLevel(score);

              const color =
                getRiskColor(score);

              return (

                <button
                  key={hazard.id}
                  className={
                    `hazard-card ${
                      selectedHazard?.id === hazard.id
                        ? "selected"
                        : ""
                    }`
                  }
                  onClick={() =>
                    setSelectedHazard(
                      hazard
                    )
                  }
                >

                  <div className="hazard-card-header">

                    <div
                      className="hazard-icon"
                      style={{
                        background:
                          `${hazard.color}18`,
                        color:
                          hazard.color,
                      }}
                    >
                      {hazard.icon}
                    </div>

                    <span
                      className="risk-pill"
                      style={{
                        color,
                        borderColor:
                          `${color}66`,
                        background:
                          `${color}12`,
                      }}
                    >
                      {level}
                    </span>

                  </div>


                  <h3>
                    {hazard.name}
                  </h3>


                  <div className="risk-number">

                    {score}

                    <small>
                      /100
                    </small>

                  </div>


                  <div className="risk-progress">

                    <span
                      style={{
                        width:
                          `${score}%`,
                        background:
                          color,
                      }}
                    />

                  </div>


                  <div className="card-action">

                    VIEW SAFETY GUIDE

                    <ChevronRight
                      size={14}
                    />

                  </div>

                </button>

              );

            })}

          </div>

        </section>


        {/* =====================================
            HAZARD DETAIL
        ===================================== */}

        {selectedHazard && (

          <section className="hazard-detail">

            <div className="detail-header">

              <div>

                <div
                  className="detail-icon"
                  style={{
                    background:
                      `${selectedHazard.color}18`,
                  }}
                >
                  {selectedHazard.icon}
                </div>

                <div>

                  <span>
                    SAFETY INTELLIGENCE
                  </span>

                  <h2>
                    {selectedHazard.name}
                  </h2>

                </div>

              </div>


              <button
                className="close-detail"
                onClick={() =>
                  setSelectedHazard(null)
                }
              >
                <X size={18} />
              </button>

            </div>


            <p className="detail-description">
              {selectedHazard.description}
            </p>


            <div className="safety-columns">

              <div className="safety-column">

                <div className="safety-heading">
                  <ShieldAlert size={18} />
                  BEFORE
                </div>

                {selectedHazard.before.map(
                  (item, index) => (

                    <div
                      className="safety-item"
                      key={index}
                    >

                      <CheckCircle2
                        size={16}
                      />

                      {item}

                    </div>

                  )
                )}

              </div>


              <div className="safety-column danger-column">

                <div className="safety-heading">
                  <Siren size={18} />
                  DURING
                </div>

                {selectedHazard.during.map(
                  (item, index) => (

                    <div
                      className="safety-item"
                      key={index}
                    >

                      <CircleAlert
                        size={16}
                      />

                      {item}

                    </div>

                  )
                )}

              </div>


              <div className="safety-column">

                <div className="safety-heading">
                  <CheckCircle2 size={18} />
                  AFTER
                </div>

                {selectedHazard.after.map(
                  (item, index) => (

                    <div
                      className="safety-item"
                      key={index}
                    >

                      <CheckCircle2
                        size={16}
                      />

                      {item}

                    </div>

                  )
                )}

              </div>

            </div>


            {/* QUESTIONS */}

            <div className="faq-section">

              <div className="faq-title">
                <span>
                  COMMON QUESTIONS
                </span>

                <h3>
                  What should people know?
                </h3>
              </div>


              {selectedHazard.questions.map(
                (item, index) => (

                  <details
                    className="faq"
                    key={index}
                  >

                    <summary>

                      {item.q}

                      <ChevronDown
                        size={17}
                      />

                    </summary>

                    <p>
                      {item.a}
                    </p>

                  </details>

                )
              )}

            </div>

          </section>

        )}


        {/* =====================================
            MAP
        ===================================== */}

        <section className="map-section">

          <div className="section-heading">

            <div>

              <span>
                GEOSPATIAL INTELLIGENCE
              </span>

              <h2>
                Interactive Risk Map
              </h2>

            </div>

            <div className="map-legend">

              <span>
                <i className="legend-green" />
                LOW
              </span>

              <span>
                <i className="legend-yellow" />
                MODERATE
              </span>

              <span>
                <i className="legend-orange" />
                HIGH
              </span>

              <span>
                <i className="legend-red" />
                CRITICAL
              </span>

            </div>

          </div>


          <div className="map-container">

            <MapContainer
              center={
                selectedLocation
                  ? [
                      selectedLocation.lat,
                      selectedLocation.lng,
                    ]
                  : [
                      20.5937,
                      78.9629,
                    ]
              }
              zoom={
                selectedLocation
                  ? 10
                  : 5
              }
              scrollWheelZoom={true}
              style={{
                width: "100%",
                height: "100%",
              }}
            >

              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />


              {selectedLocation && (

                <>

                  <MapMover
                    location={
                      selectedLocation
                    }
                  />

                  <Circle
                    center={[
                      selectedLocation.lat,
                      selectedLocation.lng,
                    ]}
                    radius={35000}
                    pathOptions={{
                      color:
                        getRiskColor(
                          overallRisk
                        ),
                      fillColor:
                        getRiskColor(
                          overallRisk
                        ),
                      fillOpacity:
                        0.16,
                      weight: 2,
                    }}
                  />

                  <Marker
                    position={[
                      selectedLocation.lat,
                      selectedLocation.lng,
                    ]}
                  >

                    <Popup>

                      <strong>
                        {selectedLocation.name}
                      </strong>

                      <br />

                      Disaster-X Risk:
                      {" "}
                      {overallRisk}/100

                    </Popup>

                  </Marker>

                </>

              )}

            </MapContainer>


            <div className="map-overlay-card">

              <div className="map-overlay-icon">
                <Navigation size={17} />
              </div>

              <div>

                <strong>
                  {selectedLocation
                    ? selectedLocation.name
                    : "India"}
                </strong>

                <span>
                  Interactive geographic view
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            ANALYTICS
        ===================================== */}

        <section className="analytics-section">

          <div className="section-heading">

            <div>

              <span>
                RISK ANALYTICS
              </span>

              <h2>
                Hazard Risk Distribution
              </h2>

            </div>

          </div>


          <div className="analytics-card">

            {HAZARDS.map((hazard) => {

              const score =
                selectedLocation
                  ? getHazardRisk(
                      selectedLocation,
                      hazard
                    )
                  : 50;

              const color =
                getRiskColor(score);

              return (

                <div
                  className="analytics-row"
                  key={hazard.id}
                >

                  <div className="analytics-name">

                    <span>
                      {hazard.icon}
                    </span>

                    {hazard.name}

                  </div>


                  <div className="analytics-bar">

                    <span
                      style={{
                        width:
                          `${score}%`,
                        background:
                          color,
                      }}
                    />

                  </div>


                  <strong
                    style={{
                      color,
                    }}
                  >
                    {score}
                  </strong>

                </div>

              );

            })}

          </div>

        </section>


        {/* =====================================
            EMERGENCY ALERT
        ===================================== */}

        <section className="alert-section">

          <div className="alert-icon">
            <BellRing size={24} />
          </div>

          <div className="alert-text">

            <span>
              EMERGENCY AWARENESS
            </span>

            <h3>
              Stay informed. Act early.
            </h3>

            <p>
              Enable notifications to receive
              browser alerts from this application.
            </p>

          </div>


          <button
            className="alert-button"
            onClick={
              enableNotifications
            }
          >

            {notificationEnabled
              ? "ALERTS ENABLED"
              : "ENABLE ALERTS"
            }

            <Bell size={16} />

          </button>

        </section>


        <footer className="dashboard-footer">

          <div>
            <strong>
              DISASTER-X
            </strong>

            <span>
              Automatic Disaster Notifier
            </span>
          </div>

          <span>
            Built for disaster awareness •
            Demo risk data
          </span>

        </footer>

      </main>

    </div>
  );
}