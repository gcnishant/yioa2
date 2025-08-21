# Timeline Component Documentation

## Overview
The timeline component is a dedicated section that displays the organization's key events in chronological order. It automatically scrolls to the most recent event when users scroll to the section, and provides navigation controls for viewing all events. The timeline is completely separate from other sections to ensure clean structure and avoid conflicts.

## Features
- **Auto-scroll**: Automatically scrolls to the most recent event when the section comes into view
- **Navigation**: Left/right arrow buttons for manual navigation
- **Dot indicators**: Clickable dots for direct event selection
- **Keyboard support**: Arrow keys for navigation
- **Responsive design**: Adapts to different screen sizes
- **Easy maintenance**: Simple configuration file for adding/removing events

## How to Add New Events

### 1. Edit the Configuration File
Open `timeline-config.js` and add new events to the `timelineEvents` array:

```javascript
const timelineEvents = [
    // ... existing events ...
    {
        id: 4, // Increment the ID
        date: "2025",
        title: "New Event Title",
        description: "Description of the new event."
    }
];
```

### 2. Event Object Structure
Each event should have:
- `id`: Unique identifier (number)
- `date`: Event date (string)
- `title`: Event title (string)
- `description`: Event description (string)

### 3. Automatic Updates
The timeline will automatically:
- Generate the correct number of navigation dots
- Update navigation button states
- Maintain proper chronological order

## How to Remove Events

Simply delete the event object from the `timeline-config.js` file. The timeline will automatically adjust.

## Customization

### Styling
Modify the CSS in `style.css` under the "Timeline Styles" section to change:
- Colors
- Sizes
- Animations
- Layout

### Behavior
Modify the JavaScript in `app.js` under the "Timeline Component Functionality" section to change:
- Animation timing
- Navigation behavior
- Auto-scroll triggers

## Technical Details

### Files Involved
- `index.html`: Contains the timeline section HTML structure
- `timeline-config.js`: Configuration file for events
- `style.css`: Timeline section styling
- `app.js`: Timeline functionality and event handling

### Dependencies
- Font Awesome for navigation icons
- Modern browser support for CSS transforms and transitions

### Browser Support
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Intersection Observer API for auto-scroll functionality

## Troubleshooting

### Timeline Not Appearing
- Check that `timeline-config.js` is loaded before `app.js`
- Verify the configuration array is properly formatted
- Check browser console for JavaScript errors

### Events Not Loading
- Ensure the `timelineEvents` array is properly defined
- Check that the HTML structure matches the expected selectors
- Verify the configuration file is being loaded correctly

### Styling Issues
- Check CSS specificity conflicts
- Verify all timeline classes are properly defined
- Ensure responsive breakpoints are appropriate

## Future Enhancements
- Add image support for events
- Implement smooth scrolling animations
- Add event categories or filtering
- Support for different timeline layouts
- Integration with external data sources
