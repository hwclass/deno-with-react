FROM denoland/deno as base

FROM base as web
WORKDIR /app
EXPOSE 8080
ADD . /app
RUN deno cache server.tsx
ENTRYPOINT ["deno"]
CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "server.tsx", "-c", "deno.json"]