import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  useMap,
} from "react-leaflet";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "leaflet/dist/leaflet.css";


// =====================================================
// 7 HAZARDS - COMPLETE INFORMATION
// =====================================================

const hazards = [

  {
    id: "flood",
    name: "Flood",
    icon: "🌊",
    risk: 82,
    level: "CRITICAL",
    color: "#ef4444",

    lat: 22.5726,
    lng: 88.3639,

    description:
      "Flooding happens when water covers land that is normally dry. Heavy rainfall, overflowing rivers, storms and drainage failure can cause floods.",

    before: [
      "Keep emergency numbers and important documents accessible.",
      "Prepare drinking water, food, medicines and a torch.",
      "Move valuables and electrical equipment to higher places.",
      "Know the safest higher ground or evacuation location nearby.",
      "Follow official weather and disaster warnings."
    ],

    during: [
      "Move to higher ground if flooding is increasing.",
      "Stay away from fast-moving flood water.",
      "Do not walk or drive through flooded roads.",
      "Switch off electricity only if it is safe to do so.",
      "Follow evacuation instructions from authorities."
    ],

    after: [
      "Return home only when authorities say it is safe.",
      "Avoid damaged electrical wires.",
      "Do not drink contaminated water.",
      "Clean and disinfect affected areas carefully.",
      "Report dangerous infrastructure."
    ],

    carry: [
      "Drinking water",
      "Dry food",
      "Torch",
      "Power bank",
      "First-aid kit",
      "Important documents"
    ],

    questions: [
      {
        q: "Can I walk through flood water?",
        a: "Avoid walking through flood water because the depth, current and hidden hazards may not be visible."
      },
      {
        q: "What if water enters my house?",
        a: "Move to a higher safe area and follow evacuation instructions. Avoid electrical equipment if water has reached electrical systems."
      },
      {
        q: "What should I carry during evacuation?",
        a: "Carry drinking water, essential medicines, food, identification documents, a torch, phone and power bank."
      },
      {
        q: "Should I drive through a flooded road?",
        a: "No. Floodwater can hide damaged roads, drains and strong currents."
      }
    ]
  },


  {
    id: "cyclone",
    name: "Cyclone",
    icon: "🌀",
    risk: 68,
    level: "HIGH",
    color: "#f97316",

    lat: 19.076,
    lng: 72.8777,

    description:
      "A cyclone is a powerful rotating storm that can produce destructive winds, heavy rainfall, storm surge and flooding.",

    before: [
      "Monitor official cyclone forecasts and warnings.",
      "Secure doors, windows and loose outdoor objects.",
      "Keep food, water, medicines and emergency supplies ready.",
      "Charge phones and power banks.",
      "Know your nearest evacuation shelter."
    ],

    during: [
      "Stay indoors and away from windows.",
      "Do not go outside during strong winds.",
      "Follow evacuation instructions immediately.",
      "Keep emergency communication devices available.",
      "Avoid coastal and flooded areas."
    ],

    after: [
      "Wait for official instructions before going outside.",
      "Watch for fallen electrical wires.",
      "Avoid damaged buildings.",
      "Continue monitoring official updates.",
      "Help vulnerable people if it is safe."
    ],

    carry: [
      "Water",
      "Food",
      "Torch",
      "Radio",
      "Medicines",
      "Power bank"
    ],

    questions: [
      {
        q: "Should I stay near windows?",
        a: "No. Move away from windows and glass during strong winds."
      },
      {
        q: "What happens during a cyclone?",
        a: "Strong winds, heavy rainfall, flooding and storm surge can occur."
      },
      {
        q: "Should I evacuate?",
        a: "Follow official evacuation instructions, especially in coastal and low-lying areas."
      },
      {
        q: "Can I go outside after the wind becomes calm?",
        a: "Do not assume the danger has ended. Wait for official confirmation."
      }
    ]
  },


  {
    id: "tsunami",
    name: "Tsunami",
    icon: "🌊",
    risk: 55,
    level: "HIGH",
    color: "#f97316",

    lat: 13.0827,
    lng: 80.2707,

    description:
      "A tsunami is a series of powerful ocean waves usually caused by major underwater earthquakes or other disturbances.",

    before: [
      "Know whether you live or travel in a coastal hazard zone.",
      "Learn evacuation routes to higher ground.",
      "Keep emergency supplies ready.",
      "Understand local warning systems.",
      "Discuss an evacuation plan with family."
    ],

    during: [
      "Move inland or to higher ground immediately after an official warning.",
      "Stay away from beaches and coastal areas.",
      "Do not wait to watch the waves.",
      "Follow evacuation routes.",
      "Stay away from the coast until authorities give the all-clear."
    ],

    after: [
      "Do not return to coastal areas immediately.",
      "Watch for additional waves.",
      "Follow official instructions.",
      "Avoid damaged buildings and infrastructure.",
      "Help children and vulnerable people if safe."
    ],

    carry: [
      "Water",
      "Food",
      "First aid",
      "Torch",
      "Phone",
      "Identification"
    ],

    questions: [
      {
        q: "Should I go to the beach to see a tsunami?",
        a: "Never. Move away from the coast and to higher ground when a tsunami warning is issued."
      },
      {
        q: "Can there be more than one wave?",
        a: "Yes. A tsunami can consist of multiple waves."
      },
      {
        q: "Where should I go?",
        a: "Follow official evacuation routes toward higher ground or designated safe areas."
      },
      {
        q: "When can I return?",
        a: "Only after authorities officially declare the area safe."
      }
    ]
  },


  {
    id: "earthquake",
    name: "Earthquake",
    icon: "🌎",
    risk: 72,
    level: "HIGH",
    color: "#ef4444",

    lat: 26.1445,
    lng: 91.7362,

    description:
      "An earthquake occurs when energy is suddenly released within the Earth's crust, causing ground shaking.",

    before: [
      "Identify safe places inside your building.",
      "Secure heavy furniture and objects.",
      "Keep emergency supplies ready.",
      "Learn basic first aid.",
      "Know how to turn off utilities if required."
    ],

    during: [
      "Drop, cover and hold on.",
      "Stay away from windows and glass.",
      "Do not use elevators.",
      "If outdoors, move away from buildings and electrical lines.",
      "Remain calm and protect your head."
    ],

    after: [
      "Check yourself and others for injuries.",
      "Expect possible aftershocks.",
      "Avoid damaged structures.",
      "Turn off utilities if there is damage and it is safe.",
      "Follow official instructions."
    ],

    carry: [
      "First-aid kit",
      "Water",
      "Torch",
      "Whistle",
      "Phone",
      "Emergency food"
    ],

    questions: [
      {
        q: "What is the safest action during shaking?",
        a: "Drop, cover and hold on. Protect your head and stay away from windows."
      },
      {
        q: "Should I use an elevator?",
        a: "No. Use stairs when it is safe to evacuate."
      },
      {
        q: "What if I am outside?",
        a: "Move to an open area away from buildings, trees and electrical lines."
      },
      {
        q: "Can another earthquake happen?",
        a: "Aftershocks can occur following an earthquake."
      }
    ]
  },


  {
    id: "landslide",
    name: "Landslide",
    icon: "⛰️",
    risk: 61,
    level: "HIGH",
    color: "#f97316",

    lat: 30.3165,
    lng: 78.0322,

    description:
      "A landslide occurs when rock, soil or debris moves down a slope. Heavy rainfall, earthquakes and unstable terrain can increase the risk.",

    before: [
      "Learn whether your area has a history of landslides.",
      "Watch for cracks in ground or buildings.",
      "Monitor heavy rainfall warnings.",
      "Avoid unnecessary construction near unstable slopes.",
      "Know safe evacuation routes."
    ],

    during: [
      "Move away from the landslide path immediately.",
      "Avoid valleys and low areas below unstable slopes.",
      "Follow evacuation instructions.",
      "Stay alert for additional slope movement.",
      "Do not approach the landslide area."
    ],

    after: [
      "Stay away from the affected slope.",
      "Watch for additional landslides.",
      "Report damaged roads or infrastructure.",
      "Return only after authorities declare it safe.",
      "Avoid unstable buildings."
    ],

    carry: [
      "Water",
      "Torch",
      "First aid",
      "Phone",
      "Power bank",
      "Emergency food"
    ],

    questions: [
      {
        q: "What are warning signs?",
        a: "New cracks, unusual ground movement, falling rocks and changes in drainage can indicate instability."
      },
      {
        q: "Is heavy rain dangerous near slopes?",
        a: "Heavy rainfall can increase landslide risk in vulnerable terrain."
      },
      {
        q: "Can another landslide happen?",
        a: "Yes. Additional slope failures can occur after the initial event."
      }
    ]
  },


  {
    id: "fire",
    name: "Fire",
    icon: "🔥",
    risk: 76,
    level: "HIGH",
    color: "#ef4444",

    lat: 12.9716,
    lng: 77.5946,

    description:
      "Fires can spread rapidly and create smoke, extreme heat and dangerous conditions.",

    before: [
      "Keep fire extinguishers accessible where appropriate.",
      "Do not overload electrical sockets.",
      "Keep flammable materials away from heat.",
      "Know building evacuation routes.",
      "Install and maintain smoke alarms where possible."
    ],

    during: [
      "Raise the alarm and call emergency services.",
      "Evacuate using a safe route.",
      "Stay low if smoke is present.",
      "Do not use elevators during a building fire.",
      "Never re-enter a burning building."
    ],

    after: [
      "Do not return until authorities declare the area safe.",
      "Avoid damaged electrical systems.",
      "Seek medical help for smoke inhalation or burns.",
      "Report hazards.",
      "Check on vulnerable people."
    ],

    carry: [
      "First-aid kit",
      "Phone",
      "Torch",
      "Water",
      "Emergency documents"
    ],

    questions: [
      {
        q: "What should I do if there is smoke?",
        a: "Stay low, protect your breathing and evacuate using a safe route."
      },
      {
        q: "Should I use an elevator?",
        a: "No. Use stairs where safe."
      },
      {
        q: "Can I go back for belongings?",
        a: "No. Life safety comes first. Never re-enter a burning or unsafe building."
      }
    ]
  },


  {
    id: "drought",
    name: "Drought",
    icon: "☀️",
    risk: 49,
    level: "MODERATE",
    color: "#f59e0b",

    lat: 17.6599,
    lng: 75.9064,

    description:
      "Drought is a prolonged period of unusually low rainfall that can cause water shortages and agricultural stress.",

    before: [
      "Monitor rainfall and water availability.",
      "Store water responsibly where appropriate.",
      "Reduce unnecessary water consumption.",
      "Use water-efficient methods.",
      "Prepare for possible restrictions."
    ],

    during: [
      "Conserve available water.",
      "Prioritize drinking and essential needs.",
      "Follow local water-use restrictions.",
      "Avoid unnecessary water-intensive activities.",
      "Support community water conservation."
    ],

    after: [
      "Continue responsible water use.",
      "Repair leaking pipes and taps.",
      "Restore water sources carefully.",
      "Support sustainable water management.",
      "Monitor future rainfall conditions."
    ],

    carry: [
      "Safe drinking water",
      "Essential medicines",
      "Emergency food",
      "Containers for water"
    ],

    questions: [
      {
        q: "What causes drought?",
        a: "Long periods of below-normal rainfall can cause drought conditions."
      },
      {
        q: "How can I help during drought?",
        a: "Conserve water and avoid unnecessary consumption."
      },
      {
        q: "Does drought affect food?",
        a: "Yes. Water shortages can affect agriculture and food production."
      }
    ]
  }

];


// =====================================================
// GRAPH DATA
// =====================================================

const trendData = [
  { day: "Mon", risk: 43 },
  { day: "Tue", risk: 48 },
  { day: "Wed", risk: 55 },
  { day: "Thu", risk: 59 },
  { day: "Fri", risk: 64 },
  { day: "Sat", risk: 70 },
  { day: "Sun", risk: 76 },
];


// =====================================================
// SEARCHABLE DEMO LOCATIONS
// =====================================================

const locations = [const locations = [
  {
    name: "Bengaluru",
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

  {
    name: "Mysuru",
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

  {
    name: "Mumbai",
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

  {
    name: "Chennai",
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

  {
    name: "Kolkata",
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

  {
    name: "Delhi",
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

  {
    name: "Hyderabad",
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

  {
    name: "Pune",
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
];
  
];


// =====================================================
// MAP SEARCH + LOCATION CONTROL
// =====================================================

function MapControls({
  searchText,
  setSearchText,
  setUserLocation,
  setSearchedLocation,
}) {

  const map = useMap();

  const searchLocation = () => {

    const search = searchText.trim().toLowerCase();

    if (!search) {
      alert("Please type a city or location.");
      return;
    }

    const result = locations.find((location) =>
      location.name.toLowerCase().includes(search)
    );

    if (!result) {
      alert(
        "Demo search currently supports Bengaluru, Mysuru, Mumbai, Chennai, Kolkata, Delhi, Hyderabad and Pune."
      );
      return;
    }

    map.flyTo(
      [result.lat, result.lng],
      10,
      {
        duration: 1.5,
      }
    );

    setSearchedLocation(result);
  };


  const useLocation = () => {

    if (!navigator.geolocation) {
      alert(
        "Your browser does not support location."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        const current = {
          name: "Your Location",
          lat,
          lng,
        };

        setUserLocation([
          lat,
          lng,
        ]);

        setSearchedLocation(current);

        map.flyTo(
          [lat, lng],
          11,
          {
            duration: 1.5,
          }
        );
      },

      () => {

        alert(
          "Location permission was denied. Please allow location access in your browser."
        );

      }
    );
  };


  return (
    <div className="map-controls">

      <div className="search-box">

        <input
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchLocation();
            }
          }}
          placeholder="Search city or location..."
        />

        <button onClick={searchLocation}>
          🔎 Search
        </button>

      </div>


      <button
        className="my-location"
        onClick={useLocation}
      >
        📍 Use My Location
      </button>

    </div>
  );
}


// =====================================================
// HAZARD INFORMATION COMPONENT
// =====================================================

function HazardInformation({
  hazard,
  onClose,
}) {

  const [openQuestion, setOpenQuestion] =
    useState(null);


  return (
    <section className="hazard-information">

      <div className="info-header">

        <div className="info-title">

          <div className="big-hazard-icon">
            {hazard.icon}
          </div>

          <div>

            <span>
              HAZARD INFORMATION
            </span>

            <h2>
              {hazard.name}
            </h2>

          </div>

        </div>


        <button
          className="close-button"
          onClick={onClose}
        >
          ✕
        </button>

      </div>


      <div className="info-risk">

        <div>

          <span>
            CURRENT DEMO RISK
          </span>

          <strong
            style={{
              color: hazard.color,
            }}
          >
            {hazard.risk}/100
          </strong>

        </div>

        <div
          className="big-risk-pill"
          style={{
            color: hazard.color,
            borderColor: hazard.color,
          }}
        >
          {hazard.level}
        </div>

      </div>


      <p className="info-description">
        {hazard.description}
      </p>


      <div className="info-columns">

        <div className="info-card">

          <h3>
            🟢 BEFORE
          </h3>

          <ul>

            {hazard.before.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </div>


        <div className="info-card">

          <h3>
            🔴 DURING
          </h3>

          <ul>

            {hazard.during.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </div>


        <div className="info-card">

          <h3>
            🔵 AFTER
          </h3>

          <ul>

            {hazard.after.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </div>


        <div className="info-card">

          <h3>
            🎒 EMERGENCY KIT
          </h3>

          <ul>

            {hazard.carry.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </div>

      </div>


      <div className="faq-section">

        <div className="faq-title">
          <span>
            QUESTIONS & ANSWERS
          </span>

          <h3>
            What people usually ask
          </h3>
        </div>


        {hazard.questions.map(
          (item, index) => (

            <div
              className="faq-item"
              key={index}
            >

              <button
                onClick={() =>
                  setOpenQuestion(
                    openQuestion === index
                      ? null
                      : index
                  )
                }
              >

                <span>
                  {item.q}
                </span>

                <strong>
                  {openQuestion === index
                    ? "−"
                    : "+"}
                </strong>

              </button>


              {openQuestion === index && (

                <div className="faq-answer">
                  {item.a}
                </div>

              )}

            </div>

          )
        )}

      </div>

    </section>
  );
}


// =====================================================
// MAIN DASHBOARD
// =====================================================

export default function Dashboard() {

  const [
    selectedHazard,
    setSelectedHazard,
  ] = useState(null);


  const [
    searchText,
    setSearchText,
  ] = useState("");


  const [
    searchedLocation,
    setSearchedLocation,
  ] = useState(null);


  const [
    userLocation,
    setUserLocation,
  ] = useState(null);


  const scrollToMap = () => {

    document
      .getElementById("risk-map")
      ?.scrollIntoView({
        behavior: "smooth",
      });

  };


  const scrollToAlerts = () => {

    document
      .getElementById("alerts")
      ?.scrollIntoView({
        behavior: "smooth",
      });

  };


  const openHazard = (hazard) => {

    setSelectedHazard(hazard);

    setTimeout(() => {

      document
        .getElementById("hazard-information")
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }, 100);

  };


  return (
    <div className="dashboard">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-icon">
            🌍
          </div>

          <div>

            <h1>
              DISASTER-X
            </h1>

            <span>
              Multi-Hazard Intelligence Platform
            </span>

          </div>

        </div>


        <div className="header-actions">

          <button
            className="header-button"
            onClick={scrollToAlerts}
          >
            🔔 Alerts
          </button>

          <button
            className="header-button"
            onClick={scrollToMap}
          >
            🗺️ Explore Map
          </button>

        </div>

      </header>


      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="live-badge">

            <span className="live-dot"></span>

            LIVE DISASTER AWARENESS

          </div>


          <h2>

            Understand risk.

            <br />

            <span>
              Act before disaster.
            </span>

          </h2>


          <p>

            One intelligent platform to understand
            floods, cyclones, tsunamis, earthquakes,
            landslides, fires and droughts.

          </p>


          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={scrollToMap}
            >
              🗺️ Explore Risk Map
            </button>


            <button
              className="secondary-button"
              onClick={scrollToAlerts}
            >
              🚨 Emergency Alerts
            </button>

          </div>

        </div>


        <div className="hero-score">

          <span>
            OVERALL DEMO RISK
          </span>

          <strong>
            68
          </strong>

          <div className="risk-high">
            HIGH
          </div>

          <small>
            Demonstration score
          </small>

        </div>

      </section>


      {/* =================================================
          STATS
      ================================================= */}

      <section className="stats-grid">

        <div className="stat-card">

          <span>
            🚨 Active Alerts
          </span>

          <strong>
            12
          </strong>

          <small>
            3 critical
          </small>

        </div>


        <div className="stat-card">

          <span>
            🌍 Hazards
          </span>

          <strong>
            7
          </strong>

          <small>
            Multi-hazard monitoring
          </small>

        </div>


        <div className="stat-card">

          <span>
            👥 People Potentially Exposed
          </span>

          <strong>
            1.2M
          </strong>

          <small>
            Demonstration estimate
          </small>

        </div>


        <div className="stat-card">

          <span>
            🏥 Emergency Resources
          </span>

          <strong>
            428
          </strong>

          <small>
            Demonstration database
          </small>

        </div>

      </section>


      {/* =================================================
          HAZARD CENTER
      ================================================= */}

      <section className="section">

        <div className="section-heading">

          <div>

            <span>
              HAZARD CENTER
            </span>

            <h2>
              Explore Every Hazard
            </h2>

          </div>

          <p>
            Click any hazard to see what to do
            before, during and after the event.
          </p>

        </div>


        <div className="hazard-grid">

          {hazards.map((hazard) => (

            <button
              className="hazard-card"
              key={hazard.id}
              onClick={() =>
                openHazard(hazard)
              }
            >

              <div className="hazard-top">

                <div className="hazard-icon">
                  {hazard.icon}
                </div>

                <span
                  className="risk-pill"
                  style={{
                    color:
                      hazard.color,
                    background:
                      `${hazard.color}20`,
                  }}
                >
                  {hazard.level}
                </span>

              </div>


              <h3>
                {hazard.name}
              </h3>


              <div className="risk-number">

                {hazard.risk}

                <small>
                  /100
                </small>

              </div>


              <div className="risk-bar">

                <div
                  style={{
                    width:
                      `${hazard.risk}%`,
                    background:
                      hazard.color,
                  }}
                />

              </div>


              <span className="explore-text">

                Click for safety guide →

              </span>

            </button>

          ))}

        </div>

      </section>


      {/* =================================================
          HAZARD INFORMATION
      ================================================= */}

      {selectedHazard && (

        <div
          id="hazard-information"
        >

          <HazardInformation
            hazard={selectedHazard}
            onClose={() =>
              setSelectedHazard(null)
            }
          />

        </div>

      )}


      {/* =================================================
          ALERTS
      ================================================= */}

      <section
        className="section"
        id="alerts"
      >

        <div className="section-heading">

          <div>

            <span>
              EMERGENCY CENTER
            </span>

            <h2>
              Latest Alerts
            </h2>

          </div>

        </div>


        <div className="alerts-grid">


          <div className="alert-card critical">

            <div className="alert-symbol">
              🚨
            </div>

            <div>

              <span>
                CRITICAL
              </span>

              <h3>
                Flood Risk Increasing
              </h3>

              <p>
                Demonstration alert:
                water levels are being monitored.
              </p>

              <small>
                8 minutes ago
              </small>

            </div>

            <button
              onClick={() =>
                openHazard(
                  hazards[0]
                )
              }
            >
              Details →
            </button>

          </div>


          <div className="alert-card warning">

            <div className="alert-symbol">
              🌀
            </div>

            <div>

              <span>
                HIGH
              </span>

              <h3>
                Cyclone Monitoring
              </h3>

              <p>
                Coastal conditions are being monitored.
              </p>

              <small>
                21 minutes ago
              </small>

            </div>

            <button
              onClick={() =>
                openHazard(
                  hazards[1]
                )
              }
            >
              Details →
            </button>

          </div>


          <div className="alert-card moderate">

            <div className="alert-symbol">
              🔥
            </div>

            <div>

              <span>
                HIGH
              </span>

              <h3>
                Fire Risk Monitoring
              </h3>

              <p>
                Elevated fire risk in monitored areas.
              </p>

              <small>
                42 minutes ago
              </small>

            </div>

            <button
              onClick={() =>
                openHazard(
                  hazards[5]
                )
              }
            >
              Details →
            </button>

          </div>

        </div>

      </section>


      {/* =================================================
          ANALYTICS
      ================================================= */}

      <section className="section">

        <div className="section-heading">

          <div>

            <span>
              ANALYTICS
            </span>

            <h2>
              Risk Intelligence
            </h2>

          </div>

        </div>


        <div className="charts-grid">


          <div className="chart-card">

            <h3>
              7-Day Risk Trend
            </h3>

            <ResponsiveContainer
              width="100%"
              height={280}
            >

              <LineChart
                data={trendData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#ef4444"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>


          <div className="chart-card">

            <h3>
              Hazard Comparison
            </h3>

            <ResponsiveContainer
              width="100%"
              height={280}
            >

              <BarChart
                data={hazards}
                layout="vertical"
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  stroke="#94a3b8"
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={80}
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Bar
                  dataKey="risk"
                  fill="#ef4444"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </section>


      {/* =================================================
          MAP
      ================================================= */}

      <section
        className="map-section"
        id="risk-map"
      >

        <div className="map-heading">

          <span>
            GEOSPATIAL INTELLIGENCE
          </span>

          <h2>
            Disaster Risk Map
          </h2>

          <p>
            Search a location or use your current location.
            Click a hazard on the map for details.
          </p>

        </div>


        <div className="map-wrapper">

          <MapContainer
            center={[
              20.5937,
              78.9629,
            ]}
            zoom={5}
            scrollWheelZoom={true}
            className="risk-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <MapControls
              searchText={
                searchText
              }
              setSearchText={
                setSearchText
              }
              setUserLocation={
                setUserLocation
              }
              setSearchedLocation={
                setSearchedLocation
              }
            />


            {/* HAZARD ZONES */}

            {hazards.map(
              (hazard) => (

                <div
                  key={hazard.id}
                >

                  <Circle
                    center={[
                      hazard.lat,
                      hazard.lng,
                    ]}
                    radius={
                      hazard.risk >= 75
                        ? 90000
                        : hazard.risk >= 60
                        ? 60000
                        : 40000
                    }
                    pathOptions={{
                      color:
                        hazard.color,
                      fillColor:
                        hazard.color,
                      fillOpacity:
                        0.13,
                      weight: 2,
                    }}
                  />


                  <CircleMarker
                    center={[
                      hazard.lat,
                      hazard.lng,
                    ]}
                    radius={10}
                    pathOptions={{
                      color:
                        hazard.color,
                      fillColor:
                        hazard.color,
                      fillOpacity:
                        0.95,
                    }}
                    eventHandlers={{
                      click: () =>
                        openHazard(
                          hazard
                        ),
                    }}
                  >

                    <Popup>

                      <div className="popup">

                        <div className="popup-icon">
                          {hazard.icon}
                        </div>

                        <h3>
                          {hazard.name}
                        </h3>

                        <strong
                          style={{
                            color:
                              hazard.color,
                          }}
                        >
                          {hazard.level}
                          {" "}
                          —{" "}
                          {hazard.risk}/100
                        </strong>

                        <p>
                          {hazard.description}
                        </p>

                        <button
                          className="popup-button"
                          onClick={() =>
                            openHazard(
                              hazard
                            )
                          }
                        >
                          View Complete Safety Guide
                        </button>

                      </div>

                    </Popup>

                  </CircleMarker>

                </div>

              )
            )}


            {/* SEARCHED LOCATION */}

            {searchedLocation && (

              <CircleMarker
                center={[
                  searchedLocation.lat,
                  searchedLocation.lng,
                ]}
                radius={8}
                pathOptions={{
                  color:
                    "#2563eb",
                  fillColor:
                    "#3b82f6",
                  fillOpacity: 1,
                }}
              >

                <Popup>

                  <strong>
                    📍{" "}
                    {searchedLocation.name}
                  </strong>

                  <p>
                    Location selected.
                  </p>

                  <p>
                    Review all 7 hazard categories
                    above for disaster-awareness
                    information.
                  </p>

                </Popup>

              </CircleMarker>

            )}


            {/* USER LOCATION */}

            {userLocation && (

              <CircleMarker
                center={
                  userLocation
                }
                radius={13}
                pathOptions={{
                  color:
                    "#1d4ed8",
                  fillColor:
                    "#3b82f6",
                  fillOpacity: 1,
                }}
              >

                <Popup>

                  <strong>
                    📍 Your Location
                  </strong>

                  <p>
                    The blue marker represents
                    your current browser location.
                  </p>

                </Popup>

              </CircleMarker>

            )}

          </MapContainer>


          {/* MAP LEGEND */}

          <div className="map-legend">

            <strong>
              RISK LEVEL
            </strong>

            <div>
              <i className="legend-dot red"></i>
              Critical / High
            </div>

            <div>
              <i className="legend-dot orange"></i>
              Moderate
            </div>

            <div>
              <i className="legend-dot yellow"></i>
              Lower
            </div>

            <div>
              <i className="legend-dot blue"></i>
              Selected Location
            </div>

          </div>


          {/* LOCATION SUMMARY */}

          {searchedLocation && (

            <div className="location-summary">

              <span>
                LOCATION
              </span>

              <strong>
                📍{" "}
                {searchedLocation.name}
              </strong>

              <small>
                7 hazard categories available
              </small>

            </div>

          )}

        </div>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer>

        <div>

          <strong>
            DISASTER-X
          </strong>

          <span>
            Multi-hazard disaster awareness platform
          </span>

        </div>

        <span>
          Demonstration data — not an emergency warning system
        </span>

      </footer>

    </div>
  );
}