# test-case

This component is based on the blueprint of Veams-Components.

## Usage

### Include: Page

``` hbs
{{! @INSERT :: START @type: template, @id: test-partial, @tag: component }}
{{#with test-case-bp}}
	{{> c-test-case}}
{{/with}}
/* @INSERT :: END */
```

### Include: SCSS

``` scss
/* @INSERT :: START @type: template, @id: scss-import */ 
@import "components/_c-test-case";
/* @INSERT :: END */

```

### Include: JavaScript

#### Import
``` js
/*** @INSERT :: START @type: template, @id: js-import */
import TestCase from './modules/test-case/test-case';
/*** @INSERT :: END */
```

#### Initializing
``` js
/*** @INSERT :: START @type: template, @id: js-init-v3 */
/**
 * Init TestCase
 */
Helpers.loadModule({
	el: '[data-js-module="test-case"]',
	module: TestCase,
	context: context
});
/*** @INSERT :: END */
```

#### Test
``` js
/*** @INSERT :: START @type: template, @id: test-case */
import TestCase from './modules/test-case/test-case';
/*** @INSERT :: END */
```