# Deployment Operations

This document outlines how I would deploy and manage this application. As it stands, I would not recommend deploying this to production without authentication. Even in an internal-only scenario, I would still suggest implementing authentication, preferably behind Azure Entra ID (formerly Azure AD).

# Architechture

As an Azure-focused engineer, I recommend deploying the application on Azure. Any Git-based CI/CD system can be used, but I prefer GitHub Actions due to GPG commit signing and commit verification, which improves supply chain trust and traceability.

## CI/CD Strategy

### Build Once, Deploy Many

Build artifacts should be created once (e.g., in nightly) and reused across beta and production. This reduces build drift and accelerates emergency patch rollouts.

### Test Earlier, Deploy Faster

Unit tests should run at the pull request stage, not during the deployment pipeline. This keeps deployment fast while enforcing quality gates earlier

### Self-Hosted Runner or Agent

To avoid exposing ports for deployment, I recommend a self-hosted agent that can reach target environments via private networking or SSH. This agent can be programmatically started and stopped via the Azure API, reducing the attack surface.

## Hosting Options

### Azure App Service

Easiest to manage, less OS or system items to worry about as managed by Microsoft so creates a fast scaling, low overhead platform

### Azure Container Apps

Good for containerized workloads with autoscaling and low infra overhead, but, it does from my experience seem to pull images down every time slowing deployment

### Azure Kubernetes Service (AKS)

Full flexibility, but more operational complexity. Good for complex workloads or multi-service architectures. Use only if justified by scale or architectural requirements.

## Database Hosting

Preferred: Azure Cosmos DB (Mongo API) - Managed and scalable but expensive, use this if we have the budget for it.

Alternative: Self-Hosted MongoDB on a Linux VM - Lower Cost but higher responsibility.

If deploying MongoDB manually, consider co-hosting the API and MongoDB on the same VM to reduce cost and latency. While this slightly increases blast radius, an attacker who gains access to either component poses a similar risk. The benefit is reduced complexity around virtual networking and peering

# Security Considerations

If the API and MongoDB are on seperate machines, ensure MongoDB is ONLY accessible via private networking using Azures virtual network peering feature.

MongoDB must never be exposed to the public internet under any circumstances.

# Secrets Management

Use Azure Key Vault to secure store sensitive values such as MongoDB connection string. As the app grows, other secures such as API Keys, Service Credentials should be stored and access from Key Vault using a managed identity.