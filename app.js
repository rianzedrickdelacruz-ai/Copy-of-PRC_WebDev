const navItems = [
  ["dashboard", '<i class="iconoir-view-grid"></i>', "Dashboard"],
  ["donors", '<i class="iconoir-group"></i>', "Donors Registry"],
  ["units", '<i class="iconoir-droplet"></i>', "Blood Units"],
  ["distribution", '<i class="iconoir-delivery-truck"></i>', "Hospital Distribution"],
  ["reports", '<i class="iconoir-reports"></i>', "Reports & Audit"],
  ["settings", '<i class="iconoir-settings"></i>', "System Settings"]
];

const ROLE_PERMISSIONS = {
  "System Admin": ["dashboard", "donors", "units", "distribution", "reports", "settings"],
  "Blood Bank Officer": ["dashboard", "units", "distribution", "reports", "settings"],
  "Lab Technician": ["dashboard", "donors", "units", "reports", "settings"]
};

function hasAccess(pageId) {
  const role = currentUser?.role || "System Admin";
  const allowed = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS["System Admin"];
  return allowed.includes(pageId);
}

let donors = [
  ["Juan Dela Cruz", "#DN-88421", "Regular Donor", "AB+", "Sept. 11, 2026", "Qualified"],
  ["Maria Santos", "#DN-88422", "Mobile Drive", "O+", "Sept. 11, 2026", "Qualified"],
  ["Paolo Reyes", "#DN-88423", "Red Cross Walk-in", "A+", "Sept. 11, 2026", "Qualified"],
  ["Angela Lim", "#DN-88424", "Hospital Referred", "B+", "Sept. 10, 2026", "Qualified"],
  ["Miguel Garcia", "#DN-88425", "Routine Intake", "AB+", "Sept. 10, 2026", "Processing"],
  ["Sofia Mendoza", "#DN-88426", "Lab Screening Phase", "O-", "Sept. 10, 2026", "Processing"],
  ["Rafael Torres", "#DN-88427", "Serology In-Progress", "A-", "Sept. 09, 2026", "Processing"],
  ["Elena Ramos", "#DN-88428", "Low Hemoglobin (11.2 g/dL)", "B-", "Sept. 09, 2026", "Deferred"],
  ["Carlos Bautista", "#DN-88429", "Recent Antibiotics Course", "O+", "Sept. 08, 2026", "Deferred"],
  ["Isabella Cruz", "#DN-88430", "Annual Apheresis", "AB-", "Sept. 08, 2026", "Qualified"]
];

let units = [
  ["#BU-98201", "Juan Dela Cruz", "#DN-88421", "AB+", "Whole Blood (450ml)", "Sept. 11, 2026", "Oct. 16, 2026", "Vault Bay A-02", "Available"],
  ["#BU-98202", "Maria Santos", "#DN-88422", "O+", "Packed Red Blood Cells (PRC)", "Sept. 11, 2026", "Oct. 23, 2026", "Cold Room #1", "Available"],
  ["#BU-98203", "Paolo Reyes", "#DN-88423", "A+", "Fresh Frozen Plasma (FFP)", "Sept. 11, 2026", "Sept. 11, 2027", "Ultra-Cold #3 (-30°C)", "Available"],
  ["#BU-98204", "Angela Lim", "#DN-88424", "B+", "Platelet Concentrate", "Sept. 11, 2026", "Sept. 16, 2026", "Agitator Room B", "Reserved"],
  ["#BU-98205", "Miguel Garcia", "#DN-88425", "AB+", "Whole Blood (450ml)", "Sept. 11, 2026", "Oct. 16, 2026", "Lab Screening Bay", "Processing"],
  ["#BU-98206", "Sofia Mendoza", "#DN-88426", "O-", "Cryoprecipitate", "Sept. 11, 2026", "Sept. 11, 2027", "Ultra-Cold #1", "Processing"],
  ["#BU-98207", "Rafael Torres", "#DN-88427", "A-", "Whole Blood (450ml)", "Sept. 11, 2026", "Oct. 16, 2026", "Quarantine Vault", "Processing"],
  ["#BU-98208", "Elena Ramos", "#DN-88428", "B-", "Packed Red Blood Cells (PRC)", "Sept. 11, 2026", "Oct. 23, 2026", "Cold Room #2", "Available"]
];

let requests = [
  ["REQ-9910", "Bicol Medical Center", "Juan Dela Cruz (Trauma Surgery)", "AB+", "4 Units (PRBC)", "Sept. 11, 2026 · 08:14 AM", "STAT Emergency", "Distributed"],
  ["REQ-9911", "Naga City General Hospital", "Juan Dela Cruz (Cardiovascular)", "O+", "6 Units (Whole)", "Sept. 11, 2026 · 09:30 AM", "High Priority", "Distributed"],
  ["REQ-9912", "Mother Seton Hospital", "Juan Dela Cruz (Oncology Day-Care)", "A+", "2 Units (Platelets)", "Sept. 11, 2026 · 10:05 AM", "Urgent", "Processing"],
  ["REQ-9913", "NICC Doctors Hospital", "Juan Dela Cruz (Orthopedic OT)", "B+", "8 Units (PRBC)", "Sept. 11, 2026 · 10:48 AM", "Routine Surgery", "Processing"],
  ["REQ-9914", "Bicol Access Health Centrum", "Juan Dela Cruz (Burn ICU)", "AB+", "3 Units (FFP)", "Sept. 11, 2026 · 11:12 AM", "STAT Emergency", "Not Yet Started"],
  ["REQ-9915", "St. John Hospital", "Juan Dela Cruz (Infectious Wards)", "O-", "5 Units (Whole)", "Sept. 11, 2026 · 11:35 AM", "Scheduled", "Distributed"],
  ["REQ-9916", "Bicol Medical Center", "Juan Dela Cruz (Thoracic Clinic)", "A-", "2 Units (Cryo)", "Sept. 11, 2026 · 11:58 AM", "Routine", "Distributed"]
];

const auditEvents = [
  ["AUD-4920", "Sept. 11, 2026 · 14:32", "Officer Cruz", "Donor Intake Verified", "Juan Dela Cruz #DN-88421", "AB+", "#BU-98201", "SHA256:f9a...c84", "Verified"],
  ["AUD-4919", "Sept. 11, 2026 · 13:45", "Officer Cruz", "Serology Clearance", "Maria Santos #DN-88422", "O+", "#BU-98202", "SHA256:3c1...8df", "Verified"],
  ["AUD-4918", "Sept. 11, 2026 · 12:15", "Officer Cruz", "Hospital Dispatch Release", "Bicol Medical Center", "AB+", "#BU-98190", "SHA256:e1a...54a", "Verified"],
  ["AUD-4917", "Sept. 11, 2026 · 11:02", "Lab Tech Santos", "Secondary Testing Flag", "Sofia Mendoza #DN-88426", "O-", "#BU-98206", "SHA256:99f0...31e", "Processing"],
  ["AUD-4916", "Sept. 11, 2026 · 09:20", "Officer Cruz", "Donor Deferral Logged", "Elena Ramos #DN-88428", "B-", "Low Hemoglobin", "SHA256:aa2...190", "Deferred"]
];

const app = document.querySelector("#app");
let page = "login";
let currentUser = null;
let donorTab = "All Donors";
let unitTab = "All Units";
let requestTab = "All Requests";
let activeReportChart = "audit";
let pageSearchValue = "";
const pagination = Object.create(null);
const PAGE_SIZE = 5;
let dispatchMap = null;
let dispatchUserMarker = null;
let darkMode = localStorage.getItem("darkMode") === "true";

function userInitials(name) {
  return (name || "OC").split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

function header(login = false) {
  const showBrandSubtitle = login || page === "login";
  const fullName = escapeHtml(currentUser?.fullName || "Officer Cruz");
  const role = escapeHtml(currentUser?.role || "System Admin");
  const initials = escapeHtml(userInitials(currentUser?.fullName));
  return `<header class="${login ? "login-top" : "topbar"}">
    <div class="brand"><img class="seal" src="assets/red-cross-logo.png" onerror="this.onerror=null;this.src='red-cross-logo.png'" alt="Philippine Red Cross logo"><div><div class="brand-title">DIGITAL BLOOD DONOR &amp; BLOOD BANK REGISTRY SYSTEM</div>${showBrandSubtitle ? `<div class="brand-subtitle">NATIONAL TRANSFUSION REGISTRY &amp; DISTRIBUTION NETWORK</div>` : ""}</div></div>
    ${login ? `<span class="top-spacer"></span><button class="btn" data-action="emergency">● &nbsp;Emergency Blood Need</button>` :
      `<label class="global-search">⌕ <input id="globalSearch" placeholder="Search donors, blood units, hospitals..."></label><div class="top-spacer"></div><div class="hotline"><i></i>Hotline: 24/7 Transfusion Active</div><div class="account"><div class="avatar">${initials}</div><div>${fullName}<small>${role}</small></div></div>`}
  </header>`;
}

function sidebar() {
  const allowedNav = navItems.filter(([id]) => hasAccess(id));
  return `<aside class="sidebar"><div class="nav-label">TRANSFUSION SERVICES</div><nav class="nav-list">${allowedNav.map(([id, icon, label]) => `<button class="nav-item ${page === id ? "active" : ""}" data-page="${id}"><span class="nav-icon">${icon}</span>${label}${id === "units" ? `<span class="badge">${formatCount(units.length)}</span>` : ""}</button>`).join("")}</nav><button class="nav-item signout" data-action="logout"><span class="nav-icon"><i class="iconoir-log-out"></i></span>Sign Out</button></aside>`;
}

function shell(content) {
  if (dispatchMap) {
    dispatchMap.remove();
    dispatchMap = null;
    dispatchUserMarker = null;
  }
  app.innerHTML = `${header()}<div class="layout">${sidebar()}<main class="main">${content}<footer class="panel-footer" style="margin-top:26px;background:transparent;justify-content:center;text-align:center"><span>● &nbsp;Philippine Red Cross - Camarines Sur Chapter · All rights reserved.</span></footer></main></div>`;
}

function heading(eyebrow, title, lead, actions = "") {
  return `<section class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}</div><div class="heading-actions">${actions}</div></section>`;
}

function stat(label, value, unit, note, icon, percent = null) {
  const bar = percent === null ? "" : `<div class="progress"><span style="width:${Math.max(0, Math.min(100, percent))}%"></span></div>`;
  return `<article class="stat"><div class="stat-top">${label}<span class="stat-icon">${icon}</span></div><div class="stat-value">${value} <small>${unit}</small></div>${bar}${note ? `<div class="stat-note">${note}</div>` : ""}</article>`;
}

function parseRegistryDate(value) {
  const match = /^([A-Za-z]+)\.?\s+(\d{1,2}),\s+(\d{4})$/.exec(value || "");
  if (!match) return null;
  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const month = monthNames.findIndex(name => match[1].toLowerCase().startsWith(name));
  return month < 0 ? null : new Date(Number(match[3]), month, Number(match[2]));
}

function registryStats() {
  const latestDonation = donors.reduce((latest, donor) => {
    const date = parseRegistryDate(donor[4]);
    return date && (!latest || date > latest) ? date : latest;
  }, null);
  const sameDayDonations = latestDonation
    ? donors.filter(donor => parseRegistryDate(donor[4])?.getTime() === latestDonation.getTime()).length
    : 0;
  const qualifiedDonors = donors.filter(donor => donor[5] === "Qualified").length;
  const availableUnits = units.filter(unit => unit[8] === "Available").length;
  const processingUnits = units.filter(unit => unit[8] === "Processing").length;
  const reservedUnits = units.filter(unit => unit[8] === "Reserved").length;
  const latestCollection = units.reduce((latest, unit) => {
    const date = parseRegistryDate(unit[5]);
    return date && (!latest || date > latest) ? date : latest;
  }, null);
  const expiringUnits = units.filter(unit => {
    const expiry = parseRegistryDate(unit[6]);
    const daysUntilExpiry = expiry && latestCollection
      ? (expiry.getTime() - latestCollection.getTime()) / 86400000
      : Infinity;
    return daysUntilExpiry >= 0 && daysUntilExpiry <= 7;
  }).length;
  const distributedRequests = requests.filter(request => request[7] === "Distributed").length;
  const processingRequests = requests.filter(request => request[7] === "Processing").length;
  const notStartedRequests = requests.filter(request => request[7] === "Not Yet Started").length;
  const urgentRequests = requests.filter(request =>
    request[7] !== "Distributed" && /urgent|stat emergency/i.test(request[6])
  ).length;
  const allocatedUnits = requests.reduce((total, request) => total + (Number(/\d+/.exec(request[4])?.[0]) || 0), 0);
  const auditVerified = auditEvents.filter(event => event[8] === "Verified").length;
  const auditPending = auditEvents.filter(event => event[8] === "Processing").length;
  const auditDeferred = auditEvents.filter(event => event[8] === "Deferred").length;
  const discardedEvents = auditEvents.filter(event => /discard|wastage/i.test(event[3])).length;
  return {
    latestDonation, sameDayDonations, qualifiedDonors,
    availableUnits, processingUnits, reservedUnits, expiringUnits, latestCollection,
    distributedRequests, processingRequests, notStartedRequests, urgentRequests,
    allocatedUnits, auditVerified, auditPending, auditDeferred, discardedEvents
  };
}

function formatCount(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function reportChartData() {
  const countBy = (records, index, categories) =>
    categories.map(([label, value, color]) => [
      label,
      records.filter(record => record[index] === value).length,
      color
    ]);
  const charts = {
    audit: ["Audit event status", countBy(auditEvents, 8, [
      ["Verified", "Verified", "blue"],
      ["In review", "Processing", "yellow"],
      ["Deferred", "Deferred", "red"]
    ])],
    inventory: ["Blood unit status", countBy(units, 8, [
      ["Available", "Available", "blue"],
      ["Processing", "Processing", "yellow"],
      ["Reserved", "Reserved", "red"]
    ])]
  };
  if (hasAccess("donors")) {
    charts.donors = ["Donor clearance", countBy(donors, 5, [
      ["Qualified", "Qualified", "blue"],
      ["Processing", "Processing", "yellow"],
      ["Deferred", "Deferred", "red"]
    ])];
  }
  if (hasAccess("distribution")) {
    charts.requests = ["Hospital request status", countBy(requests, 7, [
      ["Distributed", "Distributed", "blue"],
      ["Processing", "Processing", "yellow"],
      ["Not started", "Not Yet Started", "red"]
    ])];
  }
  return charts[activeReportChart] || charts.audit;
}

function renderReportChart() {
  const availableCharts = [["audit", "Audit"]];
  if (hasAccess("donors")) availableCharts.push(["donors", "Donors"]);
  availableCharts.push(["inventory", "Inventory"]);
  if (hasAccess("distribution")) availableCharts.push(["requests", "Requests"]);

  if (!availableCharts.some(([key]) => key === activeReportChart)) {
    activeReportChart = "audit";
  }

  const [title, values] = reportChartData();
  const max = Math.max(1, ...values.map(([, count]) => count));
  const total = values.reduce((sum, [, count]) => sum + count, 0);
  const buttons = availableCharts.map(([key, label]) =>
    `<button class="chip ${activeReportChart === key ? "active" : ""}" data-chart="${key}" aria-pressed="${activeReportChart === key}">${label}</button>`
  ).join("");
  const bars = values.map(([label, count, color]) => {
    const height = count ? Math.max(8, count / max * 100) : 0;
    return `<div class="chart-column"><strong class="chart-count">${formatCount(count)}</strong><div class="chart-track"><div class="bar ${color}" role="img" aria-label="${label}: ${count} of ${total}" title="${label}: ${count} of ${total}" style="height:${height}%"></div></div><span>${label}</span></div>`;
  }).join("");
  return `<section class="info-card"><h2>${title}</h2><p>Live counts from connected database · ${formatCount(total)} records</p><div class="chart-controls" role="group" aria-label="Choose chart data">${buttons}</div><div class="report-chart" role="img" aria-label="${title}, ${values.map(([label, count]) => `${label}: ${count}`).join(", ")}">${bars}</div></section>`;
}

function status(text) {
  const cls = /deferred|not yet/i.test(text) ? "red" : /process|pending|reserved/i.test(text) ? "yellow" : /transit|verified/i.test(text) ? "blue" : "";
  return `<span class="status ${cls}">${escapeHtml(text)}</span>`;
}

function panel(title, content, subtitle = "") {
  return `<section class="panel"><div class="panel-title"><div><h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ""}</div><div class="panel-tools"><button class="table-action" data-action="export" title="Export">⇩</button><button class="table-action" data-action="filter" title="Filter">▽</button></div></div>${content}</section>`;
}

function pagedRecords(records, key, pageSize = PAGE_SIZE) {
  const pageCount = Math.max(1, Math.ceil(records.length / pageSize));
  const currentPage = Math.min(Math.max(1, pagination[key] || 1), pageCount);
  pagination[key] = currentPage;
  const start = (currentPage - 1) * pageSize;
  return { records: records.slice(start, start + pageSize), currentPage, pageCount, start };
}

function pager(key, total, itemLabel) {
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, pagination[key] || 1), pageCount);
  pagination[key] = currentPage;
  const start = total ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const end = Math.min(currentPage * PAGE_SIZE, total);
  const firstPage = Math.max(1, Math.min(currentPage - 2, pageCount - 4));
  const lastPage = Math.min(pageCount, firstPage + 4);
  const pageButtons = [];
  if (firstPage > 1) pageButtons.push(`<span class="pager-ellipsis">…</span>`);
  for (let pageNumber = firstPage; pageNumber <= lastPage; pageNumber++) {
    pageButtons.push(`<button class="btn small ${pageNumber === currentPage ? "primary" : ""}" data-pager="${key}" data-page-number="${pageNumber}" aria-label="Page ${pageNumber}" ${pageNumber === currentPage ? 'aria-current="page"' : ""}>${pageNumber}</button>`);
  }
  if (lastPage < pageCount) pageButtons.push(`<span class="pager-ellipsis">…</span>`);
  return `<div class="panel-footer"><span>Showing ${formatCount(start)}–${formatCount(end)} of ${formatCount(total)} ${itemLabel}</span><div class="pager" aria-label="Table pages"><button class="btn small" data-pager="${key}" data-page-number="${currentPage - 1}" aria-label="Previous page" ${currentPage <= 1 ? "disabled" : ""}>Previous</button>${pageButtons.join("")}<button class="btn small" data-pager="${key}" data-page-number="${currentPage + 1}" aria-label="Next page" ${currentPage >= pageCount ? "disabled" : ""}>Next</button></div></div>`;
}

function tabs(items, active, key) {
  return `<div class="chip-row">${items.map(x => `<button class="chip ${active === x || x.startsWith(`${active} (`) ? "active" : ""}" data-tab="${key}" data-value="${x}">${x}</button>`).join("")}</div>`;
}

function loginPage() {
  app.innerHTML = `<div class="login-screen">${header(true)}<main class="login-space"><form id="loginForm" class="login-card"><div class="login-emblem">🩸</div><h1>Welcome Back, User!</h1><p class="lead">Sign in to your blood bank management account</p><div class="field"><label for="username">Username</label><input id="username" name="username" autocomplete="username" value="juandelacruz7" placeholder="Enter your username" required></div><div class="field"><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" placeholder="Enter your password" required></div><div class="login-meta"><label><input type="checkbox" name="remember"> Remember device for 30 days</label><a href="#" data-action="forgot">Forgot password?</a></div><button type="submit" class="btn primary submit">Sign In to System &nbsp; →</button><div class="login-links">Don’t have a registered account yet? <button type="button" data-action="register">Register as User</button></div></form></main><footer class="login-footer">© 2026 Digital Blood Donor &amp; Blood Bank Registry System &nbsp; • &nbsp; PRC - Camarines Sur Chapter &nbsp;　 Privacy &amp; Policy &nbsp;　 24/7 Hotline: (054) 884 9114</footer></div>
  <dialog id="registerDialog" class="request-dialog"><form id="registerForm" class="request-form"><div class="popover-heading"><div><strong>Register User Account</strong><small>Create an authorized staff login in the database</small></div><button type="button" class="popover-close" data-action="close-dialog" aria-label="Close">×</button></div><label class="field"><span>Full Name</span><input name="fullName" maxlength="120" placeholder="e.g. Officer Cruz" required></label><label class="field"><span>Role / Position</span><select name="role" required><option>System Admin</option><option>Blood Bank Officer</option><option>Lab Technician</option></select></label><label class="field"><span>Username</span><input name="username" maxlength="60" placeholder="Choose a username" required></label><label class="field"><span>Password</span><input name="password" type="password" minlength="6" placeholder="At least 6 characters" required></label><div class="request-form-actions"><button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Create Account</button></div></form></dialog>`;
}

function dashboard() {
  const role = currentUser?.role || "System Admin";
  const stats = registryStats();
  const dispatchRate = requests.length ? Math.round(stats.distributedRequests / requests.length * 100) : 0;

  let headerActions = "";
  if (hasAccess("donors")) {
    headerActions += '<button class="btn primary" data-action="new-donor">＋ Register New Donor</button>';
  } else if (hasAccess("distribution")) {
    headerActions += '<button class="btn primary" data-action="new-request">⊕ New Hospital Request</button>';
  } else if (hasAccess("units")) {
    headerActions += '<button class="btn primary" data-action="new-unit">⊕ Register Unit Intake</button>';
  }

  let statCards = "";
  if (role === "Blood Bank Officer") {
    statCards = `${stat("Hospital Dispatches", formatCount(requests.length), "requests", `${formatCount(stats.distributedRequests)} distributed · ${dispatchRate}% fulfillment`, '<i class="iconoir-delivery-truck"></i>', dispatchRate)}${stat("Current Reserve", formatCount(units.length), "blood units", "", '<i class="iconoir-database"></i>')}${stat("Units Available", formatCount(stats.availableUnits), "units ready", "Ready for hospital cross-match", '<i class="iconoir-droplet-check"></i>')}${stat("Urgent Requests", formatCount(stats.urgentRequests), "urgent", "Undistributed STAT requests", '<i class="iconoir-warning-triangle"></i>')}`;
  } else if (role === "Lab Technician") {
    statCards = `${stat("Verified Donors", formatCount(stats.qualifiedDonors), "donors", "Qualified intake records", '<i class="iconoir-user-badge-check"></i>')}${stat("Current Reserve", formatCount(units.length), "blood units", "", '<i class="iconoir-database"></i>')}${stat("Units in Testing", formatCount(stats.processingUnits), "quarantine", "Pending serology clearance", '<i class="iconoir-flask"></i>')}${stat("Critical Expiration", formatCount(stats.expiringUnits), "within 7 days", "Watch list", '<i class="iconoir-timer"></i>')}`;
  } else {
    statCards = `${stat("Total Patients", formatCount(requests.length), "patients", "", '<i class="iconoir-heart"></i>')}${stat("Hospital Dispatches", formatCount(requests.length), "requests", `${formatCount(stats.distributedRequests)} distributed · ${dispatchRate}% fulfillment`, '<i class="iconoir-delivery-truck"></i>', dispatchRate)}${stat("Current Reserve", formatCount(units.length), "blood units", "", '<i class="iconoir-database"></i>')}${stat("Qualified Donors", formatCount(stats.qualifiedDonors), "donors", "", '<i class="iconoir-badge-check"></i>')}`;
  }

  let panels = "";
  if (hasAccess("donors")) {
    const donorPage = pagedRecords(donors, "dashboard-donors");
    const rows = donorPage.records.map(d => `<tr><td><span class="person"><span class="mini-avatar">${escapeHtml(d[0].split(" ").map(x => x[0]).join("").slice(0, 2))}</span>${escapeHtml(d[0])}</span></td><td><span class="blood">${escapeHtml(d[3])}</span></td><td>${escapeHtml(d[4])}</td><td>${status(d[5])}</td><td><button class="table-action" data-action="view">View</button></td></tr>`).join("");
    panels += panel("● &nbsp;Blood Donation Summary", `<div class="table-wrap"><table><thead><tr><th>Name</th><th>Blood Type</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows || '<tr><td colspan="5">No donor records found.</td></tr>'}</tbody></table></div>${pager("dashboard-donors", donors.length, "donor records")}`);
  }
  if (hasAccess("distribution")) {
    const requestPage = pagedRecords(requests, "dashboard-requests");
    const dist = requestPage.records.map(r => `<tr><td>${escapeHtml(r[1])}</td><td><span class="blood">${escapeHtml(r[3])}</span></td><td>${escapeHtml(r[5].split(" · ")[0])}</td><td>${status(r[7])}</td><td><button class="table-action" data-page="distribution">Dispatch</button></td></tr>`).join("");
    panels += panel("● &nbsp;Distribution Summary", `<div class="table-wrap"><table><thead><tr><th>Hospital</th><th>Requested</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${dist || '<tr><td colspan="5">No hospital requests found.</td></tr>'}</tbody></table></div>${pager("dashboard-requests", requests.length, "distribution requests")}`);
  }

  shell(`${heading("● &nbsp;Central Operations Console", `Welcome, ${escapeHtml(currentUser?.fullName || "Officer Cruz")}!`, "", headerActions)}
    <div class="stats">${statCards}</div>
    ${panels}
    <dialog id="donorDialog" class="request-dialog"><form id="donorForm" class="request-form"><div class="popover-heading"><div><strong>Register Donor</strong><small>Save a donor record to the connected database</small></div><button type="button" class="popover-close" data-action="close-dialog" aria-label="Close">×</button></div><label class="field"><span>Full name</span><input name="fullName" maxlength="160" placeholder="e.g. Juan Dela Cruz" required></label><label class="field"><span>Donor type / source</span><input name="donorType" maxlength="100" placeholder="e.g. Regular Donor" required></label><label class="field"><span>Blood type</span><select name="bloodType" required><option value="">Select blood type</option>${["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map(t => `<option>${t}</option>`).join("")}</select></label><label class="field"><span>Last donation date</span><input name="lastDonationDate" type="date"></label><label class="field"><span>Clearance status</span><select name="status" required><option>Processing</option><option>Qualified</option><option>Deferred</option></select></label><div class="request-form-actions"><button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Save Donor</button></div></form></dialog>
    <dialog id="requestDialog" class="request-dialog"><form id="requestForm" class="request-form"><div class="popover-heading"><div><strong>New Hospital Request</strong><small>Save request to connected database</small></div><button type="button" class="popover-close" data-action="close-dialog" aria-label="Close">×</button></div><label class="field"><span>Hospital Name</span><input name="hospitalName" maxlength="160" placeholder="e.g. Bicol Medical Center" required></label><label class="field"><span>Receiving Doctor / Service</span><input name="receivingDoctor" maxlength="160" placeholder="e.g. Dr. Santos" required></label><label class="field"><span>Blood Type</span><select name="bloodType" required><option value="">Select Blood Type</option>${["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map(t => `<option>${t}</option>`).join("")}</select></label><label class="field"><span>Units Ordered</span><input name="unitsOrdered" type="number" min="1" max="99" required></label><label class="field"><span>Component</span><input name="component" placeholder="e.g. PRBC" required></label><label class="field"><span>Urgency / Priority</span><select name="urgency" required><option>Routine</option><option>Urgent</option><option>STAT Emergency</option></select></label><div class="request-form-actions"><button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Save Request</button></div></form></dialog>`);
}

function donorPage() {
  const stats = registryStats();
  const donorTabs = [`All Donors (${formatCount(donors.length)})`, `Qualified (${formatCount(stats.qualifiedDonors)})`, `Processing (${formatCount(donors.filter(d => d[5] === "Processing").length)})`, `Deferred (${formatCount(donors.filter(d => d[5] === "Deferred").length)})`];
  let list = donors.filter(d => donorTab === "All Donors" || d[5] === donorTab.replace(/ \(.+\)/, ""));
  const search = pageSearchValue.toLowerCase();
  if (search) list = list.filter(d => d.join(" ").toLowerCase().includes(search));
  const current = pagedRecords(list, "donors");
  const rows = current.records.map(d => `<tr><td><span class="person"><span class="mini-avatar">${escapeHtml(d[0].split(" ").map(x => x[0]).join("").slice(0, 2))}</span><span>${escapeHtml(d[0])}<small class="subtext">ID: ${escapeHtml(d[1])} · ${escapeHtml(d[2])}</small></span></span></td><td><span class="blood">${escapeHtml(d[3])}</span></td><td>${escapeHtml(d[4])}</td><td>${status(d[5])}</td><td><button class="table-action" data-action="view">View　···</button></td></tr>`).join("");
  shell(`${heading("Registry Repository · Donor Directory", "Donor List", "Manage verified blood donors, eligibility clearances, scheduled donations and deferred logs.", '<button class="btn" data-action="export">⇩ Export Directory</button><button class="btn primary" data-action="new-donor">＋ Register New Donor</button>')}
  <section class="panel filter-panel">${tabs(donorTabs, donorTab === "All Donors" ? donorTabs[0] : donorTab, "donors")}<div class="filters"><input id="pageSearch" placeholder="⌕  Search name, donor ID..."><select><option>All Blood Types</option><option>AB+</option><option>AB-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option></select><select><option>All Statuses</option><option>Qualified</option><option>Processing</option><option>Deferred</option></select><input type="date" value="2026-09-11"></div></section>
  ${panel("● &nbsp;Verified Donors Directory", `<div class="table-wrap"><table><thead><tr><th>Name</th><th>Blood Type</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows || '<tr><td colspan="5">No donors match the selected filters.</td></tr>'}</tbody></table></div>${pager("donors", list.length, "donor records")}`, "Sample records")}
  <dialog id="donorDialog" class="request-dialog"><form id="donorForm" class="request-form"><div class="popover-heading"><div><strong>Register Donor</strong><small>Save a donor record to the connected database</small></div><button type="button" class="popover-close" data-action="close-dialog" aria-label="Close">×</button></div><label class="field"><span>Full name</span><input name="fullName" maxlength="160" placeholder="e.g. Juan Dela Cruz" required></label><label class="field"><span>Donor type / source</span><input name="donorType" maxlength="100" placeholder="e.g. Regular Donor" required></label><label class="field"><span>Blood type</span><select name="bloodType" required><option value="">Select blood type</option>${["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map(t => `<option>${t}</option>`).join("")}</select></label><label class="field"><span>Last donation date</span><input name="lastDonationDate" type="date"></label><label class="field"><span>Clearance status</span><select name="status" required><option>Processing</option><option>Qualified</option><option>Deferred</option></select></label><div class="request-form-actions"><button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Save Donor</button></div></form></dialog>`);
}

function unitsPage() {
  const stats = registryStats();
  const totalUnits = units.length;
  const availableRate = totalUnits ? Math.round(stats.availableUnits / totalUnits * 100) : 0;
  const bloodGroups = [...new Set(units.map(unit => unit[3]))]
    .map(group => `${group} ${units.filter(unit => unit[3] === group).length}`)
    .join(" · ");
  const snapshotLabel = stats.latestCollection?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) || "latest collection date";
  let list = units.filter(u => unitTab === "All Units" ||
    (unitTab.startsWith("Available") && u[8] === "Available") ||
    (unitTab.startsWith("Processing") && u[8] === "Processing") ||
    (unitTab.startsWith("Reserved") && u[8] === "Reserved"));
  const search = pageSearchValue.toLowerCase();
  if (search) list = list.filter(u => u.join(" ").toLowerCase().includes(search));
  const current = pagedRecords(list, "units");
  const rows = current.records.map(u => `<tr><td><strong>${escapeHtml(u[0])}</strong><small class="subtext">▦ Barcode</small></td><td>${escapeHtml(u[1])}<small class="subtext">ID: ${escapeHtml(u[2])}</small></td><td><span class="blood">${escapeHtml(u[3])}</span></td><td>${escapeHtml(u[4])}</td><td>${escapeHtml(u[5])}</td><td>${escapeHtml(u[6])}</td><td>${escapeHtml(u[7])}</td><td>${status(u[8])}</td><td><button class="table-action" data-action="view">View</button></td></tr>`).join("");
  const qualifiedDonors = donors.filter(d => d[5] === "Qualified");
  shell(`${heading("Registry Repository · Blood Inventory Management", "Blood Units Inventory", "Active blood unit stock, component separation, cold-chain storage status, and expiration tracker.", '<button class="btn blue" data-action="export">⇩ Export Inventory Report</button><button class="btn primary" data-action="new-unit">⊕ Register Unit Intake</button>')}
    <div class="stats">${stat("Blood Units Stored", formatCount(totalUnits), "units", "", '<i class="iconoir-packages"></i>')}${stat("Units Available", formatCount(stats.availableUnits), `${availableRate}% of records`, "Ready for hospital cross-match", '<i class="iconoir-droplet-check"></i>', availableRate)}${stat("Processing / Quarantine", formatCount(stats.processingUnits), "units", `${stats.reservedUnits} reserved unit${stats.reservedUnits === 1 ? "" : "s"}`, '<i class="iconoir-flask"></i>', totalUnits ? Math.round(stats.processingUnits / totalUnits * 100) : 0)}${stat("Critical Expiration Watch", formatCount(stats.expiringUnits), "within 7 days", `Calculated from the latest collection date (${snapshotLabel})`, '<i class="iconoir-timer"></i>')}</div>
    <section class="panel filter-panel">${tabs([`All Units (${formatCount(totalUnits)})`, `Available (${formatCount(stats.availableUnits)})`, `Processing / Testing (${formatCount(stats.processingUnits)})`, `Reserved (${formatCount(stats.reservedUnits)})`], unitTab === "All Units" ? `All Units (${formatCount(totalUnits)})` : unitTab, "units")}<div class="filters"><input id="pageSearch" placeholder="⌕  Search Unit ID, Donor Name, Blood Type..."><select><option>All Blood Types</option><option>AB+</option><option>AB-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option></select><select><option>Component: All Types</option><option>Whole Blood</option><option>Packed Red Blood Cells (PRC)</option><option>Fresh Frozen Plasma (FFP)</option><option>Platelet Concentrate</option><option>Cryoprecipitate</option></select><select><option>Storage: All Locations</option><option>Cold Room</option><option>Vault Bay</option><option>Ultra-Cold</option></select><select><option>Any Expiration</option><option>Within 7 days</option></select></div></section>
    ${panel("Blood Inventory · Unit Registry", `<div class="table-wrap"><table><thead><tr><th>Unit ID</th><th>Donor Name &amp; Record</th><th>Blood Type</th><th>Component Type</th><th>Collection Date</th><th>Expiry Date</th><th>Storage Location</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows || '<tr><td colspan="9">No units match the selected filters.</td></tr>'}</tbody></table></div>${pager("units", list.length, "blood units")}`)}
    <dialog id="unitDialog" class="request-dialog"><form id="unitForm" class="request-form"><div class="popover-heading"><div><strong>Register Blood Unit</strong><small>Save blood unit to connected database</small></div><button type="button" class="popover-close" data-action="close-dialog" aria-label="Close">×</button></div><label class="field"><span>Qualified Donor</span><select name="donorId" required><option value="">Select Qualified Donor</option>${qualifiedDonors.map(d => `<option value="${escapeHtml(d[6] || d[1])}">${escapeHtml(d[0])} (${escapeHtml(d[3])})</option>`).join("")}</select></label><label class="field"><span>Component</span><select name="component" required><option>Whole Blood (450ml)</option><option>Packed Red Blood Cells (PRC)</option><option>Fresh Frozen Plasma (FFP)</option><option>Platelet Concentrate</option><option>Cryoprecipitate</option></select></label><label class="field"><span>Collection Date</span><input name="collectionDate" type="date" required></label><label class="field"><span>Expiry Date</span><input name="expiryDate" type="date" required></label><label class="field"><span>Storage Location</span><input name="storageLocation" placeholder="e.g. Vault Bay A-02" required></label><div class="request-form-actions"><button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Save Unit</button></div></form></dialog>`);
}

function distributionPage() {
  const stats = registryStats();
  const dispatchRate = requests.length ? Math.round(stats.distributedRequests / requests.length * 100) : 0;
  const requestTabs = [`All Requests (${formatCount(requests.length)})`, `Distributed (${formatCount(stats.distributedRequests)})`, `Processing (${formatCount(stats.processingRequests)})`, `Not Yet Started (${formatCount(stats.notStartedRequests)})`];
  let list = requests.filter(r => requestTab === "All Requests" || r[7] === requestTab);
  const search = pageSearchValue.toLowerCase();
  if (search) list = list.filter(r => r.join(" ").toLowerCase().includes(search));
  const current = pagedRecords(list, "distribution");
  const rows = current.records.map(r => `<tr><td><strong>${escapeHtml(r[0])}</strong></td><td><strong>${escapeHtml(r[1])}</strong><small class="subtext">Attn: ${escapeHtml(r[2])}</small></td><td><span class="blood">${escapeHtml(r[3])}</span></td><td>${escapeHtml(r[4])}</td><td>${escapeHtml(r[5])}</td><td>${escapeHtml(r[6])}</td><td>${status(r[7])}</td><td><button class="table-action" data-action="dispatch" data-id="${escapeHtml(r[8] || r[0])}">DISPATCH</button></td></tr>`).join("");
  shell(`${heading("Registry Repository · Hospital Logistics & Dispatch", "Hospital Distribution", "Manage hospital transfusion requests, emergency blood dispatches, fulfillment status, and delivery couriers.", '<button class="btn primary" data-action="new-request">⊕ New Hospital Request</button><button class="btn blue" data-action="export">⇩ Export Log</button>')}
    <div class="stats">${stat("Hospital Requests", formatCount(requests.length), "in sample", `${new Set(requests.map(request => request[1])).size} distinct hospitals`, '<i class="iconoir-hospital"></i>')}${stat("Processing Requests", formatCount(stats.processingRequests), "in progress", `${formatCount(stats.notStartedRequests)} not yet started`, '<i class="iconoir-flask"></i>')}${stat("Pending Urgent Allocations", formatCount(stats.urgentRequests), "urgent", "Undistributed urgent / STAT requests", '<i class="iconoir-warning-triangle"></i>')}${stat("Units Requested", formatCount(stats.allocatedUnits), "units", `${formatCount(stats.distributedRequests)} of ${formatCount(requests.length)} requests distributed`, '<i class="iconoir-droplet"></i>', dispatchRate)}</div>
    <section class="info-card"><h2>Units Dispatched Breakdown</h2><p>PRBC 96 units　Whole 44　Platelets 26　Cryo/FFP 18</p><div class="progress"><span style="width:52%"></span></div><p>Standard blood preservation unit · CPA-1 Verified</p></section>
    <section class="panel filter-panel">${tabs(requestTabs, requestTab === "All Requests" ? requestTabs[0] : requestTab, "distribution")}<div class="filters"><input id="pageSearch" placeholder="⌕  Search hospital, requisition ID, receiving doctor..."><select><option>Urgency: All Priorities</option><option>STAT Emergency</option></select><select><option>Blood Group: All Types</option></select><select><option>Facility Tier: All Facilities</option></select></div></section>
    ${panel("Hospital Dispatch Requests", `<div class="table-wrap"><table><thead><tr><th>Requisition ID</th><th>Hospital Name</th><th>Requested Blood Type</th><th>Units Ordered</th><th>Requisition Date</th><th>Urgency / Priority</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows || '<tr><td colspan="8">No requests match the selected filters.</td></tr>'}</tbody></table></div>${pager("distribution", list.length, "hospital requests")}`)}
    <dialog id="requestDialog" class="request-dialog"><form id="requestForm" class="request-form"><div class="popover-heading"><div><strong>New Hospital Request</strong><small>Save request to connected database</small></div><button type="button" class="popover-close" data-action="close-dialog" aria-label="Close">×</button></div><label class="field"><span>Hospital Name</span><input name="hospitalName" maxlength="160" placeholder="e.g. Bicol Medical Center" required></label><label class="field"><span>Receiving Doctor / Service</span><input name="receivingDoctor" maxlength="160" placeholder="e.g. Dr. Santos" required></label><label class="field"><span>Blood Type</span><select name="bloodType" required><option value="">Select Blood Type</option>${["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"].map(t => `<option>${t}</option>`).join("")}</select></label><label class="field"><span>Units Ordered</span><input name="unitsOrdered" type="number" min="1" max="99" required></label><label class="field"><span>Component</span><input name="component" placeholder="e.g. PRBC" required></label><label class="field"><span>Urgency / Priority</span><select name="urgency" required><option>Routine</option><option>Urgent</option><option>STAT Emergency</option></select></label><div class="request-form-actions"><button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Save Request</button></div></form></dialog>`);
}

function reportsPage() {
  const role = currentUser?.role || "System Admin";
  const stats = registryStats();
  const deferredDonors = donors.filter(donor => donor[5] === "Deferred").length;

  let reportStats = "";
  if (role === "Blood Bank Officer") {
    reportStats = `${stat("Hospital Requests", formatCount(requests.length), "requests", "Total hospital orders", '<i class="iconoir-hospital"></i>')}${stat("Blood Units in Inventory", formatCount(units.length), "units", "Current registry inventory", '<i class="iconoir-database"></i>')}${stat("Available for Dispatch", formatCount(stats.availableUnits), "units ready", "Ready for hospital cross-match", '<i class="iconoir-droplet-check"></i>')}${stat("Finished Hospital Requests", formatCount(stats.distributedRequests), "requests", "Successfully distributed requests", '<i class="iconoir-check-circle"></i>')}`;
  } else if (role === "Lab Technician") {
    reportStats = `${stat("Verified Donors", formatCount(stats.qualifiedDonors), "donors", "Qualified donor records", '<i class="iconoir-user-badge-check"></i>')}${stat("Blood Units in Inventory", formatCount(units.length), "units", "Current registry inventory", '<i class="iconoir-database"></i>')}${stat("Deferred Donors", formatCount(deferredDonors), "donors", "Donor records requiring follow-up", '<i class="iconoir-warning-circle"></i>')}${stat("Units in Testing", formatCount(stats.processingUnits), "units", "Quarantined / in processing", '<i class="iconoir-flask"></i>')}`;
  } else {
    reportStats = `${stat("Verified Donors", formatCount(stats.qualifiedDonors), "donors", "Qualified donor records", '<i class="iconoir-user-badge-check"></i>')}${stat("Blood Units in Inventory", formatCount(units.length), "units", "Current registry inventory", '<i class="iconoir-database"></i>')}${stat("Deferred Donors", formatCount(deferredDonors), "donors", "Donor records requiring follow-up", '<i class="iconoir-warning-circle"></i>')}${stat("Finished Hospital Requests", formatCount(stats.distributedRequests), "requests", "Successfully distributed requests", '<i class="iconoir-check-circle"></i>')}`;
  }

  shell(`${heading("System Intelligence · Reports & Audit", "Registry Summary", "", "")}
    <div class="stats">${reportStats}</div>
    <div style="margin-top:20px">${renderReportChart()}</div>`);
}

function settingsPage() {
  const fullName = escapeHtml(currentUser?.fullName || "Officer Cruz");
  const role = escapeHtml(currentUser?.role || "System Administrator");
  const username = escapeHtml(currentUser?.username || "officer.cruz");
  const initials = escapeHtml(userInitials(currentUser?.fullName));
  shell(`${heading("Configuration · User Preferences", "System Settings", "Manage account information, session preferences, and display settings.", '<button class="btn" data-action="logout"><i class="iconoir-log-out"></i> Sign Out</button>')}
    <div class="settings-grid"><div>
      <section class="info-card"><h2><i class="iconoir-user"></i> User Information</h2><p>Your registry account details.</p><div class="setting-row"><div><strong>${fullName}</strong><small>${role}</small></div><span class="avatar">${initials}</span></div><div class="field"><label>Username</label><input value="${username}" readonly></div><div class="field"><label>Assigned Facility</label><input value="PRC - Camarines Sur Chapter" readonly></div></section>
    </div><aside>    <section class="info-card"><h2><i class="iconoir-settings"></i> Session &amp; Display Settings</h2>${setting("Dark Mode", "Use a darker color theme throughout the registry.", darkMode, "", "dark-mode")}<button class="btn" style="width:100%;margin-top:15px" data-action="logout"><i class="iconoir-log-out"></i> Sign Out of Registry</button></section></aside></div>`);
}

function setting(title, description, checked, value = "", action = "") {
  return `<div class="setting-row"><div><strong>${title}</strong><small>${description}</small>${value ? `<small><b>${value}</b></small>` : ""}</div><button type="button" class="toggle-switch${checked ? " active" : ""}"${action ? ` data-action="${action}"` : ""} aria-label="${title}" aria-pressed="${checked}">${checked ? "ON" : "OFF"}</button></div>`;
}

function render() {
  applyTheme();
  if (page === "login") return loginPage();
  if (!hasAccess(page)) {
    page = "dashboard";
    showToast("Access denied: your role does not have permission for this module.");
  }
  if (page === "dashboard") return dashboard();
  if (page === "donors") return donorPage();
  if (page === "units") return unitsPage();
  if (page === "distribution") return distributionPage();
  if (page === "reports") return reportsPage();
  if (page === "settings") return settingsPage();
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", darkMode);
}

function renderKeepingSearch() {
  render();
  const input = document.querySelector("#pageSearch");
  if (input) input.value = pageSearchValue;
}

app.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");
  const pagerButton = event.target.closest("[data-pager]");
  const tab = event.target.closest("[data-tab]");
  const chart = event.target.closest("[data-chart]");
  const action = event.target.closest("[data-action]");

  if (pagerButton && !pagerButton.disabled) {
    pagination[pagerButton.dataset.pager] = Number(pagerButton.dataset.pageNumber);
    renderKeepingSearch();
    return;
  }
  if (pageButton) {
    const targetPage = pageButton.dataset.page;
    if (!hasAccess(targetPage)) {
      showToast("Access denied: your role does not have permission for this module.");
      return;
    }
    page = targetPage;
    render();
    return;
  }
  if (chart) {
    activeReportChart = chart.dataset.chart;
    renderKeepingSearch();
    return;
  }
  if (tab) {
    const value = tab.dataset.value;
    if (tab.dataset.tab === "donors") donorTab = value.startsWith("All") ? "All Donors" : value.replace(/ \(.+\)/, "");
    if (tab.dataset.tab === "units") unitTab = value.startsWith("All") ? "All Units" : value;
    if (tab.dataset.tab === "distribution") requestTab = value.startsWith("All") ? "All Requests" : value.replace(/ \(.+\)/, "");
    if (tab.dataset.tab === "donors") pagination.donors = 1;
    if (tab.dataset.tab === "units") pagination.units = 1;
    if (tab.dataset.tab === "distribution") pagination.distribution = 1;
    renderKeepingSearch(); return;
  }
  if (action) {
    if (action.dataset.action === "export") { exportVisibleTable(); return; }
    if (action.dataset.action === "dark-mode") {
      darkMode = !darkMode;
      localStorage.setItem("darkMode", String(darkMode));
      render();
      return;
    }
    if (action.dataset.action === "locate-map") { locateOnMap(); return; }
    if (action.dataset.action === "logout") { logoutUser(); return; }
    if (action.dataset.action === "register") { document.querySelector("#registerDialog")?.showModal(); return; }
    if (action.dataset.action === "new-donor") { document.querySelector("#donorDialog")?.showModal(); return; }
    if (action.dataset.action === "new-unit") { document.querySelector("#unitDialog")?.showModal(); return; }
    if (action.dataset.action === "new-request") { document.querySelector("#requestDialog")?.showModal(); return; }
    if (action.dataset.action === "close-dialog") {
      document.querySelector("#donorDialog")?.close();
      document.querySelector("#unitDialog")?.close();
      document.querySelector("#requestDialog")?.close();
      document.querySelector("#registerDialog")?.close();
      return;
    }
    if (action.dataset.action === "dispatch") {
      updateRequestStatus(action.dataset.id);
      return;
    }
    const messages = { view: "Donor record is verified in the connected database.", save: "Settings preferences saved.", emergency: "Emergency Mass Casualty protocol broadcast alert activated." };
    showToast(messages[action.dataset.action] || "Action completed.");
  }
});

app.addEventListener("input", event => {
  if (event.target.id === "pageSearch") {
    const position = event.target.selectionStart;
    const value = event.target.value;
    pageSearchValue = value;
    if (page === "donors") pagination.donors = 1;
    if (page === "units") pagination.units = 1;
    if (page === "distribution") pagination.distribution = 1;
    if (page === "reports") pagination.reports = 1;
    render();
    const next = document.querySelector("#pageSearch");
    if (next) { next.value = value; next.focus(); next.setSelectionRange(position, position); }
  }
});

app.addEventListener("keydown", event => {
  if (event.target.id === "globalSearch" && event.key === "Enter") {
    const value = event.target.value;
    page = "donors";
    render();
    const input = document.querySelector("#pageSearch");
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
});

app.addEventListener("submit", event => {
  if (event.target.id === "loginForm") {
    event.preventDefault();
    loginUser(new FormData(event.target));
  }
  if (event.target.id === "registerForm") {
    event.preventDefault();
    registerUser(new FormData(event.target));
  }
  if (event.target.id === "donorForm") {
    event.preventDefault();
    createDonor(new FormData(event.target));
  }
  if (event.target.id === "unitForm") {
    event.preventDefault();
    createUnit(new FormData(event.target));
  }
  if (event.target.id === "requestForm") {
    event.preventDefault();
    createRequest(new FormData(event.target));
  }
});

function showToast(message) {
  document.querySelector(".toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  setTimeout(() => toast.remove(), 2600);
}

function locateOnMap() {
  if (!dispatchMap) {
    showToast("The map is not available.");
    return;
  }
  if (!navigator.geolocation) {
    showToast("This browser does not support location access.");
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    const point = [position.coords.latitude, position.coords.longitude];
    dispatchMap.setView(point, 15);
    if (dispatchUserMarker) dispatchUserMarker.setLatLng(point);
    else dispatchUserMarker = L.marker(point).addTo(dispatchMap);
    dispatchUserMarker.bindPopup("Your current location").openPopup();
  }, error => {
    const message = error.code === error.PERMISSION_DENIED ? "Location permission was denied." :
      error.code === error.POSITION_UNAVAILABLE ? "Your location is currently unavailable." :
        "Location lookup timed out. Please try again.";
    showToast(message);
  }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
}

function exportVisibleTable() {
  const table = document.querySelector(".main table");
  if (!table) { showToast("There is no table on this page to export."); return; }
  const csv = [...table.rows].map(row => [...row.cells].map(cell => `"${cell.innerText.replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `${page}-registry.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("Visible table exported as CSV.");
}

/* Database API Connections */
async function apiRequest(path, options = {}) {
  try {
    const response = await fetch(path, options);
    const text = await response.text();
    const result = text ? JSON.parse(text) : {};
    if (!response.ok) throw new Error(result.error || `Error ${response.status}`);
    return result;
  } catch (err) {
    throw err;
  }
}

async function loadData() {
  if (hasAccess("donors")) {
    try {
      const d = await apiRequest("donor_registry.php");
      if (Array.isArray(d) && d.length) {
        donors = d.map(x => [x.fullName, x.donorCode, x.donorType, x.bloodType, x.lastDonationDate || "—", x.status, x.id]);
      }
    } catch { }
  }
  if (hasAccess("units")) {
    try {
      const u = await apiRequest("blood_unit.php");
      if (Array.isArray(u) && u.length) {
        units = u.map(x => [x.unitCode, x.donorName, x.donorCode, x.bloodType, x.component, x.collectionDate, x.expiryDate, x.storageLocation, x.status, x.id]);
      }
    } catch { }
  }
  if (hasAccess("distribution")) {
    try {
      const r = await apiRequest("hospital_distribution.php");
      if (Array.isArray(r) && r.length) {
        requests = r.map(x => [x.requisitionId, x.hospitalName, x.receivingDoctor, x.bloodType, `${x.unitsOrdered} Units (${x.component})`, x.requestedAt, x.urgency, x.status, x.id]);
      }
    } catch { }
  }
  render();
}

async function loginUser(formData) {
  const btn = document.querySelector("#loginForm button[type=submit]");
  if (btn) btn.disabled = true;
  try {
    const res = await apiRequest("auth.php?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    currentUser = res.user;
    page = "dashboard";
    showToast(`Welcome back, ${currentUser.fullName}!`);
    await loadData();
  } catch (err) {
    showToast(err.message || "Invalid username or password.");
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function registerUser(formData) {
  try {
    const payload = Object.fromEntries(formData);
    await apiRequest("auth.php?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    document.querySelector("#registerDialog")?.close();
    showToast("User account created! Sign in now.");
    const uInput = document.querySelector("#username");
    if (uInput) uInput.value = payload.username;
  } catch (err) {
    showToast(err.message || "Registration failed.");
  }
}

async function logoutUser() {
  await apiRequest("auth.php?action=logout", { method: "POST" }).catch(() => { });
  currentUser = null;
  page = "login";
  render();
  showToast("Signed out.");
}

async function createDonor(formData) {
  try {
    await apiRequest("donor_registry.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    document.querySelector("#donorDialog")?.close();
    showToast("Donor saved to database!");
    await loadData();
  } catch (err) {
    showToast("Failed to save donor: " + err.message);
  }
}

async function createUnit(formData) {
  try {
    await apiRequest("blood_unit.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    document.querySelector("#unitDialog")?.close();
    showToast("Blood unit saved to database!");
    await loadData();
  } catch (err) {
    showToast("Failed to save blood unit: " + err.message);
  }
}

async function createRequest(formData) {
  try {
    await apiRequest("hospital_distribution.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    document.querySelector("#requestDialog")?.close();
    showToast("Hospital request saved to database!");
    await loadData();
  } catch (err) {
    showToast("Failed to save request: " + err.message);
  }
}

async function updateRequestStatus(id) {
  if (!id || !window.confirm("Mark this request as dispatched?")) return;
  try {
    await apiRequest(`hospital_distribution.php?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Distributed" })
    });
    showToast("Request marked as dispatched in database.");
    await loadData();
  } catch (err) {
    showToast("Dispatch update failed: " + err.message);
  }
}

async function checkSession() {
  try {
    const res = await apiRequest("auth.php?action=me");
    if (res.user) {
      currentUser = res.user;
      page = "dashboard";
      await loadData();
      return;
    }
  } catch { }
  render();
}

checkSession();
