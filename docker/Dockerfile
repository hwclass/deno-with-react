FROM denoland/deno

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN deno cache server.tsx

CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--no-check", "server.tsx", "-c", "deno.json"]