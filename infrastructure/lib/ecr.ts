import { AwsAccount, Construct, Stack, StackProps } from '@linktr.ee/cdk-construct-library/common';
import { Repository } from '@linktr.ee/cdk-construct-library/aws/aws-ecr';
import { AccountPrincipal } from '@linktr.ee/cdk-construct-library/aws/aws-iam';
import { CfnOutput } from '@linktr.ee/cdk-construct-library/aws/core';

export class EcrStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const appRepository = new Repository(this, 'CassiaTest', {
      repositoryName: 'cassia-test'
    });

    appRepository.grantPullPush(new AccountPrincipal(AwsAccount.DEVELOPMENT));

    const awsAccount = props.env?.account;

    appRepository.grantPull(new AccountPrincipal(awsAccount));

    new CfnOutput(this, 'AppEcrExport', {
      exportName: 'CassiaTestAppRepositoryUri',
      value: appRepository.repositoryUri
    });
  }
}
