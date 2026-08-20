import { useParams, Link } from "react-router-dom";

const hazards = {
  flood: {
    name: "Flood",
    icon: "🌊",
    risk: 72,
    level: "HIGH",
    description:
      "Flooding happens when water covers normally dry land. Heavy rainfall, river overflow, poor drainage and storm surges can cause floods.",
    causes: [
      "Heavy rainfall",
      "River overflow",
      "Poor drainage",
      "Storm surge",
      "Dam failure",
    ],
    warning: [
      "Rapidly rising water",
      "Continuous heavy rainfall",
      "River level increasing",
      "Water entering roads",
    ],
    safety: [
      "Move to higher ground",
      "Never walk or drive through flood water",
      "Keep emergency supplies ready",
      "Follow official evacuation instructions",
    ],
  },

  cyclone: {
    name: "Cyclone",
    icon: "🌀",
    risk: 64,
    level: "HIGH",
    description:
      "A cyclone is a powerful rotating storm that can produce strong winds, heavy rainfall, storm surge and flooding.",
    causes: [
      "Warm ocean water",
      "Low atmospheric pressure",
      "High moisture",
      "Favourable wind conditions",
    ],
    warning: [
      "Increasing wind speed",
      "Heavy rainfall",
      "Falling atmospheric pressure",
      "Official cyclone warnings",
    ],
    safety: [
      "Stay indoors when instructed",
      "Secure loose objects",
      "Keep emergency supplies ready",
      "Move to an official shelter if ordered",
    ],
  },

  tsunami: {
    name: "Tsunami",
    icon: "🌊",
    risk: 38,
    level: "MODERATE",
    description:
      "A tsunami is a series of powerful ocean waves usually caused by underwater earthquakes or other large disturbances.",
    causes: [
      "Underwater earthquake",
      "Volcanic activity",
      "Underwater landslide",
    ],
    warning: [
      "Strong coastal earthquake",
      "Sudden sea withdrawal",
      "Unusual ocean sounds",
      "Official tsunami warning",
    ],
    safety: [
      "Move inland or to higher ground",
      "Never go to the coast to watch waves",
      "Follow evacuation routes",
      "Wait for official all-clear information",
    ],
  },

  earthquake: {
    name: "Earthquake",
    icon: "🌎",
    risk: 51,
    level: "MODERATE",
    description:
      "An earthquake is sudden ground shaking caused by movement inside the Earth's crust.",
    causes: [
      "Tectonic plate movement",
      "Fault movement",
      "Volcanic activity",
    ],
    warning: [
      "Ground shaking",
      "Objects falling",
      "Structural cracking",
      "Aftershocks",
    ],
    safety: [
      "Drop, Cover and Hold On",
      "Stay away from windows",
      "Do not use elevators",
      "Move to an open area after shaking stops",
    ],
  },

  landslide: {
    name: "Landslide",
    icon: "⛰️",
    risk: 59,
    level: "MODERATE",
    description:
      "A landslide occurs when soil, rocks or debris move rapidly down a slope.",
    causes: [
      "Heavy rainfall",
      "Steep slopes",
      "Soil instability",
      "Deforestation",
    ],
    warning: [
      "Ground cracks",
      "Tilting trees",
      "Tilting poles",
      "Unusual sounds",
    ],
    safety: [
      "Move away from unstable slopes",
      "Avoid landslide zones",
      "Follow evacuation instructions",
      "Report dangerous ground movement",
    ],
  },

  fire: {
    name: "Fire",
    icon: "🔥",
    risk: 67,
    level: "HIGH",
    description:
      "Wildfires and other fires can spread rapidly depending on temperature, wind, humidity and available fuel.",
    causes: [
      "Dry vegetation",
      "High temperature",
      "Electrical faults",
      "Human activity",
    ],
    warning: [
      "Smoke",
      "Increasing temperature",
      "Fire hotspots",
      "Strong dry winds",
    ],
    safety: [
      "Move away from the fire",
      "Contact emergency services",
      "Avoid smoke-filled areas",
      "Follow evacuation instructions",
    ],
  },

  drought: {
    name: "Drought",
    icon: "☀️",
    risk: 74,
    level: "HIGH",
    description:
      "Drought is a prolonged period of unusually low rainfall that can lead to water shortages and agricultural stress.",
    causes: [
      "Low rainfall",
      "High temperature",
      "Water overuse",
      "Changing climate patterns",
    ],
    warning: [
      "Persistent rainfall shortage",
      "Falling reservoir levels",
      "Dry soil",
      "Reduced groundwater",
    ],
    safety: [
      "Conserve water",
      "Follow local water restrictions",
      "Protect agricultural water",
      "Monitor official drought information",
    ],
  },
};

export default function HazardDetails() {
  const { hazard } = useParams();

  const data = hazards[hazard];

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-white">
        <h1 className="text-3xl font-bold">
          Hazard not found
        </h1>

        <Link
          to="/"
          className="mt-5 inline-block text-red-400"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-6xl">

        <Link
          to="/"
          className="text-slate-400 hover:text-white"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-5xl">
                {data.icon}
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-red-400">
                  Hazard Intelligence
                </p>

                <h1 className="mt-2 text-4xl font-black">
                  {data.name}
                </h1>
              </div>

            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-8 py-5 text-center">

              <p className="text-sm text-slate-400">
                Risk Score
              </p>

              <p className="text-4xl font-black text-red-400">
                {data.risk}
              </p>

              <p className="text-red-400">
                {data.level}
              </p>

            </div>

          </div>

          <p className="mt-8 text-lg leading-8 text-slate-400">
            {data.description}
          </p>

        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <InfoBox
            title="⚠️ Major Causes"
            items={data.causes}
          />

          <InfoBox
            title="👁️ Warning Signs"
            items={data.warning}
          />

        </div>

        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <h2 className="text-2xl font-bold">
            🛡️ Safety Actions
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">

            {data.safety.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-slate-900 p-4 text-slate-300"
              >
                ✓ {item}
              </div>
            ))}

          </div>

        </div>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold">
            🗺️ {data.name} Risk Map
          </h2>

          <p className="mt-2 text-slate-500">
            Interactive 3D map will be added in the next stage.
          </p>

          <div className="mt-6 flex h-80 items-center justify-center rounded-2xl bg-slate-950">

            <div className="text-center">

              <div className="text-6xl">
                🌍
              </div>

              <p className="mt-4 text-lg font-semibold">
                Interactive Map
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Map integration coming next
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoBox({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <div className="mt-5 space-y-3">

        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl bg-slate-800 p-4 text-slate-300"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}