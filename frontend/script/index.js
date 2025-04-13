// Global variables to store data and sorting state
let pksData = [];
let currentSortColumn = null;
let isAscending = true;

document.addEventListener("DOMContentLoaded", () => {
  // Login Modal Functionality
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const closeBtn = document.querySelector(".close-btn");
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  // Show modal when login button is clicked
  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
  });

  // Close modal when X is clicked
  closeBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
    errorMessage.style.display = "none";
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === loginModal) {
      loginModal.style.display = "none";
      errorMessage.style.display = "none";
    }
  });

  // Handle form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Static credentials (username: admin, password: admin123)
    if (username === "admin" && password === "admin123") {
      // Redirect to adminview.html if login is successful
      window.location.href = "adminview.html";
    } else {
      // Show error message
      errorMessage.style.display = "block";
    }
  });

  // Load PKS data when page loads
  fetchPKSData();

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  // Search when button is clicked
  searchButton.addEventListener("click", performSearch);

  // Search when typing
  searchInput.addEventListener("input", performSearch);

  // Search when Enter key is pressed
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  // Add sorting functionality to table headers
  setupSorting();
});

// Set up sorting on table headers
function setupSorting() {
  const headers = document.querySelectorAll("th[data-sort]");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const sortKey = header.getAttribute("data-sort");

      // If clicking the same column, toggle sort direction
      if (currentSortColumn === sortKey) {
        isAscending = !isAscending;
      } else {
        currentSortColumn = sortKey;
        isAscending = true;
      }

      // Update header styling
      updateSortHeaderStyles(header);

      // Sort and display data
      sortData(sortKey, isAscending);
    });
  });
}

// Update header styles to show sort direction
function updateSortHeaderStyles(clickedHeader) {
  // Remove all existing sort classes
  document.querySelectorAll("th .sort-icon").forEach((icon) => {
    icon.className = "fas fa-sort sort-icon";
  });

  // Add appropriate class to the clicked header
  const sortIcon = clickedHeader.querySelector(".sort-icon");
  if (isAscending) {
    sortIcon.className = "fas fa-sort-up sort-icon";
  } else {
    sortIcon.className = "fas fa-sort-down sort-icon";
  }
}

// Fetch PKS data from API
async function fetchPKSData() {
  const tableBody = document.getElementById("tableBody");
  const loading = document.getElementById("loading");
  const errorContainer = document.getElementById("errorContainer");

  // Show loading indicator
  loading.style.display = "block";
  errorContainer.style.display = "none";

  try {
    const response = await fetch("http://localhost:3000/api/pks");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Hide loading indicator
    loading.style.display = "none";

    // Check if data exists and is an array
    if (data.success && Array.isArray(data.data)) {
      // Store data globally
      pksData = data.data;

      // Display the data
      displayTableData(pksData);

      // Initial search to handle any existing search term
      performSearch();
    } else {
      document.getElementById("noResults").style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching PKS data:", error);
    loading.style.display = "none";
    errorContainer.textContent = "Error: " + error.message;
    errorContainer.style.display = "block";
  }
}

// Display the table data
function displayTableData(data) {
  const tableBody = document.getElementById("tableBody");

  // Clear existing data
  tableBody.innerHTML = "";

  // Add the rows
  data.forEach((pks) => {
    const row = createTableRow(pks);
    tableBody.appendChild(row);
  });
}

// Create table row for a PKS item
function createTableRow(pks) {
  const row = document.createElement("tr");
  row.setAttribute("data-id", pks._id);

  // Format date
  const tanggal = pks.content?.tanggal
    ? new Date(pks.content.tanggal).toLocaleDateString("id-ID")
    : "-";

  // Store raw date for sorting
  if (pks.content?.tanggal) {
    row.setAttribute("data-date", new Date(pks.content.tanggal).getTime());
  } else {
    row.setAttribute("data-date", 0);
  }

  // Map the API status to our UI status
  let statusClass = "status-draft";
  let statusText = "Draft";

  if (pks.properties?.status) {
    switch (pks.properties.status) {
      case "approved":
        statusClass = "status-disetujui";
        statusText = "Disetujui";
        break;
      case "menunggu review":
        statusClass = "status-review";
        statusText = "Menunggu Review";
        break;
      case "rejected":
        statusClass = "status-ditolak";
        statusText = "Ditolak";
        break;
      case "menunggu dokumen":
        statusClass = "status-menunggu";
        statusText = "Menunggu Dokumen";
        break;
      default:
        statusClass = "status-draft";
        statusText = "Draft";
    }
  }

  // Create table cells based on updated schema
  row.innerHTML = `
 <td>${pks.content?.judul || "-"}</td>
 <td>UPN "Veteran" Yogyakarta</td>
 <td>${pks.pihakKedua?.nama || "-"}</td>
 <td>${tanggal}</td>
 <td><span class="status-container ${statusClass}">${statusText}</span></td>
`;

  return row;
}

// Sort data based on column and direction
function sortData(sortKey, ascending) {
  const sortedData = [...pksData].sort((a, b) => {
    let valueA, valueB;

    // Extract values based on sort key with updated schema
    switch (sortKey) {
      case "judul":
        valueA = a.content?.judul || "";
        valueB = b.content?.judul || "";
        break;
      case "pihakKesatu":
        valueA = 'UPN "Veteran" Yogyakarta'; // Fixed value for first party
        valueB = 'UPN "Veteran" Yogyakarta';
        break;
      case "pihakKedua":
        valueA = a.pihakKedua?.nama || "";
        valueB = b.pihakKedua?.nama || "";
        break;
      case "tanggal":
        // Sort by date numerically
        valueA = a.content?.tanggal ? new Date(a.content.tanggal).getTime() : 0;
        valueB = b.content?.tanggal ? new Date(b.content.tanggal).getTime() : 0;
        break;
      case "status":
        // Sort by status priority
        const statusOrder = {
          approved: 1,
          "menunggu review": 2,
          "menunggu dokumen": 3,
          draft: 4,
          rejected: 5,
        };

        valueA = statusOrder[a.properties?.status || "draft"];
        valueB = statusOrder[b.properties?.status || "draft"];
        break;
      default:
        valueA = "";
        valueB = "";
    }

    // Compare values based on type
    if (typeof valueA === "number" && typeof valueB === "number") {
      return ascending ? valueA - valueB : valueB - valueA;
    } else {
      // String comparison
      valueA = String(valueA).toLowerCase();
      valueB = String(valueB).toLowerCase();
      return ascending
        ? valueA.localeCompare(valueB, "id")
        : valueB.localeCompare(valueA, "id");
    }
  });

  // Display the sorted data
  displayTableData(sortedData);

  // Reapply search filtering
  performSearch();
}

// Perform search on table
function performSearch() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  const tableBody = document.getElementById("tableBody");
  const rows = tableBody.getElementsByTagName("tr");
  const noResults = document.getElementById("noResults");

  let hasResults = false;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    let rowMatches = false;

    // Search in all cells
    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent.toLowerCase();
      if (cellText.includes(searchTerm)) {
        rowMatches = true;
        break;
      }
    }

    if (rowMatches) {
      row.style.display = "";
      hasResults = true;
    } else {
      row.style.display = "none";
    }
  }

  // Show no results message if no matches found
  noResults.style.display = hasResults || searchTerm === "" ? "none" : "block";

  // Visual feedback
  const searchInput = document.getElementById("searchInput");
  searchInput.style.borderColor =
    searchTerm === "" ? "#ddd" : hasResults ? "#4CAF50" : "#F44336";
}
