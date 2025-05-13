# News Crawler

A modern web application that crawls and aggregates news from various Indonesian news sources. Built with Next.js, Prisma, and Tailwind CSS.

## Features

- Crawls news from multiple Indonesian news sources
- Modern, responsive UI with dark mode support
- Dashboard showing crawling activity logs
- News page with advanced filtering capabilities
- Pagination support for both news and logs
- SQLite database for data persistence

## Requirements

- Ubuntu 20.04 LTS
- Node.js 18.x
- NPM 9.x or higher
- At least 1GB of free disk space
- Internet connection for crawling news

## Installation

### Automatic Installation (Ubuntu 20.04)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/news-crawler.git
cd news-crawler
```

2. Make the installation script executable:
```bash
chmod +x install.sh
```

3. Run the installation script:
```bash
./install.sh
```

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/news-crawler.git
cd news-crawler
```

2. Install Node.js 18.x:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

3. Install project dependencies:
```bash
npm install
```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate deploy
```

5. Build the application:
```bash
npm run build
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm run start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
news-crawler/
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Dashboard page
│   │   └── news/        # News page
│   ├── components/       # React components
│   └── lib/             # Utility functions and crawler logic
├── install.sh            # Installation script
└── package.json         # Project dependencies and scripts
```

## API Endpoints

- `POST /api/crawl` - Trigger news crawling
- `GET /api/news` - Get news with filtering and pagination
- `GET /api/dashboard` - Get crawling logs with pagination

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="file:./dev.db"
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure the SQLite database file exists
   - Check file permissions
   - Verify DATABASE_URL in .env file

2. **Crawling Issues**
   - Check internet connectivity
   - Verify news source APIs are accessible
   - Check console for specific error messages

3. **Build Errors**
   - Clear .next directory: `rm -rf .next`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`

For more issues, please check the GitHub issues page or create a new issue.
