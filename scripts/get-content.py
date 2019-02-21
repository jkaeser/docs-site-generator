#!/usr/bin/python

# Install instructions:
# See https://pip.pypa.io/en/stable/installing/
# Then run:
#   - sudo pip install colorama
#   - sudo pip install requests

import subprocess
import sys
import os
import shutil
import contextlib
import colorama

from contextlib import contextmanager
from colorama import Fore, Back, Style, init

# Install with: pip install requests
try:
  import requests
except:
  subprocess.call('pip install requests', shell=True)
  import requests

# Define content repositories
repos = [
    {
        "name": "product-A",
        "git": "https://github.com/jkaeser/docs-content.git"
    },
    {
        "name": "product-B",
        "git": "https://github.com/jkaeser/docs-content.git"
    }
]

# Make colors reset after every line by default.
init(autoreset=True)

# See https://stackoverflow.com/questions/431684/how-do-i-change-directory-cd-in-python#answer-24176022
@contextmanager
def cd(newdir):
    prevdir = os.getcwd()
    os.chdir(os.path.expanduser(newdir))
    try:
        yield
    finally:
        os.chdir(prevdir)

# Helper functions for user input
def request_include(r):
    return raw_input(Fore.GREEN + "\nInclude content from " + r["name"] + "? [y/n]: ").strip()

def request_branch():
    return raw_input(Fore.GREEN + "Which branch or tag would you like to check out (defaults to master)? ")

def request_remove(r):
    return raw_input(Fore.YELLOW + "It looks like " + r["name"] + " has already been added. Would you like to remove it? [y/n]: ")

# Helper that makes code easier to read
def shell(input):
    subprocess.call(input, shell=True)

#
def add_repo(r):
    # Prompt user to include content from this repo or not
    use = request_include(r)

    # Handle incorrect inputs
    while use.lower() not in ["y", "n"]:
        print(use + " is not a valid response. Please enter \"y\" or \"n\"")
        use = request_include(r)

    if use.lower() == "y":
        # Create directory and cd into it
        if not os.path.exists(r["name"]):
            print("Making new directory named " + r["name"])
            shell("mkdir " + r["name"])
        os.chdir(r["name"])

        # Initialize repo and grab branches
        if os.path.exists(".git"):
            print("Git repo already initialized.\n")
            shell("git fetch --all")

            print(Fore.CYAN + "Branches:")
            shell("git branch --list -a")
            print(Fore.CYAN + "\nTags:")
            shell("git tag --list")

        else:
            shell("git init")
            shell("git remote add origin " + r["git"])
            shell("git fetch --all")

        # Request branch
        branch = request_branch()
        # Default to master branch
        if branch == "":
            branch = "master"
            print "Defaulting to master branch."

        # Check out selected branch or tag
        shell("git checkout " + branch)

        # Go back a level for any other repos that will be added
        os.chdir("..")

    if use.lower() == "n":
        # Present opportunity to remove content
        if os.path.exists(r["name"]):
            remove = request_remove(r)

            # Handle incorrect inputs
            while remove.lower() not in ["y", "n"]:
                print(use + " is not a valid response. Please enter \"y\" or \"n\"")
                remove = request_remove(r)

            if remove.lower() == "y":
                shutil.rmtree(r["name"])
                print(r["name"] + " content removed.")
            else:
                print("Keeping content.")

def get_content():
    # This script must be run from within the /scripts directory.
    # @TODO: Figure out how to make this path-independent.
    if os.path.basename(os.getcwd()) != "scripts":
        sys.exit(Fore.RED + "ERROR: You must run " + os.path.basename(__file__) + " from the scripts directory.")

    # This relative path is the reason we require the script to be run from a particular place.
    with cd("../src/pages/docs"):
        for r in repos:
            add_repo(r)

get_content()
