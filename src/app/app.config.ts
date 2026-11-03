import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  phosphorArrowDownRightLight,
  phosphorArrowRightLight,
  phosphorArrowUpRightLight,
  phosphorCheckLight,
  phosphorCodeLight,
  phosphorDatabaseLight,
  phosphorEnvelopeSimpleLight,
  phosphorGearLight,
  phosphorGithubLogoLight,
  phosphorLinkedinLogoLight,
  phosphorMapPinLight,
  phosphorMoonLight,
  phosphorPhoneLight,
  phosphorStackLight,
  phosphorSunLight,
  phosphorWarningCircleLight,
} from '@ng-icons/phosphor-icons/light';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // Only the icons actually used are bundled. No icon font, no runtime fetch.
    provideIcons({
      phosphorArrowDownRightLight,
      phosphorArrowRightLight,
      phosphorArrowUpRightLight,
      phosphorCheckLight,
      phosphorCodeLight,
      phosphorDatabaseLight,
      phosphorEnvelopeSimpleLight,
      phosphorGearLight,
      phosphorGithubLogoLight,
      phosphorLinkedinLogoLight,
      phosphorMapPinLight,
      phosphorMoonLight,
      phosphorPhoneLight,
      phosphorStackLight,
      phosphorSunLight,
      phosphorWarningCircleLight,
    }),
  ],
};
