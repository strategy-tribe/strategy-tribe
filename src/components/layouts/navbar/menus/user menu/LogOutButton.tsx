import { useAuth } from 'auth/AuthContext';

export function LogOutButton({ hide }: { hide: () => void }) {
  const { LogOut } = useAuth();

  return (
    <button
      className="py-4 w-full text-right hover:bg-surface pl-8 pr-4"
      onClick={() => {
        hide();
        LogOut();
        window.location.reload();
      }}
    >
      Log out
    </button>
  );
}
