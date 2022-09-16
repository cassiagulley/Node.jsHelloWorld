import { Stack, StackProps, App } from '@linktr.ee/cdk-construct-library/common';
import { FargateService } from '@linktr.ee/cdk-construct-library/components/ecs';

export class AppStack extends Stack {
  public fargateService: FargateService;

  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props);

    this.fargateService = new FargateService(this, 'CassiaTestFargateService', {
      containers: [
        {
          entryContainer: true,
          imageTag: 'latest',
          name: 'cassia-test',
          repositoryArn: 'arn:aws:ecr:us-west-2:716177852038:repository/cassia-test',
          port: 3000
        }
      ],
      serviceName: 'cassia-test'
    });

    this.fargateService.addApplicationLoadBalancer({
      domain: 'linktr.ee',
      domainPrefix: `${props.tags.Workload === 'qa' ? 'qa.' : 'development.'}cassia-test`,
      healthcheck: {
        interval: 10,
        healthyThresholdCount: 2,
        path: '/cats/3'
      },
      public: false
    });

    // TODO: fix listener error
    // this.fargateService.alb.addListener('web', { port: 80 });
  }
}
