[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Forks][forks-shield]][forks-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# QuintorCatalogFrontEnd

The Quintor Catalog is an automated hardware catalog for the software company Quintor. System administrators can add, update, delete, search, filter, sort, and borrow hardware components.
CTO can approve/deny a borrow request to a user. The hardware is stored in a database. The back end was built using Spring Boot. [Go to Back end repo](https://github.com/MarkStreek/QuintorCatalogBackEnd)

![Screenshot1](frontend/public/screenshots/welkom.png)
![Screenshot2](frontend/public/screenshots/lijstvanapparaten.png)
![Screenshot3](frontend/public/screenshots/apparaattoevoegen.png)
![Screenshot4](frontend/public/screenshots/verzoekgoedkeuren.png)

As the name suggests, this is the front end of the project. The front end was built using React. The front end communicates with the back end using REST API.
If you're interested in the back end mechanisms, please take a look at the broad documentation in the back end repository.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About Quintor](#about-quintor)
- [About the project](#about-the-project)
- [Built with](#built-with)
- [Getting Started](#getting-started)

## Getting Started

**! It is very advised to first read more about the project before starting!**

To start the application, make sure the back end Spring Boot application is running. After that, open a new terminal and navigate to this project. Navigate into the `frontend` and start the project:

```bash
# Navigate to the /frontend folder
cd frontend

# Starting application
npm start
````

> Warning: before starting the application, you have to meet the following (minimum) requirements to run the application:

**Install**:
- Node.js 20.11.0 or higher
  - Make sure your npm version is at least 10.2.4

**Install all the dependencies**:

- In the terminal, just as below, navigate to this project, go into the frontend dir and install all the dependencies:

```bash
# Navigate to the /frontend folder
cd frontend 

# Install all the dependencies
npm install
````

> After completing the steps above, you can start the application.

## Customization

The Table with devices is developed to show OS, Storage and RAM not in the dropdown, but appearing right away in the table.

This was done using the following code:

```javascript
// RenderTable.js - starting at line 314
if (["OS", "Storage", "RAM"].includes(spec.specName)) {
   return (
           <div key={index} className="flex">
              <div className="mr-2">{spec.specName}:</div>
              <div className="font-bold">{spec.value}</div>
           </div>
   );
}
```

> Make sure to add Specs with exact the same name as the ones in the code above. (OS, storage, RAM). You could change these names to preferences.

## Known Issues

1. Double-click on dropdowns will cause an error, easy fixable by just reloading the page (F5/cmd + R)
2. POP-UP windows should be allowed by your browser. These alerts need to be allowed because of certain actions in the application
    - It's not actually a bug or issue, but important to know, otherwise some actions could not work

## About Quintor

Quintor is a software company based in the Netherlands. Quintor helps customers to professionalize software development.

Quintor has the following disciplines:

1. Agile analytics
2. Software Development
3. Platform Engineering
4. Architecture
5. Cloud-native development
6. Security

## About the project

This project was created by students bioinformatics at the Hanze University of applied sciences. The main task was to create a (automated) catalog to store all hardware components in the company.

The hardware tools are stored in a database. This information is served to the front end using a REST API.

## Full insight

This section will give you a more detailed insight into the project. The project is divided into two parts: the front end and the back end. You can find the back end documentation [here](https://github.com/MarkStreek/QuintorCatalogBackEnd/wiki).

### RootLayout

fill in...

### Notifications

fill in...

## Built with

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)


<!-- Markdown Links -->
[contributors-shield]: https://img.shields.io/github/contributors/MarkStreek/QuintorCatalogFrontEnd.svg?style=for-the-badge
[contributors-url]: https://github.com/MarkStreek/QuintorCatalogFrontEnd/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/MarkStreek/QuintorCatalogFrontEnd.svg?style=for-the-badge
[stars-url]: https://github.com/MarkStreek/QuintorCatalogFrontEnd/stargazers
[issues-shield]: https://img.shields.io/github/issues/MarkStreek/QuintorCatalogFrontEnd.svg?style=for-the-badge
[issues-url]: https://github.com/MarkStreek/QuintorCatalogFrontEnd/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/quintor/
[forks-shield]: https://img.shields.io/github/forks/MarkStreek/QuintorCatalogFrontEnd.svg?style=for-the-badge
[forks-url]: https://github.com/MarkStreek/QuintorCatalogFrontEnd/network/members
