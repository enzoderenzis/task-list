# TrueNorth Challenge
## _DOCKER_ for Client side
Execute the follow commands in **client** directory:

- Build
```
docker build . -t client-side
```
- Deploy
```
docker run --name client-side -p 5000:5000 --env SERVER_URL=http://localhost:3000 -d client-side
```

## Features

- list task
- mask task as completed
- switch between fake api and db api
