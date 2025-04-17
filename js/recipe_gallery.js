/**
 * Recipe Gallery JavaScript
 * 
 * This file handles the dynamic generation of the recipe gallery,
 * including pagination and category filtering.
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeRecipeGallery();
});

/**
 * Initialize the recipe gallery with pagination and filtering
 */
function initializeRecipeGallery() {
    const galleryContainer = document.getElementById('recipe-gallery');
    const paginationContainer = document.getElementById('pagination');
    const categoryButtons = document.querySelectorAll('.category-button');
    const sortButtons = document.querySelectorAll('.sort-button');
    
    if (!galleryContainer) return;
    
    // Settings
    const imagesPerPage = 9;
    let currentPage = 1;
    let currentCategory = 'all';
    let currentSortMethod = 'date-desc'; // Default: newest first
    
    // Initialize the gallery
    renderGallery();
    
    // Add event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current category and reset to first page
            currentCategory = this.getAttribute('data-category');
            currentPage = 1;
            
            // Re-render the gallery
            renderGallery();
        });
    });
    
    // Add event listeners to sort buttons
    sortButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all sort buttons
            sortButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current sort method and reset to first page
            currentSortMethod = this.getAttribute('data-sort');
            currentPage = 1;
            
            // Re-render the gallery
            renderGallery();
        });
    });
    
    /**
     * Render the gallery based on current page and category
     */
    function renderGallery() {
        // Filter images by category
        const filteredImages = currentCategory === 'all' 
            ? [...recipeImages] 
            : [...recipeImages].filter(image => image.category === currentCategory);
        
        // Sort images based on current sort method
        sortImages(filteredImages, currentSortMethod);
        
        // Calculate pagination
        const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = Math.min(startIndex + imagesPerPage, filteredImages.length);
        const currentImages = filteredImages.slice(startIndex, endIndex);
        
        // Clear the gallery
        galleryContainer.innerHTML = '';
        
        // Add images to the gallery
        currentImages.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'food-gallery-item';
            
            const imageElement = document.createElement('div');
            imageElement.className = 'food-image';
            imageElement.style.backgroundImage = `url('${image.src}')`;
            
            // Create info overlay with title and date
            const infoOverlay = document.createElement('div');
            infoOverlay.className = 'food-info-overlay';
            
            // Add title
            if (image.title) {
                const titleElement = document.createElement('div');
                titleElement.className = 'food-title';
                titleElement.textContent = image.title;
                infoOverlay.appendChild(titleElement);
            }
            
            // Add date
            if (image.date) {
                const dateElement = document.createElement('div');
                dateElement.className = 'food-date';
                dateElement.textContent = formatDate(image.date);
                infoOverlay.appendChild(dateElement);
            }
            
            // Add description if available
            if (image.description) {
                const descElement = document.createElement('div');
                descElement.className = 'food-description';
                descElement.textContent = image.description;
                infoOverlay.appendChild(descElement);
            }
            
            galleryItem.appendChild(imageElement);
            galleryItem.appendChild(infoOverlay);
            galleryContainer.appendChild(galleryItem);
        });
        
        // Render pagination if we have more than one page
        renderPagination(totalPages);
        
        // Show/hide message when no images match the filter
        const noResultsMessage = document.getElementById('no-results-message');
        if (noResultsMessage) {
            if (filteredImages.length === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        }
    }
    
    /**
     * Render pagination controls
     */
    function renderPagination(totalPages) {
        if (!paginationContainer) return;
        
        // Clear pagination container
        paginationContainer.innerHTML = '';
        
        // Don't show pagination if we only have one page
        if (totalPages <= 1) return;
        
        // Create previous button
        const prevButton = document.createElement('button');
        prevButton.className = 'pagination-button';
        prevButton.innerHTML = '&laquo; Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderGallery();
                // Scroll to top of gallery
                galleryContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(prevButton);
        
        // Create page number buttons (show max 5 pages)
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // Add first page button if not visible
        if (startPage > 1) {
            const firstPageButton = document.createElement('button');
            firstPageButton.className = 'pagination-button';
            firstPageButton.textContent = '1';
            firstPageButton.addEventListener('click', () => {
                currentPage = 1;
                renderGallery();
                galleryContainer.scrollIntoView({ behavior: 'smooth' });
            });
            paginationContainer.appendChild(firstPageButton);
            
            // Add ellipsis if there's a gap
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                paginationContainer.appendChild(ellipsis);
            }
        }
        
        // Add page number buttons
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'pagination-button';
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderGallery();
                galleryContainer.scrollIntoView({ behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageButton);
        }
        
        // Add ellipsis and last page if not visible
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                paginationContainer.appendChild(ellipsis);
            }
            
            const lastPageButton = document.createElement('button');
            lastPageButton.className = 'pagination-button';
            lastPageButton.textContent = totalPages;
            lastPageButton.addEventListener('click', () => {
                currentPage = totalPages;
                renderGallery();
                galleryContainer.scrollIntoView({ behavior: 'smooth' });
            });
            paginationContainer.appendChild(lastPageButton);
        }
        
        // Create next button
        const nextButton = document.createElement('button');
        nextButton.className = 'pagination-button';
        nextButton.innerHTML = 'Next &raquo;';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderGallery();
                galleryContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(nextButton);
    }
    
    /**
     * Sort images based on the specified sort method
     * @param {Array} images - The array of images to sort
     * @param {string} sortMethod - The sort method to use
     */
    function sortImages(images, sortMethod) {
        switch (sortMethod) {
            case 'date-desc': // Newest first
                images.sort((a, b) => {
                    if (!a.date) return 1;
                    if (!b.date) return -1;
                    return new Date(b.date) - new Date(a.date);
                });
                break;
                
            case 'date-asc': // Oldest first
                images.sort((a, b) => {
                    if (!a.date) return 1;
                    if (!b.date) return -1;
                    return new Date(a.date) - new Date(b.date);
                });
                break;
                
            case 'title': // Alphabetical by title
                images.sort((a, b) => {
                    if (!a.title) return 1;
                    if (!b.title) return -1;
                    return a.title.localeCompare(b.title);
                });
                break;
                
            default:
                // Default to newest first
                images.sort((a, b) => {
                    if (!a.date) return 1;
                    if (!b.date) return -1;
                    return new Date(b.date) - new Date(a.date);
                });
        }
    }
    
    /**
     * Format a date string from YYYY-MM-DD to a more readable format
     * @param {string} dateString - The date string in YYYY-MM-DD format
     * @returns {string} - The formatted date string
     */
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return original if invalid
        
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}