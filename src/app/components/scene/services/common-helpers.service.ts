import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonHelpersService {
  constructor() {}

  get generatedId(): number {
    return Math.floor(Math.random() * 999999999999);
  }

  containsClass(element: HTMLElement, className: string): boolean {
    if (!element.parentElement) {
      return false;
    }
    return (
      element?.classList.contains(className) ||
      this.containsClass(element.parentElement, className)
    );
  }
}
