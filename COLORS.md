# Color Tokens 🎨

GitHub Users Explorer uses a GitHub-inspired color system with Tailwind CSS + CSS variables.

## Color Palette

### Primary (Neutrals)
Used for text, backgrounds, and borders.
- **50**: `#f6f8fa` - Lightest (light mode bg)
- **100**: `#eaeef2`
- **200**: `#d0d7de` - Light mode border
- **300**: `#afb8c1`
- **400**: `#8c959f`
- **500**: `#6e7681`
- **600**: `#57606a` - Dark mode muted text
- **700**: `#444c56`
- **800**: `#30363d` - Dark mode border
- **900**: `#1c2128` - Light mode text
- **950**: `#010409` - Dark mode bg

### Accent (GitHub Blue)
Used for links, buttons, and interactive elements.
- **700**: `#0969da` - Primary accent
- Supporting shades: 50-950 available

### Semantic Colors
Used for specific states and feedback:
- **Success**: `#1a7f0f` (green)
- **Warning**: `#bf8700` (yellow)
- **Error**: `#da3633` (red)
- **Info**: `#0969da` (blue)

## CSS Variables

**Light Mode** (default):
```css
--text: #1c2128;
--text-muted: #57606a;
--bg: #ffffff;
--bg-secondary: #f6f8fa;
--border: #d0d7de;
```

**Dark Mode** (prefers-color-scheme: dark):
```css
--text: #e6edf3;
--text-muted: #8d96a4;
--bg: #0d1117;
--bg-secondary: #010409;
--border: #30363d;
```

## Usage

### Tailwind Classes
```jsx
// Primary colors (neutrals)
<div className="bg-primary-50 text-primary-900">Content</div>

// Accent (GitHub blue)
<button className="bg-accent-700 hover:bg-accent-800 text-white">
  Button
</button>

// Semantic colors
<div className="text-success">Success message</div>
<div className="text-error">Error message</div>
```

### CSS Variables
```jsx
<div style={{ color: 'var(--text)', backgroundColor: 'var(--bg)' }}>
  Content with dynamic colors
</div>
```

## Component Examples

### Button (Primary)
```jsx
<button className="px-4 py-2 bg-accent-700 text-white rounded hover:bg-accent-800">
  Click me
</button>
```

### Card
```jsx
<div className="bg-primary-50 dark:bg-primary-900 p-4 rounded border border-primary-200 dark:border-primary-800">
  Card content
</div>
```

### Input
```jsx
<input 
  className="px-3 py-2 border border-primary-200 dark:border-primary-800 rounded focus:border-accent-700"
  placeholder="Search..."
/>
```

## Design Principles

1. **Accessible**: High contrast ratios for text/background
2. **Consistent**: GitHub-inspired aesthetic matches user expectations
3. **Flexible**: Both light and dark mode support built-in
4. **Maintainable**: Centralized token system for easy updates
5. **Developer-friendly**: Mix of Tailwind classes and CSS variables
