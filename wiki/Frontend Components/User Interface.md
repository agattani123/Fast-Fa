<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/public/index.html](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/index.html)
- [scholarship_app/public/style.css](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/style.css)
- [scholarship_app/public/script.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/script.js)
- [scholarship_app/public/form.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/form.js)

</details>

# User Interface

## Introduction

The "User Interface" is a crucial component of the "Fast-Fa" scholarship application project, providing a user-friendly and visually appealing interface for applicants to submit their information. The UI consists of an HTML page (`index.html`) that renders a form for capturing applicant details, along with CSS styles (`style.css`) to enhance the appearance and layout. JavaScript files (`script.js` and `form.js`) handle form submission and client-side validation.

## HTML Structure

The `index.html` file defines the structure and content of the application's main page. It includes a header with the project's name and a main section containing a brief introduction and the scholarship application form.

### Application Form

The application form is implemented using an HTML `<form>` element with the following key components:

```html
<form id="scholarshipForm" action="/submit-application" method="POST">
    <!-- Form fields -->
</form>
```

Sources: [scholarship_app/public/index.html:14-22]()

The form has an `id` attribute for easy selection and an `action` attribute specifying the server endpoint for form submission. The `method` attribute is set to `POST`, indicating that the form data will be sent using an HTTP POST request.

#### Form Fields

The form consists of the following input fields:

- **First Name**: A text input field for the applicant's first name.
- **Last Name**: A text input field for the applicant's last name.
- **Financial Information**: A textarea field for the applicant to provide their financial information.

```html
<div class="inputBox">
    <input type="text" name="firstName" required="required">
    <span>First Name</span>
</div>
<div class="inputBox">
    <input type="text" name="lastName" required="required">
    <span>Last Name</span>
</div>
<div class="inputBox">
    <textarea name="financial_info" required rows="8"></textarea>
    <span>Description</span>
</div>
```

Sources: [scholarship_app/public/index.html:16-21]()

The input fields are wrapped in `<div>` elements with the class `inputBox` for styling purposes. The `required` attribute is set on all input fields to ensure that they are filled out before form submission.

#### Submit Button

The form includes a submit button to trigger the form submission process.

```html
<button type="submit">Apply</button>
```

Sources: [scholarship_app/public/index.html:22]()

## CSS Styles

The `style.css` file contains the CSS styles that control the appearance and layout of the application's user interface.

### General Styles

The CSS file defines general styles for the `body` element, setting the font family, background color, and layout properties.

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(-45deg, #3d7ec7, #7f91a9, #4b7c86, #ecf0ef);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
}
```

Sources: [scholarship_app/public/style.css:1-13]()

The background is set to a linear gradient with an animation effect, creating a visually appealing and dynamic background.

### Container Styles

The main container that holds the application content is styled with a white background, padding, border radius, and a box shadow for a modern and clean look.

```css
.container {
    width: 90%;
    max-width: 600px;
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
}
```

Sources: [scholarship_app/public/style.css:15-22]()

### Header and Text Styles

The header and text elements within the container are styled with specific font sizes, colors, and line heights for better readability and visual appeal.

```css
.header h1 {
    font-size: 48px;
    color: #5b3c88;
}

.main p {
    margin-bottom: 20px;
    line-height: 1.6;
    font-size: 18px;
    color: midnightblue;
    opacity: 0.75;
}

.para {
    margin-bottom: 20px;
    line-height: 1.6;
    font-size: 18px;
    color: midnightblue;
    opacity: 0.75;
}
```

Sources: [scholarship_app/public/style.css:24-38]()

### Form Styles

The CSS file includes styles for the form elements, such as input fields, textareas, and the submit button.

#### Input Field Styles

The input fields and textareas are styled with a consistent appearance, including a background color, border, border radius, and font size.

```css
.inputBox input, .inputBox textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: #f6f8f9;
    border-radius: 5px;
    outline: none;
    color: #0e0c0c;
    font-size: 1em;
}
```

Sources: [scholarship_app/public/style.css:47-55]()

Additionally, the CSS includes styles for the input field labels, which are positioned absolutely and transition smoothly when the input field is focused or filled out.

```css
.inputBox span {
    position: absolute;
    left: 10px;
    top: 10px;
    pointer-events: none;
    font-size: 1em;
    color: rgba(106, 95, 95, 0.25);
    text-transform: uppercase;
    transition: 0.3s;
}

.inputBox input:valid ~ span,
.inputBox input:focus ~ span,
.inputBox textarea:valid ~ span,
.inputBox textarea:focus ~ span {
    color: rgb(157, 157, 201);
    transform: translateY(-20px);
    font-size: 0.65em;
    background: #1d2b3a;
    border-left: 1px solid rgb(25, 25, 112);
    border-right: 1px solid rgb(25, 25, 112);
    padding: 0 10px;
}
```

Sources: [scholarship_app/public/style.css:57-73]()

#### Submit Button Styles

The submit button is styled with a background color, text color, border radius, and cursor pointer. It also includes a hover effect that changes the background color and scales the button slightly.

```css
button {
    background-color: #5b3c88;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.3s;
}

button:hover {
    background-color: rgb(25, 25, 112);
    transform: scale(1.05);
}
```

Sources: [scholarship_app/public/style.css:75-86]()

### Background Animation

The CSS file includes a keyframe animation for the background gradient, creating a smooth and visually appealing transition effect.

```css
@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

Sources: [scholarship_app/public/style.css:88-92]()

## JavaScript Functionality

The project includes two JavaScript files, `script.js` and `form.js`, which handle form submission and client-side validation.

### Form Submission (script.js)

The `script.js` file contains an event listener that listens for the `submit` event on the form element with the `id` `scholarshipForm`.

```javascript
document.getElementById('scholarshipForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const financial_info = document.querySelector('textarea[name="financial_info"]').value;

    fetch('/submit-application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, financial_info }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
```

Sources: [scholarship_app/public/script.js:8-24]()

When the form is submitted, the following steps occur:

1. The default form submission behavior is prevented using `event.preventDefault()`.
2. The values of the `firstName`, `lastName`, and `financial_info` input fields are retrieved using `document.querySelector`.
3. A `fetch` request is made to the `/submit-application` endpoint using the `POST` method.
4. The form data is sent as the request body in JSON format.
5. If the request is successful, the response is logged to the console.
6. If an error occurs during the request, it is caught and logged to the console.

### Form Submission (form.js)

The `form.js` file also contains an event listener for the `submit` event on the form element with the `id` `scholarshipForm`.

```javascript
document.getElementById('scholarshipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/submit-application', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
      .then(data => alert(data));
});
```

Sources: [scholarship_app/public/form.js]()

When the form is submitted, the following steps occur:

1. The default form submission behavior is prevented using `event.preventDefault()`.
2. A `FormData` object is created from the form element using `new FormData(this)`.
3. A `fetch` request is made to the `/submit-application` endpoint using the `POST` method.
4. The form data is sent as the request body using the `FormData` object.
5. If the request is successful, the response text is displayed in an alert.

It's worth noting that both `script.js` and `form.js` handle form submission, but they use different approaches. `script.js` sends the form data as JSON, while `form.js` sends the form data as a `FormData` object.

## Conclusion

The "User Interface" component of the "Fast-Fa" scholarship application project provides a user-friendly and visually appealing interface for applicants to submit their information. The HTML structure defines the layout and content of the application form, while the CSS styles enhance the appearance and layout. JavaScript files handle form submission and client-side validation, ensuring a smooth user experience.