import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from 'src/jobs/schemas/job.schema';
import { Subscriber, SubscriberSchema } from 'src/subscribers/schemas/subscriber.schema';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>("EMAIL_HOST"),
          secure: false,
          auth: {
            user: configService.get<string>("EMAIL_AUTH_USERNAME"),
            pass: configService.get<string>("EMAIL_AUTH_PASSWORD"),
          },
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        preview: configService.get<string>("EMAIL_PREVIEW") === "true" ? true : false
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    MongooseModule.forFeature([{ name: Subscriber.name, schema: SubscriberSchema }])
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule { }

