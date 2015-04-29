## insert

Insert a new document. When `document` is not a plain object,
i.e. `'one', 1, etc.`, it will be inserted using its value.

```js
db.insert(1); // => {value: 1, _id: 'wZy7rd33Q8478pvi'}
```

### spec
```js
function insert(object|any document)
```

_arguments_
 - `document` type object or any, element to insert.

_defaults_
 - `document._id` to a 24 length random string

_returns_ a clone of the inserted `document`
