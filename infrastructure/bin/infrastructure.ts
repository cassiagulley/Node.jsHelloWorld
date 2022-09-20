#!/usr/bin/env node
import 'source-map-support/register';
import { CassiaTestStack } from '../lib/infrastructure-stack';
import { AwsAccount, App, Squad, Workload } from '@linktr.ee/cdk-construct-library/common';
import { DeployRoleStack } from '@linktr.ee/cdk-construct-library/components/roles';
import { DeployRolePolicy } from '@linktr.ee/cdk-construct-library/components/roles/policies';

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
    new CassiaTestStack(app, 'qa-cassia', { ...qaProps });

    // if using buildkite for roles
    new DeployRoleStack(app, 'qa-cassia-deploy-roles', {
      ...baseProps,
      serviceName: 'Cassia-Test',
      cannedPolicies: [DeployRolePolicy.EcsPolicy]
    });

    break;
  }

  case AwsAccount.DEVELOPMENT: {
    new CassiaTestStack(app, 'development-cassia', { ...baseProps });

    // if using buildkite for roles
    new DeployRoleStack(app, 'development-cassia-deploy-roles', {
      ...baseProps,
      serviceName: 'Cassia-Test',
      cannedPolicies: [DeployRolePolicy.EcsPolicy]
    });

    break;
  }
}
