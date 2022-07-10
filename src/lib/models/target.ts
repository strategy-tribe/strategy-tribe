import { TargetType } from './targetType';

export type Target = {
  name: string;
  alsoKnownAs?: string[];
  description?: string;
  type: TargetType;
  organizationName: string;
  tags?: string[];
  countries?: string[];

  //
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
