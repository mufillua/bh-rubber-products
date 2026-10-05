import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { WhatsappButton } from '../enquiry-buttons/enquiry-buttons';
import { SegmentRing } from '../segment-ring/segment-ring';

@Component({
  selector: 'bh-cta-section',
  imports: [RouterLink, WhatsappButton, SegmentRing, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section cta-wrap" aria-labelledby="cta-title">
      <div class="container">
        <div class="cta" bhReveal>
          <div class="ring"><bh-segment-ring /></div>
          <div class="content">
            <h2 id="cta-title">{{ heading() }}</h2>
            <p>{{ text() }}</p>
            <div class="actions">
              <a class="btn btn--primary" routerLink="/contact">Get A Quote</a>
              <bh-whatsapp-button label="Chat on WhatsApp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './cta-section.scss',
})
export class CtaSection {
  readonly heading = input('Looking for the right industrial product?');
  readonly text = input('Tell us what you need and our team can help you find the right product.');
}
