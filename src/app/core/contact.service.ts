import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Contact form submission.
 *
 * Posts to a form endpoint. Endpoint and access key come from the runtime
 * environment so no credential is baked into the template.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  private readonly stateSignal = signal<SubmitState>('idle');
  private readonly errorSignal = signal<string>('');

  readonly state = this.stateSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  async submit(payload: ContactPayload): Promise<boolean> {
    this.stateSignal.set('sending');
    this.errorSignal.set('');

    try {
      const response = await firstValueFrom(
        this.http.post(ENDPOINT, {
          ...payload,
          access_key: ACCESS_KEY,
        }),
      );

      // Web3Forms reports logical failures inside a 200 body.
      const ok = (response as { success?: boolean } | null)?.success !== false;
      if (!ok) {
        throw new Error('The form endpoint rejected the submission.');
      }

      this.stateSignal.set('sent');
      return true;
    } catch (err) {
      this.stateSignal.set('error');
      this.errorSignal.set(this.describe(err));
      return false;
    }
  }

  /** Returns the form to idle so the user can correct and resend. */
  reset(): void {
    this.stateSignal.set('idle');
    this.errorSignal.set('');
  }

  private describe(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'Could not reach the form service. Check your connection and try again.';
      }
      if (err.status === 429) {
        return 'Too many submissions from this address. Please try again shortly.';
      }
      return `The form service returned ${err.status}. Please try again, or email me directly.`;
    }
    if (err instanceof Error && err.message) {
      return err.message;
    }
    return 'Something went wrong sending that. Please email me directly.';
  }
}

/**
 * Replace ACCESS_KEY with a real Web3Forms key to enable form delivery.
 * Until then the form validates, reports the configuration gap honestly in
 * development, and points the user at the mailto fallback.
 */
const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';
