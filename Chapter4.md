## Creating Kubernetes Cluster on Azure
In this chapter, we will be creating Kubernetes cluster on Azure. Azure Kubernetes Service allows you to create container cluster on Azure. 
### Prerequisites
* Azure CLI 2.0
* Azure Subscription
  
### Kubernetes
Kubernetes is a portable, extensible open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available.
Kubernetes provides a container-centric management environment. It orchestrates computing, networking, and storage infrastructure on behalf of user workloads. This provides much of the simplicity of Platform as a Service (PaaS) with the flexibility of Infrastructure as a Service (IaaS), and enables portability across infrastructure providers.

### Azure Kubernetes Service
Azure Kubernetes Service (AKS) manages your hosted Kubernetes environment, making it quick and easy to deploy and manage containerized applications without container orchestration expertise. It also eliminates the burden of ongoing operations and maintenance by provisioning, upgrading, and scaling resources on demand, without taking your applications offline.
Azure Kubernetes Service (AKS) makes it simple to deploy a managed Kubernetes cluster in Azure. As a hosted Kubernetes service, Azure handles critical tasks like health monitoring and maintenance for you. The Kubernetes masters are managed by Azure. You only manage and maintain the agent nodes. As a managed Kubernetes service, AKS is free - you only pay for the agent nodes within your clusters, not for the masters.
### AKS Architecture

![AKS architecture](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/microservices/_images/aks.png "AKS architecture")

#### AKS cluster master and nodes
![AKS cluster master and node](https://docs.microsoft.com/en-us/azure/aks/media/concepts-clusters-workloads/cluster-master-and-nodes.png)

### Create your AKS cluster
1. Open the `Command prompt` and run the following command to check whether `azure cli` is installed or not.
   > $ az --version
2. If azure cli is installed, you can login to the Azure subscription. Run the following command to login to azure subscription.
   > $ az login
3. This will open the Azure login page, use your valid Azure credentials to login to the subscription.
Set your default Azure subscription using the following command. Replace the `<subscription id>` with your valid subscription id.
    > $ az account set -s &lt;subscription id&gt;
4. Create a new resource group.
   > $ az group create --name K8SGroup --location &lt;region&gt;
5. Run the following command to get the latest version of Kubernetes supported in your region.
   > $ az aks get-versions -l &lt;region&gt; --query 'orchestrators[-1].orchestratorVersion' -o tsv

    This will print the latest Kubernestes version in your region. Use this value to create the cluster.
#### Cluster creation options
You can create your AKS either with the default Virtual Network or a custom Virtual Network. If you want to enable the Virtual nodes with Azure Container Instances (ACI) you need to use the custom VNET option. With Virtual Nodes, you have quick provisioning of pods, and only pay per second for their execution time. You don’t need to wait for Kubernetes cluster autoscaler to deploy VM compute nodes to run the additional pods.

##### Creating cluster without custom virtual network

6. Create you AKS cluster without custom VNET by running the following command. 
   > $ az aks create -g K8SGroup -n k8scluster -l &lt;region&gt; --enable-addons monitoring --kubernetes-version &lt;version&lt; --generate-ssh-keys 

    Replace the `<region>` with the region name where you want to create the cluster. also replace the `<version>` with the value you have received in the previous step.
    > **Note:** Optionally you can use the following command to specify the number of nodes and the node size. By default, the cluster will create 3 nodes with Standard_DS2_V2.

    > $ az aks create -g K8SGroup -n k8scluster -l &lt;region&gt; --enable-addons monitoring     --kubernetes-version &lt;version&gt;  --node-count &lt;count&gt;  --node-vm-size &lt;vmsize&gt; --generate-ssh-keys

##### Creating cluster with custom virtual network

7. Create a VNET in your resource group.
   > $ az network vnet create -g K8SGroup --name K8sVnet --address-prefixes 10.0.0.0/8     --subnet-name k8ssubnet --subnet-prefix 10.240.0.0/16

    You can add additional subnets later when you create Virtual nodes.
8. Run the following command to get the subnet's id where you want to create the cluster.
   > $ az network vnet subnet show -g K8SGroup --vnet-name K8sVnet --name k8ssubnet --query id -o tsv
9.  Use the following command to create AKS cluster in the specified VNET.
    > $ az aks create -g K8SGroup -n k8scluster --kubernetes-version &lt;version&gt; --network-plugin azure --service-cidr 10.0.0.0/16 --dns-service-ip 10.0.0.10 --docker-bridge-address 172.17.0.1/16 --vnet-subnet-id &lt;subnet_id&gt; --generate-ssh-keys

    This will create the AKS cluster in the VNET location. You need to replace the `<version>` with the latest Kubernetes version and `<subnet_id>` with the subnet id which you have printed as the output of previous command. 

---
Shared by Sonu Sathyadas
[mailto:sonusathyadas@hotmail.com](mailto:sonusathyadas@gmail.com)