## Please read the project report for detailed explaination about the project.

This branch is the Kubernetes development, which is continued from the main
branch that focuses on Docker deployment.

### Technologies implemented:

<img align="left" alt="Next.js" height="24px" width="24px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Tabler-icons_brand-nextjs.svg/640px-Tabler-icons_brand-nextjs.svg.png" />
<img align="left" alt="Docker" height="24px" width="24px" src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Docker_%28container_engine%29_logo_%28cropped%29.png" />
<img align="left" alt="Kubernetes" height="24px" width="24px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Kubernetes_%28container_engine%29.png/640px-Kubernetes_%28container_engine%29.png" />
<img align="left" alt="Amazon Web Services" height="24px" width="24px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/640px-Amazon_Web_Services_Logo.svg.png" />
<img align="left" alt="TypeScript" height="24px" width="24px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/640px-Typescript_logo_2020.svg.png" />
<img align="left" alt="VSCode" height="24px" width="24px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/640px-Visual_Studio_Code_1.35_icon.svg.png" />

<br/>

### Command template:

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
