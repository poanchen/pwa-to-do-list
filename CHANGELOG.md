v1.0.2 (2016-10-15)
======

* Now, each to-do will be saved to IndexedDB for better performance as most of the operations performed using IndexedDB are done asynchronously. In case of IndexedDB not available to user, then localStorage will be used. Notice that localStorage is a synchronous API and has serious performance implications. IndexedDB should be used whenever possible!

v1.0.1 (2016-10-15)
======

* Now, each to-do will be saved to localStorage. In case of user reloads the page. 
User will still be able see their all their to-dos.
* Remove some unused style from inline.css.

v1.0.0 (2016-10-14)
======

* User now able to freely add new to-do to to-do list.