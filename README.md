# 01Pro - Vendure CRM Backend

A headless CRM/e-commerce backend built with [Vendure](https://www.vendure.io/) for managing products, customers, orders, and inventory.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MySQL 5.7+ or MariaDB

### Installation

1. **Clone and setup**
```bash
git clone <repository-url>
cd 01pro
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Start development server**
```bash
npm run dev
```

The server will start on `http://localhost:3000`
Admin UI will be available on `http://localhost:3002`

## 📁 Project Structure

```
src/
├── index.ts                 # Application entry point
├── vendure-config.ts        # Vendure configuration
├── types/
│   └── index.ts             # TypeScript type definitions
├── plugins/                 # Custom Vendure plugins
├── services/                # Business logic services
├── entities/                # Custom database entities
├── migrations/              # Database migrations
└── scripts/                 # Utility scripts (seed, etc.)
```

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm run typecheck` | Type-check without emitting files |
| `npm run migration:generate` | Generate database migrations |
| `npm run migration:run` | Run pending migrations |
| `npm run seed` | Seed database with sample data |

## 🗄️ Database

### Initial Setup

The database will be automatically synchronized on first run. For production, create migrations:

```bash
npm run migration:generate -- -n CreateInitialSchema
npm run migration:run
```

### Connection Details

Default MySQL credentials (change in `.env`):
- Host: `localhost`
- Port: `3306`
- User: `vendure`
- Password: `vendure`
- Database: `vendure`

## 📚 API Documentation

Once the server is running:
- **GraphQL Playground**: `http://localhost:3000/graphql`
- **Admin API**: `http://localhost:3000/admin`
- **Shop API**: `http://localhost:3000/shop-api`

## 🎨 Tech Stack

- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Framework**: Vendure (Headless CRM/e-commerce)
- **Database**: MySQL/MariaDB + TypeORM
- **Admin UI**: Vendure Admin UI

## 🔐 Default Credentials

**Admin Panel**:
- Email: `superadmin`
- Password: `superadmin`

⚠️ **Change these in production!**

## 📦 Key Features

- ✅ Product catalog management
- ✅ Customer profile management
- ✅ Order processing and tracking
- ✅ Inventory management
- ✅ Multi-currency & multi-language support
- ✅ GraphQL API
- ✅ Admin dashboard
- ✅ Extensible plugin system

## 🛠️ Development

### Adding Custom Plugins

Create a new file in `src/plugins/`:

```typescript
import { VendurePlugin } from '@vendure/core';

@VendurePlugin({
  imports: [],
})
export class CustomPlugin {}
```

Then register it in `vendure-config.ts`.

### Running Migrations

```bash
npm run migration:generate -- -n YourMigrationName
npm run migration:run
```

## 📖 Resources

- [Vendure Documentation](https://docs.vendure.io/)
- [GraphQL API Reference](https://docs.vendure.io/graphql-api/shop/object-types/)
- [Admin UI Plugin Docs](https://docs.vendure.io/plugins/admin-ui-plugin/)

## 📝 License

This project uses Vendure, which is available under the MIT License.

## 🤝 Support

For Vendure-specific issues, refer to the [Vendure community](https://vendure.io/community).

---

**Happy coding! 🎉**
