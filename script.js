
function showPage(page) {
  const titles = {
    dashboard: "Dashboard Overview",
    students: "Student Directory",
    attendance: "Attendance Center",
    reports: "Attendance Reports",
    timetable: "Class Timetable",
    settings: "Settings"
  };

  if (!titles[page]) return;

  document.querySelectorAll(".page").forEach(section => {
    section.hidden = section.id !== page;
    section.classList.toggle("active-page", section.id === page);
  });

  document.querySelectorAll(".nav-link").forEach(button => {
    const active = button.dataset.page === page;
    button.classList.toggle("active", active);

    if (active) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  $("page-title").textContent = titles[page];
  $("crumb").textContent = titles[page];

  // Close mobile sidebar after navigation.
  $("sidebar").classList.remove("open");

  // Load live data whenever the relevant page opens.
  if (page === "dashboard") loadDashboard();
  if (page === "students") loadStudents();
  if (page === "attendance") loadAttendance();
  if (page === "reports") loadReportStudents();
}

// Mobile sidebar open/close.
function toggleSidebar() {
  $("sidebar").classList.toggle("open");
}

// Save the settings form for the current browser session.
// Authentication and persistent profile storage are not implemented.
function saveSettings() {
  const name = $("setting-name").value.trim();

  if (!name) {
    notify("Please enter a display name.", true);
    return;
  }

  notify("Display name validated. Persistent profile saving is not configured.");
}

// Initial page setup.
$("today-label").textContent = new Date().toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

$("attendance-date").value = today();

loadDashboard();
