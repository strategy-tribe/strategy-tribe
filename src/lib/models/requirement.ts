export type Requirement = {
  title: string;
  type: RequirementType;
  optional?: boolean;
};

export enum RequirementType {
  Image = 'Image',
  Report = 'Report',
  Wallet = 'Wallet',
  Email = 'Email',
  Domain = 'Domain',
  PhoneNumber = 'Phone number',
  SocialMediaAccount = 'Social media account',
}
