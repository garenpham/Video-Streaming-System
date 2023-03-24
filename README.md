Access to container:

```bash
kubectl apply -f db.yaml -f authentication.yaml -f shared-storage.yaml -f client.yaml -f uploads.yaml -f file-system.yaml -f nginx.yaml
```

```bash
docker exec -it video-streaming-system-db-1 /bin/bash
```

Remove all containers:

```bash
docker-compose rm -vf
```

```bash
docker-compose build --no-cache
```

```bash
mysql -u project1 -p
```

```Sql
SELECT * FROM project1.uploads;
```

```Sql
SELECT * FROM project1.users;
```

View docker local storage:

```bash
docker system df
```

Remove all build cache:

```bash
docker builder prune
```

https://github.com/bradtraversy/react_file_uploader/tree/master/client/src
