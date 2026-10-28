
document.addEventListener("DOMContentLoaded", function () {
    const pageTitles = {
      dashboard: "Dashboard Overview",
      students: "Student Directory",
      attendance: "Attendance Center",
      reports: "Attendance Reports",
      timetable: "Class Timetable",
      settings: "Settings"
    };
  
    window.showPage = function (page) {
      if (!pageTitles[page]) return;
  
      document.querySelectorAll(".page").forEach(section => {
        section.hidden = section.id !== page;
      });
  
      document.querySelectorAll(".nav-link").forEach(button => {
        button.classList.toggle("active", button.dataset.page === page);
      });
  
      const title = document.getElementById("page-title");
      const crumb = document.getElementById("crumb");
  
      if (title) title.textContent = pageTitles[page];
      if (crumb) crumb.textContent = pageTitles[page];
  
      document.getElementById("sidebar")?.classList.remove("open");
  
      // Call a loader only if it exists.
      const loaders = {
        dashboard: "loadDashboard",
        students: "loadStudents",
        attendance: "loadAttendance",
        reports: "loadReportStudents"
      };
  
      const loaderName = loaders[page];
      if (loaderName && typeof window[loaderName] === "function") {
        window[loaderName]();
      }
    };
  
    window.toggleSidebar = function () {
      document.getElementById("sidebar")?.classList.toggle("open");
    };
  
    window.toggleForm = function (force) {
      const form = document.getElementById("student-form");
      if (!form) return;
  
      form.hidden = typeof force === "boolean" ? !force : !form.hidden;
    };
  });
  