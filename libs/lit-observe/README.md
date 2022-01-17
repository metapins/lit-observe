# lit-observe

lit-observe is a lit-html library for to display observables like rxjs or redux.
This library was generated with [Nx](https://nx.dev).

It tested with :
- [rxjs](https://rxjs.dev/): Reactive Extensions Library for JavaScript
- [lit](https://lit.dev/): Simple. Fast. Web Components.
- [aframe-element](https://github.com/metapins/aframe-element): Simple library for building fast, lightweight web components for 3D development.

## Installation

Use the package manager [npm](https://www.npmjs.com/package/@metapins/lit-observe) to install lit-observe.

```bash
npm install @metapins/lit-observe
```

## Usage

### Simple usage

```typescript
import { observe } from '@metapins/lit-observe';

// ...
title$ = of('Hello World');

render() {
  return html`
<h1>${observe(this.title$)}</h1>
  `;
}
```

### With callback
```typescript
import { observe } from '@metapins/lit-observe';

// ...
list$ = of([
  { title: 'todo 1' },
  { title: 'todo 2' },
]);

render() {
  return html`
<ul>
  ${observe(this.list$, (list) => list.map((item) => html`
    <li>${item.title}</li>
  `))}
</ul>
  `;
}
```

## Example
### Todo-list with rxjs
- Demo: https://lit-observe-rxjs-example.herokuapp.com/
- Source code: https://github.com/metapins/lit-observe/blob/master/apps/rxjs-example/src/app/app.element.ts

## Building

Run `nx build lit-observe` to build the library.

## Running unit tests

Run `nx test lit-observe` to execute the unit tests via [Jest](https://jestjs.io).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
