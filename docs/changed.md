## changed

Called whenever there was a change on the db _only_ if the instance
has a property `journal` otherwise there this method won't be called.

### spec

```js
function changed(string method, object change, object doc)
```

_arguments_
 - `method` type string, method that maked the change
 - `change` type object, change performed on document
 - `doc` type object, document to be changed
