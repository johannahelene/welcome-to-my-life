/**
 * Recipe Images Data File
 * 
 * This file contains all recipe images with their metadata.
 * Adding new images is as simple as adding a new entry to this array.
 */

const recipeImages = [
    {
        src: '../images/recipes/sweet-potatoe-kale.JPG',
        title: 'Sweet Potato & Kale',
        category: 'vegetarian',
        date: '2025-04-01',
        description: 'A healthy vegetarian dish with sweet potatoes and kale'
    },
    {
        src: '../images/recipes/blue_berry_pancakes.jpeg',
        title: 'Blueberry Lemon Pancakes',
        category: 'main-dish',
        date: '2025-03-25',
        description: 'Fluffy pancakes with fresh blueberries and lemon zest'
    },
    {
        src: '../images/recipes/lasagna.jpeg',
        title: 'Eggplant Zucchini Lasagna',
        category: 'main-dish',
        date: '2025-03-18',
        description: 'Vegetable lasagna with layers of eggplant and zucchini'
    },
    {
        src: '../images/recipes/loaded_nachos.jpeg',
        title: 'Loaded Nachos',
        category: 'snacks',
        date: '2025-03-10',
        description: 'Crispy nachos loaded with cheese, beans, and toppings'
    },
    {
        src: '../images/recipes/pasta_dinner.jpeg',
        title: 'Eggplant Tomato Sauce Pasta',
        category: 'main',
        date: '2025-02-28',
        description: 'Pasta with homemade eggplant and tomato sauce'
    },
    {
        src: '../images/recipes/spaetzle.jpeg',
        title: 'Spätzle Dinner with Friends',
        category: 'main',
        date: '2025-02-15',
        description: 'Traditional German spätzle shared with friends'
    },
    // Add more images here as needed
    // Example format:
    // {
    //     src: '../images/recipes/your-new-image.jpg',
    //     title: 'Descriptive Title',
    //     category: 'category-name',
    //     date: 'YYYY-MM-DD',
    //     description: 'Brief description of the recipe'
    // },
];

/**
 * Helper function to extract date from image filename
 * This can be used when adding new images to automatically set the date
 * based on the image filename if it contains a date pattern
 *
 * @param {string} filename - The filename to extract date from
 * @returns {string|null} - The extracted date in YYYY-MM-DD format or null if not found
 */
function extractDateFromFilename(filename) {
    // Look for patterns like YYYY-MM-DD or YYYYMMDD in the filename
    const datePattern = /(\d{4})[_-]?(\d{2})[_-]?(\d{2})/;
    const match = filename.match(datePattern);
    
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }
    
    // Try to extract date from formats like "IMG_20250315" or similar
    const imgDatePattern = /IMG_(\d{8})/i;
    const imgMatch = filename.match(imgDatePattern);
    
    if (imgMatch && imgMatch[1]) {
        const dateStr = imgMatch[1];
        // Extract year, month, day assuming format YYYYMMDD
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);
        return `${year}-${month}-${day}`;
    }
    
    return null;
}

/**
 * Get today's date in YYYY-MM-DD format
 * Useful for adding new recipes with today's date
 *
 * @returns {string} - Today's date in YYYY-MM-DD format
 */
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}