# README Canvas

<div align="center">
  <img src="https://raw.githubusercontent.com/vercel/next.js/canary/packages/next/src/compiled/react/react.shared-subset.development.js" alt="README Canvas Logo" width="150" style="display: none;">

  <h1>README Canvas</h1>
  <p>A powerful Markdown editor with live preview for creating beautiful README files</p>

  [![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Components](#components)
- [Storage](#storage)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Overview

README Canvas is a modern web application designed to make creating and editing README files for your projects easier and more intuitive. Built with Next.js, TypeScript, and React, it provides a feature-rich Markdown editor with live preview functionality, allowing you to see exactly how your Markdown will appear in real-time.

The application features a dual-pane interface, with a file manager on the left and a powerful editor on the right. It includes a comprehensive collection of predefined Markdown snippets for common README components, such as skills badges, GitHub stats, repository information, layout templates, and more.

## ✨ Features

- **Live Markdown Preview**: See your Markdown rendered in real-time as you type
- **Split-screen View**: Toggle between edit, preview, or split-screen modes
- **File Management**: Create, save, and manage multiple README files
- **Predefined Snippets**: Library of ready-to-use Markdown components
- **Mermaid Support**: Create and preview diagrams with Mermaid syntax
- **Syntax Highlighting**: Code blocks with syntax highlighting for various languages
- **Customizable Editor**: Adjust font size, toggle line numbers, and word wrapping
- **Local Storage**: Files are saved in your browser's local storage
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Shortcuts**: Ctrl+S to save, and more

## 📸 Screenshots


## 🏁 Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vmaspad/readme-canvas.git
cd readme-canvas
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💡 Usage

1. **Creating a new file**: Click the "Create new file" button in the file manager.
2. **Editing content**: Start typing Markdown in the editor.
3. **Saving your work**: Click the "Save" button or press Ctrl+S.
4. **Inserting snippets**: Click the "Components" button to access predefined Markdown snippets.
5. **Adjusting view**: Toggle between edit, preview, or split-screen modes using the buttons in the top toolbar.

## 🧩 Components

### MarkdownWorkspace

The main component that combines the file manager and editor. It handles file selection, creation, and saving, and displays notifications for user actions.

### Editor

A powerful Markdown editor built on Monaco Editor (the same editor used in VS Code) with the following features:
- Live preview using ReactMarkdown
- Syntax highlighting with PrismJS
- Mermaid diagram support
- Customizable settings (font size, line numbers, word wrap)

### FileManager

Manages the list of files stored in the application, allowing users to:
- Create new files
- Select existing files
- See the currently active file

### MarkdownSnippets

A comprehensive library of predefined Markdown snippets organized into categories:
- **Skills/Technologies**: Badges and icons for programming languages and tools
- **GitHub Stats**: Cards showing GitHub statistics
- **Repository Stats**: Information about repositories
- **Badges**: Social media links, project status, donation links
- **Layouts**: Common README layout templates
- **Media**: Images, banners, and logos
- **Graphs**: Mermaid diagrams
- **Code**: Code examples and installation instructions

### MermaidClient

Renders Mermaid diagrams in the preview pane, allowing users to create:
- Flowcharts
- Sequence diagrams
- Gantt charts
- And other diagram types supported by Mermaid

## 💾 Storage

The application uses the browser's local storage to save:
- File content
- File metadata (name, id, etc.)
- Editor settings (font size, line numbers, word wrap)
- Last selected file for session persistence

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
