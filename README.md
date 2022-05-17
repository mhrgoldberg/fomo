# Fear Of Missing Out(FOMO) - A classroom attendance app

## Tech Used

FOMO is a **TypeScript** app running on top of **Node.js**. We are using **Next.js** as our web framework.
**React.js** is handling our frontend templating and we are using Next.js' built in API routes to
handle our servers JSON responses. Our data layer is built using **PostgreSQL** and **Prisma**.

## Development tools

This project uses **ESLint** and **Prettier** to enforce code style and linting and formatting commands
are run in a git pre-commit hook using **Husky**. In order to use this tool with your local VSCode
source control you can add a `~.huskyrc` with the following contents:

```bash
# ~/.huskyrc
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Setting up the project in Development

1. Set up `.env` file with a:

   ```bash
   DATABASE_URL=postgresql://<db_user>:<db_password>@<db_name>
   CLOUDINARY_URL=<cloudinary_api_url>
   ```

2. Run `npm install`
3. Run `npx prisma db migrage`
4. Run `npx prism db seed`
5. Run `npm run dev`

## Deployment

FOMO is currently protected and cached on **Cloudflare**. Sitting behind Cloudflare we have a
**Caddy** serving as a reverse proxy in front of our app as well as providing ssl certification.
Our production build app is running in a **Docker** container networked to a postgres container
using **Docker-Compose**.

To deploy this app:

1. Setup server with a reverse proxy in front of port 8002
2. Git pull application to server in the `srv` folder
3. `cd` into the application folder
4. Create a `.env.production` containing:

   ```bash
    SECRET_KEY=<secret_key>
    DATABASE_URL=postgresql://<db_user>:<db_password>@<db_name>
    CLOUDINARY_URL=<cloudinary_api_url>
   ```

5. Create a `.env.production.db` containing:

   ```bash
   POSTGRES_USER=postgres
   POSTGRES_DB=postgres
   POSTGRES_PASSWORD=postgres
   ```

6. Create and seed database:

   1. run `docker-compose -f docker-compose-db-setup.yml build`
   2. run `docker-compose -f docker-compose-db-setup.yml up`

7. Build production app:

   1. run `docker-compose build`
   2. run `docker-compose up`

8. Prosper!
