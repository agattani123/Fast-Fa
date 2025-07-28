<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [wiki/Frontend Components/User Interface.md](https://github.com/agattani123/Fast-Fa/blob/master/wiki/Frontend Components/User Interface.md)
- [scholarship_app/public/index.html](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/index.html)
- [scholarship_app/public/style.css](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/style.css)
- [scholarship_app/public/form.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/form.js)
- [scholarship_app/public/script.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/script.js)

</details>

# User Interface

## Introduction

The "User Interface" component of the Fast-Fa scholarship application project is a web-based form that allows users to input their personal and financial information to apply for scholarships. It provides a simple and user-friendly interface for users to enter their first and last names, as well as a description of their financial situation.

The user interface is built using HTML, CSS, and JavaScript. The HTML file (`index.html`) defines the structure of the page, including the form elements and input fields, while the CSS file (`style.css`) handles the styling and layout of the user interface. The JavaScript files (`form.js` and `script.js`) handle form submission and client-side interactivity.

Sources: [scholarship_app/public/index.html](), [scholarship_app/public/style.css](), [scholarship_app/public/form.js](), [scholarship_app/public/script.js]()

## Page Structure

The user interface is contained within a `<div>` element with the class `container`, which centers the content vertically and horizontally on the page. The page consists of a header and a main section.

```html
<div class="container">
    <header class="para">
        <h1>fast-fa</h1>
    </header>
    <main>
        <!-- Form and content -->
    </main>
</div>
```

Sources: [scholarship_app/public/index.html:10-18]()

## Form

The main content of the user interface is a form (`<form>`) with an id `scholarshipForm`. The form is submitted via the POST method to the `/submit-application` endpoint.

```html
<form id="scholarshipForm" action="/submit-application" method="POST">
    <!-- Form fields -->
</form>
```

Sources: [scholarship_app/public/index.html:21]()

### Form Fields

The form consists of the following input fields:

1. **First Name**: A text input field for the user's first name, marked as required.
2. **Last Name**: A text input field for the user's last name, marked as required.
3. **Financial Information**: A textarea field for the user to provide a description of their financial situation, marked as required.

```html
<div class="row">
    <div class="inputBox">
        <input type="text" name="firstName" required="required">
        <span>First Name</span>
    </div>
    <div class="inputBox">
        <input type="text" name="lastName" required="required">
        <span>Last Name</span>
    </div>
</div>
<div class="inputBox">
    <textarea name="financial_info" required rows="8"></textarea>
    <span>Description</span>
</div>
```

Sources: [scholarship_app/public/index.html:22-33]()

4. **Submit Button**: A button to submit the form.

```html
<button type="submit">Apply</button>
```

Sources: [scholarship_app/public/index.html:34]()

## Form Submission

The form submission is handled by JavaScript code in the `form.js` and `script.js` files.

### Form.js

The `form.js` file contains an event listener that listens for the `submit` event on the `scholarshipForm`. When the form is submitted, the event is prevented from its default behavior, and the form data is sent to the `/submit-application` endpoint using the `fetch` API.

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

Sources: [scholarship_app/public/form.js:1-8]()

### Script.js

The `script.js` file contains another event listener for the `submit` event on the `scholarshipForm`. This event listener also prevents the default form submission behavior and sends the form data to the `/submit-application` endpoint using the `fetch` API. However, it sends the data as a JSON object instead of using `FormData`.

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
        // Display the response from the server
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
```

Sources: [scholarship_app/public/script.js:15-28]()

## Styling

The styling of the user interface is defined in the `style.css` file. Here are some key aspects of the styling:

### Layout

The `container` div is centered on the page using flexbox, and its maximum width is set to 600px for better readability on larger screens.

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

Sources: [scholarship_app/public/style.css:16-24]()

### Typography

The font family, sizes, colors, and line heights are defined for various elements, such as headings, paragraphs, and form labels.

```css
body {
    font-family: Arial, sans-serif;
    color: #333;
}

.header h1 {
    font-size: 48px;
    color: #5b3c88;
}

.main p, .para {
    font-size: 18px;
    color: midnightblue;
    opacity: 0.75;
}
```

Sources: [scholarship_app/public/style.css:2,28-30,36-39]()

### Form Styling

The form fields are styled with a modern and clean look. The input fields and textarea have a light background color, rounded corners, and a subtle border. The labels for the input fields are positioned absolutely and transition smoothly when the field is focused or filled.

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

Sources: [scholarship_app/public/style.css:43-50,51-59,60-70]()

### Button Styling

The submit button has a purple background color, white text, and a subtle hover effect that scales the button slightly.

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

Sources: [scholarship_app/public/style.css:71-79,80-83]()

### Background Animation

The body of the page has a subtle animated gradient background, which adds a touch of visual interest to the user interface.

```css
body {
    background: linear-gradient(-45deg, #3d7ec7, #7f91a9, #4b7c86, #ecf0ef);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
}

@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

Sources: [scholarship_app/public/style.css:4-5,84-90]()

## Conclusion

The "User Interface" component of the Fast-Fa scholarship application project provides a clean and modern form for users to input their personal and financial information. The HTML structure defines the form elements, while the CSS styles enhance the visual appearance and user experience. The JavaScript files handle form submission and client-side interactivity. The user interface is designed to be user-friendly, with clear labels, input validation, and a visually appealing layout.

Sources: [scholarship_app/public/index.html](), [scholarship_app/public/style.css](), [scholarship_app/public/form.js](), [scholarship_app/public/script.js]()