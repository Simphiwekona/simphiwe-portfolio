import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  type AbstractControl,
  type ValidationErrors,
} from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { ContactService } from '../../core/contact.service';
import { PROFILE } from '../../core/content';
import { RevealDirective } from '../../core/reveal.directive';
import { ScrollSpyService } from '../../core/scroll-spy.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, NgIcon, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly profile = PROFILE;
  protected readonly contact = inject(ContactService);

  private readonly scrollSpy = inject(ScrollSpyService);

  private readonly fb = inject(FormBuilder);

  protected readonly submitted = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: [
      '',
      [Validators.required, Validators.minLength(20), Validators.maxLength(2000)],
    ],
    // Honeypot: real people never fill this. Bots do.
    company: [''],
  });

  protected readonly year = new Date().getFullYear();

  /** Show a field error only after the user has touched or submitted. */
  protected showError(control: AbstractControl): boolean {
    return control.invalid && (control.touched || this.submitted());
  }

  protected errorFor(control: AbstractControl, label: string): string {
    const errors: ValidationErrors | null = control.errors;
    if (!errors) {
      return '';
    }
    if (errors['required']) {
      return `${label} is required.`;
    }
    if (errors['email']) {
      return 'That does not look like a valid email address.';
    }
    if (errors['minlength']) {
      const required = errors['minlength'].requiredLength as number;
      const actual = errors['minlength'].actualLength as number;
      return `${label} needs at least ${required} characters. You have ${actual}.`;
    }
    if (errors['maxlength']) {
      return `${label} is too long.`;
    }
    return `${label} is not valid.`;
  }

  protected async onSubmit(): Promise<void> {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.focusFirstInvalid();
      return;
    }

    // Honeypot tripped: silently succeed and drop it.
    if (this.form.controls.company.value) {
      return;
    }

    const { name, email, subject, message } = this.form.getRawValue();
    const ok = await this.contact.submit({ name, email, subject, message });

    if (ok) {
      this.form.reset();
      this.submitted.set(false);
    }
  }

  protected reset(): void {
    this.form.reset();
    this.submitted.set(false);
    this.contact.reset();
  }

  protected scrollToTop(event: Event): void {
    this.scrollSpy.scrollTo('home', event);
  }

  private focusFirstInvalid(): void {
    const firstInvalid = document.querySelector<HTMLElement>(
      'form [aria-invalid="true"]',
    );
    firstInvalid?.focus();
  }
}
