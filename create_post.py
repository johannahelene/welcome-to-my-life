#!/usr/bin/env python3
"""
Blog Post Creator for Johanna's Cambridge Life Blog

This script helps you create new blog posts by prompting for the necessary
information and generating a Markdown file with the correct metadata.
"""

import os
import datetime
import re

def get_valid_input(prompt, validator=None, error_message=None):
    """Get user input with validation."""
    while True:
        user_input = input(prompt)
        if validator is None or validator(user_input):
            return user_input
        print(error_message or "Invalid input. Please try again.")

def validate_date(date_str):
    """Validate date format (YYYY-MM-DD)."""
    try:
        datetime.datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def validate_filename(filename):
    """Validate that the filename is valid."""
    return bool(re.match(r'^[a-zA-Z0-9_-]+$', filename))

def create_post():
    """Create a new blog post."""
    print("\n=== Create New Blog Post ===\n")
    
    # Get post title
    title = get_valid_input("Enter post title: ")
    
    # Get post date
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    date = get_valid_input(
        f"Enter post date (YYYY-MM-DD) [default: {today}]: ",
        lambda x: not x or validate_date(x),
        "Invalid date format. Please use YYYY-MM-DD."
    )
    if not date:
        date = today
    
    # Get preview image
    preview_image = get_valid_input("Enter preview image filename (e.g., image.jpg): ")
    
    # Generate filename
    default_filename = f"{date}-{'-'.join(title.lower().split())}"
    filename = get_valid_input(
        f"Enter filename (without .md) [default: {default_filename}]: ",
        lambda x: not x or validate_filename(x),
        "Invalid filename. Use only letters, numbers, underscores, and hyphens."
    )
    if not filename:
        filename = default_filename
    
    # Create content directory if it doesn't exist
    os.makedirs("content/posts", exist_ok=True)
    
    # Create the Markdown file
    file_path = f"content/posts/{filename}.md"
    
    # Check if file already exists
    if os.path.exists(file_path):
        overwrite = input(f"File {file_path} already exists. Overwrite? (y/n): ")
        if overwrite.lower() != 'y':
            print("Operation cancelled.")
            return
    
    # Build the metadata
    metadata = [
        "---",
        f"title: {title}",
        f"date: {date}",
        f"preview_image: {preview_image}"
    ]
    
    metadata.append("---\n")
    
    # Add initial content
    content = [
        f"# {title}",
        "",
        "Write your post content here using Markdown formatting...",
        "",
        "## Section Title",
        "",
        "Continue writing your post...",
        ""
    ]
    
    # Write to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(metadata + content))
    
    print(f"\nBlog post created successfully: {file_path}")
    print("\nNext steps:")
    print("1. Edit the file to add your content")
    print("2. Run 'python generate_site.py' to generate the HTML files")
    print("3. Upload the contents of the 'output' directory to your web server")

if __name__ == "__main__":
    create_post()