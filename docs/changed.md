## changed

Function called before any `insert`, `update` and `remove` .
Should be set manually since its only stored on the `prototype`
and or your instance.

```js
var db = new Mase('name', [1,2,3]);

db.changed = function(method, newDoc, oldDoc){
  switch(method){
    case 'insert':
      // call your websockets, etc.
    break;
    // etc
    default:
      return ;
    break;
  }
}
```

The `oldDoc` and `newDoc` are passed just before the change is done
 so beware to not mutate them. If you pass them to another function on the
 same process I would highly-super-obnoxiously tell you to clone them.
 If you are using this as is plotted above (for websocket action, etc.)
 it would be fine.

### spec

```js
function changed(string method, object newDoc, object oldDoc)
```

_arguments_
 - `method` type string, method that maked the change
 - `newDoc` type object, change performed on document
 - `oldDoc` type object, document to be changed
