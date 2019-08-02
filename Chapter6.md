## Deploy Microservices application on AKS cluster
In the last chapter, we have created the AKS cluster on Azure. In this chapter, we will be deploying our microservices in the AKS cluster.
#### Prerequisites
+ Azure CLI 2.0
+ Azure Subscription
+ Kubernetes CLI (kubectl.exe)
+ Docker Hub account

### Connect to the AKS cluster
1. In the previous chapter we have created the AKS cluster using the Azure CLI. You can connect to the AKS cluster using the CLI. Run the following command to login to the Azure subscription if not logged in.
    > $ az login

    Consider we have used the  following values in the previous chapter
    
    |Resource           | Name/Value      |
    |-------------------| ----------------|
    | Resource Group    | K8SGroup        |
    | AKS Cluster       | k8scluster      |
    | Location          | southeastasia   |
    | Kubernetes version| 1.13.5          |
    | VNET              | K8sVnet         |
    | Subnet            | k8ssubnet       |

2. Download the `kubectl` tool using tfollowing command.
    > $ az aks install-cli
3. To configure `kubectl` to connect to your Kubernetes cluster, you need to authenticate to the AKS cluster you have created. Run the following command to configure the `kubectl` to connect to the cluster.
    > $ az aks get-credentials -g K8SGroup -n k8scluster
4. You can now use the `kubectl` tool to connect to the AKS cluster. Use the following command to list the nodes in your cluster.
    > $ kubectl get nodes
    ```
    λ kubectl get nodes
    NAME                       STATUS    ROLES     AGE       VERSION
    aks-nodepool1-19933803-0   Ready     agent     4h        v1.13.5
    aks-nodepool1-19933803-1   Ready     agent     4h        v1.13.5
    aks-nodepool1-19933803-2   Ready     agent     4h        v1.13.5
    ```
### Deploy `SQL Server` instance
1. Open VS Code and set `K8S-Microservices` as your current working folder.
2. Create a new folder `k8s-yaml` in the root directory.
3. You need to deploy the `Sql Server` container in the cluster. You configure a SQL Server instance on Kubernetes in Azure Kubernetes Service (AKS), with persistent storage for high availability (HA). If the SQL Server instance fails, Kubernetes automatically re-creates it in a new pod. Kubernetes 1.6 and later has support for storage classes, persistent volume claims, and the Azure disk volume type. When a SQL Server instance in a container fails, the orchestrator bootstraps another instance of the container that attaches to the same persistent storage.
![SqlServer HA Instance](https://docs.microsoft.com/en-us/sql/linux/media/tutorial-sql-server-containers-kubernetes/kubernetes-sql.png?view=sql-server-2017)
If the cluster node fails, Kubernetes creates a new instance in another node and attach the same `Persistent Volume` to the new instance. 
![Sql Server node failure](https://docs.microsoft.com/en-us/sql/linux/media/tutorial-sql-server-containers-kubernetes/kubernetes-sql-after-node-fail.png?view=sql-server-2017)
4. Create a new yaml confiuration file with the name `sqlserver-pvc.yaml` in the `k8s-yaml` folder.
5. Add the following code to the file. 
    ```
    kind: StorageClass
    apiVersion: storage.k8s.io/v1beta1
    metadata:
      name: azure-disk
    provisioner: kubernetes.io/azure-disk
    parameters:
      storageaccounttype: Standard_LRS
      kind: Managed
    ---
    kind: PersistentVolumeClaim
    apiVersion: v1
    metadata:
      name: mssql-data
      annotations:
        volume.beta.kubernetes.io/storage-class: azure-disk
    spec:
      accessModes:
      - ReadWriteOnce
      resources:
        requests:
          storage: 8Gi
    ```
    The above yaml defines a `storage class` and `persistent volume claim`. The storage class provisioner is `azure-disk`, because this Kubernetes cluster is in Azure. The storage account type is `Standard_LRS`. The persistent volume claim is named `mssql-data`. The persistent volume claim metadata includes an annotation connecting it back to the storage class.
6. Deploy the `pvc` to the cluster by running the following command.
    > $ kubectl apply -f k8s-yaml/sqlserver-pvc.yaml
    ```
    λ kubectl apply -f k8s-yaml/sqlserver-pvc.yaml
    storageclass.storage.k8s.io "azure-disk" created
    persistentvolumeclaim "mssql-data" created
    ```
7. Now, you need to deploy the `Sql Server` container. But the `sql server` instance requires an `sa` user password. You can create a Kubernetes secret to store the `SA_PASSWORD` environment variable value. Run the following command to create the secret.
    > $ kubectl create secret generic mssql --from-literal=SA_PASSWORD="Password@123"
    ```
    λ kubectl create secret generic mssql --from-literal=SA_PASSWORD="Password@123"
    secret "mssql" created
    ```
8. List the `pvc` you have created.
    > $ kubectl get pvc
    ```
    λ kubectl get pvc
    NAME         STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    mssql-data   Bound     pvc-fe7d86be-9376-11e9-9641-d65a3ad1d1ce   8Gi        RWO            azure-disk     21m
    ```
9. You can now deploy the `Sql Server` instance. Create `sqlserver-deploy.yaml` file in the `k8s-yaml` folder and add the following code to it.
    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: sql
    spec:
      selector:
        matchLabels:
          app: sql
      template:
        metadata:
          labels:
            app: sql
        spec:      
          containers:
          - name: mssql2017
            image: mcr.microsoft.com/mssql/server:2017-latest
            ports:
              - containerPort: 1433
            env:
            - name: MSSQL_PID
              value: "Developer"
            - name: ACCEPT_EULA
              value: "Y"
            - name: MSSQL_SA_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mssql
                  key: SA_PASSWORD 
            volumeMounts:
            - name: mssqldb
              mountPath: /var/opt/mssql
          volumes:
          - name: mssqldb
            persistentVolumeClaim:
              claimName: mssql-data
    ```
10. Deploy your Sql Server instance by running the following command.
    > $ kubectl apply -f k8s-yaml/sqlserver-deploy.yaml
    ```
    λ kubectl apply -f k8s-yaml/sqlserver-deploy.yaml
    deployment.apps "sql" created
    ```
11. List the pods in your cluster.
    > $ kubectl get pods
    ```
    λ kubectl get pods
    NAME                   READY     STATUS    RESTARTS   AGE
    sql-54f6889b4f-9wp6l   1/1       Running   0          10m
    ```  
12. You need to deploy a Kubernetes service to provide access to the `Sql Server` instance. Create `sqlserver-service.yaml` file in `k8s-yaml` folder and ad the following code.
    ```
    apiVersion: v1
    kind: Service
    metadata:
      name: mssql
    spec:
      selector:
        app: sql
      ports:
      - port: 1433
        targetPort: 1433
      type: LoadBalancer
    ```
13. Run the `kubectl` command to deploy the service.
    > $ kubectl apply -f k8s-yaml/sqlserver-service.yaml
    ```
    λ kubectl apply -f k8s-yaml/sqlserver-service.yaml
    service "mssql" created
    ```
14. List the kubernetes services.
    > $ kubectl get svc
    ```
    λ kubectl get svc
    NAME         TYPE           CLUSTER-IP   EXTERNAL-IP    PORT(S)          AGE
    kubernetes   ClusterIP      10.0.0.1     <none>         443/TCP          5h
    mssql        LoadBalancer   10.0.22.57   23.101.27.45   1433:32544/TCP   6m
    ```
15. You can use your favorite tool to connect to the Sql server instance using the `EXTERNAL-IP` assigned to the instance.

### Deploy services for `IdentityAPI` and 'EventAPI'
1. Deploy a service that provides access to `identityapi` instances. Create `identity-service.yaml` file with the following code.
    ```
    apiVersion: v1
    kind: Service
    metadata:
      name: identitysvc
    spec:
      selector:
        app: identity
      ports:
      - port: 80
        targetPort: 80
      type: LoadBalancer    
    ```
2. Deploy the service to the cluster using the following command.
    > $ kubectl apply -f k8s-yaml/identity-service.yaml
    ```
    λ kubectl apply -f k8s-yaml/identity-service.yaml
    service "identitysvc" created
    ```
3. List the running services
    > $ kubectl get svc
    ```
    λ kubectl get svc
    NAME          TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)          AGE
    identitysvc   LoadBalancer   10.0.219.127   52.163.85.5    80:32128/TCP     1m
    kubernetes    ClusterIP      10.0.0.1       <none>         443/TCP          6h
    mssql         LoadBalancer   10.0.22.57     23.101.27.45   1433:32544/TCP   1h
    ```
4. Now, deploy a service that provides access to `eventapi` instances. Create `event-service.yaml` file with the following code.
    ```
    apiVersion: v1
    kind: Service
    metadata:
      name: eventsvc
    spec:
      selector:
        app: event
      ports:
      - port: 80
        targetPort: 80
      type: LoadBalancer    
    ```
5. Deploy the service to the cluster using the following command.
    > $ kubectl apply -f k8s-yaml/event-service.yaml
    ```
    λ kubectl apply -f k8s-yaml/event-service.yaml
    service "eventsvc" created
    ```
6. List the running services
    > $ kubectl get svc
    ```
    λ kubectl get svc
    NAME          TYPE           CLUSTER-IP     EXTERNAL-IP       PORT(S)          AGE
    eventsvc      LoadBalancer   10.0.71.116    104.215.186.184   80:32093/TCP     56s
    identitysvc   LoadBalancer   10.0.219.127   52.163.85.5       80:32128/TCP     15m
    kubernetes    ClusterIP      10.0.0.1       <none>            443/TCP          6h
    mssql         LoadBalancer   10.0.22.57     23.101.27.45      1433:32544/TCP   1h
    ```
### Deploy pods for `IdentityAPI` and `EventAPI` microservices
1. Add a new yaml file with the name `identity-deploy.yaml` in `k8s-yaml` folder.
2. Add the following code to it.
    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: identity-deploy
    spec:
      replicas: 2 
      selector:
        matchLabels:
          app: identity
      template:
        metadata:
          labels:
            app: identity
        spec:           
          containers:
          - name: identityapi
            image: <identity_api_docker_image>
            resources:
              limits:
                memory: "256Mi"
                cpu: "500m"
            ports:
            - containerPort: 80
            env:
            - name: ConnectionStrings__IdentityConnection
              value: "Data Source=mssql;Initial Catalog=IdentityDB;Persist Security Info=True;User ID=sa;Password=Password@123"
            - name: Jwt__Secret
              value: "thisismylengthykeyforencryption"
            - name: Jwt__Issuer
              value: "http://identitysvc"
            - name: Jwt__Audience
              value: "http://eventsvc"
    ```
    * You need to update the `image` attribure value with your `identityapi` image name which you have uploaded to your Docker hub. (`eg: azuredeveloper/identityapi:latest`). 
    * Also update the `ConnectionStrings__IdentityConnection` environment variable value if required. You can use the `Sql Server ` servcie name (`mssql`) as the `Data source` value instead of external or internal IP addresses.
    * Note that the `Jwt__Issuer` and `Jwt__Audience` values are using the `IdentityAPI` and `EventAPI` kubernetes service names respectively. We will deploy the services with the mentioned names later.
3. Run the command to deploy the `IdentityAPI` instances.
    > $ kubectl apply -f k8s-yaml/identity-deploy.yaml
    ```
    λ kubectl apply -f k8s-yaml/identity-deploy.yaml
    deployment.apps "identity-deploy" created
    ```
4. Check the status of the pods.
    > $ kubectl get pods
    ```
    λ kubectl get pods
    NAME                               READY     STATUS    RESTARTS   AGE
    identity-deploy-6b7c97b88f-h8q9p   1/1       Running   3          2m
    identity-deploy-6b7c97b88f-zzz5t   1/1       Running   0          2m
    sql-54f6889b4f-9wp6l               1/1       Running   0          1h
    ```
5. Open the browser and navigate to the assigned `EXTERNAL-IP` to access the `Identity` service.

6. Now, we can deploy the `EventAPI` pods. Add a new yaml file with the name `event-deploy.yaml` in `k8s-yaml` folder.
7. Add the following code to it.
    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: event-deploy
    spec:
      replicas: 2 
      selector:
        matchLabels:
          app: event
      template:
        metadata:
          labels:
            app: event
        spec:           
          containers:
          - name: eventapi
            image: <event_api_docker_image>       
            resources:
              limits:
                memory: "256Mi"
                cpu: "500m"
            ports:
            - containerPort: 80
            env:
            - name: ConnectionStrings__SqlConnection
              value: "Data Source=mssql;Initial Catalog=EventDB;Persist Security Info=True;User ID=sa;Password=Password@123"
            - name: Jwt__Secret
              value: "thisismylengthykeyforencryption"
            - name: Jwt__Issuer
              value: "http://identitysvc"
            - name: Jwt__Audience
              value: "http://eventsvc"
    ```
    * You need to update the `image` attribure value with your `eventapi` image name which you have uploaded to your Docker hub. (`eg: azuredeveloper/eventapi:latest`). 
    * Also update the `ConnectionStrings__SqlConnection` environment variable value if required. You can use the `Sql Server ` servcie name (`mssql`) as the `Data source` value instead of external or internal IP addresses.
    * Note that the `Jwt__Issuer` and `Jwt__Audience` values are using the `IdentityAPI` and `EventAPI` kubernetes service names respectively. We will deploy the services with the mentioned names later.
8. Run the command to deploy the `EventAPI` instances.
    > $ kubectl apply -f k8s-yaml/event-deploy.yaml
    ```
    λ kubectl apply -f k8s-yaml/event-deploy.yaml
    deployment.apps "event-deploy" created
    ```
9. Check the status of the pods.
    > $ kubectl get pods
    ```
    λ kubectl get pods
    NAME                               READY     STATUS    RESTARTS   AGE
    event-deploy-94b48df8f-94d2x       1/1       Running   3          4m
    event-deploy-94b48df8f-pcc8n       1/1       Running   2          4m
    identity-deploy-6b7c97b88f-h8q9p   1/1       Running   3          18m
    identity-deploy-6b7c97b88f-zzz5t   1/1       Running   0          18m
    sql-54f6889b4f-9wp6l               1/1       Running   0          1h
    ```
10. Open the browser and navigate to the assigned `EXTERNAL-IP` to access the `EventAPI` service.

---
Shared by Sonu Sathyadas
[mailto:sonusathyadas@hotmail.com](mailto:sonusathyadas@gmail.com)
