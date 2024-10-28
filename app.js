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

const leftDiv = document.querySelector('.left-empty-div');
const rightDiv = document.querySelector('.right-empty-div');


leftDiv.addEventListener('mouseenter', () => {
    leftDiv.style.backgroundColor = "#733635";
    rightDiv.style.backgroundColor = "goldenrod";
});

leftDiv.addEventListener('mouseleave', () => {
    leftDiv.style.backgroundColor = "goldenrod";
    rightDiv.style.backgroundColor = "#733635";
});

rightDiv.addEventListener('mouseenter', () => {
    rightDiv.style.backgroundColor = "goldenrod";
    leftDiv.style.backgroundColor = "#733635";

});

rightDiv.addEventListener('mouseleave', () => {
    rightDiv.style.backgroundColor = "#733635";
    leftDiv.style.backgroundColor = "goldenrod";
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