# hon-translate-resource
Translate massive mesh file through google translate

Installation
------------

```bash
$ npm install
```

Usage
-----

```bash
$ npm start
```

Options
-------

| Variable        | Description    |
|-----------------|----------------|
| `APIKEY`        | `required` google translate API Key
| `INPUT`         | input file (default ressource/test.txt)
| `OUTPUT`        | output file (default ressource/out.txt)
| `SCORE`         | strip Mesh score & concat (default false)
| `STRICT`        | die if any error occurs (default false)


Developers
----------

* Cédric FROSSARD <adrion.dev@gmail.com>

License
-------

Copyright (C) 2016 Health On the Net

This program is distributed under the MIT License.