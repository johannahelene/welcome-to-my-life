# Johanna's Cambridge Life Blog Generator

A simple static site generator for Johanna's Cambridge Life blog. This tool allows you to write blog posts in Markdown format and automatically generates HTML files that maintain the current design of your website.

## Setup

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

2. Make sure your directory structure looks like this:

```
website/
├── content/
│   └── posts/           # Your Markdown blog posts go here
├── templates/           # HTML templates
├── images/              # Images for your blog
├── css/                 # CSS files
├── js/                  # JavaScript files
├── generate_site.py     # The generator script
└── output/              # Generated site will be placed here
```

## Creating a New Blog Post

1. Create a new Markdown file in the `content/posts/` directory with a name like `YYYY-MM-DD-post-title.md`

2. Add metadata at the top of the file:

```markdown
---
title: Your Post Title
date: YYYY-MM-DD
preview_image: image-filename.jpg
---

# Your post content starts here

Write your post content using Markdown formatting...
```

3. Write your content using Markdown syntax:
   - `#` for headings
   - `**bold**` for bold text
   - `*italic*` for italic text
   - `![alt text](../images/image.jpg)` for images
   - And more!

4. You can also include HTML directly for more complex formatting:

```markdown
<div class="image-gallery">
  <img src="../images/photo1.jpg" alt="Description">
  <img src="../images/photo2.jpg" alt="Description">
</div>
```

## Generating the Website

Run the generator script:

```bash
python generate_site.py
```

This will:
1. Process all Markdown files in the `content/posts/` directory
2. Generate HTML files in the `output/` directory
3. Copy CSS, JS, and images to the output directory

## Publishing Your Website

After generating the site, upload the contents of the `output/` directory to your web server.

## Advanced Metadata Options

You can include additional metadata in your posts:

```markdown
---
title: Your Post Title
date: YYYY-MM-DD
preview_image: image-filename.jpg
college: Magdalene College  # Adds the college badge
excerpt: Custom excerpt text for the preview  # Optional custom excerpt
comments:  # Optional comments section
  - author: Name
    text: Comment text
    date: Month DD, YYYY
    time: H:MM AM/PM
related_posts:  # Optional related posts
  - title: Related Post Title
    date: Month DD, YYYY
    image: image-filename.jpg
    url: post-url.html
---
```

## Customizing Templates

You can modify the templates in the `templates/` directory to change the appearance of your blog posts and index page.