# Blog Management System Plan

## Current Situation
Your website is currently a static HTML site with:
- A main page showing blog post previews in a card/tile layout
- Individual HTML files for each blog post
- Manual HTML editing required for new posts
- No backend system for content management

## Requirements
1. Easy way to create and publish new blog posts
2. Maintain the current tile/card view for post previews
3. Full creative control over post formatting and layout
4. Support for multiple photos and videos in posts
5. Fast loading times for global access
6. No additional hosting costs

## Proposed Solution: Static Site Generator with Markdown

I recommend creating a simple Python-based static site generator that will:
1. Allow you to write posts in Markdown (with HTML capabilities when needed)
2. Automatically generate HTML files from your content
3. Maintain your current website design
4. Give you full control over formatting

### System Architecture

The system will follow this basic architecture:
1. Markdown Files → Python Processor → Generated HTML
2. Templates → Python Processor → Generated HTML
3. Images/Media → Generated HTML
4. CSS/JS → Static Website

### Components

1. **Content Storage**:
   - Store blog posts as Markdown files in a `content/posts/` directory
   - Store images in an `images/` directory
   - Each post will have metadata (title, date, preview image, etc.)

2. **Python Generator Script**:
   - Read Markdown files and extract metadata
   - Convert Markdown to HTML
   - Apply templates to generate final HTML files
   - Update index pages with new content

3. **Templates**:
   - Create HTML templates for blog posts and index pages
   - Maintain your current design and styling

4. **Workflow**:
   - Write a new post in Markdown
   - Add images to the images directory
   - Run the Python script to generate the website
   - Upload the generated files to your hosting provider

### Example Post Format

```markdown
---
title: Spring in Cambridge
date: 2025-03-21
preview_image: cambridge-spring.jpg
---

# Spring in Cambridge

The city is blooming! I took a walk along the River Cam this weekend and captured some beautiful photos of Cambridge in spring.

![Cambridge in Spring](../images/cambridge-spring-full.jpg)

## The Beautiful Gardens

The college gardens are especially beautiful this time of year...

[rest of your content with formatting, multiple images, etc.]
```

### Benefits of This Approach

1. **Simplicity**: Leverages your Python skills without requiring complex frameworks
2. **Control**: Full creative freedom over your content and design
3. **Performance**: Static HTML files load quickly worldwide
4. **Cost**: No additional hosting costs (can use GitHub Pages, Netlify, etc.)
5. **Flexibility**: Easy to extend with additional features as needed

## Implementation Steps

1. Create the directory structure for content and templates
2. Develop the Python script to process Markdown and generate HTML
3. Create templates based on your current design
4. Convert a few existing posts to Markdown as examples
5. Test the generation process
6. Set up a simple workflow for creating and publishing new posts

## Creating and Publishing New Posts

### Step 1: Create a New Markdown File

1. Navigate to your `content/posts/` directory
2. Create a new Markdown file with a descriptive name (e.g., `2025-04-05-new-research-findings.md`)
3. Add the required metadata at the top of the file:

```markdown
---
title: New Research Findings
date: 2025-04-05
preview_image: research-findings.jpg
---

# Your post content starts here

Write your post content using Markdown formatting...
```

### Step 2: Write Your Content Using Markdown

Markdown is a simple formatting syntax that's easy to learn. Here are some examples:

```markdown
# This is a heading

## This is a subheading

This is a paragraph with **bold text** and *italic text*.

- This is a bullet point
- Another bullet point

1. This is a numbered list
2. Second item

[This is a link](https://example.com)

![This is an image](../images/my-photo.jpg)

> This is a blockquote

```

You can also include HTML directly when you need more control:

```markdown
<div class="special-section">
  <h3>Custom formatted section</h3>
  <p>This gives you complete control over formatting when needed.</p>
</div>

<div class="image-gallery">
  <img src="../images/photo1.jpg" alt="Description">
  <img src="../images/photo2.jpg" alt="Description">
  <img src="../images/photo3.jpg" alt="Description">
</div>
```

### Step 3: Add Images

1. Place your images in the `images/` directory
2. Make sure to include your preview image (the one that will appear in the tile/card view)
3. Reference images in your Markdown using the correct relative path:

```markdown
![Image description](../images/your-image.jpg)
```

### Step 4: Run the Python Generator Script

Once your content is ready, you'll run the Python script to generate the HTML files:

```bash
python generate_site.py
```

This script will:
1. Read all your Markdown files
2. Convert them to HTML using your templates
3. Generate individual blog post pages
4. Update the blog index page with new tiles/cards
5. Create all necessary files in an `output/` directory

### Step 5: Preview Your Site Locally

Before publishing, you can preview your site locally to make sure everything looks good:

1. Open the generated HTML files in your browser
2. Check that your formatting, images, and layout appear as expected
3. Make any necessary adjustments to your Markdown file and regenerate

### Step 6: Publish Your Site

Once you're happy with the results, you'll upload the generated files to your hosting provider:

1. Upload all files from the `output/` directory to your web server
2. This can be done via FTP, Git, or whatever method you currently use

## Future Enhancements

1. **Web Interface**: Add a simple web form for creating posts if desired
2. **Image Processing**: Automatic resizing/optimization of images
3. **Categories/Tags**: Add support for categorizing posts
4. **Search Functionality**: Add a simple search feature
5. **Comments**: Integrate a lightweight comment system if desired