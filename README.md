# LakshmiNSB-sst-aws-infra-ebooks
aws services provisionanig using sst IaC


# 1. Project Initialization
npm init -y
npm install -D sst typescript ts-node @types/node
npx sst init --template minimal
npx sst@latest init


# 2. project sstracture
sst-lambda-basic/
├── sst.config.ts
├── package.json
├── tsconfig.json
├── src/
│   └── handler.ts
└── .github/
    └── workflows/
        └── ci-cd-deploy.yml
