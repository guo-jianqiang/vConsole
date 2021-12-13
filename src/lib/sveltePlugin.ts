import VConsolePlugin from './plugin';
import { SvelteComponent } from 'svelte';

export class VConsoleSveltePlugin<T extends {} = {}> extends VConsolePlugin {
  CompClass: typeof SvelteComponent;
  compInstance?: SvelteComponent;
  initialProps: T;

  constructor(
    id: string,
    name: string,
    CompClass: typeof SvelteComponent,
    initialProps: T
  ) {
    super(id, name);
    this.CompClass = CompClass;
    this.initialProps = initialProps;
    console.log('VConsoleSveltePlugin constructor', id);
  }

  onReady() {
    this.isReady = true;
  }

  onRenderTab(callback) {
    const $container = document.createElement('div');
    this.compInstance = new this.CompClass({
      target: $container,
      props: this.initialProps,
    });
    callback($container.firstElementChild);
  }

  onRemove() {
    if (this.compInstance) {
      this.compInstance.$destroy();
    }
  }

}
