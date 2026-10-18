# QuickNotes

A responsive, client-side note-taking web application built with semantic HTML5, modern CSS3 Flexbox, and vanilla JavaScript. QuickNotes enables users to organize thoughts across customizable categories, search through entries in real time, and persist their notes seamlessly across browser sessions without any external dependencies.

## Features

- **Categorized Notes**: Assign each note to Personal, Work, or Study categories, featuring color-coded visual cards.
- **Client-Side Data Validation**: Prevents blank submissions and enforces a maximum limit of 200 characters with informative inline error prompts.
- **Dynamic Count Tracking**: Displays dynamic counts accurately formatted for zero, singular, and plural states.
- **Real-Time Live Search**: Case-insensitive filtering dynamically matches note contents as you type, providing immediate feedback when no records are found.
- **Local Storage Persistence**: Uses the browser's `localStorage` via JSON serialization to keep notes intact across refreshes and tab closures.
- **Responsive Layout**: Designed mobile-first with CSS Flexbox and media queries that stack form controls cleanly on screens under 600px.
- **Bulk Cleanup**: Includes an optional one-click "Clear All" button with confirmation safeguard.

## How to Run the Project Locally

Because QuickNotes is built entirely with standard web technologies and zero build steps:

1. Clone or download this repository:
   ```bash
   git clone [https://github.com/MordecaiMbithi/quicknotes-app.git](https://github.com/MordecaiMbithi/quicknotes-app.git)
