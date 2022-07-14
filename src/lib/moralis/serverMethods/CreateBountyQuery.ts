import { BountyQueryParams } from '@/lib/models/queries/BountyQueryParams';
import Queries from '@/utils/Queries';
import Moralis from 'moralis/types';
import { Moralis_useGetBounties } from './Moralis_Bounties';

const CreateBountyQuery = (q: BountyQueryParams, moralis: Moralis) => {
  const { fetch } = Moralis_useGetBounties(q, moralis);
  const id = [Queries.AllBounties, q, 0];

  return { fetch, id };
};

export default CreateBountyQuery;
