#!/usr/bin/env python3
"""
Static Site Generator for Johanna's Cambridge Life Blog

This script generates a static website from Markdown files, maintaining the
current design and structure of the website while making it easier to create
and publish new blog posts.
"""

import os
import re
import shutil
import datetime
import markdown
import yaml
from jinja2 import Environment, FileSystemLoader

# Configuration
CONTENT_DIR = "content/posts"
TEMPLATES_DIR = "templates"
OUTPUT_DIR = "output"
IMAGES_DIR = "images"
SITE_URL = ""  # Base URL of your site, leave empty for relative links

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_metadata(content):
    """Extract YAML metadata from the top of a markdown file."""
    if content.startswith('---'):
        end_index = content.find('---', 3)
        if end_index != -1:
            metadata_text = content[3:end_index].strip()
            try:
                metadata = yaml.safe_load(metadata_text)
                content_without_metadata = content[end_index + 3:].strip()
                return metadata, content_without_metadata
            except yaml.YAMLError as e:
                print(f"Error parsing YAML metadata: {e}")
    
    # If no metadata or error parsing, return empty dict and original content
    return {}, content

def convert_markdown_to_html(content):
    """Convert markdown content to HTML."""
    # Initialize Markdown with extensions
    md = markdown.Markdown(extensions=[
        'markdown.extensions.extra',  # Tables, footnotes, etc.
        'markdown.extensions.meta',   # Metadata
        'markdown.extensions.toc',    # Table of contents
        'markdown.extensions.codehilite',  # Code highlighting
        'markdown.extensions.fenced_code',  # Fenced code blocks
    ])
    
    return md.convert(content)

def process_post_file(file_path):
    """Process a single markdown post file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract metadata and content
    metadata, content_without_metadata = extract_metadata(content)
    
    # Set default values for required metadata
    if 'title' not in metadata:
        metadata['title'] = os.path.basename(file_path).replace('.md', '').replace('-', ' ').title()
    
    if 'date' not in metadata:
        # Try to extract date from filename (e.g., 2025-04-05-post-name.md)
        filename = os.path.basename(file_path)
        date_match = re.match(r'(\d{4}-\d{2}-\d{2})', filename)
        if date_match:
            metadata['date'] = date_match.group(1)
        else:
            metadata['date'] = datetime.datetime.now().strftime('%Y-%m-%d')
    
    # Convert markdown to HTML
    html_content = convert_markdown_to_html(content_without_metadata)
    
    return metadata, html_content

def generate_post_html(metadata, content, template_env):
    """Generate HTML for a blog post using the template."""
    template = template_env.get_template('post.html')
    
    # Format the date if it's a string
    if isinstance(metadata.get('date'), str):
        try:
            date_obj = datetime.datetime.strptime(metadata['date'], '%Y-%m-%d')
            metadata['formatted_date'] = date_obj.strftime('%B %d, %Y')
        except ValueError:
            metadata['formatted_date'] = metadata['date']
    
    # Generate HTML
    html = template.render(
        title=metadata.get('title', 'Blog Post'),
        date=metadata.get('formatted_date', metadata.get('date', '')),
        content=content,
        preview_image=metadata.get('preview_image', ''),
        metadata=metadata
    )
    
    return html

def generate_index_html(posts, template_env):
    """Generate the blog index page with all posts."""
    template = template_env.get_template('blog_index.html')
    
    # Sort posts by date (newest first)
    sorted_posts = sorted(posts, key=lambda x: x['metadata'].get('date', ''), reverse=True)
    
    # Generate HTML
    html = template.render(posts=sorted_posts)
    
    return html

def copy_assets():
    """Copy CSS, JS, and images to the output directory."""
    # Copy CSS
    os.makedirs(os.path.join(OUTPUT_DIR, 'css'), exist_ok=True)
    if os.path.exists('css'):
        for file in os.listdir('css'):
            if file.endswith('.css'):
                shutil.copy2(os.path.join('css', file), os.path.join(OUTPUT_DIR, 'css', file))
    
    # Copy JS
    os.makedirs(os.path.join(OUTPUT_DIR, 'js'), exist_ok=True)
    if os.path.exists('js'):
        for file in os.listdir('js'):
            if file.endswith('.js'):
                shutil.copy2(os.path.join('js', file), os.path.join(OUTPUT_DIR, 'js', file))
    
    # Copy images
    os.makedirs(os.path.join(OUTPUT_DIR, 'images'), exist_ok=True)
    if os.path.exists('images'):
        for item in os.listdir('images'):
            item_path = os.path.join('images', item)
            if os.path.isfile(item_path):
                shutil.copy2(item_path, os.path.join(OUTPUT_DIR, 'images', item))
            elif os.path.isdir(item_path):
                shutil.copytree(item_path, os.path.join(OUTPUT_DIR, 'images', item), dirs_exist_ok=True)

def main():
    """Main function to generate the static site."""
    print("Starting static site generation...")
    
    # Initialize Jinja2 environment
    template_env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))
    
    # Process all markdown files in the content directory
    posts = []
    if os.path.exists(CONTENT_DIR):
        for filename in os.listdir(CONTENT_DIR):
            if filename.endswith('.md'):
                file_path = os.path.join(CONTENT_DIR, filename)
                print(f"Processing {file_path}...")
                
                # Process the post
                metadata, html_content = process_post_file(file_path)
                
                # Generate output filename
                output_filename = os.path.basename(file_path).replace('.md', '.html')
                output_path = os.path.join(OUTPUT_DIR, 'blog', output_filename)
                
                # Ensure blog directory exists
                os.makedirs(os.path.join(OUTPUT_DIR, 'blog'), exist_ok=True)
                
                # Generate post HTML
                post_html = generate_post_html(metadata, html_content, template_env)
                
                # Write the HTML file
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(post_html)
                
                # Add to posts list for index generation
                posts.append({
                    'metadata': metadata,
                    'url': output_filename,
                    'excerpt': html_content[:200] + '...' if len(html_content) > 200 else html_content
                })
    
    # Generate blog index page
    print("Generating blog index page...")
    index_html = generate_index_html(posts, template_env)
    
    # Write the blog index file
    with open(os.path.join(OUTPUT_DIR, 'blog', 'index.html'), 'w', encoding='utf-8') as f:
        f.write(index_html)
    
    # Copy the main index.html if it exists
    if os.path.exists('index.html'):
        shutil.copy2('index.html', os.path.join(OUTPUT_DIR, 'index.html'))
    
    # Copy assets (CSS, JS, images)
    print("Copying assets...")
    copy_assets()
    
    print("Static site generation complete!")
    print(f"Output directory: {os.path.abspath(OUTPUT_DIR)}")

if __name__ == "__main__":
    main()