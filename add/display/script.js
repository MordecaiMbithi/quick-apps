// QuickNotes Application Logic

// Element selectors using querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all-btn");

// Application state
const STORAGE_KEY = "quicknotes_items";
let notes = [];

/**
 * Load notes safely from localStorage
 */
function loadNotes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      notes = JSON.parse(stored);
      if (!Array.isArray(notes)) {
        notes = [];
      }
    } catch {
      notes = [];
    }
  }
}

/**
 * Save notes state to localStorage
 */
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Format timestamp into readable format
 */
function formatCurrentDate() {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/**
 * Update the note count indicator
 */
function updateCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

/**
 * Rebuild the list from the notes array using createElement and textContent
 */
function render(filterTerm = "") {
  // Clear the existing list contents safely
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }

  const cleanedFilter = filterTerm.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(cleanedFilter)
  );

  updateCount(notes.length);

  // If searching and nothing matches
  if (cleanedFilter !== "" && visibleNotes.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "no-notes-message";
    emptyLi.textContent = "No notes match your search.";
    notesList.appendChild(emptyLi);
    return;
  }

  // Build note cards
  visibleNotes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "note-content";

    const textP = document.createElement("p");
    textP.className = "note-text";
    textP.textContent = note.text; // Text assigned using textContent (never innerHTML)

    const metaDiv = document.createElement("div");
    metaDiv.className = "note-meta";

    const categorySpan = document.createElement("span");
    categorySpan.className = "category-badge";
    categorySpan.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.createdAt;

    metaDiv.appendChild(categorySpan);
    metaDiv.appendChild(dateSpan);

    contentDiv.appendChild(textP);
    contentDiv.appendChild(metaDiv);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", `Delete note: ${note.text}`);

    deleteBtn.addEventListener("click", () => {
      deleteNote(note.id);
    });

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

/**
 * Add a new note
 */
function handleAddNote(e) {
  e.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation
  if (text.length === 0) {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear validation errors on success
  errorMessage.textContent = "";

  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: formatCurrentDate()
  };

  notes.unshift(newNote);
  saveNotes();

  // Reset form inputs and search
  noteInput.value = "";
  searchInput.value = "";
  noteInput.focus();

  render();
}

/**
 * Remove an individual note
 */
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render(searchInput.value);
}

/**
 * Clear all notes (Bonus Task)
 */
function handleClearAll() {
  if (notes.length === 0) return;

  const confirmed = window.confirm("Delete all notes?");
  if (confirmed) {
    notes = [];
    saveNotes();
    searchInput.value = "";
    errorMessage.textContent = "";
    render();
  }
}

// Event Listeners
noteForm.addEventListener("submit", handleAddNote);

searchInput.addEventListener("input", (e) => {
  render(e.target.value);
});

clearAllBtn.addEventListener("click", handleClearAll);

// Initialization on load
loadNotes();
render();