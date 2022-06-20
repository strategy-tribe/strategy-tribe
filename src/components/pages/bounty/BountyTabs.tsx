import { useAuth } from 'auth/AuthContext';
import { useBountyContext } from './BountyContext';

export function BountyTabs() {
  const { sectionInView, setSectionInView } = useBountyContext();
  const { isStaff } = useAuth();

  return (
    <ul className="hidden laptop:flex gap-16 text-disabled mx-auto ">
      <li
        className={`label-lg hover:text-white ${
          sectionInView === 'details' && 'text-white'
        }`}
      >
        <button onClick={() => setSectionInView('details')}>
          Bounty details
        </button>
      </li>
      <li
        className={`label-lg hover:text-white ${
          sectionInView === 'submissions' && 'text-white'
        }`}
      >
        <button onClick={() => setSectionInView('submissions')}>
          {isStaff ? 'Submissions' : 'Your submissions'}
        </button>
      </li>
      {!isStaff && (
        <li
          className={`label-lg hover:text-white ${
            sectionInView === 'FAQ' && 'text-white'
          }`}
        >
          <button onClick={() => setSectionInView('FAQ')}>FAQ</button>
        </li>
      )}
    </ul>
  );
}
