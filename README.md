### Please read the project report for detailed explaination about the project.

Access to container:

```bash
kubectl apply -f db.yaml -f configmaps.yaml -f authentication.yaml -f shared-storage.yaml -f nginx.yaml -f file-system.yaml -f client.yaml
```

```bash
kubectl apply -f db.yaml -f shared-storage.yaml -f nginx.yaml
```

```bash
kubectl apply -f client.yaml
```

```bash
kubectl apply -f configmaps.yaml -f authentication.yaml
```

```bash
kubectl apply -f file-system.yaml
```

```bash
aws eks update-kubeconfig --region <region-code> --name <my-cluster>
```

```bash
kubectl delete -f db.yaml -f authentication.yaml -f shared-storage.yaml -f nginx.yaml -f file-system.yaml -f client.yaml
```

```bash
kubectl exec -it <podId> -- /bin/bash
```

```bash
kubectl config get-contexts
kubectl config use-context docker-desktop
```

Docker:

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
