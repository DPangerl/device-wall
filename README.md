# graphql-api

The default service endpoint for the kaufsBeiDir application.

# TODO

- Secure Database: Dedicated User with dedicated rights
- Collect Paths and config data within one file
- Find a better solution for file handling (cachebusting, naming etc)

## Local Setup

### Prequesits

- docker and docker-compose installed.
- docker is running

### Adding local environment

Add a file `.env` with following contents:

```
MINIO_ROOT_USER=root
MINIO_ROOT_PASSWORD=XXX

MYSQL_HOST=mysql
MYSQL_USER=kaufsbeidir
MYSQL_ROOT_PASSWORD=XXX
MYSQL_DATABASE=kaufsbeidir-dev

S3_ACCESS_KEY=root
S3_SECRET=XXX
S3_ENDPOINT=http://minio:9000
S3_BUCKET=dev-kaufsbeidir-dne
```

### Check settings

In `docker-compose.yml` check if the listed ports are usabel on your machine. Otherwise adjust them as you like.

### Build and run containers

Just `npm run docker:start` and then `npm start`.

## Npm scripts

### Logs

- Application logs `npm run docker:log`
- All logs `npm run logAll`

### Tests

- Run tests `npm test`
- Run tests in watch mode `npm run test:watch`
- Update tests `npm run test:update`

### Linting

- Run linting `npm run lint`

### Connect to the cluster database

```
kubectl port-forward mysql-service 3306:3306
```

## K8s Setup

### Create a Cluster

### Install nginx-ingres with cert-manager

https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes

### Install mysql

```
kubectl create namespace mysql
kubectl -n mysql create secret generic mysql-secrets --from-literal=ROOT_PASSWORD=''
kubectl -n mysql apply -f ./k8s/mysql/volume.yml
kubectl -n mysql apply -f ./k8s/mysql/deployment.yml
```

### Install redis

```
kubectl create namespace redis
kubectl -n redis apply -f ./k8s/redis/volume.yml
kubectl -n redis apply -f ./k8s/redis/deployment.yml
```

### Create Spaces Secret

```
kubectl create namespace do-spaces
kubectl -n do-spaces create secret generic spaces-secrets --from-literal=S3_ACCESS_KEY='' --from-literal=S3_SECRET=''
```
