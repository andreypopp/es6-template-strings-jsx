# ES6 JSX-Tagged Template Strings to JS transform

This is a syntax transform which transforms ES6 JSX-Tagged Template Strings to
JS. For example:

    var element = jsx`
      <p>
        Hello, ${name}!
      </p>
    `;

is being transformed into:

    var element = React.createElement('p',
      'Hello, ', name
    );

## Installation

    % npm install es6-template-strings-jsx

## Using with Webpack

Webpack loader is included as `es6-template-strings-jsx/loader`.
