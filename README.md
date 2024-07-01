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

- [QuintorCatalogFrontEnd](#quintorcatalogfrontend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Customization](#customization)
  - [Known Issues](#known-issues)
  - [About Quintor](#about-quintor)
  - [About the project](#about-the-project)
  - [Full insight](#full-insight)
    - [React](#react)
    - [RootLayout](#rootlayout)
    - [Notifications](#notifications)
    - [Devices](#devices)
    - [Add Device](#add-device)
      - [Add Device - New Specification](#add-device---new-specification)
    - [Borrow Request / Borrow Status](#borrow-request--borrow-status)
  - [Built with](#built-with)

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

> There is a `wiki page` available for this project. The wiki page contains this information in a more structured way. [Go to the wiki page](https://github.com/MarkStreek/QuintorCatalogFrontEnd/wiki)

### React

Very important to know is that the project is built using React. React is a JavaScript library for building user interfaces. The learning curve of React is quite steep. Therefore it is important to have a good understanding of React before starting, developing or already reading the project.

This project used Next.js as a React framework. React is difficult to develop and run without a framework. There is a fixed format in developing React with Next.js:

```javascript

export default function Home() {


   CreateFunctionsThatYouNeed();

   // for example, functions could update the state of a component

   const yourState = useState("initialState");

   CallYourFunctions();

   return (
      <div>
         // Render your component in the return
         <h1>{yourState}</h1>
      </div>
   );
}
```

The return of the main function is the component that will be rendered when calling the function. The component is written in JSX. JSX is a syntax extension for JavaScript. It's just like returning HTML directly in JavaScript. You don't have to pass all the props to the component, you can just write them in the JSX.

> Because of the usage of JSX, if you're a little bit familiar with HTML, you could easily start expanding this project.

A core component of React is Hooks. *"Hooks let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own. This page lists all built-in Hooks in React."* - [React documentation](https://react.dev/reference/react/hooks).

*Again, it is very important to have a good understanding of React before reading further.*

### RootLayout

As you've probably already seen in the screenshots, the application has a sidebar. This sidebar is the RootLayout. I.e., every page in the application is wrapped around the RootLayout. The RootLayout consists of the following components:

1. Sidebar
2. Navbar
3. Styling of the Child components
4. Token validation

The `Sidebar` and `Navbar` are static components, which are defined in separate files. In the `RootLayout.js` file, the Sidebar and Navbar are imported and rendered. Let's look how the RootLayout is structured.

*Simplified version of the RootLayout:

```html
// RootLayout.js

<div>
   <div styling...>
      <Sidebar />
   </div>
   <div styling...>
      <Navbar />
   </div>
   <div styling...>
      {children}
   </div>
</div>
```

And before explaining the code, first look how the RootLayout is used:

```html
<RootLayout>
   <h1 className="text-5xl">Quintor hardware catalogus</h1>
   <p>More components...</p>
</RootLayout>
```

As you can see, the `RootLayout` is used as a wrapper around the components. All components placed inside the RootLayout are called the `children` of the RootLayout.

Two big advantages of using the RootLayout:

1. If we now change one line in the Sidebar component, the changes will be applied to all pages in the application.
2. When navigating through the application, the Navbar and Sidebar will always be visible. They don't have to re-render every time a new page is loaded, only the children will be re-rendered. Which is more efficient and feels much faster.

> For future reference, if you want to change the Sidebar or Navbar, you only have to change the Sidebar or Navbar component. The changes will be applied to all pages in the application.

Additionally, the RootLayout has a token validation. This means that the RootLayout checks if a token is present and if the token is valid. If conditions are not met, the user will be redirected to the login page.

```javascript
// RootLayout.js

useEffect(() => {
   if (!localStorage.getItem("token")) {
      router.push("/login").then();
   } else {
      fetch("http://localhost:8080/auth/validate", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
      }).then((response) => {
            if (!response.ok) {
               router.push("/login").then();
            }
      });
   }
}, []);
```

The code is pretty straightforward. If there is no token, the user will be redirected to the login page. If there is a token, the token will be validated. If the token is not valid, the user will be redirected to the login page.

### Notifications

The application has a notification system. The notification system is used to inform the user about certain actions. For example, when a user adds a new device, the user will receive a notification that the device has been added successfully. Or when a user tries to borrow a device, the user will receive a notification that the borrow request has been sent. But also, when a user tries to borrow a device that is already borrowed, the user will receive a notification that the borrow request has been denied.

The notification works easy:
   
```javascript
const [message, setMessage] = useState(null);

    function Notification({ message }) {
        const messageClass = isError ? "bg-red-500" : "bg-green-500";
        return (
            <div className="styling...">
                <div className="styling...">
                    <div className="styling...">
                        {isError ? <ExclamationIcon /> : <CheckCircleIcon />}
                    </div>
                    <div className="styling...">
                        <p className="styling...">
                            {message}
                        </p>
                    </div>
                    <div className="styling...">
                        <button className="styling...">
                            <XIcon />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
```

You define this Notification component in a function. And use a state to set the message. When you're fetching some information to the back end, you could simply update the state like following:

```javascript
if (response.ok) {
   setIsError(false);
} else {
   setIsError(true);
}
setMessage(response.message);

// Turn the message to null after 5 seconds
setTimeout(() => {
   setMessage(null);
}, 4000);
```

Please note that the back end uses a fixed pattern in returning messages. Errors and success messages are returned in a fixed format. The front end uses this format to determine if the message is an error or a success message.

After 4 seconds, the message will be set to null.

### Devices

For listing all devices in the database, a table is used. We used the table component from the `NextUI` library. The component has a lot of small functions to handle the filtering, searching, etc. The table component structure is as follows:

```javascript
// Devices/index.js

<Table>
   <TableHeader>
      <TableColumn>Column name...</TableColumn>
   </TableHeader>
   <TableBody>
      <TableRow>
         <TableCell>Column value...</TableCell>
      </TableRow>
   </TableBody>
</Table>
```

Above is a very simplified version of the table. The actually table contains a lot more columns, cells, and properties. Also a lot of `on` functions: `onChange`, `onSortChange`, etc.

Let's take a quick look at the rows per page functions in the table.

```javascript
// Devices/index.js

const onRowsPerPageChange = useCallback((e) => {
   setRowsPerPage(Number(e.target.value));
   setPage(1);
}, []);
```

The `onRowsPerPageChange` function is called when the user changes the rows per page (in dropdown). As you can see, two states are updated. These updates are then triggering a `useMemo` which contains the right sliced device data: 

```javascript
// Devices/index.js

const items = useMemo(() => {
   const start = (page - 1) * rowsPerPage;
   const end = start + rowsPerPage;

   return filteredItems.slice(start, end);
}, [page, rowsPerPage, filteredItems]);
```

And the `items` memo on his turn, is triggering the `sortedItems` memo:

```javascript
// Devices/index.js

const sortedItems = useMemo(() => {
   return [...items].sort((a, b) => {
      let first, second;
      if (sortDescriptor.column === 'specs') {
            first = a.specs.map(spec => spec.specName + ' ' + spec.value).join(', ');
            second = b.specs.map(spec => spec.specName + ' ' + spec.value).join(', ');
      } else {
            first = a[sortDescriptor.column];
            second = b[sortDescriptor.column];
      }
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
   });
}, [sortDescriptor, items]);
```

As you can see, with the right amount of pages and rows per table, the right numbers will be calculated and the right data will be sliced and sorted.

### Add Device

For adding a device, a React state is used. The state is realtime updated when the user types in the input fields:

```javascript
// addDevice/index.js

const initialDeviceData = {
        Type: "",
        Merknaam: "",
        Model: "",
        Serienummer: "",
        Factuurnummer: "",
        LocatieNaam: "",
        LocatieStad: "",
        LocatieAdres: "",
        specificaties: []
    };
```

The `initialDeviceData` is the initial state of the device. These fields are used as initial values in the `DeviceData` state.

```javascript
<Input
   key={key}
   size="md"
   type="text"
   variant="bordered"
   label={key}
   value={DeviceData[key]}
   onChange={(e) => setDeviceData({...DeviceData, [key]: e.target.value})}
   className="mt-2 pr-3 pb-0.5 pt-0.5 relative z-0 w-full"
/>
```

The `onChange` function is used to update the state in realtime. The `key` is the key of the object. The `e.target.value` is the value of the input field. The `setDeviceData` function is used to update the state.

*When a user clicks on the add device button the initial state will be used again to reset the state*. This resetting of device state and more states is done in the function called `resetState()`.

#### Add Device - New Specification

All used specifications of devices in the database are retrieved from the database. This is done by the function `getAlreadyUsedSpecs(alreadyUsedSpecs, setAlreadyUsedSpecs)` in `addDevice/index.js`. The alreadyUsedSpecs is a React state were the used specifications are stored. SetAlreadyUsedSpecs is a function to update them. 

Sometimes a user wants to add a new device with a specification that is not in the database yet. In the return of the `addDevice/index.js` file, a comonent is rendered to add a new specification:

```javascript
// addDevice/index.js
<AddNewSpecification
   alreadyUsedSpecs={alreadyUsedSpecs}
   setAlreadyUsedSpecs={setAlreadyUsedSpecs}
   setMessage={setMessage}
   resetState={resetState}
   setIsError={setIsError}
/>
```

- `alreadyUsedSpecs` is the state with all the used specifications
- `setAlreadyUsedSpecs` is the function to update the state
- `setMessage` is the function to set a message
- `resetState` is the function to reset the state
- `setIsError` is the function to set the error state

`<AddNewSpecification />` is a full component that is rendered in the return of the `addDevice/index.js` file. Therefore a fully new section appears on the add device page. The component is defined in the `addDevice/AddNewSpecification.js` file and consists of the following parts:

1. Input type text field to add a new specification name
2. Input type selector to add a new specification type
   1. Text
   2. Number
   3. Date
   4. Boolean
   5. Time
3. Button to add the new specification

When a user clicks on the add button, the new specification will be added to the `deviceData` state and **not** directly into the database. When adding a new device with the newly added specification, the new specification will be added to the database.

### Borrow Request / Borrow Status

The borrow request is a simple page where (1) a user can be chosen from a dropdown and (2) a device can be chosen from a dropdown. Additionally some text could be added to the request.

The users and devices are retrieved from the back end with a simple fetch request to the right endpoint. With this data, the dropdowns are filled and some first line checking is being done when the user clicks on the borrow button.

A device can't be borrowed twice, so when a user tries to borrow a device that is already borrowed, the notification will be set to error and right message.

After checking, a simple request is being sent to the back end to add a borrow request. This request consists of the user and deviceID and some additional text. 

```json
{
   "userName": "user",
   "deviceId": "1",
   "text": "I need this"
}
```

The borrow status page is quite the same as the `Devices` table page. The borrow requests are fetched from the back end endpoint and placed in the table.

If the status of the requests is `waiting for approval`, the `approve` button will be shown in the overview modal. The `delete` button will always be shown.

When a user clicks on the `approve` button, a request will be sent to the back end to approve the request. The request consists of the requestID in the url.

```http
POST http://localhost:8080/borrow/approve/1
```

For deleting a request, the same principle is used. 

```http
POST http://localhost:8080/borrow/delete/1
```

For approving, the request will be checked for CTO role. If the user is not a CTO, the request will be denied. Of course, `setMessage` will be set and `setIsError` will be set to true.

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
