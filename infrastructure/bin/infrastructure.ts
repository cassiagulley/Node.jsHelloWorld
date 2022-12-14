#!/usr/bin/env node
import 'source-map-support/register';
import { AwsAccount, App, Squad, Workload } from '@linktr.ee/cdk-construct-library/common';
import { DeployRoleStack } from '@linktr.ee/cdk-construct-library/components/roles';
import { DeployRolePolicy } from '@linktr.ee/cdk-construct-library/components/roles/policies';
import { EcrStack } from '../lib/ecr';
import { AppStack } from '../lib/app';

const awsAccountId = process.env.CDK_DEFAULT_ACCOUNT;

const app = new App();
const baseProps = {
  env: { region: 'us-west-2', account: AwsAccount.DEVELOPMENT },
  tags: { Service: 'Cassia-Test', Squad: Squad.CONTENT_MODERATION, Workload: Workload.DEVELOPMENT }
};

const qaProps = {
  ...baseProps,
  tags: {
    ...baseProps.tags,
    Workload: Workload.QA
  },
  env: {
    ...baseProps.env,
    account: AwsAccount.QA
  }
};

switch (awsAccountId) {
  case AwsAccount.QA: {
    new EcrStack(app, 'qa-cassia-ecr', { ...qaProps });

    // if using buildkite for roles
    new DeployRoleStack(app, 'qa-cassia-deploy-roles', {
      ...qaProps,
      serviceName: 'Cassia-Test',
      cannedPolicies: [DeployRolePolicy.EcsPolicy]
    });

    new AppStack(app, 'qa-cassia-fargate', {
      ...qaProps
    });

    break;
  }

  case AwsAccount.DEVELOPMENT: {
    new EcrStack(app, 'development-cassia-ecr', { ...baseProps });

    // if using buildkite for roles
    new DeployRoleStack(app, 'development-cassia-deploy-roles', {
      ...baseProps,
      serviceName: 'Cassia-Test',
      cannedPolicies: [DeployRolePolicy.EcsPolicy]
    });

    new AppStack(app, 'development-cassia-fargate', {
      ...baseProps
    });

    break;
  }
}
