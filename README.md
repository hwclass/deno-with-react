# Deno + (Isomorphic) React

![Alt text](assets/deno-with-react.png?raw=true "Deno with React")
## Install (with Docker)

- Go install [Docker](https://docs.docker.com/get-docker/).

## Run (with Docker)

```sh
docker compose -f docker-compose.yml build
```

```sh
docker compose up
# then please go check for http://localhost:8000
```

## Install (without Docker)

### Install Deno

- [https://deno.land/manual@v1.28.1/getting_started/installation](https://deno.land/manual@v1.28.1/getting_started/installation)

### Install Yarn

- [https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## Run (without Docker)

```sh
yarn run start:clean
```

### Test (with Docker)

```sh
docker build -t deno-with-react --target test .
```

### Test (without Docker)

```sh
yarn run test
# then please go check for the screenshot
# with the name "deno-with-react" from /assets/ directory
```

### Technical Considerations

- [Deno](https://deno.land/manual@v1.28.1/introduction) (with Typescript)

As Deno as a new runtime with a first-class support for Typescript, it is thought to be chosen as the primary selection for a better experience without having any hassle like a Typescript configuration in a regular setup. That's also valuable to consider that Deno is kinda plug & play runtime which allows us to choose whatever client-side library, like React.

- [Isomorphic SPA](https://www.oreilly.com/library/view/building-isomorphic-javascript/9781491932926/ch01.html)

That's basically for getting the Time-to-First-Byte (TTFB) faster than a regular Single-Page Application. Again, due to the loading & executing of the client-side Javascript, there is always a gap to get the app interactive, but at least, until that time (during the first ~800ms - 1.5 sec.), the user can see the app appears within the browser. That will also let us keep staying & waiting the app gets interactive. That approach also helps for SEO which means the app is crawlable via search engine bots.

There are two sides of the application itself: __Server-side__ & the __Client-side__.

Server-side is containing 2 (two) endpoints like the following:

`/` => the home URL which responds with the actual implementation itself
`assets/:path` => the static assets directory for serving `client.js` (the actual bundle for having the app running within the client-side and gets active => `http://localhost:8000/assets/client.js`) & `style.css` for styles.


- [Docker](https://docs.docker.com/get-started/overview/) (with [Docker Compose](https://docs.docker.com/compose/))

Having sanitized environments may be critical regarding running applications without side effects and specific environment configurations based on where the app runs within. So preferred a simple setup to run the service itself via Docker. I've added Docker Compose as assuming that in the future iterations, developer may prefer to separate the tests over Docker (Compose) setup.

- 8-bit Design (with [NES.css](https://nostalgic-css.github.io/NES.css/))

Just to make it look fancy. Hope it doesn't hurt the eyes staring at ;)

### Potential Improvements

- Tests can be improved.

Recently we're running the a headless browser to take the screenshot of the application with the foundation of the test suite itself. A set of rules (eg. "Once I click on the first checkbox & the last checkbox, the selected items text to be updated to '0, 2' and the total selected items text to be updated as '2'")

- The app can become more dynamic with HTTP POST support.

The app itself has designed to also accept POST requests as once the payload from such request can be taken and to be used to struct the table from the server-side, too, as we're also supporting for Server-Side Rendering with an isomorphic approach. So an example can create a table over payload from a POST request like the following:

```sh
curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "test", "email": "test@example.com"}' \
    http://localhost:8000/
```

- Docker setup can be more flexible.
Recently, we have a setup to let the user (developer) to run the app & the test separately (as commented within the respective Dockerfile). That can be activated & extended into a more granular structure to have them run synchronously on every time the code is changed for a better development experience.

- The can can be deployed to & served from an edge CDN.
As we have the opportunity today to get the app served from a CDN (at least the client-side code bundle), then the TTB would be faster due to the nature of CDNs located within an edge network based on serving content from a nearer location.

- CI/CD can be automated better via Github Actions

Once the tests are introduced, as it will be easier to differentiate the processes, it will help for deployment purposes, too, via Github Actions for a granular transition from the code to 'live' as production.
