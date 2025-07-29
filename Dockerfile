FROM enricoadi/simple-tuwiter:latest
EXPOSE 3000

ENTRYPOINT ["/bin/sh", "-c", "node server.js"]