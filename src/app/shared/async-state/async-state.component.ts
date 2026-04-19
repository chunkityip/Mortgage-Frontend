import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { RequestState } from '../state/request-state';

@Component({
  selector: 'app-async-state',
  templateUrl: './async-state.component.html',
  styleUrls: ['./async-state.component.scss'],
})
export class AsyncStateComponent<T> {
  @Input() state: RequestState<T> | null = null;

  @ContentChild('loading', { static: false }) loadingTpl?: TemplateRef<unknown>;
  @ContentChild('error',   { static: false }) errorTpl?:   TemplateRef<{ $implicit: string }>;
  @ContentChild('success', { static: false }) successTpl?: TemplateRef<{ $implicit: T }>;

  get data(): T | undefined {
    return this.state?.status === 'success' ? this.state.data : undefined;
  }

  get errorMessage(): string | undefined {
    return this.state?.status === 'error' ? this.state.error : undefined;
  }
}
