import {
  DefaultJobQueuePlugin,
  DefaultSchedulerPlugin,
  DefaultSearchPlugin,
  dummyPaymentHandler,
  VendureConfig,
} from '@vendure/core';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { EmailPlugin, FileBasedTemplateLoader, defaultEmailHandlers } from '@vendure/email-plugin';
import { GraphiqlPlugin } from '@vendure/graphiql-plugin';
import 'dotenv/config';
import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';
const serverPort = +(process.env.PORT ?? 3000);

export const config: VendureConfig = {
  apiOptions: {
    port: serverPort,
    adminApiPath: 'admin-api',
    shopApiPath: 'shop-api',
    trustProxy: IS_DEV ? false : 1,
    ...(IS_DEV
      ? {
          adminApiDebug: true,
          shopApiDebug: true,
          adminApiPlayground: { settings: { 'request.credentials': 'include' } },
          shopApiPlayground: { settings: { 'request.credentials': 'include' } },
        }
      : {}),
    cors: {
      origin: [
        'http://localhost:3001',
        'http://localhost:3000',
        process.env.STOREFRONT_URL ?? 'http://localhost:3001',
      ],
      credentials: true,
    },
  },

  authOptions: {
    tokenMethod: ['bearer', 'cookie'],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME ?? 'superadmin',
      password: process.env.SUPERADMIN_PASSWORD ?? 'superadmin',
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET ?? 'atelier-groupe-dev-secret',
    },
  },

  dbConnectionOptions: {
    type: 'postgres',
    synchronize: false,
    migrations: [path.join(__dirname, '../migrations/*.+(js|ts)')],
    logging: IS_DEV,
    host: process.env.DB_HOST ?? 'localhost',
    port: +(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME ?? 'vendure',
    username: process.env.DB_USERNAME ?? 'vendure',
    password: process.env.DB_PASSWORD ?? 'vendure_dev_password',
  },

  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },

  // ============================================================
  // ATELIER GROUPE — Custom Fields
  // These extend Vendure's default schema with brand-specific data.
  // After adding/changing custom fields, run: npm run migrate
  // ============================================================
  customFields: {
    Product: [
      {
        name: 'fabricComposition',
        type: 'string',
        label: [{ languageCode: 'en', value: 'Fabric Composition' }],
        description: [{ languageCode: 'en', value: 'e.g. 85% Super 150s Wool, 15% Mulberry Silk' }],
      },
      {
        name: 'careInstructions',
        type: 'string',
        label: [{ languageCode: 'en', value: 'Care Instructions' }],
      },
      {
        name: 'madeIn',
        type: 'string',
        label: [{ languageCode: 'en', value: 'Made In' }],
        description: [{ languageCode: 'en', value: 'e.g. Crafted in Naples, Italy' }],
      },
      {
        name: 'tailoringTime',
        type: 'string',
        label: [{ languageCode: 'en', value: 'Tailoring Time' }],
        description: [{ languageCode: 'en', value: 'e.g. 3–4 weeks for made-to-measure' }],
      },
      {
        name: 'fittingType',
        type: 'string',
        options: [
          { value: 'slim', label: [{ languageCode: 'en', value: 'Slim' }] },
          { value: 'regular', label: [{ languageCode: 'en', value: 'Regular' }] },
          { value: 'relaxed', label: [{ languageCode: 'en', value: 'Relaxed' }] },
        ],
        label: [{ languageCode: 'en', value: 'Fitting Type' }],
      },
      {
        name: 'weightGsm',
        type: 'int',
        label: [{ languageCode: 'en', value: 'Fabric Weight (GSM)' }],
      },
      {
        name: 'liningComposition',
        type: 'string',
        label: [{ languageCode: 'en', value: 'Lining Composition' }],
      },
      {
        name: 'constructionNotes',
        type: 'text',
        label: [{ languageCode: 'en', value: 'Construction Notes' }],
      },
    ],

    Customer: [
      {
        name: 'vipTier',
        type: 'string',
        defaultValue: 'DISCOVERY',
        options: [
          { value: 'DISCOVERY', label: [{ languageCode: 'en', value: 'Discovery' }] },
          { value: 'MAISON', label: [{ languageCode: 'en', value: 'Maison' }] },
          { value: 'ATELIER', label: [{ languageCode: 'en', value: 'Atelier' }] },
          { value: 'BESPOKE', label: [{ languageCode: 'en', value: 'Bespoke' }] },
        ],
        label: [{ languageCode: 'en', value: 'VIP Tier' }],
      },
      {
        name: 'clientAdvisorId',
        type: 'string',
        label: [{ languageCode: 'en', value: 'Client Advisor ID' }],
        nullable: true,
      },
      {
        name: 'preferredAtelier',
        type: 'string',
        label: [{ languageCode: 'en', value: 'Preferred Atelier' }],
        nullable: true,
      },
      {
        name: 'totalLifetimeSpend',
        type: 'int',
        defaultValue: 0,
        label: [{ languageCode: 'en', value: 'Total Lifetime Spend (cents)' }],
      },
      // Tailoring profile
      {
        name: 'chestCm',
        type: 'float',
        label: [{ languageCode: 'en', value: 'Chest (cm)' }],
        nullable: true,
      },
      {
        name: 'waistCm',
        type: 'float',
        label: [{ languageCode: 'en', value: 'Waist (cm)' }],
        nullable: true,
      },
      {
        name: 'hipsCm',
        type: 'float',
        label: [{ languageCode: 'en', value: 'Hips (cm)' }],
        nullable: true,
      },
      {
        name: 'shouldersCm',
        type: 'float',
        label: [{ languageCode: 'en', value: 'Shoulders (cm)' }],
        nullable: true,
      },
      {
        name: 'sleeveLengthCm',
        type: 'float',
        label: [{ languageCode: 'en', value: 'Sleeve Length (cm)' }],
        nullable: true,
      },
      {
        name: 'inseamCm',
        type: 'float',
        label: [{ languageCode: 'en', value: 'Inseam (cm)' }],
        nullable: true,
      },
      {
        name: 'heightCm',
        type: 'float',
        label: [{ languageCode: 'en', value: 'Height (cm)' }],
        nullable: true,
      },
      {
        name: 'tailoringNotes',
        type: 'text',
        label: [{ languageCode: 'en', value: 'Tailoring Notes' }],
        nullable: true,
      },
    ],
  },

  plugins: [
    GraphiqlPlugin.init(),

    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
      assetUrlPrefix: IS_DEV ? undefined : 'https://cdn.ateliergroupe.com/assets/',
    }),

    DefaultSchedulerPlugin.init(),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),

    EmailPlugin.init({
      devMode: IS_DEV,
      outputPath: path.join(__dirname, '../static/email/test-emails'),
      route: 'mailbox',
      handlers: defaultEmailHandlers,
      templateLoader: new FileBasedTemplateLoader(
        path.join(__dirname, '../static/email/templates')
      ),
      globalTemplateVars: {
        fromAddress: '"ATELIER GROUPE" <maison@ateliergroupe.com>',
        verifyEmailAddressUrl: `${process.env.STOREFRONT_URL ?? 'http://localhost:3001'}/verify`,
        passwordResetUrl: `${process.env.STOREFRONT_URL ?? 'http://localhost:3001'}/password-reset`,
        changeEmailAddressUrl: `${process.env.STOREFRONT_URL ?? 'http://localhost:3001'}/verify-email-address-change`,
      },
    }),
  ],
};
