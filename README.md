# Google Sheets Grader App

## Getting Started:
1. This setup interfaces with a local machine and a remote google apps-script project
2. To push and pull code from the remote apps script project to the local machine, it's highly recommended to download and install the Google / Clasp CLI (Command Line Interface) for your machine's operating system (OS).
3. There's a link to the example template below. Make a copy.

## Summary
| Field | Description |
| ----------- | ----------- |
| Project Name | grader |
| Description | Grades and organizes data from a google sheet containing multiple response forms |
| Developers | [ThatSombraCoder](https://thatsombracoder.netlify.app) |
| Example Template | https://docs.google.com/spreadsheets/d/1vD-BaEQGJB5rYy3oSWu5hVkiXMvMx9IKqlL9hkNToDA/edit?usp=sharing|
|Repo | https://github.com/Newbclharri/grader |
|Technologies |Google Apps Script, Google Clasp, JavaScript, Google Cloud, Google Sheets, Github |

## Features
- Auto detects form submission sheet
- Styles each form submission sheet
- Dates each form submission sheet
- Color codes incorrect responses
- Grades/Averages all response forms in the spreadsheet
- Creates CSV ready tabs for each class period to upload to Powerteacher
- Exports student friendly report on a remote google spreadsheet

## Helpful Resources:
- [google clasp quick start](https://www.npmjs.com/package/@google/clasp)
- [google clasp documentation](https://developers.google.com/apps-script/guides/clasp)

## Additional Notes
1. /src/app
    - contains the main project code that executes all functions
2. /src/template
