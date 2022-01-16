/** css/html from https://bbbootstrap.com/snippets/awesome-todo-list-template-25095891 */
import { observe } from '@metapins/lit-observe';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';

interface IItem {
  id: string;
  completed: boolean;
  title: string;
}

@customElement('rxjs-example')
export class RxjsExampleElement extends LitElement {
  private title$ = new BehaviorSubject<string>('');
  private list$ = new BehaviorSubject<IItem[]>([]);
  private count$ = this.list$.pipe(map((list) => list.length));

  private async removeItem(id: string) {
    const list = await firstValueFrom(this.list$);
    this.list$.next(list.filter((item) => item.id !== id));
  }

  private async addItem(title: string) {
    const list = await firstValueFrom(this.list$);
    const item: IItem = {
      id: nanoid(),
      completed: false,
      title,
    };
    this.list$.next([...list, item]);
    this.title$.next('');
  }

  private async updateItem(completed: boolean, id: string) {
    const list = await firstValueFrom(this.list$);
    this.list$.next(
      list.map((item) => (item.id === id ? { ...item, completed } : item))
    );
  }

  override createRenderRoot() {
    return this;
  }

  override render(): TemplateResult {
    return html`
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-md-12">
              <div class="card px-3">
                <div class="card-body">
                  <h4 class="card-title">
                    Awesome Todo list with ${observe(this.count$)} items
                  </h4>
                  <div class="add-items d-flex">
                    <input
                      type="text"
                      class="form-control todo-list-input"
                      placeholder="What do you need to do today?"
                      .value=${observe(this.title$)}
                      @input=${(event) =>
                        this.title$.next(event.srcElement.value)}
                    />
                    <button
                      class="add btn btn-primary font-weight-bold todo-list-add-btn"
                      @click=${() => this.addItem(this.title$.getValue())}
                    >
                      Add
                    </button>
                  </div>
                  <div class="list-wrapper">
                    <ul class="d-flex flex-column-reverse todo-list">
                      ${observe(this.list$, (list) =>
                        list.map(
                          (item) => html`
                            <li class=${item.completed ? 'completed' : ''}>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    class="checkbox"
                                    type="checkbox"
                                    ?checked=${item.completed}
                                    @input=${(event) =>
                                      this.updateItem(
                                        event.srcElement.checked,
                                        item.id
                                      )} />
                                  ${item.title} <i class="input-helper"></i
                                ></label>
                              </div>
                              <i
                                class="remove mdi mdi-close-circle-outline"
                                @click=${() => this.removeItem(item.id)}
                              ></i>
                            </li>
                          `
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
