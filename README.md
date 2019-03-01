# Chainalysis Docs Site Generator

- [Overview](#overview)
- [Installing Dependencies](#installing-dependencies)
- [Generating a Site](#generating-a-site)
  - [Download content](#step-1-download-content)
  - [Additional customization](#step-2-additional-customization)
  - [Run the build command](#step-3-run-the-build-command)
- [More Information](#more-information)
  - [Tech Stack](#tech-stack)
    - [Gatsby](#gatsby)
    - [Markdown](#markdown)
  - [Architectural Notes](#architectural-notes)
    - [How content is transformed into site pages](#how-content-is-transformed-into-site-pages)
    - [The menu system](#the-menu-system)
  - [Directory Structure](#directory-structure)

## Overview

Chainalysis documentation sites are built with a combination of this Gatsby website framework and various content repositories. This guide will refer to the Gatsby framework as the **site generator**.

The high level idea is that the site generator consumes arbitrary content from the content repositories, digests it, and returns a fully functional static website.

## Installing Dependencies
First, you will need to have the following installed on your machine:
*   Node.js >= 10.15.1 LTS ([https://nodejs.org/](https://nodejs.org/))
*   Yarn >= 1.10.1 ([https://yarnpkg.com/](https://yarnpkg.com/))
*   Python >= 2.7.10

This repository includes a list of Node.js dependencies in the package.json file. Install these dependencies by running the following command from the repository root:

```
yarn install
```

**Note:** The Node dependencies are only used at build time and are in no way necessary for the generated sites to function.

Once you install the dependencies, you're ready to generate a site.

## Generating a Site

### Step 1: Download content

Run `./get-content.py` from within the **scripts/** directory. This script will allow you to select which content repositories to pull content from, and which Git branch or tag you'd like to use. You can re-run the script to remove content or change which branch/tag you've checked out.

This script also generates a **content-manifest.json** file that will live in the root of the generated site. As of the time of this writing, it includes the following information for each content repository:
*   A date stamp of when the content was downloaded
*   The hash of the latest commit on the branch or tag that was checked out

### Step 2: Additional customization
As of the time of writing, there are two additional elements you may want to change per generated site that have to be taken care of manually.

**1. The landing page header:** You can change this by navigating to **src/pages/home/home.md** and changing the **title** frontmatter value.

**2. The header navigation:** You can change header nav links by navigating to **src/components/Menus/Nav/index.js** and altering the `navItems` array.

### Step 3: Run the build command
Run `yarn build` from the repository root. This will generate a site into the **public/** directory. If you'd like to preview the site, run `yarn serve`. This will spin up a development server and let you view the site at **http://localhost:9000/**.

The generated **public/** directory is an entirely self-sufficient and portable site. You can rename it, move it, and point a web server to it.

## More Information

### Tech Stack

#### Gatsby
[Gatsby](https://www.gatsbyjs.org/) is a React-based static site framework. It follows [the JAMstack architecture](https://jamstack.org/) so that the generated sites do not rely on any specific server-side technologies. In other words, as long as you can point a web server to the site directory, it will render in the client browser.

#### Markdown
Gatsby is not a content management system; instead, it sources content from data files, such as Markdown, JSON, or YAML files. In our case, we are using Markdown since it is friendly to content editors. All Markdown files live in separate content repositories.

### Architectural Notes

#### How content is transformed into site pages
Any Markdown files that are placed in the **src/pages/** directory will be rendered into pages on the site. In reality, you don't _need_ to run the `get-content.py` script – that was added for convenience. You could simply clone the appropriate content repositories into this directory if you wanted.

Content data is pulled from Markdown files via [GraphQL](https://www.graphql.com/) queries. Configuration in gatsby-config.js is responsible for making Markdown data available to GraphQL, and configuration in gatsby-node.js is responsible for page creation.

#### The menu system
Since the site generator doesn't know ahead of time what content will live on the sites, we programmatically generate the various navigational structures. **Every decision the menu system makes hinges upon the `path` frontmatter values in the content Markdown files.**

All the menu handling can be found in **src/components/Menus**. The menu.js file includes a small API for such tasks as collecting all path values from content files and inferring menu trees from said values. Each component within this directory (with the exception of Nav) uses the menu.js API to source path data and render it into various HTML structures.

### Directory Structure
The **src/** directory contains all the files used to build copies of the site.

#### components/
Includes various React components used across the site.

#### img/
Includes images that are hardcoded into layouts or components.

#### js-utils/
Includes JavaScript helper functions that are used in layouts or components.

#### pages/
Includes files that Gatsby will render into pages on the site.

#### sass-utils/
Includes Sass tools that are used in layouts or components.

#### templates/
Includes page templates that are used when rendering content pages.
