import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../core/config/company.config';
import { CatalogService } from '../../core/services/catalog.service';
import { EnquiryService } from '../../core/services/enquiry.service';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'bh-footer',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly company = COMPANY;
  readonly enquiry = inject(EnquiryService);
  private readonly catalog = inject(CatalogService);
  readonly categories = (
    ['cut-resistant-gloves', 'drivers-gloves', 'canadian-gloves', 'welders-gloves', 'coveralls', 'flanges'] as const
  ).map((slug) => this.catalog.getCategory(slug)!);
  readonly year = new Date().getFullYear();

  readonly quickLinks = [
    { label: 'Products', path: '/products' },
    { label: 'Categories', path: '/categories' },
    { label: 'About Us', path: '/about' },
    { label: 'Get A Quote', path: '/contact' },
  ];
}
