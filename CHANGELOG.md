v1.0.5 (2016-11-18)
======

* Instead of using random number as key. Now, we will be using the hash of the concatenation between the to-do and the time in milliseconds.

v1.0.4 (2016-11-16)
======

* Added the fallback to the traditional cursor approach when the getAll isn't supported. openCursor() was used to get cached todo from IndexedDB and list them for user.

v1.0.3 (2016-10-23)
======

* Added the service-worker.js, now, in the first load, we will be caching all the js, css, index.html file. So that, in the 2nd load, all the files will be getting from the cache. Which will improve the performance a lot. In addition, since most of our files are grab from the cache. Our web app should now work offline. That means that even if you do not have internet access, you will still be able to access the site. However, this only works if your web browser support service worker.

v1.0.2 (2016-10-15)
======

* Now, each to-do will be saved to IndexedDB for better performance as most of the operations performed using IndexedDB are done asynchronously. In case of IndexedDB not available to user, then localStorage will be used. Notice that localStorage is a synchronous API and has serious performance implications. IndexedDB should be used whenever possible.

v1.0.1 (2016-10-15)
======

* Now, each to-do will be saved to localStorage. In case of user reloads the page. User will still be able see all their to-dos.
* Remove some unused style from inline.css.

v1.0.0 (2016-10-14)
======

* User are now able to freely add new to-do to to-do list.