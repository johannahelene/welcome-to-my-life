# Hosting Your Website on GitHub Pages with Password Protection

This document explains how to host your website on GitHub Pages while maintaining the simple password protection we've implemented.

## Step 1: Create a GitHub Account

If you don't already have a GitHub account, go to [github.com](https://github.com) and sign up for a free account.

## Step 2: Create a New Repository

1. Once logged in, click the "+" icon in the top right corner and select "New repository"
2. Name your repository (e.g., "my-website" or "johanna-website")
3. You can choose to make it private (only visible to you and people you invite)
4. Click "Create repository"

## Step 3: Upload Your Website Files

### Option 1: Using GitHub Web Interface

1. In your new repository, click the "Add file" button and select "Upload files"
2. Drag and drop all your website files or use the file selector
3. Add a commit message like "Initial website upload"
4. Click "Commit changes"

### Option 2: Using Git Command Line (More Advanced)

If you're comfortable with Git, you can use these commands:

```bash
# Navigate to your website directory
cd /path/to/your/website

# Initialize a Git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial website upload"

# Add the remote GitHub repository
git remote add origin https://github.com/yourusername/your-repository-name.git

# Push to GitHub
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. In your repository, go to "Settings"
2. Scroll down to the "GitHub Pages" section
3. Under "Source", select "main" branch
4. Click "Save"
5. GitHub will provide you with a URL where your site is published (usually https://yourusername.github.io/your-repository-name/)

## Step 5: Understanding the Password Protection

The password protection we've implemented works on the client-side using JavaScript. It's important to understand that:

1. This is a simple form of protection that prevents casual visitors from accessing your site
2. The password is stored in the JavaScript file (js/login.js), which technically can be viewed by someone who knows where to look
3. For a personal website with non-sensitive content, this level of protection is usually sufficient

## Step 6: Making Your Repository Private (Optional)

If you want to add an extra layer of privacy:

1. Go to your repository settings
2. Scroll down to the "Danger Zone" section
3. Click "Change repository visibility"
4. Select "Make private"
5. Confirm by typing your repository name

Note: When you make your repository private, your GitHub Pages site will still be publicly accessible at its URL. The private repository just means people can't see your source code.

## Step 7: Custom Domain (Optional)

If you want to use your own domain name instead of the github.io URL:

1. Purchase a domain from a domain registrar (like Namecheap, GoDaddy, etc.)
2. In your repository settings, under GitHub Pages, enter your custom domain
3. Update your domain's DNS settings to point to GitHub Pages (follow GitHub's documentation for specific instructions)

## Maintaining Your Website

To update your website:

1. Make changes to your local files
2. Upload them to GitHub using the web interface or Git commands
3. GitHub Pages will automatically update your live site

## Password Management

If you want to change the password:

1. Edit the `js/login.js` file
2. Change the `correctPassword` variable to your new password
3. Upload the updated file to GitHub

Remember that this password protection is simple and meant for basic privacy, not for securing highly sensitive information.