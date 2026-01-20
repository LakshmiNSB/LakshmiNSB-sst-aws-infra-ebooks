
// Create SG
const ec2Sg = new aws.ec2.SecurityGroup(`${ec2Name}-sg`, {
  vpcId,
  description: `Security group for EC2 instance: ${ec2Name}`,
  tags: { Name: `${ec2Name}-sg` },
});

// Add ingress rules
let idx = 0;
for (const rule of ec2IngressRules) {
  for (const port of rule.ports) {
    const fromPort = typeof port === "number" ? port : port.from;
    const toPort = typeof port === "number" ? port : port.to;

    for (const cidr of rule.cidrs ?? []) {
      new aws.vpc.SecurityGroupIngressRule(`${ec2Name}-ingress-${idx++}`, {
        securityGroupId: ec2Sg.id,
        ipProtocol: rule.protocol,
        fromPort: rule.protocol === "-1" ? undefined : fromPort,
        toPort: rule.protocol === "-1" ? undefined : toPort,
        cidrIpv4: cidr,
        description: rule.description,
      });
    }

    for (const sourceSgId of rule.sourceSgIds ?? []) {
      new aws.vpc.SecurityGroupIngressRule(`${ec2Name}-ingress-${idx++}`, {
        securityGroupId: ec2Sg.id,
        referencedSecurityGroupId: sourceSgId,
        ipProtocol: rule.protocol,
        fromPort: rule.protocol === "-1" ? undefined : fromPort,
        toPort: rule.protocol === "-1" ? undefined : toPort,
        description: rule.description,
      });
    }
  }
}

new aws.vpc.SecurityGroupEgressRule(`${ec2Name}-egress-all`, {
  securityGroupId: ec2Sg.id,
  ipProtocol: "-1",
  cidrIpv4: "0.0.0.0/0",
  description: "Allow all outbound",
});

export const securityGroupId = ec2Sg.id;


ec2IngressRules:
  - description: Fortigate SSH
    protocol: tcp
    ports: [22]
    cidrs:
      - 10.255.104.0/22
      - 10.254.60.0/22

  - description: Fortigate Web Console, HTTP/HTTPS Public
    protocol: tcp
    ports: [80, 443]
    cidrs:
      - 10.254.60.0/22
      - 10.255.104.0/22

  - description: ROC FortiManager access to FortiGate
    protocol: "-1"
    ports:
      - from: 0
        to: 0
    cidrs:
      - 10.255.104.0/22

  - description: HTTPS from ALB SG
    protocol: tcp
    ports: [443]
    sourceSgIds:
      - sg-0dbfcca6f3864be32

