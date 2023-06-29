import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}
export const ExitGuard: CanDeactivateFn<OnExit> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  // const rta = confirm('Estas seguro de salir?');
  return component.onExit ? component.onExit() : true;
};
