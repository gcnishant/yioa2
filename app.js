const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden,.contact-us,.our-mission,.mentorship-program,.who-we-are,.frequent-questions,.credits');
hiddenElements.forEach((el) => observer.observe(el))

window.addEventListener('scroll', function() {
    var header = document.getElementById('fixed-header');
    if (window.scrollY > 50) { // Adjust the scroll value as needed
        header.classList.add('smaller');
    } else {
        header.classList.remove('smaller');
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const words = ["empower", "inspire"];
    let index = 0;
    const wordElement = document.getElementById('animated-word');

    // Only proceed if wordElement exists
    if (wordElement) {
        function changeWord() {
            wordElement.classList.remove('typing');
            setTimeout(() => {
                wordElement.textContent = words[index];
                wordElement.classList.add('typing');
                index = (index + 1) % words.length;
            }, 100);
        }

        setInterval(changeWord, 3000);
    } else {
        console.warn('Element with ID "animated-word" not found');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle the navigation menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close the navigation menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle the visibility of the clicked answer
            const answer = this.nextElementSibling;

            // If the clicked question is already active, hide it
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                this.classList.remove('active');
            } else {
                // Close all answers and remove the active class from all questions
                questions.forEach(q => {
                    q.nextElementSibling.style.display = 'none';
                    q.classList.remove('active');
                });

                // Open the clicked answer and add the active class
                answer.style.display = 'block';
                this.classList.add('active');
            }
        });
    });
});

const contactReasonSelect = document.getElementById('contact-reason');
const otherReasonContainer = document.getElementById('other-reason-container');

contactReasonSelect.addEventListener('change', () => {
    if (contactReasonSelect.value === 'Other') {
        otherReasonContainer.style.display = 'block';
    } else {
        otherReasonContainer.style.display = 'none';
    }
});

document.querySelector(".form-container").addEventListener("submit", function(e) {
    const humanField = this.querySelector("[name='areYouHuman']");
    if (humanField.value) { // If the field has any value
      e.preventDefault(); // Stop the form from submitting
      alert("Error, please try again."); // Display error message
    }
});

// Timeline Component Functionality
document.addEventListener('DOMContentLoaded', function() {
    const timelineSection = document.querySelector('.timeline-section');
    if (!timelineSection) return;
    
    // Generate timeline HTML from configuration
    function generateTimeline() {
        if (!window.timelineEvents || !Array.isArray(window.timelineEvents)) {
            console.warn('Timeline events configuration not found');
            return;
        }
        
        const events = window.timelineEvents;
        const timelineTrack = timelineSection.querySelector('.timeline-track');
        const timelineDots = timelineSection.querySelector('.timeline-dots');
        
        if (timelineTrack && timelineDots) {
            // Generate events
            timelineTrack.innerHTML = events.map(event => `
                <div class="timeline-event" data-event="${event.id}">
                    <div class="event-date">${event.date}</div>
                    <div class="event-content">
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                    </div>
                </div>
            `).join('');
            
            // Generate dots
            timelineDots.innerHTML = events.map((event, index) => `
                <span class="dot ${index === events.length - 1 ? 'active' : ''}" data-event="${event.id}"></span>
            `).join('');
            
            // Debug: log what was generated
            console.log('Generated events:', events.length);
            console.log('Generated dots:', timelineDots.children.length);
            console.log('Events data:', events);
        }
    }
    
    // Generate timeline first
    generateTimeline();
    
    // Get elements after generation
    const timelineTrack = timelineSection.querySelector('.timeline-track');
    const timelineEvents = timelineSection.querySelectorAll('.timeline-event');
    const prevBtn = timelineSection.querySelector('.prev-btn');
    const nextBtn = timelineSection.querySelector('.next-btn');
    const dots = timelineSection.querySelectorAll('.dot');
    
    if (!timelineTrack || !timelineEvents.length) {
        console.error('Timeline elements not found after generation');
        return;
    }
    
    let currentIndex = 0; // Will autoplay from oldest to newest
    const totalEvents = timelineEvents.length;
    let autoplayTimer = null;
    let hasAutoPlayed = false;
    
    // Initialize timeline
    function initTimeline() {
        updateTimeline();
        updateNavigationButtons();
        
        // Observe visibility to trigger autoplay from oldest to newest once
        const sectionEl = document.querySelector('.timeline-section');
        if (sectionEl) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAutoPlayed) {
                        hasAutoPlayed = true;
                        startAutoplay();
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(sectionEl);
        }
        
        // Re-center on resize
        window.addEventListener('resize', debounce(() => {
            updateTimeline();
        }, 150));
    }
    
    // Update timeline display
    function updateTimeline() {
        // Active card state
        timelineEvents.forEach((event, index) => {
            event.classList.toggle('active', index === currentIndex);
        });
        
        // Dots state
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update the details section
        updateTimelineDetails();
        
        // Center the active event dynamically
        const active = timelineEvents[currentIndex];
        if (!active) return;
        
        // Check if we're on mobile (vertical layout)
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile: vertical scrolling
            updateVerticalTimeline();
        } else {
            // Desktop: horizontal scrolling
            updateHorizontalTimeline();
        }
    }
    
    // Vertical timeline update for mobile
    function updateVerticalTimeline() {
        const active = timelineEvents[currentIndex];
        if (!active) return;
        
        const eventHeight = 280; // Height of each event
        const eventGap = 16; // Gap between events (1rem = 16px)
        const viewportHeight = 300; // Height from CSS
        
        // Calculate vertical position to center the active event
        const activeTop = currentIndex * (eventHeight + eventGap);
        const viewportCenter = viewportHeight / 2;
        const translateY = -(activeTop - viewportCenter + eventHeight / 2);
        
        timelineTrack.style.transform = `translateY(${translateY}px)`;
    }
    
    // Horizontal timeline update for desktop
    function updateHorizontalTimeline() {
        const active = timelineEvents[currentIndex];
        if (!active) return;
        
        // Calculate the viewport width (showing 3 events at a time)
        const eventWidth = 300; // Width of each event
        const eventMargin = 32; // Total margin (16px on each side)
        const viewportWidth = 1000; // Fixed viewport width from CSS
        
        // Calculate the total width of all events
        const totalTrackWidth = (eventWidth + eventMargin) * totalEvents;
        
        let translateX;
        
        if (currentIndex === 0) {
            // First event: center it, leaving empty space on the left
            // This simulates having an "empty event" before the first event
            const firstEventCenter = active.offsetLeft + (active.offsetWidth / 2);
            const viewportCenter = viewportWidth / 2;
            translateX = -(firstEventCenter - viewportCenter);
        } else if (currentIndex === totalEvents - 1) {
            // Last event: center it, leaving empty space on the right
            // This simulates having an "empty event" after the last event
            const lastEventCenter = active.offsetLeft + (active.offsetWidth / 2);
            const viewportCenter = viewportWidth / 2;
            translateX = -(lastEventCenter - viewportCenter);
        } else {
            // Middle events: center the active event
            const activeCenter = active.offsetLeft + (active.offsetWidth / 2);
            const viewportCenter = viewportWidth / 2;
            translateX = -(activeCenter - viewportCenter);
        }
        
        // Ensure translateX is valid
        if (isNaN(translateX) || !isFinite(translateX)) translateX = 0;
        
        timelineTrack.style.transform = `translateX(${translateX}px)`;
    }
    
    // Update timeline details section
    function updateTimelineDetails() {
        const detailsContainer = timelineSection.querySelector('.timeline-details');
        if (!detailsContainer) return;
        
        const currentEvent = window.timelineEvents[currentIndex];
        if (!currentEvent || !currentEvent.details) return;
        
        const { title, description, images } = currentEvent.details;
        
        // Create the HTML content
        let imagesHTML = '';
        if (images && images.length > 0) {
            imagesHTML = `
                <div class="event-images">
                    ${images.map(img => `
                        <div class="event-image">
                            <img src="${img.src}" alt="${img.caption}" loading="lazy">
                            <div class="event-image-caption">${img.caption}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        detailsContainer.innerHTML = `
            <h3>${title}</h3>
            <div class="event-description">${description}</div>
            ${imagesHTML}
        `;
        
        // Add show class for animation
        setTimeout(() => {
            detailsContainer.classList.add('show');
        }, 100);
    }
    
    // Update navigation buttons state
    function updateNavigationButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalEvents - 1;
    }
    
    // Go to specific event
    function goToEvent(index) {
        if (index >= 0 && index < totalEvents) {
            currentIndex = index;
            updateTimeline();
            updateNavigationButtons();
        }
    }
    
    function cancelAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    
    function startAutoplay() {
        cancelAutoplay();
        currentIndex = 0;
        updateTimeline();
        updateNavigationButtons();
        
        // Zoom through events quickly (100ms per event)
        autoplayTimer = setInterval(() => {
            if (currentIndex < totalEvents - 1) {
                goToEvent(currentIndex + 1);
            } else {
                cancelAutoplay();
            }
        }, 100);
    }
    
    function debounce(fn, wait) {
        let t;
        return function() {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, arguments), wait);
        };
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        cancelAutoplay();
        if (currentIndex > 0) {
            goToEvent(currentIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        cancelAutoplay();
        if (currentIndex < totalEvents - 1) {
            goToEvent(currentIndex + 1);
        }
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            cancelAutoplay();
            goToEvent(index);
        });
    });
    
    // Card click navigation
    timelineEvents.forEach((card, index) => {
        card.addEventListener('click', () => {
            cancelAutoplay();
            goToEvent(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!timelineSection.closest('body')) return;
        cancelAutoplay();
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            goToEvent(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < totalEvents - 1) {
            goToEvent(currentIndex + 1);
        }
    });
    
    // Initialize the timeline
    initTimeline();
});
