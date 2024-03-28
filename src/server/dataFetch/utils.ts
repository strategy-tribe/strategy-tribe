import { RequirementType } from '@prisma/client';
import axios from 'axios';

import { EnrichDataParams } from '../routes/submissionGraph/enrichData';

export const types = Object.entries(RequirementType)
  .map((entry) => entry[1])
  .sort();

export const sortDataPoints = (
  dataPoints:
    | {
        type: RequirementType;
        value: string;
      }[]
    | undefined
) => {
  let data: { type?: string[] } = {};
  if (dataPoints) {
    types.forEach((type) => {
      if (dataPoints.findIndex((d) => d.type === type) >= 0) {
        data = {
          ...data,
          [type]: dataPoints.filter((d) => d.type === type).map((d) => d.value),
        };
      }
    });
  }
  return data;
};

export const getEnrichParams = (
  dataPoints: {
    type: RequirementType;
    value: string;
  }[]
): EnrichDataParams => {
  const data: EnrichDataParams = {
    dataPoints: [],
  };

  dataPoints.forEach((d) => {
    if (d.type === RequirementType.Email) {
      data.dataPoints.push({
        type: RequirementType.Email,
        value: d.value,
      });
    } else if (d.type === RequirementType.PhoneNumber) {
      data.dataPoints.push({
        type: RequirementType.PhoneNumber,
        value: d.value,
      });
    }
  });
  return data;
};

export const enrichOsintIndustries = async (data: string) => {
  const result = await axios.get(`${process.env.OSINT_INDUSTRIES_API}${data}`, {
    headers: {
      'api-key': process.env.OSINT_INDUSTRIES_TOKEN,
    },
  });
  return result.data;
};
