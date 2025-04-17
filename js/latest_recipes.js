/**
 * Latest Recipes JavaScript
 *
 * This file displays the latest recipe images on the home page,
 * sorted by date (newest first).
 */

document.addEventListener('DOMContentLoaded', function() {
    displayLatestRecipes();
});

/**
 * Display the latest recipe images on the home page
 */
function displayLatestRecipes() {
    // Use the homeRecipeImages array that has paths adjusted for the home page
    // Get the container for the food gallery items
    const foodGalleryContainer = document.getElementById('latest-food-gallery');
    if (!foodGalleryContainer) {
        console.error('Food gallery container not found with ID "latest-food-gallery"');
        return;
    }
    
    // Sort by date (newest first)
    homeRecipeImages.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
    });
    
    // Get the 6 most recent recipes (or fewer if there aren't 6)
    const latestRecipes = homeRecipeImages.slice(0, 6);
    
    // Clear the container
    foodGalleryContainer.innerHTML = '';
    
    // Add the latest recipes to the container
    latestRecipes.forEach(recipe => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'food-gallery-item';
        
        const link = document.createElement('a');
        link.href = 'recipes/index.html';
        
        const imageElement = document.createElement('div');
        imageElement.className = 'food-image';
        imageElement.style.backgroundImage = `url('${recipe.src}')`;
        
        // Create info overlay with title and date
        const infoOverlay = document.createElement('div');
        infoOverlay.className = 'food-info-overlay';
        
        // Add title
        if (recipe.title) {
            const titleElement = document.createElement('div');
            titleElement.className = 'food-title';
            titleElement.textContent = recipe.title;
            infoOverlay.appendChild(titleElement);
        }
        
        // Add date
        if (recipe.date) {
            const dateElement = document.createElement('div');
            dateElement.className = 'food-date';
            dateElement.textContent = formatDate(recipe.date);
            infoOverlay.appendChild(dateElement);
        }
        
        link.appendChild(imageElement);
        link.appendChild(infoOverlay);
        galleryItem.appendChild(link);
        foodGalleryContainer.appendChild(galleryItem);
    });
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