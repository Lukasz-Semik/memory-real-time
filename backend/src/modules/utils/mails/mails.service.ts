import { Injectable } from '@nestjs/common';
import { MailData } from '@sendgrid/helpers/classes/mail';
import * as sgMail from '@sendgrid/mail';

import { EnvService } from '../env/env.service';

@Injectable()
export class MailsService {
  private baseUrlDev = 'http://localhost:3000';
  private apiKey = this.envService.get<string>('SENDGRID_API_KEY');

  constructor(private envService: EnvService) {}

  private setApiKey() {
    sgMail.setApiKey(this.apiKey);
  }

  private sendEmail(msg: MailData & { html: string }) {
    if (!this.envService.isTest()) {
      // tslint:disable no-console
      sgMail.send(msg).catch(err => console.log(err));
    }
  }

  public sendAccountConfirmationEmail(
    email: string,
    userName: string,
    token: string
  ): void {
    this.setApiKey();

    const msg = {
      to: email,
      from: 'memory-real-time@support.com',
      subject: 'Memory real time - account confirmation',
      html: `
        <h3>Hello ${userName}</h3>
        <p>
          Please confirm your account by visiting
          <a href='${this.baseUrlDev}/confirm?token=${token}' target="_blank">
            this page
          </a>
        </p>
      `,
    };

    this.sendEmail(msg);
  }
}
