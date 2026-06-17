const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Project = require(path.join(__dirname, "../models/Project"));

const projects = [
  {
    title: "Office Supplies Bundle",
    category: "B2B · Stationery",
    description:
      "Bulk procurement of office stationery, furniture, and consumables for corporate clients.",
    minOrder: 100,
    unit: "units",
    priceRange: "$2 – $15",
    deadline: "Aug 2026",
    fulfilled: 72,
    total: 500,
    status: "In progress",
    statusColor: "bg-blue-100 text-blue-700",
    tags: ["Office", "Corporate", "Bulk"],
  },
  {
    title: "Branded Merch Pack",
    category: "Corporate · Apparel",
    description:
      "Custom-printed T-shirts, hoodies, and caps with company logos for corporate gifting.",
    minOrder: 50,
    unit: "pcs",
    priceRange: "$8 – $25",
    deadline: "Jul 2026",
    fulfilled: 45,
    total: 200,
    status: "In progress",
    statusColor: "bg-blue-100 text-blue-700",
    tags: ["Apparel", "Branding", "Custom"],
  },
  {
    title: "IT Equipment Tender",
    category: "Enterprise · Tech",
    description:
      "Laptops, monitors, keyboards, and accessories for a government department tender.",
    minOrder: 10,
    unit: "units",
    priceRange: "$200 – $1,200",
    deadline: "Sep 2026",
    fulfilled: 20,
    total: 50,
    status: "Starting",
    statusColor: "bg-yellow-100 text-yellow-700",
    tags: ["Electronics", "Tender", "Government"],
  },
  {
    title: "Medical Supply Kit",
    category: "Healthcare · Supplies",
    description:
      "First-aid kits, PPE, and medical consumables for hospital and clinic procurement.",
    minOrder: 200,
    unit: "kits",
    priceRange: "$5 – $40",
    deadline: "Oct 2026",
    fulfilled: 88,
    total: 1000,
    status: "Near complete",
    statusColor: "bg-green-100 text-green-700",
    tags: ["Healthcare", "Bulk", "Urgent"],
  },
  {
    title: "Restaurant Kitchen Set",
    category: "Hospitality · Equipment",
    description:
      "Commercial kitchen equipment including cookware, utensils, and storage for new restaurant openings.",
    minOrder: 1,
    unit: "set",
    priceRange: "$500 – $3,000",
    deadline: "Dec 2026",
    fulfilled: 5,
    total: 30,
    status: "Starting",
    statusColor: "bg-yellow-100 text-yellow-700",
    tags: ["Hospitality", "Equipment", "Custom"],
  },
  {
    title: "School Uniform Program",
    category: "Education · Apparel",
    description:
      "Uniforms, shoes, and bags for a school district annual supply contract.",
    minOrder: 500,
    unit: "sets",
    priceRange: "$12 – $35",
    deadline: "Jun 2026",
    fulfilled: 95,
    total: 2000,
    status: "Near complete",
    statusColor: "bg-green-100 text-green-700",
    tags: ["Education", "Apparel", "Bulk"],
  },
];

async function seedProjects() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log("MongoDB Connected ✅");
    await Project.deleteMany({});
    console.log("Old projects deleted 🗑️");
    const inserted = await Project.insertMany(projects);
    console.log(`✅ ${inserted.length} projects seeded successfully!`);
    console.log("\nProjects seeded:");
    inserted.forEach((p) => {
      console.log(`  ${p.title} → ${p.status}`);
    });
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seedProjects();
