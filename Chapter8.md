## Deploying frontend for Microservices
### Deploy `EventUI` frontend application
1. Add a new yaml file with the name `frontend-deploy.yaml` in `k8s-yaml` folder.
2. Add the following code to it.
    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: frontend-deploy
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: frontend
      template:
        metadata:
          labels:
            app: frontend
        spec:           
          containers:
          - name: eventui
            image: <event_ui_docker_hub_image>
            resources:
              limits:
                memory: "256Mi"
                cpu: "500m"
            ports:
            - containerPort: 80
            env:
            - name: SpaSettings__IdentityApiUrl
              value: "http://<IDENTITY_SERVICE_EXTERNAL_IP>"
            - name: SpaSettings__EventApiUrl
              value: "http://<EVENT_SERVICE_EXTERNAL_IP>"       
    ```
    * You need to update the `image` attribure value with your `eventui` image name which you have uploaded to your Docker hub. (`eg: azuredeveloper/eventui:latest`). 
    * Update the `SpaSettings__IdentityApiUrl` environment variable value. Replace the `<IDENTITY_SERVICE_EXTERNAL_IP>` with the `EXTERNAL-IP` of the `identitysvc`.
    * Update the `SpaSettings__EventApiUrl` environment variable value. Replace the `<EVENT_SERVICE_EXTERNAL_IP>` with the `EXTERNAL-IP` of the `eventsvc`.
3. Run the command to deploy the `EventAPI` instances.
    > $ kubectl apply -f k8s-yaml/frontend-deploy.yaml
    ```
    λ kubectl apply -f k8s-yaml/frontend-deploy.yaml
    deployment.apps "frontend-deploy" created
    ```
4. Check the status of the pods.
    > $ kubectl get pods
    ```
    λ kubectl get pods
    NAME                               READY     STATUS    RESTARTS   AGE
    event-deploy-94b48df8f-94d2x       1/1       Running   3          24m
    event-deploy-94b48df8f-pcc8n       1/1       Running   2          24m
    frontend-deploy-658d57b8d-gw4bh    1/1       Running   0          1m
    identity-deploy-6b7c97b88f-h8q9p   1/1       Running   3          39m
    identity-deploy-6b7c97b88f-zzz5t   1/1       Running   0          39m
    sql-54f6889b4f-9wp6l               1/1       Running   0          1h
    ```
5. Deploy a service that provides access to `frontend` instances. But, we will not create the `frontend` service as a `LoadBalancer` type. The `LoadBalancer` will create a public IP for the service. But we are going to create it as a `ClusterIP` service which does not assigns a public IP. Instead of accessing the frontend through an IP address, you would like to expose the frontend over a hostname. Explore using Kubernetes `Ingress` with `AKS HTTP Application Routing` add-on to achieve this purpose. 
    ##### Ingress resource in Kubernetes
    An `ingress controller` is a piece of software that provides *reverse proxy*, *configurable traffic routing*, and *TLS termination* for Kubernetes services. Kubernetes ingress resources are used to configure the ingress rules and routes for individual Kubernetes services. *Using an ingress controller and ingress rules, a single IP address can be used to route traffic to multiple services in a Kubernetes cluster*.
    
    The **HTTP application routing** add-on makes it easy to access applications that are deployed to your Azure Kubernetes Service (AKS) cluster. As applications are deployed, the solution also creates publicly accessible DNS names for application endpoints. When you enable the add-on, this deploys two components:a Kubernetes Ingress controller and an External-DNS controller.
    **Ingress controller**: The Ingress controller is exposed to the internet by using a Kubernetes service of type LoadBalancer. The Ingress controller watches and implements Kubernetes Ingress resources, which creates routes to application endpoints.
    **External-DNS controller**: Watches for Kubernetes Ingress resources and creates DNS A records in the cluster-specific DNS zone using Azure DNS.

6. Run the following command to enable the `http-application-routing` add-on in your cluster.
    > $ az aks enable-addons -g K8SGroup -n k8scluster --addons http_application_routing
7. Create `frontend-service.yaml` file with the following code.
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
      type: ClusterIP    
    ```
8. Deploy the service to the cluster using the following command.
    > $ kubectl apply -f k8s-yaml/frontend-service.yaml
    ```
    λ kubectl apply -f k8s-yaml\frontend-service.yaml
    service "frontend" created
    ```
9. List the running services
    > $ kubectl get svc
    ```
    λ kubectl get svc
    NAME          TYPE           CLUSTER-IP     EXTERNAL-IP       PORT(S)          AGE
    eventsvc      LoadBalancer   10.0.71.116    104.215.186.184   80:32093/TCP     46m
    frontend      ClusterIP      10.0.56.8      <none>            80/TCP           1m
    identitysvc   LoadBalancer   10.0.219.127   52.163.85.5       80:32128/TCP     1h
    kubernetes    ClusterIP      10.0.0.1       <none>            443/TCP          7h
    mssql         LoadBalancer   10.0.22.57     23.101.27.45      1433:32544/TCP   2h
    ```
10. Now, you need to deploy your `Ingress` service. The `ingress` deployment file need to be updated with the `hostname` of `DNS Zone` created in the subscription. Run the following command to get the `hostname` of the DNS Zone.
    > $ az aks show -g K8SGroup -n k8scluster --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table
    ```
    λ az aks show -g K8SGroup -n k8scluster --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table
    Result
    --------------------------------------------
    569cf974d82046338fbf.southeastasia.aksapp.io
    ```
    You should get back something like 569cf974d82046338fbf.southeastasia.aksapp.io. 
11. Create an ingress deployment file with the name `frontend-ingress.yaml` and and add the following code to it.
    ```
    apiVersion: extensions/v1beta1
    kind: Ingress
    metadata:
      name: frontend
      annotations:
        kubernetes.io/ingress.class: addon-http-application-routing
    spec:
      rules:
      - host: frontend.<CLUSTER_SPECIFIC_DNS_ZONE>
        http:
          paths:
          - backend:
              serviceName: frontend
              servicePort: 80
            path: /
    ```
12. Replace the &lt;CLUSTER_SPECIFIC_DNS_ZONE&gt;  with the DNS zone name you retrieved from the previous command.
13. Deploy the ingress by running the following command.
    > $ kubectl apply -f k8s-yaml/frontend-ingress.yaml
    ```
    λ kubectl apply -f k8s-yaml\fe-engress.yaml
    ingress.extensions "frontend" created
    ```
14. List the created ingress.
    > $ kubectl get ingress
    ```
    λ kubectl get ingress
    NAME       HOSTS                                                   ADDRESS           PORTS     AGE
    frontend   frontend.569cf974d82046338fbf.southeastasia.aksapp.io   104.215.198.161   80        34s
    ```
15. 
