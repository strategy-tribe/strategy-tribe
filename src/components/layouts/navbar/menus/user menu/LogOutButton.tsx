import { useAuth } from 'auth/AuthContext';

export function LogOutButton({ hide }: { hide: () => void }) {
  const { LogOut } = useAuth();

  return (
    <button
      className="px-6 py-4 w-full text-left hover:bg-dark"
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
