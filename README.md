# Chainalysis Docs Generator

[TOC]

## Overview

Chainalysis documentation sites are built with a combination of a Gatsby website framework and various content repositories. I will refer to the Gatsby framework we've put together as the **site generator** throughout this guide.

The high level idea is that the site generator consumes arbitrary content from the content repositories, digests it, and returns a fully functional static website.

## Tech Stack

### Gatsby
[Gatsby](https://www.gatsbyjs.org/) is a React-based static site framework. It follows [the JAMstack architecture](https://jamstack.org/) so that the generated sites do not rely on any specific server-side technologies. In other words, as long as you can point a web server to the site directory, it will render in the client browser.

### Markdown
Gatsby is not a content management system; instead, it sources content from data files, such as Markdown, JSON, or YAML files. In our case, we are using Markdown since it is friendly to content editors. All Markdown files all live in the aforementioned content repositories.

## Installing Dependencies
First, you will need to have the following installed on your machine:
*   Node.js >= 10.15.1 LTS ([https://nodejs.org/](https://nodejs.org/))
*   Yarn >= 1.10.1 ([https://yarnpkg.com/](https://yarnpkg.com/))
*   Python >= 2.7.10

The site generator repository includes a list of Node.js dependencies in the package.json file. Install with the following command from the repository root:

```
yarn install
```

**Note:** The Node dependencies are only used at build time and are in no way necessary for the generated sites to function.

Once you clone down the site generator and install the dependencies, you're ready to generate site.

## Generating a Site

### Step 1: Download content

Run the **get-content.py** script from within the **scripts/** directory. This script will allow you to select which content repositories to pull content from, and which Git branch or tag you'd like to use. You can re-run the script to remove content or change which branch/tag you've checked out.

This script also generates a **content-manifest.json** file that will live in the root of the generated site. As of the time of this writing, it includes the following information for each content repository:
*   A date stamp of when the content was downloaded
*   The hash of the latest commit on the branch or tag that was checked out

### Step 2: Run the build command
Run **yarn build** from the repository root. This will generate a site into the **public/** directory. If you'd like to preview the site, run **yarn serve**. This will spin up a development server and let you view the site at **http://localhost:9000/**.

The generated **public/** directory is an entirely self-sufficient and portable site. You can rename it, move it, and point a web server to it.

## Site Generator Architecture
The **src/** directory contains all the files used to build copies of the site.

### components/
Includes various React components used across the site.

### img/
Includes images that are hardcoded into layouts or components.

### js-utils/
Includes JavaScript functions that are used in layouts or components.

### pages/
Includes files that Gatsby will render into pages on the site. Documentation content gets placed in the **docs/** directory. For more information, see the section in this guide about the **docs/** directory.

### js-utils
Includes JavaScript functions that are used in layouts or components.

### sass-utils/
Includes Sass tools that are used in layouts or components.

### templates/
Includes page templates that are used when rendering content pages.
