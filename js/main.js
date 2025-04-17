/**
 * Main JavaScript file for Johanna's Cambridge Life website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated (except on login page)
    if (!window.location.pathname.includes('login.html') && sessionStorage.getItem('authenticated') !== 'true') {
        // If not authenticated, redirect to login page
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize all interactive elements when the DOM is fully loaded
    initializeNavigation();
    initializeCommentForms();
    initializeImageGalleries();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

/**
 * Handles mobile navigation menu toggle
 */
function initializeNavigation() {
    // This function will be used when implementing a mobile menu
    // For now, it's a placeholder for future functionality
    
    // Example of how a mobile menu toggle could be implemented:
    // const menuToggle = document.querySelector('.menu-toggle');
    // const navMenu = document.querySelector('nav ul');
    // 
    // if (menuToggle && navMenu) {
    //     menuToggle.addEventListener('click', function() {
    //         navMenu.classList.toggle('active');
    //         menuToggle.classList.toggle('active');
    //     });
    // }
}

/**
 * Handles comment form submissions
 */
function initializeCommentForms() {
    const commentForms = document.querySelectorAll('form');
    
    commentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would send the form data to a server
            // For now, we'll just show a thank you message
            
            const formElements = form.elements;
            let hasEmptyFields = false;
            
            // Check if required fields are filled
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit' && formElements[i].value.trim() === '') {
                    hasEmptyFields = true;
                    formElements[i].classList.add('error');
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (hasEmptyFields) {
                alert('Please fill in all fields before submitting.');
                return;
            }
            
            // Create a thank you message
            const thankYouMessage = document.createElement('div');
            thankYouMessage.className = 'thank-you-message';
            thankYouMessage.innerHTML = '<p>Thank you for your comment! In a real website, this would be saved to a database.</p>';
            thankYouMessage.style.padding = '1rem';
            thankYouMessage.style.backgroundColor = '#e8f5e9';
            thankYouMessage.style.borderRadius = '8px';
            thankYouMessage.style.marginTop = '1rem';
            
            // Replace the form with the thank you message
            form.parentNode.replaceChild(thankYouMessage, form);
        });
    });
}

/** 
 * Initializes image galleries if present on the page
 */
function initializeImageGalleries() {
    // This is a placeholder for future functionality
    // In a real implementation, this could initialize a lightbox for images
    const galleryImages = document.querySelectorAll('.gallery-image');

    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // In a real implementation, this would open a lightbox
            console.log('Image clicked:', this.src);
        });
    });
}

/**
 * Helper function to format dates
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Helper function to validate email addresses
 * @param {string} email - The email address to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Handles user logout
 */
function logout() {
    // Remove authentication from session storage
    sessionStorage.removeItem('authenticated');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// image collage
document.addEventListener('DOMContentLoaded', () => {
    // List of images in the collage folder
    const images = [
        'images/collage/20230817_130646.jpg',
        'images/collage/5799c11f-483c-4c5e-8897-9006be24a808.jpg',
        'images/collage/61b3ea39-cc59-47d6-b74d-429a18a510ed.jpg',
        'images/collage/90ff7b73-d865-46d4-9bd3-ad60ed905f0b.jpg',
        'images/collage/DSC_6794.jpeg',
        'images/collage/IMG_0007.JPG',
        'images/collage/IMG_0021.JPG',
        'images/collage/IMG_0048.jpeg',
        'images/collage/IMG_0197.JPG',
        'images/collage/IMG_0254.jpeg',
        'images/collage/IMG_0295.JPG',
        'images/collage/IMG_0330.jpeg',
        'images/collage/IMG_0332.JPG',
        'images/collage/IMG_0360.jpeg',
        'images/collage/IMG_0375.JPG',
        'images/collage/IMG_0630.jpeg',
        'images/collage/IMG_0735.JPG',
        'images/collage/IMG_0806.jpeg',
        'images/collage/IMG_0906.jpeg',
        'images/collage/IMG_0941.jpeg',
        'images/collage/IMG_0942.jpeg',
        'images/collage/IMG_1072.JPG',
        'images/collage/IMG_1178.jpeg',
        'images/collage/IMG_1184.jpeg',
        'images/collage/IMG_1324.jpeg',
        'images/collage/IMG_1487.jpeg',
        'images/collage/IMG_1589.jpeg',
        'images/collage/IMG_1655.jpeg',
        'images/collage/IMG_1745.jpeg',
        'images/collage/IMG_1798.JPG',
        'images/collage/IMG_1875.jpeg',
        'images/collage/IMG_2028.jpeg',
        'images/collage/IMG_2140.jpeg',
        'images/collage/IMG_2321.jpeg',
        'images/collage/IMG_2332.jpeg',
        'images/collage/IMG_2824.jpeg',
        'images/collage/IMG_2928.jpeg',
        'images/collage/IMG_2981.jpeg',
        'images/collage/IMG_3028.jpeg',
        'images/collage/IMG_3067.jpeg',
        'images/collage/IMG_3104.jpeg',
        'images/collage/IMG_3162.JPG',
        'images/collage/IMG_3228.JPG',
        'images/collage/IMG_3350.JPG',
        'images/collage/IMG_3741.jpeg',
        'images/collage/IMG_4271.jpeg',
        'images/collage/IMG_4349.jpeg',
        'images/collage/IMG_4518.JPG',
        'images/collage/IMG_5173.jpeg',
        'images/collage/IMG_6422.jpeg',
        'images/collage/IMG_7279.JPG',
        'images/collage/IMG_7880.jpeg',
        'images/collage/IMG_7968.jpeg',
        'images/collage/IMG_8387.JPG',
        'images/collage/IMG_8388.JPG',
        'images/collage/IMG_8463.JPG',
        'images/collage/IMG_8538.JPG',
        'images/collage/IMG_8570.JPG',
        'images/collage/IMG_8636.JPG',
        'images/collage/IMG_9491.JPG',
        'images/collage/WhatsApp Image 2024-01-29 at 21.48.39.jpeg',
        'images/collage/fa392565-824f-499c-982c-4e6248e89003.jpg'
    ];

    // Shuffle array to randomize initial display
    const shuffledImages = [...images].sort(() => 0.5 - Math.random());
    
    // Set up the uniform gallery
    const galleryContainer = document.querySelector('.uniform-gallery');
    
    // Track which images are currently in use
    let currentlyDisplayedImages = new Set();
    
    setupGallery();
    
    function setupGallery() {
        // Calculate number of cells based on viewport
        let cellCount = 12; // Default for desktop (4x3 grid)
        
        if (window.innerWidth <= 768) {
            cellCount = 8; // For mobile (2x4 grid)
        } else if (window.innerWidth <= 992) {
            cellCount = 9; // For tablets (3x3 grid)
        }
        
        // Create cells
        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement('div');
            cell.classList.add('gallery-cell');
            galleryContainer.appendChild(cell);
            
            // Add initial image to each cell
            addImageToCell(cell, i);
        }
        
        // Start rotation for each cell with staggered timing
        document.querySelectorAll('.gallery-cell').forEach((cell, index) => {
            setTimeout(() => {
                rotateImages(cell);
            }, index * 1200); // Stagger the start time
        });
    }
    
    function getUniqueImage() {
        // If all images are being used (unlikely but possible), refresh the set
        if (currentlyDisplayedImages.size >= images.length) {
            currentlyDisplayedImages.clear();
        }
        
        // Find an image that isn't currently displayed
        let attempts = 0;
        let imageSrc;
        
        do {
            const randomIndex = Math.floor(Math.random() * images.length);
            imageSrc = images[randomIndex];
            attempts++;
            
            // Safety valve: if we've tried many times and can't find a unique image,
            // just use any random one (this should rarely happen)
            if (attempts > 100) {
                break;
            }
        } while (currentlyDisplayedImages.has(imageSrc));
        
        // Add this image to the set of currently displayed images
        currentlyDisplayedImages.add(imageSrc);
        return imageSrc;
    }
    
    function removeImageFromTracking(imageSrc) {
        currentlyDisplayedImages.delete(imageSrc);
    }
    
    function addImageToCell(cell, initialIndex) {
        // Get a unique image
        const imageSrc = initialIndex < shuffledImages.length 
            ? shuffledImages[initialIndex]  // Use pre-shuffled order for initial setup
            : getUniqueImage();             // Get unique image for later changes
        
        // Track this image as being displayed
        currentlyDisplayedImages.add(imageSrc);
        
        // Create image element
        const img = document.createElement('img');
        img.classList.add('gallery-image');
        img.src = imageSrc;
        img.alt = "Life moments";
        img.dataset.imageSrc = imageSrc; // Store the source for tracking
        
        // Immediately make first image active
        img.classList.add('active');
        
        // Apply Ken Burns effect with 50% probability
        if (Math.random() > 0.5) {
            setTimeout(() => {
                img.classList.add('ken-burns');
            }, 100);
        }
        
        cell.appendChild(img);
    }
    
    function rotateImages(cell) {
        // Randomize interval between 6-10 seconds
        const transitionInterval = Math.random() * 4000 + 6000;
        
        setInterval(() => {
            // Get a unique image that's not currently displayed
            const nextImageSrc = getUniqueImage();
            
            // Create new image element
            const newImg = document.createElement('img');
            newImg.classList.add('gallery-image');
            newImg.src = nextImageSrc;
            newImg.alt = "Life moments";
            newImg.dataset.imageSrc = nextImageSrc; // Store the source for tracking
            
            // Add to cell
            cell.appendChild(newImg);
            
            // Get the current image that will be removed
            const currentImage = cell.querySelector('.gallery-image.active');
            const currentImageSrc = currentImage ? currentImage.dataset.imageSrc : null;
            
            // Trigger fade in
            setTimeout(() => {
                newImg.classList.add('active');
                
                // Apply Ken Burns effect with 50% probability
                if (Math.random() > 0.5) {
                    setTimeout(() => {
                        newImg.classList.add('ken-burns');
                    }, 100);
                }
            }, 50);
            
            // Fade out and remove old images
            const oldImages = cell.querySelectorAll('.gallery-image:not(:last-child)');
            oldImages.forEach(oldImg => {
                oldImg.classList.remove('active');
                
                // Remove the old image from tracking
                if (oldImg.dataset.imageSrc) {
                    setTimeout(() => {
                        removeImageFromTracking(oldImg.dataset.imageSrc);
                    }, 900); // Remove from tracking halfway through fade-out
                }
                
                setTimeout(() => {
                    oldImg.remove();
                }, 1800); // Remove after fade out transition
            });
            
        }, transitionInterval);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Optional: if you want to redraw the gallery on window resize
        // Currently the CSS handles most of the responsive behavior
    });
});